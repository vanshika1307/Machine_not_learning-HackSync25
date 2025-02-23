# storytelling-ai/integration/fine_tune.py

import os
import torch
from transformers import (
    GPT2LMHeadModel,
    GPT2Tokenizer,
    TextDataset,
    DataCollatorForLanguageModeling,
    Trainer,
    TrainingArguments,
)

def load_dataset(file_path: str, tokenizer, block_size: int = 128):
    from transformers import TextDataset
    return TextDataset(
        tokenizer=tokenizer,
        file_path=file_path,
        block_size=block_size,
        overwrite_cache=True,
    )

def fine_tune_model(model_name: str, train_file: str, val_file: str, output_dir: str, epochs=3):
    # Load tokenizer
    tokenizer = GPT2Tokenizer.from_pretrained(model_name)
    if tokenizer.pad_token is None:
        tokenizer.pad_token = tokenizer.eos_token

    # Load base model
    model = GPT2LMHeadModel.from_pretrained(model_name)
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model.to(device)

    # Create train dataset
    train_dataset = load_dataset(train_file, tokenizer, block_size=128)
    data_collator = DataCollatorForLanguageModeling(tokenizer=tokenizer, mlm=False)

    val_dataset = None
    if os.path.exists(val_file):
        val_dataset = load_dataset(val_file, tokenizer, block_size=128)

    # Training arguments
    training_args = TrainingArguments(
    output_dir=output_dir,
    overwrite_output_dir=True,
    num_train_epochs=3,
    per_device_train_batch_size=4,
    save_steps=500,
    save_total_limit=2,
    evaluation_strategy="epoch" if val_dataset else "no",
    prediction_loss_only=True,
    logging_steps=50,  # Log progress every 50 steps
)


    # Initialize Trainer
    trainer = Trainer(
        model=model,
        args=training_args,
        data_collator=data_collator,
        train_dataset=train_dataset,
        eval_dataset=val_dataset,
    )

    # Fine-tune the model
    trainer.train()

    # Save model and tokenizer
    model.save_pretrained(output_dir)
    tokenizer.save_pretrained(output_dir)
    print(f"Fine-tuned model saved to {output_dir}")

if __name__ == "__main__":
    base_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
    datasets_dir = os.path.join(base_dir, "datasets")
    
    MODEL_NAME = "distilgpt2"
    TRAIN_FILE = os.path.join(datasets_dir, "train.txt")
    VAL_FILE = os.path.join(datasets_dir, "valid.txt")
    OUTPUT_DIR = os.path.join(base_dir, "fine_tuned_model")

    fine_tune_model(MODEL_NAME, TRAIN_FILE, VAL_FILE, OUTPUT_DIR, epochs=3)
