# AI Chat Assistant - Internship Project

A modern, responsive web-based AI chatbot built with Flask that provides intelligent conversations, information retrieval, and various utility functions. This project demonstrates full-stack web development skills with Python backend and modern frontend technologies.

## 🚀 Features

### Core Functionality
- **Natural Language Conversations**: Engage in human-like conversations with pattern-matching AI
- **Multiple Response Types**: Greetings, technical information, entertainment, calculations, and more
- **Math Calculations**: Basic arithmetic operations (addition, subtraction, multiplication, division)
- **Time & Date Information**: Real-time clock and calendar functionality
- **Technical Knowledge**: Information about Python, Flask, JavaScript, and programming concepts

### User Interface
- **Modern Design**: Clean, dark-themed interface with gradient backgrounds
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile devices
- **Chat History**: Persistent conversation storage using localStorage
- **Thinking Animation**: Visual feedback during response generation
- **Multiple Sections**: Home chat interface, About page, and Features overview
- **Navigation**: Smooth transitions between different application sections

### Technical Capabilities
- **Pattern Matching**: Regular expression-based response system
- **Fallback Handling**: Graceful handling of unknown queries
- **Error Management**: Robust error handling and user-friendly error messages
- **Local Storage**: Chat history persistence across browser sessions
- **Real-time Updates**: Dynamic content loading without page refresh

## 🛠️ Technology Stack

### Backend
- Python 3.x
- Flask web framework
- Regular expressions for pattern matching
- JSON for API communication

### Frontend
- HTML5, CSS3 (Flexbox, Grid)
- JavaScript (ES6+)
- Font Awesome icons

## 📁 Project Structure

```
chat_bot/
├── app.py                 # Main Flask application
├── chatbot_rules.py       # Chatbot response rules and logic
├── static/
│   ├── css/
│   │   └── style.css      # Styling for the frontend
│   └── js/
│       └── script.js      # Frontend JavaScript functionality
├── templates/
│   └── index.html         # Main HTML template
└── README.md              # Project documentation
```

## 🚀 Installation & Setup

### Prerequisites
- Python 3.7 or higher
- pip package manager
- Modern web browser

### Steps

1. Clone or download the project and navigate to the `chat_bot` directory:
   ```bash
   cd chat_bot
   ```

2. Install required Python packages:
   ```bash
   pip install flask
   ```

3. Run the Flask application:
   ```bash
   python app.py
   ```

4. Open your browser and go to:
   ```
   http://localhost:5000
   ```

5. Start chatting with the AI assistant!

## 📋 API Endpoints

- `GET /`  
  Renders the main chat interface.

- `POST /get_response`  
  Accepts JSON with user message and returns chatbot response.  
  Request body: `{"message": "your message"}`  
  Response body: `{"response": "chatbot reply"}`

- `GET /get_greeting`  
  Returns a random greeting message.

## 💬 Chatbot Capabilities

- Responds to greetings and basic interactions
- Provides help and support information
- Answers questions about time, date, and week number
- Shares technical information about Python, Flask, and JavaScript
- Tells jokes and inspirational quotes
- Performs basic math calculations (+, -, *, /)
- Handles polite expressions like thank you and goodbye
- Provides fallback responses for unknown queries

## 🎨 User Interface Highlights

- Dark theme with teal accent colors
- Chat history sidebar with persistent storage
- Smooth animations and typing indicators
- Responsive design for all device sizes
- Navigation between Home, About, and Features sections

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit pull requests for improvements or bug fixes.

## 📄 License

This project is licensed under the MIT License.

---

Thank you for exploring the AI Chat Assistant project! Feel free to reach out for any questions or feedback.
