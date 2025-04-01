import React from "react";
import { Send, User, Plus } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { getTranslation } from "../utils/translations";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatInterfaceProps {
  messages: ChatMessage[];
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => Promise<void>;
  toggleProfile: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  input,
  setInput,
  handleSendMessage,
  toggleProfile,
}) => {
  const { language } = useLanguage();

  return (
    <>
      {/* Header */}
      <header className="bg-white dark:bg-black shadow-sm dark:shadow-zinc-800/30 p-4 flex justify-between items-center">
        <h2 className="text-lg font-medium dark:text-white">
          {getTranslation("chat", language)}
        </h2>
        <button
          onClick={toggleProfile}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors"
        >
          <User size={20} className="dark:text-white" />
        </button>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-black">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full opacity-50">
            <p className="text-center text-gray-500 dark:text-gray-400">
              
            </p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`rounded-lg p-3 max-w-[85%] md:max-w-[75%] ${
                  message.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-zinc-900 text-gray-800 dark:text-white"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input Area */}
      <div className="p-3 sm:p-4 border-t border-gray-200 dark:border-zinc-800 bg-white dark:bg-black">
        <div className="flex items-center space-x-2 bg-gray-50 dark:bg-zinc-900 rounded-lg border border-gray-300 dark:border-zinc-800 p-1 sm:p-2">
          <button
            className="p-1 sm:p-2 rounded-full bg-gray-200 dark:bg-zinc-800 hover:bg-gray-300 dark:hover:bg-zinc-700 transition-colors"
            aria-label="Upload Image"
          >
            <Plus size={18} className="dark:text-white" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && input.trim()) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder={getTranslation("askMeAnything", language)}
            className="flex-1 outline-none p-2 bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 dark:focus:ring-blue-500 dark:focus:border-blue-500 text-sm sm:text-base"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!input.trim()}
            className={`p-1 sm:p-2 rounded-full ${
              input.trim()
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-400 text-gray-300"
            } transition-colors`}
            aria-label={getTranslation("send", language)}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatInterface;