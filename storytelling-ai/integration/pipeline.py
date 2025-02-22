"""
pipeline.py

Integrates the story-generation modules:
  - idea_generator: Generates story ideas.
  - character_designer: Extracts character names/traits (assumed to be implemented).
  - dialogue_improver: Improves dialogue.
  - feedback_module: Provides feedback on dialogue.
  - character_manager: Automatically updates character details.

Run from the project root via:
    python -m integration.pipeline
or (with the sys.path fix) via:
    python integration/pipeline.py
"""

import os
import sys

# Ensure the project root is in sys.path.
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.join(current_dir, "..")
if parent_dir not in sys.path:
    sys.path.append(parent_dir)

from modules.idea_generator import generate_idea
from modules.character_designer import extract_traits  # Ensure this module extracts character names.
from modules.dialogue_improver import improve_dialogue
from modules.feedback_module import feedback
from modules.character_manager import auto_update_character

def update_characters_with_traits(traits, context):
    """
    Update character details for each extracted trait (character name) based on the current context.
    """
    for trait in traits:
        auto_update_character(trait, context)

def run_pipeline(initial_prompt):
    # Generate an initial story based on the user's prompt.
    story = generate_idea(initial_prompt)
    print("Generated Story:\n", story)
    
    # Extract character traits from the initial story and update character details.
    traits = extract_traits(story)
    update_characters_with_traits(traits, story)
    
    # Improve dialogue and display feedback.
    improved_dialogue = improve_dialogue(story)
    print("\nImproved Dialogue:\n", improved_dialogue)
    fb = feedback(improved_dialogue)
    print("\nFeedback:\n", fb)
    
    # Iteratively expand the story using user-supplied expansion prompts.
    while True:
        expansion_prompt = input("\nEnter an additional prompt to expand the story (or press enter to finish): ")
        if expansion_prompt.strip() == "":
            break
        
        additional = generate_idea(expansion_prompt, max_length=500)
        story += "\n" + additional
        print("\nExpanded Story:\n", story)
        
        traits = extract_traits(story)
        update_characters_with_traits(traits, story)
        
        improved_dialogue = improve_dialogue(story)
        print("\nImproved Dialogue:\n", improved_dialogue)
        fb = feedback(improved_dialogue)
        print("\nFeedback:\n", fb)

if __name__ == "__main__":
    user_prompt = input("Enter your story prompt: ")
    run_pipeline(user_prompt)

'''
import os
import sys

# Add the project root to sys.path
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.join(current_dir, "..")
if parent_dir not in sys.path:
    sys.path.append(parent_dir)

from modules.idea_generator import generate_idea
from modules.character_designer import extract_traits
from modules.dialogue_improver import improve_dialogue
from modules.feedback_module import feedback
from modules.character_manager import auto_update_character

def update_characters_with_traits(traits, context):
    for trait in traits:
        # Update character details for each extracted trait.
        auto_update_character(trait, context)

def run_pipeline(initial_prompt):
    # Generate an initial story idea based on the prompt.
    story = generate_idea(initial_prompt)
    print("Generated Story:\n", story)
    
    # Extract character traits and update characters from the initial story.
    traits = extract_traits(story)
    update_characters_with_traits(traits, story)
    
    # Improve dialogue using the initial story.
    improved_dialogue = improve_dialogue(story)
    print("\nImproved Dialogue:\n", improved_dialogue)
    
    # Provide feedback on the improved dialogue.
    fb = feedback(improved_dialogue)
    print("\nFeedback:\n", fb)
    
    # Iteratively expand the story using user-supplied prompts.
    while True:
        expansion_prompt = input("\nEnter an additional prompt to expand the story (or press enter to finish): ")
        if expansion_prompt.strip() == "":
            break
        
        # Generate additional story text based on the provided expansion prompt.
        additional = generate_idea(expansion_prompt, max_length=500)
        story += "\n" + additional
        print("\nExpanded Story:\n", story)
        
        # Re-extract character traits and update character details.
        traits = extract_traits(story)
        update_characters_with_traits(traits, story)
        
        # Generate new dialogue and feedback based on the expanded story.
        improved_dialogue = improve_dialogue(story)
        print("\nImproved Dialogue:\n", improved_dialogue)
        fb = feedback(improved_dialogue)
        print("\nFeedback:\n", fb)

if __name__ == "__main__":
    user_prompt = input("Enter your story prompt: ")
    run_pipeline(user_prompt)
'''