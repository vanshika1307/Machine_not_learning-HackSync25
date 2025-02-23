"""
character_manager.py

Manages character data stored in a JSON file.
Automatically updates character details (personality and backstory) based on the current story context.
This version attempts to generate unique, non-repetitive details for each character.
"""

"""
character_manager.py

Manages character data stored in a JSON file.
Automatically updates character details (personality and backstory) based on the current story context.
This version generates structured details and replaces old data if the new details differ significantly,
ensuring that character updates occur continuously as the story expands.
"""

"""
character_manager.py

Manages character data stored in a JSON file.
Automatically updates character details (personality and backstory) based on the current story context.
This version generates structured details as a JSON object, ensuring that only the desired fields are stored,
and updates them continuously as the story expands.
"""

"""
character_manager.py

Manages character data stored in a JSON file.
Automatically updates character details (personality and backstory) 
based on the current story context. The idea generator is instructed 
to output only a JSON object with exactly two keys: "personality" and "backstory".
"""

import json
import os
import difflib

DATA_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "data", "characters.json")

def load_characters():
    if not os.path.exists(DATA_FILE):
        return {}
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        try:
            return json.load(f)
        except json.JSONDecodeError:
            return {}

def save_characters(characters):
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(characters, f, indent=4)

def add_or_update_character(name, attributes):
    characters = load_characters()
    if name in characters:
        characters[name].update(attributes)
    else:
        characters[name] = attributes
    save_characters(characters)

def get_character(name):
    characters = load_characters()
    return characters.get(name, None)

def extract_json(text: str):
    """
    Attempts to extract a JSON object from the given text.
    If parsing the entire text fails, tries to locate 
    the substring between the first '{' and the last '}'.
    """
"""
character_manager.py

Manages character data stored in a JSON file.
Automatically updates character details (personality and backstory) based on the story context.
The idea generator is instructed to output ONLY a valid JSON object with exactly two keys: 
"personality" and "backstory". This module then extracts that JSON and updates the stored data.
"""

import json
import os
import difflib

DATA_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "data", "characters.json")

def load_characters() -> dict:
    """Load saved characters from the JSON file."""
    if not os.path.exists(DATA_FILE):
        return {}
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        try:
            return json.load(f)
        except json.JSONDecodeError:
            return {}

def save_characters(characters: dict) -> None:
    """Save the characters dictionary to the JSON file."""
    # Ensure the data directory exists.
    data_dir = os.path.dirname(DATA_FILE)
    if not os.path.exists(data_dir):
        os.makedirs(data_dir)
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(characters, f, indent=4)

def add_or_update_character(name: str, attributes: dict) -> None:
    """Add a new character or update an existing one by merging attributes."""
    characters = load_characters()
    if name in characters:
        characters[name].update(attributes)
    else:
        characters[name] = attributes
    save_characters(characters)

def get_character(name: str) -> dict:
    """Retrieve a character's information by name."""
    characters = load_characters()
    return characters.get(name, None)

