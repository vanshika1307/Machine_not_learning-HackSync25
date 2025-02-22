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
from modules.character_manager import add_or_update_character, get_character

def update_characters_with_traits(traits):
    for trait in traits:
        # Check if character already exists; if not, add with default attributes.
        if get_character(trait) is None:
            add_or_update_character(trait, {"personality": "undefined", "backstory": ""})
        # Optionally, update existing characters here.

def run_pipeline(prompt):
    # Step 1: Generate a story idea
    idea = generate_idea(prompt)
    print("Generated Idea:\n", idea)
    
    # Step 2: Extract character traits from the generated idea
    traits = extract_traits(idea)
    print("\nExtracted Character Traits:\n", traits)
    
    # Step 3: Update the character manager with extracted traits
    update_characters_with_traits(traits)
    
    # Step 4: Improve dialogue (using the idea as a sample dialogue input)
    improved_dialogue = improve_dialogue(idea)
    print("\nImproved Dialogue:\n", improved_dialogue)
    
    # Step 5: Provide feedback on the improved dialogue
    fb = feedback(improved_dialogue)
    print("\nFeedback:\n", fb)

if __name__ == "__main__":
    # Prompt the user for input
    user_prompt = input("Enter your story prompt: ")
    run_pipeline(user_prompt)

