from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

@app.route('/your-endpoint', methods=['POST'])
def receive_text():
    data = request.get_json()
    text = data.get('text', '')
    # Process the text here
    response = getResponse(text)
    print(f"Received text: {text}")
    return jsonify({"status": "success", "text": processed_text})

def getResponse(text):
    return f"Processed: {text}"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4500)
