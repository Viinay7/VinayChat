// filepath: [App.tsx](http://_vscodecontentref_/1)
import React, { useState } from "react";
import { X, Menu } from "lucide-react";
import ChatInterface from "./components/ChatInterface";
import Sidebar from "./components/Sidebar";
import Profile from "./components/Profile";

// Load environment variables
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const MODEL = import.meta.env.VITE_GEMMA_MODEL;



// Debugging: Check API Key and Model (Remove this in production)
console.log("API Key:", API_KEY ? "Loaded Successfully" : "Missing");
console.log("Model:", MODEL);

// Define message type
interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// Function to fetch response from OpenRouter API
async function getChatResponse(userMessage: string): Promise<string> {
  const payload = {
    model: MODEL,
    messages: [{ role: "user", content: userMessage }],
    max_tokens: 200,
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();
    console.log("API Response Text:", responseText);

    if (!response.ok) {
      const errorData = JSON.parse(responseText);
      console.error("API Error Response:", errorData);
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = JSON.parse(responseText);
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching response:", error);
    return "Error fetching response. Please try again.";
  }
}

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  const handleSendMessage = async () => {
    if (input.trim()) {
      const userMessage: ChatMessage = { role: "user", content: input };
      setMessages([...messages, userMessage]);
      setInput("");

      const botResponse = await getChatResponse(input);
      setMessages((prev) => [...prev, { role: "assistant", content: botResponse }]);
    }
  };

  const handlePromptClick = async (prompt: string) => {
    setInput(prompt);
    await handleSendMessage();
  };

  const handleNewChat = () => {
    setMessages([]);
    setInput("");
  };

  const toggleProfile = () => setShowProfile(!showProfile);
  const toggleSidebar = () => setShowSidebar(!showSidebar);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-full shadow-md"
        onClick={toggleSidebar}
      >
        {showSidebar ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <Sidebar showSidebar={showSidebar} handleNewChat={handleNewChat} />

      {/* Main Chat Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${showSidebar ? "md:ml-64" : ""}`}>
        <ChatInterface 
          messages={messages} 
          input={input} 
          setInput={setInput} 
          handleSendMessage={handleSendMessage} 
          toggleProfile={toggleProfile} 
          handlePromptClick={handlePromptClick}
        />
      </div>

      {/* Profile Sidebar */}
      <Profile showProfile={showProfile} toggleProfile={toggleProfile} />
    </div>
  );
};

export default App;