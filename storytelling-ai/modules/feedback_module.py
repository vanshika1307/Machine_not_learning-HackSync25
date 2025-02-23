"""
feedback_module.py

Provides feedback on text by:
- Checking grammar/spelling using LanguageTool,
- Analyzing tone with a sentiment analysis pipeline,
- Generating a concise, creative title,
- Suggesting unique plot twists.

This version returns a dictionary for easy integration with a Flask API and,
when run directly, prints formatted output.
"""

import language_tool_python
from transformers import pipeline

try:
    from modules.idea_generator import generate_idea
except ModuleNotFoundError:
    # Fallback if your project structure differs
    from idea_generator import generate_idea

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
    """Generates a concise, creative title for the story in one sentence."""
    prompt = (
        "Provide a concise, creative title for the following story in one sentence. "
        "Only return the title with no extra commentary.\n\n"
        f"{text}\n\nTitle:"
    )
    # Use a shorter max_length to reduce extraneous output.
    title = generate_idea(prompt, max_length=400).strip()
    # If the returned text still includes the prompt, extract the portion after 'Title:'
    if "Title:" in title:
        title = title.split("Title:")[-1].strip()
    return title.split('\n')[0].strip()

def suggest_twists(text: str) -> list:
    """Generates three unique and surprising plot twists for the story."""
    prompt = (
        "List three surprising and unique plot twists for the following story. "
        "Return only three bullet points (each starting with a dash) with no extra commentary.\n\n"
        f"{text}\n\nPlot Twists:"
    )
    # Use a shorter max_length to avoid including too much prompt text.
    twists_output = generate_idea(prompt, max_length=400).strip()
    # If the output still contains part of the prompt, remove it by finding the first dash.
    if '-' in twists_output:
        first_dash = twists_output.find('-')
        twists_output = twists_output[first_dash:]
    # Split the output into lines and filter out empty ones.
    twists_lines = [line.strip() for line in twists_output.split('\n') if line.strip()]
    # If the result is a single block with dashes, split it further.
    if len(twists_lines) == 1 and '-' in twists_lines[0]:
        parts = [part.strip() for part in twists_lines[0].split('-') if part.strip()]
        twists_lines = [f"- {part}" for part in parts]
    return twists_lines[:3]

def feedback(text: str) -> dict:
    """
    Returns a dictionary of feedback for the given text:
    {
      "grammar_issues": [...],
      "tone": "...",
      "title": "...",
      "plot_twists": [ ... ]
    }
    """
    grammar_issues = grammar_feedback(text)
    tone_result = tone_check(text)
    title = suggest_title(text)
    twists = suggest_twists(text)

    return {
        "grammar_issues": grammar_issues,
        "tone": tone_result,
        "title": title,
        "plot_twists": twists
    }

if __name__ == "__main__":
    print("\n🔍 Paste your story below and press Enter (type 'END' on a new line to finish):\n")
    user_story_lines = []
    while True:
        line = input()
        if line.strip().upper() == "END":
            break
        user_story_lines.append(line)
    user_story = "\n".join(user_story_lines).strip()

    if not user_story:
        print("❌ No story provided. Exiting...")
    else:
        print("\n🔎 *Generating feedback...*\n")
        result = feedback(user_story)

        print("\n📝 *Grammar Issues:*")
        if result["grammar_issues"]:
            print("\n".join(result["grammar_issues"]))
        else:
            print("✅ No major grammar issues found!")

        print("\n🎭 *Tone Analysis:*")
        print(f"- {result['tone']}")

        print("\n📖 *Suggested Title:*")
        print(f"- {result['title']}")

        print("\n🔀 *Plot Twist Ideas:*")
        if result["plot_twists"]:
            print("\n".join(result["plot_twists"]))
        else:
            print("No plot twists generated.")
