# pipeline.py

import os
import sys

# Ensure the project root is in sys.path
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.join(current_dir, "..")
if parent_dir not in sys.path:
    sys.path.append(parent_dir)

# -- Import your existing modules --
from modules.idea_generator import generate_idea
from modules.dialogue_improver import improve_dialogue
from modules.character_designer import extract_traits
from modules.story_manager import (
    update_story_metadata,
    append_story_content,
    update_character_in_story
)

# ---------------------------------------------------------------------
# HELPER FUNCTION: Parse output to keep only text after a given label.
# ---------------------------------------------------------------------

def parse_label_output(model_output: str, label: str) -> str:
    """
    Searches for the last occurrence of the label (case-insensitive) in the model_output.
    Returns the text after the label. If not found, returns the full output.
    """
    idx = model_output.lower().rfind(label.lower())
    if idx == -1:
        return model_output.strip()
    return model_output[idx + len(label):].strip()

# ---------------------------------------------------------------------
# HELPER FUNCTIONS FOR METADATA EXTRACTION
# ---------------------------------------------------------------------

def extract_genre_from_story(story_text: str) -> str:
    prompt = (
        f"Analyze the following story and determine the most fitting literary genre. "
        f"Output only the genre:\n\n{story_text}\n\nGenre:"
    )
    raw_genre = generate_idea(prompt, max_length=250).strip()
    return parse_label_output(raw_genre, "Genre:")

def extract_premise_from_story(story_text: str) -> str:
    prompt = (
        f"Analyze the following story and summarize its main premise in one or two sentences. "
        f"Output only the premise:\n\n{story_text}\n\nPremise:"
    )
    raw_premise = generate_idea(prompt, max_length=600).strip()
    return parse_label_output(raw_premise, "Premise:")

def extract_title_from_story(story_text: str) -> str:
    prompt = (
        f"Analyze the following story and provide a concise, creative title. "
        f"Output only the title:\n\n{story_text}\n\nTitle:"
    )
    raw_title = generate_idea(prompt, max_length=1000).strip()
    return parse_label_output(raw_title, "Title:")

# ---------------------------------------------------------------------
# HELPER FUNCTION FOR CHARACTER BACKSTORY
# ---------------------------------------------------------------------

def generate_character_backstory(name: str, full_story_text: str) -> str:
    prompt = (
        f"Based on the following story, describe the character named {name} in detail. "
        "Include their personality, motivations, and any relevant background hinted at in the story. "
        "Output only the summary:\n\n"
        f"{full_story_text}\n\nCharacter Summary:"
    )
    raw_summary = generate_idea(prompt, max_length=1000).strip()
    return parse_label_output(raw_summary, "Character Summary:")

# ---------------------------------------------------------------------
# MAIN PIPELINE
# ---------------------------------------------------------------------

def run_pipeline(initial_prompt: str, story_id: str):
    """
    1. Generate the initial story from the user's prompt.
    2. Auto-extract genre, premise, and title from the story text (no user input).
    3. Improve the story's dialogue with more emotion (DialoGPT).
    4. Extract characters and store a summary as their 'backstory'.
    5. Allow the user to expand the story, repeating steps 3 & 4 each time.
    """
    # 1) Generate the initial story
    raw_generation = generate_idea(initial_prompt, max_length=2000)
    print("=== Generated Raw Story ===\n", raw_generation)

    # 2) Auto-extract metadata
    auto_genre = extract_genre_from_story(raw_generation)
    auto_premise = extract_premise_from_story(raw_generation)
    auto_title = extract_title_from_story(raw_generation)

    # 3) Improve the dialogue (remove the prompt so we don't re-improve instructions)
    story_text = raw_generation.replace(initial_prompt, "").strip()
    improved_story = improve_dialogue(story_text)
    print("\n=== Improved Story (Dialogue Enhanced) ===\n", improved_story)

    # 4) Store the story data in stories.json
    update_story_metadata(story_id, title=auto_title, premise=auto_premise, genre=auto_genre)
    append_story_content(story_id, improved_story)

    # 5) Extract characters and update their backstories
    traits = extract_traits(improved_story)
    for char_name in traits:
        # Simple filter: Only consider names starting with an uppercase letter and short names.
        if not char_name[0].isupper() or len(char_name.split()) > 3:
            continue
        char_backstory = generate_character_backstory(char_name, improved_story)
        update_character_in_story(story_id, char_name, personality=char_backstory, backstory=char_backstory)

    # 6) Allow story expansions
    full_story_so_far = improved_story
    while True:
        expansion_prompt = input("\nEnter an additional prompt to expand the story (or press enter to finish): ")
        if not expansion_prompt.strip():
            break
        additional_raw = generate_idea(expansion_prompt, max_length=2000)
        additional_improved = improve_dialogue(additional_raw)
        print("\n=== Expanded, Improved Text ===\n", additional_improved)
        full_story_so_far += "\n" + additional_improved
        append_story_content(story_id, additional_improved)
        traits = extract_traits(full_story_so_far)
        for char_name in traits:
            if not char_name[0].isupper() or len(char_name.split()) > 3:
                continue
            char_backstory = generate_character_backstory(char_name, full_story_so_far)
            update_character_in_story(story_id, char_name, personality=char_backstory, backstory=char_backstory)


if __name__ == "__main__":
    story_id = input("Enter story ID: ")
    user_prompt = input("Enter your story prompt: ")
    run_pipeline(user_prompt, story_id)
