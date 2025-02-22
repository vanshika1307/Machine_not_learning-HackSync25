from diffusers import StableDiffusionPipeline
import torch

# Load the pipeline for CPU execution
pipe = StableDiffusionPipeline.from_pretrained(
    "stabilityai/sd-turbo", 
    torch_dtype=torch.float32  # Ensure compatibility with CPU
).to("cpu")

def generate_image(prompt, save_path="C:\\Users\\sanni\\OneDrive\\Desktop\\Story-Telling\\storytelling-ai\\data\\generated_images\\image.png"):

    image = pipe(prompt).images[0]  
    image.save(save_path)  
    return save_path


story_prompt = "A medieval warrior standing on a hill at sunset."
image_path = generate_image(story_prompt)
print(f"Image saved at {image_path}")
