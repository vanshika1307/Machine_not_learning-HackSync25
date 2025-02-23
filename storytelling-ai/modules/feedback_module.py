"""
feedback_module.py

Provides feedback on text by checking grammar (and spelling) using LanguageTool,
analyzing tone using a sentiment analysis pipeline, and generating a title and plot twists.
"""

import language_tool_python
from transformers import pipeline
from modules.idea_generator import generate_idea

# Initialize LanguageTool for US English.
tool = language_tool_python.LanguageTool('en-US')

# Initialize a sentiment analysis pipeline.
sentiment_pipeline = pipeline(
    "sentiment-analysis",
    model="distilbert-base-uncased-finetuned-sst-2-english"
)

def grammar_feedback(text: str) -> list:
    matches = tool.check(text)
    corrections = [
        f"{match.ruleId}: {match.replacements[0]}" if match.replacements else match.message
        for match in matches
    ]
    return corrections

def tone_check(text: str) -> list:
    sentiment = sentiment_pipeline(text)
    return sentiment

def suggest_title(text: str) -> str:
    prompt = (
        f"Based on the following story, suggest a concise, creative title:\n\n{text}\n\nTitle:"
    )
    title = generate_idea(prompt, max_length=900).strip()
    return title

def suggest_twists(text: str) -> str:
    prompt = (
        f"Based on the following story, suggest three surprising and unique plot twists:\n\n{text}\n\nPlot Twists:"
    )
    twists = generate_idea(prompt, max_length=800).strip()
    return twists

def feedback(text: str) -> dict:
    return {
        "grammar_issues": grammar_feedback(text),
        "tone": tone_check(text),
        "title": suggest_title(text),
        "plot_twists": suggest_twists(text)
    }

'''
import language_tool_python
from transformers import pipeline

# Initialize LanguageTool for grammar checking
tool = language_tool_python.LanguageTool('en-US')

# Initialize a sentiment analysis pipeline (BERT-based)
from transformers import pipeline

# Specify the model explicitly:
sentiment_pipeline = pipeline(
    "sentiment-analysis", 
    model="distilbert-base-uncased-finetuned-sst-2-english"
)
#sentiment_pipeline = pipeline("sentiment-analysis")

def grammar_feedback(text):
    matches = tool.check(text)
    corrections = [f"{match.ruleId}: {match.replacements[0]}" if match.replacements else match.message for match in matches]
    return corrections

def tone_check(text):
    sentiment = sentiment_pipeline(text)
    return sentiment

def feedback(text):
    grammar_issues = grammar_feedback(text)
    tone = tone_check(text)
    return {"grammar_issues": grammar_issues, "tone": tone}
'''