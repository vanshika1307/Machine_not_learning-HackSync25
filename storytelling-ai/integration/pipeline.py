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

"""
pipeline.py

Integrates the story-generation modules:
  - idea_generator: Generates story ideas.
  - character_designer: Extracts character names/traits.
  - dialogue_improver: Improves dialogue.
  - feedback_module: Provides feedback on dialogue.
  - character_manager: Automatically updates character details.

Run from the project root via:
    python -m integration.pipeline
or (with the sys.path fix) via:
    python integration/pipeline.py
"""

"""
pipeline.py

Integrates the story-generation modules:
  - idea_generator: Generates story ideas.
  - character_designer: Extracts character names/traits.
  - dialogue_improver: Improves dialogue.
  - feedback_module: Provides feedback on dialogue.
  - character_manager: Automatically updates character details.

Run from the project root via:
    python -m integration.pipeline
or (with the sys.path fix) via:
    python integration/pipeline.py
"""
"""
pipeline.py

Integrates the story-generation modules:
  - idea_generator: Generates story ideas.
  - character_designer: Extracts character names/traits.
  - dialogue_improver: Improves dialogue.
  - feedback_module: Provides feedback on dialogue.
  - character_manager: Automatically updates character details (stored in JSON).

Run from the project root via:
    python -m integration.pipeline
or (with the sys.path fix) via:
    python integration/pipeline.py
"""

"""
pipeline.py

Integrates the story-generation modules:
  - idea_generator: Generates story ideas.
  - character_designer: Extracts character names/traits.
  - dialogue_improver: Improves dialogue.
  - feedback_module: Provides feedback on dialogue.
  - character_manager: Automatically updates character details (stored in JSON).
  - story_manager: (Optional) Updates story metadata.

Run from the project root via:
    python -m integration.pipeline
or (with sys.path fix) via:
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
from modules.character_designer import extract_traits
from modules.dialogue_improver import improve_dialogue
from modules.feedback_module import feedback
from modules.character_manager import auto_update_character

# Optional: if you have a story_manager module for metadata, import it.
# from modules.story_manager import update_story_metadata

def update_characters_with_traits(traits, context):
    """
    For each extracted character trait (entity), update the character details
    using the current story context.
    """
    for name in traits:
        # Generate a more detailed character profile
        prompt = (
            f"Provide a detailed description of the character '{name}' including their personality traits, "
            f"motivations, strengths, weaknesses, and unique behaviors. Also, describe their backstory, "
            f"such as their first appearance in the story, key moments, relationships, and possible last appearance. "
            f"Story context:\n\n{context}\n\nCharacter Details:"
        )
        detailed_traits = generate_idea(prompt, max_length=600).strip()
        
        # Store the extracted details in the character manager
        auto_update_character(name, detailed_traits)


def run_pipeline(initial_prompt, story_id=None, title=None):
    # Optionally update story metadata if needed.
    # if story_id and title:
    #     update_story_metadata(story_id, title)
    
    # Generate the initial story.
    story = generate_idea(initial_prompt, max_length=300)
    print("Generated Story:\n", story)
    
    # Extract character traits and update their details.
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
        
        additional = generate_idea(expansion_prompt, max_length=300)
        story += "\n" + additional
        print("\nExpanded Story:\n", story)
        
        traits = extract_traits(story)
        update_characters_with_traits(traits, story)
        
        improved_dialogue = improve_dialogue(story)
        print("\nImproved Dialogue:\n", improved_dialogue)
        fb = feedback(improved_dialogue)
        print("\nFeedback:\n", fb)

if __name__ == "__main__":
    # Optionally, you could also prompt for story metadata.
    # story_id = input("Enter story ID: ")
    # title = input("Enter story title: ")
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