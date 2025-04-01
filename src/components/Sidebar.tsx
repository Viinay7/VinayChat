import React from 'react';
import { MessageSquare, Home, Bookmark, Plus, User, BookOpen } from 'lucide-react';
import { useLanguage } from "../context/LanguageContext";
import { getTranslation } from "../utils/translations";

interface SidebarProps {
  showSidebar: boolean;
  handleNewChat: () => void;
  toggleProfile: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ showSidebar, handleNewChat, toggleProfile }) => {
  const { language } = useLanguage();
  
  const samplePrompts = [
    "Explain quantum computing in simple terms",
    "Write a poem about artificial intelligence",
    "How do I make a chocolate cake?",
    "What are the best practices for React development?"
  ];

  // Function to handle manual button click
  const openManual = () => {
    // You can implement manual opening logic here
    // For example, open a modal or navigate to documentation
    console.log("Opening manual/documentation");
    // For now, we'll just open a sample documentation link
    window.open("https://docs.openrouter.ai/", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Logo */}
      <div className="p-4 border-b border-gray-200 dark:border-zinc-800">
        <div 
          className="flex items-center space-x-2 cursor-pointer" 
          onClick={handleNewChat}
        >
          <MessageSquare className="h-7 w-7 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400" />
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">VChat</h1>
        </div>
      </div>

      {/* Upper Left - New Chat & Prompts */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4">
        <button 
          onClick={handleNewChat}
          className="w-full flex items-center space-x-2 p-3 mb-4 rounded-lg border border-gray-300 dark:border-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors dark:text-white"
          aria-label="Start a new chat"
        >
          <Plus size={18} />
          <span>{getTranslation("newChat", language)}</span>
        </button>

        <div className="mb-6">
          <h2 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            {getTranslation("suggestedPrompts", language)}
          </h2>
          <div className="space-y-2">
            {samplePrompts.map((prompt, index) => (
              <button 
                key={index}
                className="w-full text-left p-2 rounded-lg text-xs sm:text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors"
                aria-label={`Use prompt: ${prompt}`}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lower Left - Navigation */}
      <div className="p-3 sm:p-4 border-t border-gray-200 dark:border-zinc-800">
        <nav className="space-y-1 sm:space-y-2">
          <button 
            className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors dark:text-white"
            onClick={handleNewChat}
            aria-label="Go to Home"
          >
            <Home size={18} />
            <span>{getTranslation("home", language)}</span>
          </button>
          
          {/* Added Manual Button */}
          <button 
            className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors dark:text-white"
            onClick={openManual}
            aria-label="Open User Manual"
          >
            <BookOpen size={18} />
            <span>Manual</span>
          </button>
          
          <button 
            className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors dark:text-white"
            aria-label="View Saved Items"
          >
            <Bookmark size={18} />
            <span>{getTranslation("saved", language)}</span>
          </button>
          
          <button 
            className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors dark:text-white"
            onClick={toggleProfile}
            aria-label="Open Profile"
          >
            <User size={18} />
            <span>{getTranslation("profile", language)}</span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;