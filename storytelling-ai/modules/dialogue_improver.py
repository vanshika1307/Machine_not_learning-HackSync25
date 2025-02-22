# dialogue_improver.py
"""
dialogue_improver.py

Uses a DialoGPT model to improve or rewrite a piece of dialogue.
"""

from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

# Using DialoGPT-medium for quality. (Switch to "microsoft/DialoGPT-small" for faster inference.)
TOKENIZER = AutoTokenizer.from_pretrained("microsoft/DialoGPT-medium")
MODEL = AutoModelForCausalLM.from_pretrained("microsoft/DialoGPT-medium")

# Move model to GPU if available.
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")
MODEL.to(DEVICE)

def improve_dialogue(dialogue: str, max_length: int = 1000) -> str:
    """
    Rewrite/improve the given dialogue using the DialoGPT model.

    Args:
        dialogue (str): The dialogue text to improve.
        max_length (int): Maximum length of the generated output.

    Returns:
        str: The improved dialogue.
    """
    input_ids = TOKENIZER.encode(dialogue + TOKENIZER.eos_token, return_tensors="pt").to(DEVICE)
    outputs = MODEL.generate(
        input_ids,
        max_length=max_length,
        pad_token_id=TOKENIZER.eos_token_id
    )
    improved = TOKENIZER.decode(outputs[0], skip_special_tokens=True)
    return improved

'''
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

# Use the smaller version of DialoGPT
tokenizer = AutoTokenizer.from_pretrained("microsoft/DialoGPT-medium") #microsoft/DialoGPT-small
model = AutoModelForCausalLM.from_pretrained("microsoft/DialoGPT-medium")

# Move model to GPU if available
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

def improve_dialogue(dialogue, max_length=1000):
    """
    Use a smaller DialoGPT model to rewrite/improve a piece of dialogue.
    """
    input_ids = tokenizer.encode(dialogue + tokenizer.eos_token, return_tensors="pt").to(device)

    # Generate improved version
    outputs = model.generate(
        input_ids,
        max_length=max_length,
        pad_token_id=tokenizer.eos_token_id
    )
    improved = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return improved
'''