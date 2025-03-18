import React, { useState } from "react";

// Environment variables for API key and model
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = import.meta.env.VITE_GEMMA_MODEL;
const SITE_URL = import.meta.env.VITE_SITE_URL;
const SITE_NAME = import.meta.env.VITE_SITE_NAME;

// Define message type
interface ChatMessage {
  role: "user" | "assistant";
  content: { type: "text" | "image_url"; text?: string; image_url?: { url: string } }[];
}

// Function to fetch AI response
async function getChatResponse(userMessage: string, imageUrl?: string): Promise<string> {
  if (!API_KEY) {
    return "⚠️ API Key is missing. Please check your environment variables.";
  }
  if (!MODEL) {
    return "⚠️ Model name is missing. Please configure the model in your environment.";
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
      return `⚠️ API error: ${response.statusText}`;
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "⚠️ No response from AI.";
  } catch (error) {
    console.error("API Request Failed:", error);
    return "⚠️ Error fetching response. Please try again.";
  }
}

// VChat Component
const VChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSendMessage = async () => {
    if (!input.trim() && !imageUrl.trim()) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: [{ type: "text", text: input }],
    };

    if (imageUrl.trim()) {
      userMessage.content.push({ type: "image_url", image_url: { url: imageUrl } });
    }

    setMessages([...messages, userMessage]);
    setInput("");
    setImageUrl("");

    // Get response from AI
    const botResponse = await getChatResponse(input, imageUrl);
    const botMessage: ChatMessage = {
      role: "assistant",
      content: [{ type: "text", text: botResponse }],
    };

    setMessages((prev) => [...prev, botMessage]);
  };

  return (
    <div className="chat-container flex flex-col h-screen p-4 bg-gray-100">
      {/* Chat Messages */}
      <div className="chat-messages flex-1 overflow-auto p-4 bg-white rounded-lg shadow">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role === "user" ? "text-right" : "text-left"}`}>
            {msg.content.map((content, idx) => (
              <div key={idx} className="my-2">
                {content.type === "text" ? (
                  <p className={`p-2 rounded-lg inline-block ${msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                    {content.text}
                  </p>
                ) : (
                  <img src={content.image_url?.url} alt="User upload" className="w-40 rounded-lg" />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="chat-input-container flex mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-lg"
        />
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Paste image URL (optional)"
          className="ml-2 p-2 border rounded-lg"
        />
        <button onClick={handleSendMessage} className="ml-2 p-2 bg-blue-500 text-white rounded-lg">
          Send
        </button>
      </div>
    </div>
  );
};

export default VChat;
