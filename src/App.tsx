import React, { useState } from "react";
import ChatInterface from "./components/ChatInterface";
import Sidebar from "./components/Sidebar";
import Profile from "./components/Profile";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const App: React.FC = () => {
  const [apiKey, setApiKey] = useState(localStorage.getItem("user_api_key") || "");
  const [inputKey, setInputKey] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  // Save API Key
  const handleSaveKey = () => {
    if (inputKey.trim()) {
      localStorage.setItem("user_api_key", inputKey);
      setApiKey(inputKey);
      setInputKey("");
    }
  };

  // Remove API Key
  const handleRemoveKey = () => {
    localStorage.removeItem("user_api_key");
    setApiKey("");
  };

  // Send User Message & Get AI Response
  const handleSendMessage = async () => {
    if (input.trim()) {
      const userMessage: ChatMessage = { role: "user", content: input };
      setMessages([...messages, userMessage]);
      setInput("");

      const botResponse = await getChatResponse(input);
      setMessages((prev) => [...prev, { role: "assistant", content: botResponse }]);
    }
  };

  // Fetch AI Response
  const getChatResponse = async (userMessage: string): Promise<string> => {
    const userApiKey = localStorage.getItem("user_api_key"); // Get stored API key
    if (!userApiKey) return "⚠️ API Key is missing! Please enter your key.";

    const payload = {
      model: "mistralai/mistral-7b-instruct", // Replace with a valid model
      messages: [{ role: "user", content: userMessage }],
      max_tokens: 200,
    };

    try {
      console.log("Using API Key:", userApiKey); // Debugging
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userApiKey}`, // Ensure correct format
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices?.[0]?.message?.content || "No response from AI.";
    } catch (error) {
      console.error("API request failed:", error);
      return "⚠️ Error fetching response. Check API key and network.";
    }
  };

  // Toggle Profile Sidebar
  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  // Start a New Chat
  const handleNewChat = () => {
    setMessages([]);
    setInput("");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* API Key Input UI */}
      {!apiKey ? (
        <div className="p-4">
          <input
            type="text"
            placeholder="Enter your API key"
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
            className="border p-2"
          />
          <button onClick={handleSaveKey} className="ml-2 p-2 bg-blue-500 text-white">
            Save API Key
          </button>
        </div>
      ) : (
        <div className="p-4">
          <p>✅ API Key Set</p>
          <button onClick={handleRemoveKey} className="ml-2 p-2 bg-red-500 text-white">
            Remove API Key
          </button>
        </div>
      )}

      {/* Sidebar */}
      <Sidebar showSidebar={showSidebar} handleNewChat={handleNewChat} />

      {/* Chat Interface */}
      <div className={`flex-1 flex flex-col ${showSidebar ? "md:ml-64" : ""}`}>
        <ChatInterface
          messages={messages}
          input={input}
          setInput={setInput}
          handleSendMessage={handleSendMessage}
        />
      </div>

      {/* Profile Sidebar */}
      <Profile showProfile={showProfile} toggleProfile={toggleProfile} />
    </div>
  );
};

export default App;