import json
import os

# Define path to the characters data file.
DATA_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "data", "characters.json")

def load_characters():
    """Load saved characters from the JSON file."""
    if not os.path.exists(DATA_FILE):
        return {}
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        try:
            return json.load(f)
        except json.JSONDecodeError:
            return {}

def save_characters(characters):
    """Save the characters dictionary to the JSON file."""
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(characters, f, indent=4)

def add_or_update_character(name, attributes):
    """
    Add a new character or update an existing one.
    'attributes' is a dict (e.g., {'personality': 'brave', 'backstory': '...'})
    """
    characters = load_characters()
    if name in characters:
        # Update existing character attributes (merging dictionaries)
        characters[name].update(attributes)
    else:
        characters[name] = attributes
    save_characters(characters)

def get_character(name):
    """Retrieve a character's information by name."""
    characters = load_characters()
    return characters.get(name, None)
