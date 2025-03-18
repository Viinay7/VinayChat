import React, { useState } from "react";

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = import.meta.env.VITE_GEMMA_MODEL;

// Define message type
interface ChatMessage {
  role: string;
  content: { type: string; text?: string; image_url?: { url: string } }[];
}

interface APIResponse {
  choices: { message: { role: string; content: string } }[];
}

// Function to fetch response from OpenRouter API
async function getChatResponse(userMessage: string, imageUrl?: string): Promise<string> {
  if (!API_KEY) {
    console.error("API Key is missing. Please set NEXT_PUBLIC_OPENROUTER_API_KEY in your environment variables.");
    return "Error: API Key is missing.";
  }

  if (!MODEL) {
    console.error("Model name is missing. Please set NEXT_PUBLIC_GEMMA_MODEL in your environment variables.");
    return "Error: Model name is missing.";
  }

  const messageContent = [{ type: "text", text: userMessage }];
  
  if (imageUrl) {
    messageContent.push({ type: "image_url", image_url: { url: imageUrl } });
  }

  const payload = {
    model: MODEL,
    messages: [{ role: "user", content: messageContent }],
    max_tokens: 200,
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
        "HTTP-Referer": SITE_URL,
        "X-Title": SITE_NAME,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      return `API error: ${response.statusText}`;
    }

    const data: APIResponse = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching response:", error);
    return "Error fetching response. Please try again.";
  }
}

// React Component for VChat
const VChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");

  const handleSendMessage = async () => {
    if (input.trim()) {
      const userMessage: ChatMessage = { role: "user", content: [{ type: "text", text: input }] };
      setMessages([...messages, userMessage]);
      setInput("");

      // Fetch response from OpenRouter API
      const botResponse = await getChatResponse(input);
      const botMessage: ChatMessage = { role: "assistant", content: [{ type: "text", text: botResponse }] };
      setMessages((prev) => [...prev, botMessage]);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            {msg.content.map((content, idx) => (
              <p key={idx}>{content.text}</p>
            ))}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        className="chat-input"
      />
      <button onClick={handleSendMessage} className="send-button">
        Send
      </button>
    </div>
  );
};

export default VChat;
