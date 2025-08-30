document.addEventListener("DOMContentLoaded", function() {
    const userInput = document.getElementById("userInput");
    const sendButton = document.getElementById("sendButton");
    const chatMessages = document.getElementById("chatMessages");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll(".section");
    const historySidebar = document.getElementById("historySidebar");
    const historyToggle = document.getElementById("historyToggle");
    const historyList = document.getElementById("historyList");
    const clearHistoryButton = document.getElementById("clearHistory");

    // Save chat history to localStorage
    function saveChatHistory(userMessage, botMessage) {
        const history = JSON.parse(localStorage.getItem("chatHistory")) || [];
        let currentChat = JSON.parse(localStorage.getItem("currentChat")) || { 
            messages: [], 
            id: Date.now().toString(),
            timestamp: new Date().toLocaleString()
        };
        
        // Add current messages to the chat
        currentChat.messages.push({ userMessage, botMessage, timestamp: new Date().toLocaleString() });
        
        // If this is the first message, create a chat title
        if (currentChat.messages.length === 1) {
            currentChat.title = userMessage.length > 30 ? userMessage.substring(0, 27) + '...' : userMessage;
        }
        
        // Update or add the chat to history
        const chatIndex = history.findIndex(chat => chat.id === currentChat.id);
        if (chatIndex !== -1) {
            history[chatIndex] = currentChat;
        } else {
            history.push(currentChat);
        }
        
        localStorage.setItem("chatHistory", JSON.stringify(history));
        localStorage.setItem("currentChat", JSON.stringify(currentChat));
        loadChatHistory(); // Refresh the history display
    }
    
    // Function to start a new chat
    function startNewChat() {
        // Save current chat to history if it has messages
        const currentChat = JSON.parse(localStorage.getItem("currentChat")) || { messages: [] };
        if (currentChat.messages.length > 0) {
            const history = JSON.parse(localStorage.getItem("chatHistory")) || [];
            
            // Ensure the current chat is in history
            if (currentChat.id) {
                const chatIndex = history.findIndex(chat => chat.id === currentChat.id);
                if (chatIndex !== -1) {
                    history[chatIndex] = currentChat;
                } else {
                    history.push(currentChat);
                }
                localStorage.setItem("chatHistory", JSON.stringify(history));
            }
        }
        
        // Create a new chat with unique ID
        localStorage.setItem("currentChat", JSON.stringify({ 
            messages: [], 
            id: Date.now().toString(),
            timestamp: new Date().toLocaleString()
        }));
        
        // Clear UI
        chatMessages.innerHTML = '';
        userInput.value = '';
        userInput.focus();
        
        // Reload history
        loadChatHistory();
    }
    
    // Load chat history from localStorage
    function loadChatHistory() {
        const history = JSON.parse(localStorage.getItem("chatHistory")) || [];
        historyList.innerHTML = ''; // Clear existing history
        
        history.forEach((chat, index) => {
            const historyItem = document.createElement("div");
            historyItem.classList.add("history-item");
            
            const previewDiv = document.createElement("div");
            previewDiv.classList.add("history-preview");
            previewDiv.textContent = chat.title || 'New Chat';
            
            const timeDiv = document.createElement("div");
            timeDiv.classList.add("history-time");
            timeDiv.textContent = chat.timestamp || '';
            
            historyItem.appendChild(previewDiv);
            historyItem.appendChild(timeDiv);
            
            historyItem.addEventListener("click", () => {
                // Load the entire chat conversation
                chatMessages.innerHTML = '';
                chat.messages.forEach(message => {
                    appendMessage(message.userMessage, true);
                    appendMessage(message.botMessage, false);
                });
                userInput.focus();
            });
            
            historyList.appendChild(historyItem);
        });
    }

    // Navigation functionality
    function showSection(sectionId) {
        // Hide all sections first
        sections.forEach(section => {
            section.classList.remove("active");
            section.style.display = "none";
        });
        
        // Remove active class from all nav links
        navLinks.forEach(link => {
            link.classList.remove("active");
        });
        
        // Show the selected section and add active class
        const selectedSection = document.getElementById(`${sectionId}-section`);
        selectedSection.classList.add("active");
        selectedSection.style.display = "block";
        
        // Add active class to the clicked nav link
        document.querySelector(`[data-section="${sectionId}"]`).classList.add("active");
        
        // If showing home section, ensure chat container is visible
        if (sectionId === 'home') {
            const chatContainer = document.querySelector('.chat-container');
            chatContainer.style.display = 'flex';
        }
    }

    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const section = this.getAttribute("data-section");
            if (section) {
                showSection(section);
            }
        });
    });

    // Footer navigation
    const footerLinks = document.querySelectorAll(".footer-section a[data-section]");
    footerLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const section = this.getAttribute("data-section");
            showSection(section);
        });
    });

    // Function to append messages to the chat
    function appendMessage(message, isUser) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", isUser ? "user-message" : "bot-message");
        
        const bubbleDiv = document.createElement("div");
        bubbleDiv.classList.add("message-bubble", isUser ? "user-bubble" : "bot-bubble");
        bubbleDiv.textContent = message;

        const timeDiv = document.createElement("div");
        timeDiv.classList.add("message-time");
        timeDiv.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        messageDiv.appendChild(bubbleDiv);
        messageDiv.appendChild(timeDiv);
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom
    }

    // Function to show thinking animation
    function showThinkingAnimation() {
        const thinkingDiv = document.createElement("div");
        thinkingDiv.classList.add("message", "bot-message");
        thinkingDiv.id = "thinking-animation";
        
        const thinkingBubble = document.createElement("div");
        thinkingBubble.classList.add("thinking");
        
        const dotsDiv = document.createElement("div");
        dotsDiv.classList.add("thinking-dots");
        
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement("div");
            dot.classList.add("thinking-dot");
            dotsDiv.appendChild(dot);
        }
        
        const textDiv = document.createElement("div");
        textDiv.classList.add("thinking-text");
        textDiv.textContent = "Thinking...";
        
        thinkingBubble.appendChild(dotsDiv);
        thinkingBubble.appendChild(textDiv);
        thinkingDiv.appendChild(thinkingBubble);
        chatMessages.appendChild(thinkingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Function to remove thinking animation
    function removeThinkingAnimation() {
        const thinkingElement = document.getElementById("thinking-animation");
        if (thinkingElement) {
            thinkingElement.remove();
        }
    }

    // Function to simulate typing delay
    function simulateTypingDelay(response) {
        return new Promise(resolve => {
            const typingTime = Math.min(response.length * 20, 2000); // Max 2 seconds
            setTimeout(() => resolve(response), typingTime);
        });
    }

    // Function to send user input to the backend
    async function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            appendMessage(message, true); // Append user message
            userInput.value = ""; // Clear input
            userInput.disabled = true;
            sendButton.disabled = true;

            // Show thinking animation
            showThinkingAnimation();

            try {
                // Send message to Flask backend
                const response = await fetch('/get_response', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ message })
                });

                const data = await response.json();
                
                // Wait for 1000 ms before showing the response
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Remove any existing thinking animation
                removeThinkingAnimation();
                
                appendMessage(data.response, false); // Append bot response
                
                // Save the complete chat (user message + bot response) to history
                saveChatHistory(message, data.response);
                
            } catch (error) {
                removeThinkingAnimation();
                appendMessage("Sorry, I encountered an error. Please try again.", false);
                console.error("Error:", error);
            } finally {
                userInput.disabled = false;
                sendButton.disabled = false;
                userInput.focus();
            }
        }
    }

    // Event listeners
    sendButton.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
    
    // New chat button event listener
    const newChatButton = document.getElementById("newChatButton");
    newChatButton.addEventListener("click", startNewChat);

    // Auto-focus input
    userInput.focus();

    // Fetch initial greeting
    fetch('/get_greeting')
        .then(response => response.json())
        .then(data => {
            // Show thinking animation for initial greeting
            showThinkingAnimation();
            setTimeout(() => {
                removeThinkingAnimation();
                appendMessage(data.greeting, false);
            }, 1500); // 1.5 second delay for initial greeting
        })
        .catch(error => {
            console.error("Error fetching greeting:", error);
            appendMessage("Hello! How can I help you today?", false);
        });

    // Load chat history on page load
    loadChatHistory();

    // Show/hide history sidebar with slide animation
    historyToggle.addEventListener("click", () => {
        historySidebar.classList.toggle("active");
    });

    // Prevent history sidebar from closing when clicking inside the chat input
    userInput.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent click event from bubbling up
    });

    // Clear chat history
    clearHistoryButton.addEventListener("click", () => {
        localStorage.removeItem("chatHistory");
        historyList.innerHTML = ""; // Clear the displayed history
    });

    // Close history sidebar when clicking outside
    document.addEventListener("click", (e) => {
        if (historySidebar.classList.contains("active") && 
            !historySidebar.contains(e.target) && 
            !historyToggle.contains(e.target)) {
            historySidebar.classList.remove("active");
        }
    });
});
