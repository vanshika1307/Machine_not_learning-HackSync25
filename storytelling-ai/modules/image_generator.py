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
    The image is saved in PNG format.

    Note: Pollinations.ai only supports one model.
    """
    base_dir = os.getcwd()
    save_dir = Path(os.path.join(base_dir, save_dir))
    save_dir.mkdir(parents=True, exist_ok=True)
    
    # Create a unique filename using a timestamp.
    timestamp = time.strftime("%Y%m%d_%H%M%S")
    filename = f"image_{timestamp}.png"
    save_path = save_dir / filename

    print(f"Saving image to: {save_path}")

    # Prepare the URL prompt by replacing spaces with underscores.
    url_prompt = prompt.replace(" ", "_")
    
    # Construct the URL. Since there is only one model, no additional parameter is required.
    url = f"https://image.pollinations.ai/prompt/{url_prompt}"
    
    try:
        response = requests.get(url)
        response.raise_for_status()
        with open(save_path, "wb") as file:
            file.write(response.content)
        print(f"Success! Image saved as: {filename}")
        
        crop_bottom_15_percent(str(save_path))
        
        # Return a relative URL for Flask to serve.
        return f"/donate/images/{filename}"
    except requests.exceptions.RequestException as e:
        print(f"Error downloading image: {e}")
        return None

def generate_images(prompt: str, num_images: int = 1) -> list:
    """
    Generates a list of image URLs (relative) by downloading the specified number
    of images based on the given prompt.
    
    Returns:
        list: A list of relative URLs (e.g., ["/donate/images/image_TIMESTAMP.png", ...]).
    """
    save_dir = "data/generate_images"
    image_urls = []
    for i in range(num_images):
        print(f"Generating image {i+1} of {num_images}...")
        url = download_image(prompt, save_dir)
        if url:
            image_urls.append(url)
    return image_urls