def extract_json(text: str) -> dict:
    """
    Attempts to extract a JSON object from the given text.
    If parsing the entire text fails, it extracts the substring between the first '{' and the last '}'.
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

def auto_update_character(name: str, context: str) -> dict:
    """
    Automatically update a character's details using the idea generator.
    The generator is prompted to output ONLY a JSON object with two keys: 
    "personality" and "backstory", reflecting the story context for the character.
    If extraction fails, fallback prompts are used.
    
    The new details are compared against any existing details.
    If the new details differ by more than 20% (similarity ratio < 0.8),
    the new details are used to update the stored information.
    
    Args:
        name (str): The character's name.
        context (str): The current story context.
        
    Returns:
        dict: The updated character details.
    """
    from modules.idea_generator import generate_idea

    # Primary prompt: instruct the generator to produce a strict JSON object.
    prompt = (
        f"Generate a JSON object with two keys: 'personality' and 'backstory'. "
        f"The content must reflect the story context for the character named {name}.\n\n"
        f"{context}\n\n"
        "Output ONLY the JSON object, with no extra text."
    )
    output = generate_idea(prompt, max_length=400).strip()
    details = extract_json(output)

    # Fallback if extraction fails.
    if details is None:
        fallback_prompt = (
            f"Based on the following story context, create a JSON object with keys 'personality' "
            f"and 'backstory' for the character named {name}. The descriptions should be detailed "
            f"and specific to the context.\n\n{context}\n\nOutput ONLY the JSON object."
        )
        fallback_output = generate_idea(fallback_prompt, max_length=300).strip()
        details = extract_json(fallback_output)

    # Final fallback: if still no valid JSON, generate each field separately.
    if details is None:
        default_personality = generate_idea(
            f"Generate a one-sentence personality for {name} based on: {context}",
            max_length=200
        ).strip()
        default_backstory = generate_idea(
            f"Generate a short backstory for {name} based on: {context}",
            max_length=300
        ).strip()
        details = {
            "personality": default_personality if default_personality else f"{name} shows hints of complexity.",
            "backstory": default_backstory if default_backstory else f"The story context provides details about {name}."
        }

    # Retrieve the generated details.
    personality = details.get("personality", "").strip()
    backstory = details.get("backstory", "").strip()
    char_info = get_character(name)
    updated_attributes = {}

    # Update personality: compare new vs. existing using similarity ratio.
    if personality:
        if char_info and "personality" in char_info:
            existing_personality = char_info["personality"].strip()
            ratio = difflib.SequenceMatcher(None, personality.lower(), existing_personality.lower()).ratio()
            if ratio < 0.8:
                updated_attributes["personality"] = personality
            else:
                updated_attributes["personality"] = existing_personality
        else:
            updated_attributes["personality"] = personality
    else:
        updated_attributes["personality"] = f"{name} shows hints of complexity."

    # Update backstory similarly.
    if backstory:
        if char_info and "backstory" in char_info:
            existing_backstory = char_info["backstory"].strip()
            ratio = difflib.SequenceMatcher(None, backstory.lower(), existing_backstory.lower()).ratio()
            if ratio < 0.8:
                updated_attributes["backstory"] = backstory
            else:
                updated_attributes["backstory"] = existing_backstory
        else:
            updated_attributes["backstory"] = backstory
    else:
        updated_attributes["backstory"] = f"The story context provides details about {name}."

    add_or_update_character(name, updated_attributes)
    return updated_attributes


'''
import json
import os
import difflib

DATA_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "data", "characters.json")

def load_characters():
    if not os.path.exists(DATA_FILE):
        return {}
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        try:
            return json.load(f)
        except json.JSONDecodeError:
            return {}

def save_characters(characters):
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(characters, f, indent=4)

def add_or_update_character(name, attributes):
    characters = load_characters()
    if name in characters:
        # Merge the new attributes into the existing ones.
        characters[name].update(attributes)
    else:
        characters[name] = attributes
    save_characters(characters)

def get_character(name):
    characters = load_characters()
    return characters.get(name, None)

def auto_update_character(name, context):
    """
    Automatically update a character's details using the idea generator,
    asking for varied, non-repetitive details.
    """
    # Import generate_idea locally to avoid circular imports.
    from modules.idea_generator import generate_idea
    prompt = (
        f"Describe the personality and backstory of a character named {name} "
        f"in the context of the following story without repeating any details already mentioned:\n\n"
        f"{context}\n\nDetails:"
    )
    # Generate new details (adjust max_length as needed).
    new_details = generate_idea(prompt, max_length=1000).strip()
    
    char_info = get_character(name)
    if char_info:
        existing = char_info.get("backstory", "").strip()
        # Compute similarity ratio between new details and existing backstory.
        ratio = difflib.SequenceMatcher(None, new_details.lower(), existing.lower()).ratio() if existing else 0
        # If new details differ significantly, append them.
        if ratio < 0.3:
            merged = (existing + "\n" + new_details).strip() if existing else new_details
        else:
            merged = existing
    else:
        merged = new_details
    
    updated_attributes = {"personality": "detailed", "backstory": merged}
    add_or_update_character(name, updated_attributes)
    return new_details
'''
