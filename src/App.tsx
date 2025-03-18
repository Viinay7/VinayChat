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
  const [showSidebar, setShowSidebar] = useState(false); // Sidebar hidden by default on mobile

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
    const userApiKey = localStorage.getItem("user_api_key");
    if (!userApiKey) return "⚠️ API Key is missing! Please enter your key.";

    const payload = {
      model: "mistralai/mistral-7b-instruct",
      messages: [{ role: "user", content: userMessage }],
      max_tokens: 200,
    };

    try {
      console.log("Using API Key:", userApiKey);
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userApiKey}`,
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

  // Toggle Sidebar (for mobile view)
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  // Start a New Chat
  const handleNewChat = () => {
    setMessages([]);
    setInput("");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Hidden on small screens, visible on large screens */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white border-r transform ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } transition-transform md:relative md:translate-x-0 md:w-64`}
      >
        <Sidebar showSidebar={showSidebar} handleNewChat={handleNewChat} />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col w-full h-screen overflow-hidden">
        {/* API Key Input Section - Centered & Responsive */}
        {!apiKey ? (
          <div className="p-4 w-full flex flex-col items-center">
            <input
              type="text"
              placeholder="Enter your API key"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              className="border p-2 w-full max-w-xs"
            />
            <button
              onClick={handleSaveKey}
              className="mt-2 p-2 bg-blue-500 text-white w-full max-w-xs"
            >
              Save API Key
            </button>
          </div>
        ) : (
          <div className="p-4 flex items-center justify-between w-full">
            <p>✅ API Key Set</p>
            <button onClick={handleRemoveKey} className="p-2 bg-red-500 text-white">
              Remove API Key
            </button>
          </div>
        )}

        {/* Chat Interface - Full Width for Mobile */}
        <div className="flex-1 w-full">
          <ChatInterface
            messages={messages}
            input={input}
            setInput={setInput}
            handleSendMessage={handleSendMessage}
          />
        </div>
      </div>

      {/* Profile Sidebar - Positioned Right & Responsive */}
      {showProfile && (
        <div className="fixed inset-y-0 right-0 w-64 bg-white border-l shadow-md">
          <Profile showProfile={showProfile} toggleProfile={toggleProfile} />
        </div>
      )}

      {/* Floating Buttons for Mobile View */}
      <div className="fixed bottom-4 left-4 md:hidden">
        <button
          onClick={toggleSidebar}
          className="p-3 bg-gray-800 text-white rounded-full shadow-lg"
        >
          ☰
        </button>
      </div>

      <div className="fixed bottom-4 right-4 md:hidden">
        <button
          onClick={toggleProfile}
          className="p-3 bg-blue-500 text-white rounded-full shadow-lg"
        >
          👤
        </button>
      </div>
    </div>
  );
};

export default App;
