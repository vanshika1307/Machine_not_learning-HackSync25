# idea_generator.py

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
