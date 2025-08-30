from datetime import datetime
import re
import random

# Chatbot rules dictionary with detailed responses
chatbot_rules = {
    # Greetings and basic interactions
    r"(hi|hello|hey|greetings|good morning|good afternoon|good evening)": [
        "Hello! 👋 How can I assist you today?",
        "Hi there! What can I help you with?",
        "Greetings! I'm here to help. What would you like to know?",
        "Hello! Ready to assist you with your questions."
    ],
    
    r"how are you|how's it going|how are things": [
        "I'm functioning perfectly, thank you for asking! How can I help you today?",
        "I'm doing great! Always ready to assist. What's on your mind?",
        "I'm operating at full capacity! How can I be of service?",
        "All systems are go! What can I help you with today?"
    ],
    
    r"what is your name|who are you": [
        "I'm an AI assistant designed to help answer your questions and provide information!",
        "I'm your friendly AI assistant, here to help with whatever you need!",
        "You can call me your AI assistant! I'm here to make your life easier.",
        "I'm an intelligent chatbot created to assist you with various tasks and questions."
    ],
    
    # Help and support
    r"help|support|assistance|can you help": [
        "I'd be happy to help! You can ask me about various topics including:\n• General knowledge\n• Time and date information\n• Basic calculations\n• Creative writing\n• And much more!\n\nWhat would you like to know?",
        "I'm here to assist you! I can help with questions about time, dates, general information, and more. What do you need help with?",
        "Certainly! I can provide information, answer questions, and assist with various topics. What would you like to know?",
        "I'm ready to help! Feel free to ask me anything and I'll do my best to assist you."
    ],
    
    r"what can you do|capabilities|features": [
        "I can help you with:\n• Answering general knowledge questions\n• Providing time and date information\n• Basic calculations and conversions\n• Creative writing and brainstorming\n• Technical information\n• And much more!\n\nWhat would you like to try?",
        "My capabilities include:\n• Natural language conversations\n• Information retrieval\n• Time and date queries\n• Creative assistance\n• Problem solving\n\nWhat would you like me to help with?",
        "I'm equipped to handle:\n• Question answering\n• Information providing\n• Conversation\n• Task assistance\n• Creative tasks\n\nHow can I assist you today?"
    ],
    
    # Time and date
    r"time|what time is it|current time": lambda: f"The current time is {datetime.now().strftime('%I:%M:%S %p')}",
    r"date|today's date|what day is it": lambda: f"Today is {datetime.now().strftime('%A, %B %d, %Y')}",
    r"day|what day is today": lambda: f"Today is {datetime.now().strftime('%A')}",
    r"week|what week is it": lambda: f"We're in week {datetime.now().strftime('%U')} of the year",
    
    # Technical information
    r"python|programming|code": [
        "Python is a high-level, interpreted programming language known for its readability and versatility!",
        "Python is great for web development, data science, AI, and automation. It's one of the most popular programming languages!",
        "Python features dynamic typing, garbage collection, and supports multiple programming paradigms including OOP and functional programming."
    ],
    
    r"flask|web framework": [
        "Flask is a lightweight WSGI web application framework in Python. It's designed to make getting started quick and easy!",
        "Flask is known for its simplicity and flexibility. It's often called a 'microframework' but can be extended with numerous plugins.",
        "Flask provides tools for URL routing, template rendering, and more, making web development in Python straightforward."
    ],
    
    r"javascript|js": [
        "JavaScript is a programming language used for web development, both on the client-side and server-side!",
        "JavaScript enables interactive web pages and is an essential part of web applications alongside HTML and CSS.",
        "Modern JavaScript includes features like ES6+ syntax, async/await, and is used in frameworks like React, Vue, and Node.js."
    ],
    
    # Fun and entertainment
    r"joke|tell me a joke|make me laugh": [
        "Why don't scientists trust atoms? Because they make up everything!",
        "Why did the scarecrow win an award? He was outstanding in his field!",
        "What do you call a fake noodle? An impasta!",
        "Why don't eggs tell jokes? They'd crack each other up!",
        "What do you call a bear with no teeth? A gummy bear!"
    ],
    
    r"quote|inspirational quote": [
        "The only way to do great work is to love what you do. - Steve Jobs",
        "Innovation distinguishes between a leader and a follower. - Steve Jobs",
        "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
        "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill"
    ],
    
    # Weather and location
    r"weather|temperature|forecast": [
        "I don't have access to real-time weather data, but I can help you find weather information if you tell me your location!",
        "For accurate weather information, I'd recommend checking a dedicated weather service. I can help with other questions though!",
        "Weather data requires real-time APIs that I don't currently have access to. What else can I help you with?"
    ],
    
    # Math and calculations
    r"calculate|math|add|subtract|multiply|divide": [
        "I can help with basic math calculations! Please provide the numbers and operation you'd like me to perform.",
        "For calculations, please specify the numbers and the operation (+, -, *, /) you want me to compute.",
        "I'm ready to help with math! Just give me the numbers and what you want to do with them."
    ],
    
    # Thank you and goodbye
    r"thank you|thanks|appreciate it": [
        "You're very welcome! 😊 Is there anything else I can help you with?",
        "Happy to help! Let me know if you need anything else.",
        "You're welcome! I'm here whenever you need assistance.",
        "Glad I could help! Don't hesitate to ask if you have more questions."
    ],
    
    r"bye|goodbye|see you|farewell": [
        "Goodbye! 👋 Have a wonderful day!",
        "See you later! Feel free to come back anytime you need help.",
        "Farewell! It was great chatting with you.",
        "Take care! I'll be here when you need me."
    ],
    
    # Fallback responses (will be handled separately)
}

def get_chatbot_response(user_input):
    """Get response based on user input using pattern matching"""
    user_input = user_input.lower().strip()
    
    # Check for exact matches first
    for pattern, response in chatbot_rules.items():
        if re.search(pattern, user_input):
            if callable(response):
                return response()
            elif isinstance(response, list):
                return random.choice(response)
            return response
    
    # Math calculation handling
    math_pattern = r"(\d+)\s*([+\-*/])\s*(\d+)"
    math_match = re.search(math_pattern, user_input)
    if math_match:
        num1 = int(math_match.group(1))
        operator = math_match.group(2)
        num2 = int(math_match.group(3))
        
        if operator == '+':
            result = num1 + num2
        elif operator == '-':
            result = num1 - num2
        elif operator == '*':
            result = num1 * num2
        elif operator == '/':
            if num2 == 0:
                return "I can't divide by zero! Please provide a valid division."
            result = num1 / num2
        else:
            result = "Unknown operator"
        
        return f"The result of {num1} {operator} {num2} is {result}"
    
    # Fallback responses for unknown queries
    fallback_responses = [
        "That's an interesting question! I'm still learning and might not have the specific answer for that yet.",
        "I don't have information about that particular topic right now. Could you try asking something else?",
        "Hmm, I'm not programmed to answer that specific question. What else can I help you with?",
        "I'm still expanding my knowledge base! Could you ask me about something different?",
        "That's outside my current capabilities, but I'm great at answering other types of questions!",
        "I'm not sure I have the right information for that. Try asking me about general knowledge, time, or other common topics!",
        "I'm constantly learning, but I don't have an answer for that yet. What other questions do you have?"
    ]
    
    return random.choice(fallback_responses)
