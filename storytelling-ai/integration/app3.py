import os
import sys

# Ensure the project root is in sys.path
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.join(current_dir, "..")
if parent_dir not in sys.path:
    sys.path.append(parent_dir)

from flask import Flask, request, jsonify
from flask_cors import CORS
import uuid
from integration.pipeline import generate_story  # Import from integration folder

app = Flask(__name__)
# Allow only the frontend running on localhost:5173 (adjust as needed)
CORS(app, resources={r"/generate_story": {"origins": "http://localhost:5173"}})

@app.route("/generate_story", methods=["POST"])
def generate_story_endpoint():
    data = request.get_json()
    prompt = data.get("prompt", "").strip()
    genre = data.get("genre", "").strip()
    word_count = data.get("wordCount", 500)  # not used in our pipeline but can be extended

    if not prompt or not genre:
        return jsonify({"error": "Prompt and genre are required."}), 400

    story_id = str(uuid.uuid4())
    try:
        result = generate_story(prompt, story_id)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5003)
