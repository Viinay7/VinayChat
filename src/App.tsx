import React, { useState, useEffect } from "react";
import ChatInterface from "./components/ChatInterface";
import Sidebar from "./components/Sidebar";
import Profile from "./components/Profile";
import { Menu, X } from "lucide-react";
import { useLanguage } from "./context/LanguageContext";
import { getTranslation } from "./utils/translations";

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
  const [showSidebar, setShowSidebar] = useState(false);
  const { language } = useLanguage();

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showSidebar && window.innerWidth < 768) {
        const sidebarElement = document.getElementById('sidebar');
        const menuButton = document.getElementById('menu-button');
        
        if (sidebarElement && 
            !sidebarElement.contains(event.target as Node) &&
            menuButton && 
            !menuButton.contains(event.target as Node)) {
          setShowSidebar(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSidebar]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowSidebar(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call initially
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSaveKey = () => {
    if (inputKey.trim()) {
      localStorage.setItem("user_api_key", inputKey);
      setApiKey(inputKey);
      setInputKey("");
    }
  };

  const handleRemoveKey = () => {
    localStorage.removeItem("user_api_key");
    setApiKey("");
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const botResponse = await getChatResponse(input);
    setMessages((prev) => [...prev, { role: "assistant", content: botResponse }]);
  };

  const getChatResponse = async (userMessage: string): Promise<string> => {
    if (!apiKey) return "⚠️ API Key is missing! Please enter your key.";

    const payload = {
      model: "mistralai/mistral-7b-instruct",
      messages: [{ role: "user", content: userMessage }],
      max_tokens: 200,
    };

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`API Error: ${response.status} ${response.statusText}`);

      const data = await response.json();
      return data.choices?.[0]?.message?.content || "No response from AI.";
    } catch (error) {
      console.error("API request failed:", error);
      return "⚠️ Error fetching response. Check API key and network.";
    }
  };

  const toggleProfile = () => {
    setShowProfile((prev) => !prev);
    // Close sidebar on mobile when profile is opened
    if (window.innerWidth < 768) {
      setShowSidebar(false);
    }
  };
  
  const toggleSidebar = () => setShowSidebar((prev) => !prev);
  const handleNewChat = () => setMessages([]);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white overflow-hidden">
      {/* Mobile Menu Button - Fixed position for better mobile experience */}
      <button
        id="menu-button"
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-zinc-900 rounded-full shadow-md dark:shadow-zinc-800/30"
        aria-label="Toggle Menu"
      >
        {showSidebar ? <X size={20} className="dark:text-white" /> : <Menu size={20} className="dark:text-white" />}
      </button>

      {/* Overlay for mobile - Only shows when sidebar is open */}
      {showSidebar && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Sidebar with better mobile handling */}
      <div
        id="sidebar"
        className={`fixed md:static inset-y-0 left-0 z-40 w-72 md:w-80 lg:w-64 bg-white dark:bg-black border-r dark:border-zinc-800 transform ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } transition-transform md:translate-x-0 overflow-hidden`}
      >
        <Sidebar showSidebar={showSidebar} handleNewChat={handleNewChat} toggleProfile={toggleProfile} />
      </div>

      {/* Main Content Area - Key changes here for responsive layout with profile */}
      <div className={`flex-1 flex flex-col h-full w-full md:w-auto relative transition-all duration-300 ${
        showProfile ? 'md:mr-80 lg:mr-72' : ''
      }`}>
        {/* API Key Section - MODIFIED: smaller & positioned in top-left with "get API keys" link */}
        {!apiKey ? (
          <div className="absolute top-0 left-0 mt-16 md:mt-4 ml-4 md:ml-4 z-10 p-3 bg-white dark:bg-black border border-gray-200 dark:border-zinc-800 rounded-lg shadow-md dark:shadow-zinc-800/30 w-64">
            <h3 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              {getTranslation("enterApiKey", language)}
            </h3>
            <input
              type="text"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              className="border dark:border-zinc-800 p-2 text-sm w-full rounded-md bg-white dark:bg-black text-gray-900 dark:text-white mb-2"
            />
            <button 
              onClick={handleSaveKey} 
              className="p-1.5 text-sm bg-blue-500 hover:bg-blue-600 text-white w-full rounded-md transition-colors mb-2"
            >
              {getTranslation("saveApiKey", language)}
            </button>
            {/* Added link to get API keys */}
            <a 
              href="https://openrouter.ai/models" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block text-xs text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 text-center transition-colors"
            >
              Get Trending LLM's API keys here for free→
            </a>
          </div>
        ) : (
          <div className="absolute top-0 left-0 mt-16 md:mt-4 ml-4 md:ml-4 z-10 p-3 bg-white dark:bg-black border border-gray-200 dark:border-zinc-800 rounded-lg shadow-md dark:shadow-zinc-800/30">
            <div className="flex items-center">
              <span className="text-sm text-gray-700 dark:text-gray-300 mr-2">
                {getTranslation("apiKeySet", language)}
              </span>
              <button 
                onClick={handleRemoveKey} 
                className="p-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
              >
                {getTranslation("removeApiKey", language)}
              </button>
            </div>
          </div>
        )}

        {/* Chat Interface */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <ChatInterface 
            messages={messages} 
            input={input} 
            setInput={setInput} 
            handleSendMessage={handleSendMessage} 
            toggleProfile={toggleProfile} 
          />
        </div>
      </div>

      {/* Profile Panel - Fixed on mobile, absolute on desktop */}
      {showProfile && (
        <>
          {/* Dark overlay for mobile */}
          <div 
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={toggleProfile}
          />
          
          {/* Profile panel - Changed positioning for desktop */}
          <div className="fixed md:absolute inset-y-0 right-0 w-80 sm:w-96 md:w-80 lg:w-72 bg-white dark:bg-black border-l dark:border-zinc-800 shadow-lg dark:shadow-zinc-800/30 z-40 overflow-hidden">
            <Profile toggleProfile={toggleProfile} />
          </div>
        </>
      )}
    </div>
  );
};

export default App;