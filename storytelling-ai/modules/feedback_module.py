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
