from flask import Flask, request, jsonify
from flask_cors import CORS
from modules.feedback_module import feedback  # adjust import if your structure differs

app = Flask(__name__)
CORS(app)

@app.route('/feedback', methods=['POST'])
def get_feedback():
    data = request.get_json()
    text = data.get("text", "")
    result = feedback(text)
    return jsonify(result)

if __name__ == "__main__":
    # Run on port 5002
    app.run(port=5002, debug=True)
