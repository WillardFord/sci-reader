from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/your-endpoint', methods=['POST'])
def receive_text():
    data = request.get_json()
    text = data.get('text', '')
    # Process the text here
    print(f"Received text: {text}")
    return jsonify({"status": "success", "text": text})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4500)
