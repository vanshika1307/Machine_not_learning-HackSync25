# dialogue_improver.py

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
