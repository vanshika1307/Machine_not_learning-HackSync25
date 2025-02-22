from diffusers import StableDiffusionPipeline
import torch

# Load the model
pipe = StableDiffusionPipeline.from_pretrained("runwayml/stable-diffusion-v1-5").to("cuda")

def generate_image(prompt, save_path="data/generated_images/image.png"):
    image = pipe(prompt).images[0]  # Generate the image
    image.save(save_path)  # Save the image
    return save_path

# Example Usage
story_prompt = "A medieval warrior standing on a hill at sunset."
image_path = generate_image(story_prompt)
print(f"Image saved at {image_path}")
