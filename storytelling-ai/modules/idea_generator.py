"""
idea_generator.py

Generates a story idea or prompt using a distilled GPT‑2 model (distilgpt2).
"""
"""
idea_generator.py

Generates a story idea or prompt using a distilled GPT‑2 model (distilgpt2).
"""

"""
idea_generator.py

Generates a story idea or prompt using a distilled GPT‑2 model (distilgpt2).
"""

"""
idea_generator.py

Generates a story idea or prompt using a distilled GPT‑2 model (distilgpt2).
"""

from transformers import GPT2LMHeadModel, GPT2Tokenizer
import torch

# Use distilgpt2 for faster inference.
TOKENIZER = GPT2Tokenizer.from_pretrained("distilgpt2")
# Set pad_token to eos_token if not already set.
if TOKENIZER.pad_token is None:
    TOKENIZER.pad_token = TOKENIZER.eos_token

MODEL = GPT2LMHeadModel.from_pretrained("distilgpt2")

# Move model to GPU if available.
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")
MODEL.to(DEVICE)

def generate_idea(prompt: str, max_length: int = 300) -> str:
    """
    Generate a story idea or prompt.

    Args:
        prompt (str): The input prompt.
        max_length (int): Maximum token length for the generated output.

    Returns:
        str: The generated story idea.
    """
    inputs = TOKENIZER(prompt, return_tensors="pt", padding=True).to(DEVICE)
    outputs = MODEL.generate(
        inputs.input_ids,
        attention_mask=inputs.attention_mask,
        max_length=max_length,
        num_return_sequences=1,
        no_repeat_ngram_size=2,
        pad_token_id=TOKENIZER.pad_token_id,
    )
    idea = TOKENIZER.decode(outputs[0], skip_special_tokens=True)
    return idea


'''
from transformers import GPT2LMHeadModel, GPT2Tokenizer
import torch

# Use the smaller, distilled version of GPT-2
tokenizer = GPT2Tokenizer.from_pretrained("gpt2") #or use distilgpt2
model = GPT2LMHeadModel.from_pretrained("gpt2")

# Optional: move model to GPU if available
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

def generate_idea(prompt, max_length=1000):
    """
    Generate a short story idea or prompt using distilgpt2.
    Lower max_length speeds up inference.
    """
    # Encode input
    inputs = tokenizer.encode(prompt, return_tensors="pt").to(device)

    # Generate text
    outputs = model.generate(
        inputs,
        max_length=max_length,
        num_return_sequences=1,
        no_repeat_ngram_size=2
    )
    # Decode to string
    idea = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return idea
'''