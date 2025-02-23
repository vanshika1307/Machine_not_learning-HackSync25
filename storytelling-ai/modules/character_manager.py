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

import json
import difflib

def extract_json(text: str) -> dict:
    """
    Attempts to extract a JSON object from the given text.
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

from typing import Tuple

def auto_update_character(name: str, context: str, generate_idea_fn) -> Tuple[str, str]:
    """
    
    Example function that uses 'generate_idea_fn' to produce a
    JSON with 'personality' and 'backstory' keys for a given character.
    Returns (personality, backstory) strings.
    """
    prompt = (
        f"Generate a JSON object with two keys: 'personality' and 'backstory'. "
        f"Content must reflect the story context for the character named {name}.\n\n"
        f"{context}\n\n"
        "Output ONLY the JSON object, with no extra text."
    )
    output = generate_idea_fn(prompt, max_length=400).strip()
    details = extract_json(output)

    if details is None:
        # fallback
        details = {
            "personality": f"{name} is quite mysterious.",
            "backstory": f"{name} has an uncertain past influenced by the context: {context}"
        }
    personality = details.get("personality", "")
    backstory = details.get("backstory", "")
    return (personality, backstory)
