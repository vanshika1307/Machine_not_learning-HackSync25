"""
character_manager.py

Manages character data stored in a JSON file.
Automatically updates character details (personality and backstory) based on the current story context.
This version attempts to generate unique, non-repetitive details for each character.
"""

import json
import os
import difflib

DATA_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "data", "characters.json")

def load_characters() -> dict:
    if not os.path.exists(DATA_FILE):
        return {}
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        try:
            return json.load(f)
        except json.JSONDecodeError:
            return {}

def save_characters(characters: dict) -> None:
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(characters, f, indent=4)

def add_or_update_character(name: str, attributes: dict) -> None:
    characters = load_characters()
    if name in characters:
        characters[name].update(attributes)
    else:
        characters[name] = attributes
    save_characters(characters)

def get_character(name: str) -> dict:
    characters = load_characters()
    return characters.get(name, None)

def auto_update_character(name: str, context: str) -> str:
    """
    Automatically update a character's details using the idea generator.
    The prompt instructs the model to generate unique, vivid, and creative details that avoid generic repetition.
    
    If the new details are too similar to what’s already stored, an extra instruction is appended for more variety.
    
    Args:
        name (str): The character's name.
        context (str): The current story context.
        
    Returns:
        str: The newly generated details.
    """
    from modules.idea_generator import generate_idea

    prompt = (
        f"Provide a unique, vivid, and creative personality and backstory for a character named {name}. "
        f"Focus on distinct traits and avoid generic, repetitive descriptions. Here is the story context:\n\n"
        f"{context}\n\nDetails:"
    )
    new_details = generate_idea(prompt, max_length=400).strip()
    
    char_info = get_character(name)
    if char_info:
        existing = char_info.get("backstory", "").strip()
        ratio = difflib.SequenceMatcher(None, new_details.lower(), existing.lower()).ratio() if existing else 0
        
        # If new details are too similar (similarity >= 0.5), try to generate extra distinct details.
        if ratio >= 0.5:
            prompt_extra = prompt + "\nAdd additional contrasting and unique details specifically for {name}."
            extra_details = generate_idea(prompt_extra, max_length=1000).strip()
            # Merge both new outputs.
            merged_candidate = (existing + "\n" + new_details + "\n" + extra_details).strip() if existing else new_details + "\n" + extra_details
            # Check similarity again, and if it’s sufficiently different, use the merged version.
            new_ratio = difflib.SequenceMatcher(None, merged_candidate.lower(), existing.lower()).ratio() if existing else 0
            if existing == "" or new_ratio < 0.7:
                merged = merged_candidate
            else:
                merged = existing
        else:
            merged = (existing + "\n" + new_details).strip() if existing else new_details
    else:
        merged = new_details

    updated_attributes = {"personality": "unique", "backstory": merged}
    add_or_update_character(name, updated_attributes)
    return new_details

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
