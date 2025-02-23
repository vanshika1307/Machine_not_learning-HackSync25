# dialogue_improver.py
"""
dialogue_improver.py

Uses a DialoGPT model to improve or rewrite a piece of dialogue.
"""

from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

# Using DialoGPT-medium for quality (use DialoGPT-small if you prefer speed).
TOKENIZER = AutoTokenizer.from_pretrained("microsoft/DialoGPT-medium")
MODEL = AutoModelForCausalLM.from_pretrained("microsoft/DialoGPT-medium")

DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")
MODEL.to(DEVICE)

def improve_dialogue(dialogue: str, max_length: int = 1000) -> str:
    """
    Rewrite/improve the given dialogue or story text using DialoGPT.
    """
    input_ids = TOKENIZER.encode(dialogue + TOKENIZER.eos_token, return_tensors="pt").to(DEVICE)
    outputs = MODEL.generate(
        input_ids,
        max_length=max_length,
        pad_token_id=TOKENIZER.eos_token_id
    )
    improved = TOKENIZER.decode(outputs[0], skip_special_tokens=True)
    return improved
