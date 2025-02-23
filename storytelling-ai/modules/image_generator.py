# storytelling-ai/modules/image_generator.py

import requests
import os
from pathlib import Path
import time
import cv2

def crop_bottom_15_percent(image_path: str) -> None:
    """
    Crop the bottom 15% of the image and save the result back to the file.
    """
    image = cv2.imread(image_path)
    if image is None:
        print(f"Error reading image from {image_path}")
        return
    height, width = image.shape[:2]
    new_height = int(height * 0.85)
    cropped_image = image[:new_height, :]
    cv2.imwrite(image_path, cropped_image)
    print(f"Bottom 15% removed. Image saved to {image_path}")

def download_image(prompt: str, save_dir: str) -> str:
    """
    Downloads an image from pollinations.ai based on the prompt,
    crops the bottom 15% of the image, and returns a relative URL.
    """
    # Ensure the directory exists.
    save_dir = Path(save_dir)
    save_dir.mkdir(parents=True, exist_ok=True)
    
    # Create a unique filename using a timestamp.
    timestamp = time.strftime("%Y%m%d_%H%M%S")
    filename = f"image_{timestamp}.jpg"
    save_path = save_dir / filename

    # Prepare the URL by replacing spaces with underscores.
    url_prompt = prompt.replace(" ", "_")
    url = f"https://pollinations.ai/p/{url_prompt}"
    
    try:
        response = requests.get(url)
        response.raise_for_status()
        with open(save_path, "wb") as file:
            file.write(response.content)
        print(f"Success! Image saved as: {filename}")
        
        # Crop the bottom 15% of the image.
        crop_bottom_15_percent(str(save_path))
        
        # Return a relative URL; we assume our Flask app serves images from '/images/'
        return f"/images/{filename}"
    except requests.exceptions.RequestException as e:
        print(f"Error downloading image: {e}")
        return None

def generate_images(prompt: str, num_images: int = 1) -> list:
    """
    Generates a list of image URLs (relative) by downloading the specified number of images
    based on the given prompt.
    
    Args:
        prompt (str): The image generation prompt.
        num_images (int): The number of images to generate.
        
    Returns:
        list: A list of relative URLs (e.g., ["/images/image_timestamp.jpg", ...]).
    """
    save_dir = "data/generate_images"
    image_urls = []
    for i in range(num_images):
        print(f"Generating image {i+1} of {num_images}...")
        url = download_image(prompt, save_dir)
        if url:
            image_urls.append(url)
    return image_urls

# Remove any interactive main block so this module is solely used as an API.
