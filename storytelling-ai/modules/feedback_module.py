"""
feedback_module.py

Provides feedback on text by checking grammar (and spelling) using LanguageTool,
analyzing tone using a sentiment analysis pipeline, and generating a title and plot twists.
"""

import language_tool_python
from transformers import pipeline

try:
    from modules.idea_generator import generate_idea
except ModuleNotFoundError:
    from idea_generator import generate_idea  # Use relative import if needed

# Initialize LanguageTool for US English.
tool = language_tool_python.LanguageTool('en-US')

# Initialize a sentiment analysis pipeline.
sentiment_pipeline = pipeline(
    "sentiment-analysis",
    model="distilbert-base-uncased-finetuned-sst-2-english"
)

def grammar_feedback(text: str) -> list:
    """Checks grammar and spelling using LanguageTool."""
    matches = tool.check(text)
    corrections = [
        f"- {match.ruleId}: {match.replacements[0]}" if match.replacements else f"- {match.message}"
        for match in matches
    ]
    return corrections

def tone_check(text: str) -> str:
    """Analyzes the sentiment of the text and returns a readable output."""
    sentiment = sentiment_pipeline(text)[0]
    return f"{sentiment['label']} (Confidence: {sentiment['score']:.2%})"

def suggest_title(text: str) -> str:
    """Generates a concise, creative title for the story."""
    prompt = f"Based on the following story, suggest a concise, creative title:\n\n{text}\n\nTitle:"
    return generate_idea(prompt, max_length=900).strip()

def suggest_twists(text: str) -> str:
    """Generates three unique and surprising plot twists for the story."""
    prompt = f"Based on the following story, suggest three surprising and unique plot twists:\n\n{text}\n\nPlot Twists:"
    return generate_idea(prompt, max_length=800).strip()

def feedback(text: str):
    """Generates and prints feedback including grammar issues, tone analysis, a title, and plot twists."""
    
    print("\n📝 **Grammar Issues:**")
    grammar_issues = grammar_feedback(text)
    if grammar_issues:
        print("\n".join(grammar_issues))
    else:
        print("✅ No major grammar issues found!")

    print("\n🎭 **Tone Analysis:**")
    print(f"- {tone_check(text)}")

    print("\n📖 **Suggested Title:**")
    print(f"- {suggest_title(text)}")

    print("\n🔀 **Plot Twist Ideas:**")
    print(suggest_twists(text))

# ✅ Run this script directly to test with user input
if __name__ == "__main__":
    print("\n🔍 Paste your story below and press Enter (type 'END' on a new line to finish):\n")
    user_story = []
    
    while True:
        line = input()
        if line.strip().upper() == "END":
            break
        user_story.append(line)

    user_story = "\n".join(user_story).strip()

    if not user_story:
        print("❌ No story provided. Exiting...")
    else:
        print("\n🔎 **Generating feedback...**\n")
        feedback(user_story)
