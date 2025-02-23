import json
import os

# Define the path to the story JSON file.
STORY_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "data", "story.json")

def load_story() -> dict:
    if not os.path.exists(STORY_FILE):
        return {"story_id": "", "title": "", "characters": {}}
    with open(STORY_FILE, "r", encoding="utf-8") as f:
        try:
            return json.load(f)
        except json.JSONDecodeError:
            return {"story_id": "", "title": "", "characters": {}}

def save_story(story: dict) -> None:
    with open(STORY_FILE, "w", encoding="utf-8") as f:
        json.dump(story, f, indent=4)

def update_story_metadata(story_id: str, title: str) -> None:
    story = load_story()
    story["story_id"] = story_id
    story["title"] = title
    if "characters" not in story:
        story["characters"] = {}
    save_story(story)

def update_character(name: str, attributes: dict) -> None:
    story = load_story()
    if "characters" not in story:
        story["characters"] = {}
    if name in story["characters"]:
        # Update existing character details.
        story["characters"][name].update(attributes)
    else:
        # Create a new character entry with defaults for appearance info.
        default_fields = {"first_appearance": "", "last_appearance": ""}
        default_fields.update(attributes)
        story["characters"][name] = default_fields
    save_story(story)
