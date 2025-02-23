import requests
import os
from pathlib import Path
import time
import cv2
import numpy as np

# Function to crop the bottom 15% of the image
def crop_bottom_15_percent(image_path):
    # Read the image
    image = cv2.imread(image_path)

    # Get the dimensions of the image
    image_height, image_width = image.shape[:2]

    # Calculate the new height (remove 15% from the bottom)
    new_height = int(image_height * 0.85)

    # Crop the image (keep only the top 85% of the original height)
    cropped_image = image[:new_height, :]

    # Save the cropped image
    cv2.imwrite(image_path, cropped_image)
    print(f"Bottom 15% removed. Image saved to {image_path}")

# Function to download image
def download_image():
    # Define the save directory
    save_dir = Path("storytelling-ai\\data\\generate_images")
    
    # Create directory if it doesn't exist
    save_dir.mkdir(parents=True, exist_ok=True)
    
    # Get user input for the prompt
    print("\nWhat kind of image would you like to generate?")
    prompt = input("Enter your prompt: ").strip()
    
    # Create a unique filename using timestamp
    timestamp = time.strftime("%Y%m%d_%H%M%S")
    filename = f"image_{timestamp}.jpg"
    save_path = save_dir / filename
    
    # Download the image
    try:
        # Replace spaces with underscores for the URL
        url_prompt = prompt.replace(" ", "_")
        url = f"https://pollinations.ai/p/{url_prompt}"
        response = requests.get(url)
        
        # Check if the request was successful
        response.raise_for_status()
        
        # Save the image
        with open(save_path, 'wb') as file:
            file.write(response.content)
        
        print(f'\nSuccess! Image saved as: {filename}')
        print(f'Full path: {save_path}')
        
        # Crop the bottom 15% of the image
        crop_bottom_15_percent(str(save_path))

        return str(save_path)
        
    except requests.exceptions.RequestException as e:
        print(f"\nError downloading image: {e}")
        return None

if __name__ == "__main__":
    while True:
        output_image_path = download_image()
        
        if output_image_path:
            print(f"Image with bottom 15% cropped saved as: {output_image_path}")
        
        # Ask if user wants to generate another image
        again = input("\nWould you like to generate another image? (yes/no): ").lower()
        if again != 'yes' and again != 'y':
            print("Thank you for using the image generator!")
            break

'''
from diffusers import StableDiffusionPipeline
import torch

# Load the pipeline for CPU execution
pipe = StableDiffusionPipeline.from_pretrained(
    "stabilityai/sd-turbo", 
    torch_dtype=torch.float32  # Ensure compatibility with CPU
).to("cpu")

def generate_image(prompt, save_path="C:\\Users\\Souma Chakraborty\\OneDrive\\Documents\\GitHub\\Story-Telling\\storytelling-ai\\data\\generate_images\\image1.png"):

    image = pipe(prompt).images[0]  
    image.save(save_path)  
    return save_path


story_prompt = "A medieval warrior standing on a hill at sunset."
image_path = generate_image(story_prompt)
print(f"Image saved at {image_path}")
'''