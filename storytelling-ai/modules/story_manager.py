# story_manager.py
import json
import os

STORY_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "data", "stories.json")

def load_all_stories() -> dict:
    """
    Load all stories from 'stories.json'. Return an empty dict if the file doesn't exist or is invalid.
    """
    if not os.path.exists(STORY_FILE):
        return {}
    with open(STORY_FILE, "r", encoding="utf-8") as f:
        try:
            return json.load(f)
        except json.JSONDecodeError:
            return {}

def save_all_stories(data: dict) -> None:
    """
    Save the entire 'data' dict to 'stories.json'.
    """
    with open(STORY_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)

def update_story_metadata(story_id: str, title: str = "", premise: str = "", genre: str = "") -> None:
    """
    Create or update metadata for a story, keyed by story_id.
    """
    data = load_all_stories()
    # If this story doesn't exist yet, create a blank structure
    if story_id not in data:
        data[story_id] = {
            "title": title,
            "premise": premise,
            "genre": genre,
            "content": "",
            "characters": {}
        }
    else:
        # Update fields if they're provided
        if title:
            data[story_id]["title"] = title
        if premise:
            data[story_id]["premise"] = premise
        if genre:
            data[story_id]["genre"] = genre
    
    save_all_stories(data)

def append_story_content(story_id: str, text: str) -> None:
    """
    Append new text to the 'content' field of the specified story.
    If story_id doesn't exist, create it with minimal fields.
    """
    data = load_all_stories()
    if story_id not in data:
        data[story_id] = {
            "title": "",
            "premise": "",
            "genre": "",
            "content": text,
            "characters": {}
        }
    else:
        data[story_id]["content"] += "\n" + text  # Append the new text
    
    save_all_stories(data)

def update_character_in_story(story_id: str, name: str, personality: str, backstory: str) -> None:
    """
    Create or update a character entry inside the specified story, storing personality/backstory.
    """
    data = load_all_stories()
    # If this story doesn't exist, create a default structure
    if story_id not in data:
        data[story_id] = {
            "title": "",
            "premise": "",
            "genre": "",
            "content": "",
            "characters": {}
        }
    # If character doesn't exist yet, create a blank object
    if name not in data[story_id]["characters"]:
        data[story_id]["characters"][name] = {
            "personality": "",
            "backstory": "",
            "first_appearance": "",
            "last_appearance": ""
        }
    # Update personality/backstory
    data[story_id]["characters"][name]["personality"] = personality
    data[story_id]["characters"][name]["backstory"] = backstory
    
    save_all_stories(data)
