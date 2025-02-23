# storytelling-ai/integration/app.py
import os
import sys

# Add the project root (one level up from integration/) to sys.path.
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.join(current_dir, "..")
if parent_dir not in sys.path:
    sys.path.append(parent_dir)

from flask import Flask, render_template, request, jsonify, send_from_directory
from modules.image_generator import generate_images
from pathlib import Path
import os

app = Flask(__name__)

# Route to serve static images from the "data/generate_images" folder.
@app.route("/images/<path:filename>")
def serve_image(filename):
    return send_from_directory("data/generate_images", filename)

# Endpoint for generating images.
@app.route("/generate_images", methods=["POST"])
def generate_images_endpoint():
    data = request.get_json()
    prompt = data.get("prompt", "").strip()
    try:
        num_images = int(data.get("num_images", 1))
    except ValueError:
        num_images = 1

    if not prompt:
        return jsonify({"error": "Prompt is required"}), 400

    image_urls = generate_images(prompt, num_images)
    return jsonify({"image_paths": image_urls})

# Optional: If you have an index.html template for testing.
@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)
