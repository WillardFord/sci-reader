from flask import Flask, request, jsonify
from flask_cors import CORS

from transformers import pipeline

app = Flask(__name__)
CORS(app, resources={r"/query": {"origins": "chrome-extension://aagpdjcbfobndiiclokdmpopffhhgdmn"}})

print("Loading Model")
myTokenPleaseDontSteal = "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"
pipe = pipeline(
                "text-generation", 
                model = "NousResearch/Hermes-2-Pro-Mistral-7B", #"raynardj/roberta-pubmed",    #"mistralai/Mixtral-8x7B-v0.1", 
                token = myTokenPleaseDontSteal,
                #device = 0
                )
print("Model loaded!")



@app.route('/query', methods=['POST'])
def receive_text():
    data = request.get_json()
    text = data.get('text', '')
    # Process the text here
    response = getResponse(text)
    print(f"Received text: {text}")
    print(f"Processed text: {response}")
    return jsonify({"status": "success", "text": response})

def getResponse(text):
    print(f"Received {text}")
    prompt = f"""
        - You are a kind professor. 
        - Summarize the key points of the following message to a student interested in learning about the field. 
        - Include definitions of terms that may be unfamiliar to a student in short bullet point form.
        - Keep responses short
        - Give techincal descriptions that a scientist would need to know
        """
    messages = [
        {  
            "role": "system",
            "content": prompt,
        },
        {
            "role": "user", 
            "content": text},
    ]
    output = pipe(messages, max_new_tokens=500)[0]['generated_text']
    print(output)
    return output[-1]

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3500)
