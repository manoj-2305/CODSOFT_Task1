from flask import Flask, render_template, request, jsonify
from chatbot_rules import get_chatbot_response

app = Flask(__name__)

@app.route('/')
def home():
    """Render the main chat interface"""
    return render_template('index.html')

@app.route('/get_response', methods=['POST'])
def get_response():
    """API endpoint to get chatbot response"""
    try:
        user_input = request.json.get('message', '').strip()
        
        if not user_input:
            return jsonify({'response': 'Please provide a message!'})
        
        response = get_chatbot_response(user_input)
        return jsonify({'response': response})
        
    except Exception as e:
        return jsonify({'response': 'Sorry, I encountered an error. Please try again.'})

@app.route('/get_greeting', methods=['GET'])
def get_greeting():
    """API endpoint to get initial greeting"""
    from datetime import datetime
    greetings = [
        "Hello! 👋 How can I help you today?",
        "Hi there! What can I assist you with?",
        "Welcome! I'm here to help. What would you like to know?",
        "Greetings! How may I be of service today?"
    ]
    return jsonify({'greeting': greetings[datetime.now().second % len(greetings)]})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
