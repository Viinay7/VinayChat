import React, { useState } from "react";
import { User, Send, Clipboard } from "lucide-react";
import ReactMarkdown from "react-markdown";

// Define Chat Message Type
interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// Define Props for Chat Interface
interface ChatInterfaceProps {
  messages: ChatMessage[];
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => Promise<void>;
  toggleProfile: () => void;
}

// Custom MessageSquare icon component
const MessageSquareIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  input,
  setInput,
  handleSendMessage,
  toggleProfile,
}) => {
  const [copySuccess, setCopySuccess] = useState("");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess("Copied to clipboard!");
      setTimeout(() => setCopySuccess(""), 2000); // Clear message after 2 sec
    });
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <h2 className="text-lg font-medium">Chat</h2>
        <button
          onClick={toggleProfile}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <User size={20} />
        </button>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <MessageSquareIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                Start a new conversation
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Type a message below to begin chatting with VChat
              </p>
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className="relative max-w-[80%] break-words">
                <div
                  className={`rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                  style={{ paddingRight: message.role === "assistant" ? "2rem" : "1rem" }}
                >
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                  {message.role === "assistant" && (
                    <button
                      onClick={() => copyToClipboard(message.content)}
                      className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-300 transition-colors"
                    >
                      <Clipboard size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Copy Success Notification */}
      {copySuccess && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg text-sm">
          {copySuccess}
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2 bg-white rounded-lg border border-gray-300 p-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && input.trim()) handleSendMessage();
            }}
            placeholder="Type your message..."
            className="flex-1 outline-none p-2"
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim()}
            className={`p-2 rounded-full ${
              input.trim() ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-400 text-gray-300"
            } transition-colors`}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatInterface;
