from flask import Flask, request, jsonify
from flask_cors import CORS

from transformers import pipeline

app = Flask(__name__)
CORS(app, resources={r"/query": {"origins": "chrome-extension://aagpdjcbfobndiiclokdmpopffhhgdmn"}})

print("Loading Mixtral")
myTokenPleaseDontSteal = "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"
pipe = pipeline("text-generation", model = "mistralai/Mixtral-8x22B-Instruct-v0.1", token = myTokenPleaseDontSteal)
print("Model loaded!")

messages = [
        {"role":"user", "content":"Who are you?"},
    ]
pipe(messages)

@app.route('/query', methods=['POST'])
def receive_text():
    text = data.get('text', '')
    # Process the text here
    response = getResponse(text)
    print(f"Received text: {text}")
    print(f"Processed text: {response}")
    return jsonify({"status": "success", "text": response})

def getResponse(text):
    
    return f"Wow, this {text} is so prompted."

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4500)
