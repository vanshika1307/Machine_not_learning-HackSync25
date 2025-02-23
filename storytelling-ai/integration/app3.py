from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import uuid
from .pipeline import generate_story  # Ensure this module exists

app = Flask(__name__)
CORS(app, resources={r"/generate_story": {"origins": "http://localhost:5173"}})  # Allow only frontend

@app.route("/generate_story", methods=["POST"])
def generate_story_endpoint():
    data = request.get_json()
    prompt = data.get("prompt", "").strip()
    genre = data.get("genre", "").strip()
    word_count = data.get("wordCount", 500)

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
