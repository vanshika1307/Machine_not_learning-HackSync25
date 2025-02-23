# character_manager.py
"""
character_manager.py

Optional: If you want to store character data in story.json only,
you can remove the file-based storage here and keep just the logic
for extracting JSON or formatting text.

For example, you might keep only:
 - 'extract_json(text)' if you still use it.
 - 'auto_update_character' if you want it to produce a new personality/backstory string.
"""

"""
character_manager.py

Manages character data stored in a JSON file (data/characters.json).
Automatically updates character details (personality and backstory) based on the story context.
The idea generator is instructed to output ONLY a valid JSON object with exactly two keys:
"personality" and "backstory". This module then extracts that JSON and updates the stored data.
"""

import json
import os
import difflib
from typing import Tuple

# Define the path to characters.json (stored in the data folder at the project root)
DATA_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "data", "characters.json")

def load_characters() -> dict:
    """Load character data from the JSON file. Returns an empty dict if file does not exist or is invalid."""
    if not os.path.exists(DATA_FILE):
        return {}
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        try:
            return json.load(f)
        except json.JSONDecodeError:
            return {}

def save_characters(characters: dict) -> None:
    """Save the character data dictionary to the JSON file."""
    os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(characters, f, indent=4)

def add_or_update_character(name: str, attributes: dict) -> None:
    """Add a new character or update an existing character's attributes."""
    characters = load_characters()
    if name in characters:
        characters[name].update(attributes)
    else:
        characters[name] = attributes
    save_characters(characters)

def get_character(name: str) -> dict:
    """Retrieve the stored character data for the given name (or return None if not found)."""
    characters = load_characters()
    return characters.get(name, None)

def extract_json(text: str) -> dict:
    """
    Attempts to extract a JSON object from the given text.
    If parsing fails, it extracts the substring between the first '{' and the last '}'.
    """
    try:
        return json.loads(text)
    except Exception:
        start = text.find('{')
        end = text.rfind('}')
        if start != -1 and end != -1 and end > start:
            json_str = text[start:end+1]
            try:
                return json.loads(json_str)
            except Exception:
                return None
        return None

def auto_update_character(name: str, context: str, generate_idea_fn) -> Tuple[str, str]:
    """
    Uses the provided generate_idea_fn to produce a JSON object with exactly two keys: 
    "personality" and "backstory" based on the given story context for character 'name'.
    
    The prompt instructs the model to output ONLY the JSON object.
    If the output can't be parsed, default values are used.
    The function then compares the new details with any existing details (using a similarity check)
    and updates the stored character data accordingly.
    
    Args:
        name (str): The character's name.
        context (str): The current story context.
        generate_idea_fn: A function (e.g. generate_idea) that generates text from a prompt.
    
    Returns:
        Tuple[str, str]: The updated (personality, backstory) for the character.
    """
    prompt = (
        f"Generate a JSON object with two keys: 'personality' and 'backstory'. "
        f"The content must reflect the story context for the character named {name}.\n\n"
        f"{context}\n\n"
        "Output ONLY the JSON object, with no extra text."
    )
    output = generate_idea_fn(prompt, max_length=400).strip()
    details = extract_json(output)
    
    if details is None:
        details = {
            "personality": f"{name} is mysterious and intriguing.",
            "backstory": f"{name} has an unclear past shaped by the context: {context}"
        }
    
    personality = details.get("personality", "").strip()
    backstory = details.get("backstory", "").strip()
    existing = get_character(name)
    updated_attributes = {}
    
    # Update personality if new details differ significantly from existing ones.
    if personality:
        if existing and "personality" in existing:
            ratio = difflib.SequenceMatcher(None, personality.lower(), existing["personality"].lower()).ratio()
            if ratio < 0.8:
                updated_attributes["personality"] = personality
            else:
                updated_attributes["personality"] = existing["personality"]
        else:
            updated_attributes["personality"] = personality
    else:
        updated_attributes["personality"] = f"{name} is mysterious and intriguing."
    
    # Update backstory similarly.
    if backstory:
        if existing and "backstory" in existing:
            ratio = difflib.SequenceMatcher(None, backstory.lower(), existing["backstory"].lower()).ratio()
            if ratio < 0.8:
                updated_attributes["backstory"] = backstory
            else:
                updated_attributes["backstory"] = existing["backstory"]
        else:
            updated_attributes["backstory"] = backstory
    else:
        updated_attributes["backstory"] = f"The context provides details about {name}."
    
    add_or_update_character(name, updated_attributes)
    return (updated_attributes["personality"], updated_attributes["backstory"])
