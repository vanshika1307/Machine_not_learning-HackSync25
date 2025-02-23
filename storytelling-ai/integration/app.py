import os
import sys

# Add the project root (one level up from integration/) to sys.path.
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.join(current_dir, "..")
if parent_dir not in sys.path:
    sys.path.append(parent_dir)

from flask import Flask, request, jsonify, send_from_directory, render_template_string
from modules.image_generator import generate_images

app = Flask(__name__)

@app.route("/", methods=["GET"])
def index():
    return render_template_string("<h1>Flask API is running</h1><p>Use the /generate_images endpoint to generate images.</p>")

# Serve generated images from the "data/generate_images" folder via /donate/images/<filename>
@app.route("/donate/images/<path:filename>")
def serve_image(filename):
    images_dir = os.path.join(os.getcwd(), "data", "generate_images")
    print("Serving image from:", images_dir)
    return send_from_directory(images_dir, filename)

# Endpoint for generating images (POST only).
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

if __name__ == "__main__":
    app.run(debug=True, port=5001)
