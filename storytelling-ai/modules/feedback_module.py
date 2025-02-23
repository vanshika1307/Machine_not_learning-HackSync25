"""
feedback_module.py

Provides feedback on text by:
- Checking grammar/spelling using LanguageTool,
- Analyzing tone with a sentiment analysis pipeline,
- Generating a concise, creative title,
- Suggesting unique plot twists.

This version returns a dictionary for easy integration with a Flask API.
"""

import language_tool_python
from transformers import pipeline

try:
    from modules.idea_generator import generate_idea
except ModuleNotFoundError:
    # Fallback if your project structure differs
    from idea_generator import generate_idea

# Initialize LanguageTool for US English
tool = language_tool_python.LanguageTool('en-US')

# Initialize a sentiment analysis pipeline
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

def feedback(text: str) -> dict:
    """
    Returns a dictionary of feedback for the given text:
    {
      "grammar_issues": [...],
      "tone": "...",
      "title": "...",
      "plot_twists": "..."
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
