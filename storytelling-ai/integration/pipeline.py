# pipeline.py

import os
import sys

# Ensure the project root is in sys.path
current_dir = os.path.dirname(os.path.abspath(_file_))
parent_dir = os.path.join(current_dir, "..")
if parent_dir not in sys.path:
    sys.path.append(parent_dir)

from modules.idea_generator import generate_idea
from modules.character_designer import extract_traits
from modules.dialogue_improver import improve_dialogue
from modules.feedback_module import feedback
from modules.character_manager import auto_update_character

# Import story_manager to store everything by story_id
from modules.story_manager import (
    update_story_metadata,
    append_story_content,
    update_character_in_story
)

def run_pipeline(
    initial_prompt,
    story_id="",
    title="",
    premise="",
    genre=""
):
    # 1) Update story metadata in stories.json
    update_story_metadata(story_id, title, premise, genre)
    
    # 2) Generate the initial story
    raw_generation = generate_idea(initial_prompt, max_length=1000)
    print("Generated Story:\n", raw_generation)
    
    # (A) Store the raw generation in the JSON
    append_story_content(story_id, raw_generation)
    
    # (B) Remove the prompt text from the generation so we don't "improve" the prompt
    story_text = raw_generation.replace(initial_prompt, "").strip()
    
    # 3) Extract character traits from the raw generation
    traits = extract_traits(raw_generation)
    for name in traits:
        personality, backstory = auto_update_character(name, raw_generation, generate_idea)
        update_character_in_story(story_id, name, personality, backstory)
    
    # 4) Improve the dialogue using ONLY the story text (minus the prompt)
    improved_dialogue = improve_dialogue(story_text)
    print("\nImproved Dialogue:\n", improved_dialogue)
    
    # 5) Provide feedback on the improved dialogue
    fb = feedback(improved_dialogue)
    print("\nFeedback:\n", fb)
    
    # 6) Iteratively expand the story
    cumulative_story = raw_generation  # keep track of the total story so far
    while True:
        expansion_prompt = input("\nEnter an additional prompt to expand the story (or press enter to finish): ")
        if expansion_prompt.strip() == "":
            break
        
        # Generate more text from the new prompt
        additional_text = generate_idea(expansion_prompt, max_length=300)
        print("\nExpanded Story:\n", additional_text)
        
        # Append to the JSON so we have a record of the entire story
        append_story_content(story_id, additional_text)
        
        # Update the local story variable
        cumulative_story += "\n" + additional_text
        
        # Re-extract characters from the entire story so far
        traits = extract_traits(cumulative_story)
        for name in traits:
            personality, backstory = auto_update_character(name, cumulative_story, generate_idea)
            update_character_in_story(story_id, name, personality, backstory)
        
        # (C) Remove the new prompt from the cumulative story before passing to improver
        # so we only "improve" the story's actual text, not the user prompt
        story_for_improver = cumulative_story.replace(expansion_prompt, "").strip()
        
        improved_dialogue = improve_dialogue(story_for_improver)
        print("\nImproved Dialogue:\n", improved_dialogue)
        
        

if _name_ == "_main_":
    # Example: prompt for story metadata at runtime
    story_id = input("Enter story ID: ")
    title = input("Enter story title: ")
    premise = input("Enter story premise: ")
    genre = input("Enter story genre: ")

    user_prompt = input("Enter your story prompt: ")
    
    run_pipeline(
        user_prompt,
        story_id=story_id,
        title=title,
        premise=premise,
        genre=genre
    )
