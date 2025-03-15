import React from 'react';
import { MessageSquare, Home, Bookmark, Plus } from 'lucide-react';

interface SidebarProps {
  showSidebar: boolean;
  handleNewChat: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ showSidebar, handleNewChat }) => {
  const samplePrompts = [
    "Explain quantum computing in simple terms",
    "Write a poem about artificial intelligence",
    "How do I make a chocolate cake?",
    "What are the best practices for React development?"
  ];

  return (
    <div className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform ${showSidebar ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col h-full`}>
      {/* Logo */}
      <div className="p-4 border-b border-gray-200">
        <div 
          className="flex items-center space-x-2 cursor-pointer" 
          onClick={handleNewChat}
        >
          <MessageSquare className="h-8 w-8 text-blue-600" />
          <h1 className="text-xl font-bold text-gray-800">VChat</h1>
        </div>
      </div>

      {/* Upper Left - New Chat & Prompts */}
      <div className="flex-1 overflow-y-auto p-4">
        <button 
          onClick={handleNewChat}
          className="w-full flex items-center space-x-2 p-3 mb-4 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
        >
          <Plus size={18} />
          <span>New Chat</span>
        </button>

        <div className="mb-6">
          <h2 className="text-sm font-medium text-gray-500 mb-2">SUGGESTED PROMPTS</h2>
          <div className="space-y-2">
            {samplePrompts.map((prompt, index) => (
              <button 
                key={index}
                className="w-full text-left p-2 rounded-lg text-sm hover:bg-gray-100 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lower Left - Navigation */}
      <div className="p-4 border-t border-gray-200">
        <nav className="space-y-2">
          <button 
            className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={handleNewChat}
          >
            <Home size={18} />
            <span>Home</span>
          </button>
          <button className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Bookmark size={18} />
            <span>Saved</span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;