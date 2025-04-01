import React, { useState } from "react";
import { X, Settings, HelpCircle, LogOut, Text, MessageSquare } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "../context/LanguageContext";
import { getTranslation } from "../utils/translations";

interface ProfileProps {
  toggleProfile: () => void;
}

const Profile: React.FC<ProfileProps> = ({ toggleProfile }) => {
  const [showSettings, setShowSettings] = useState(false);
  const { language } = useLanguage();

  const user = {
    name: "Profile",
    email: "user@VChat.com",
    avatar:
      "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?t=st=1741604349~exp=1741607949~hmac=cd8b436839508d68a0a73b972f7e4cf9a1c86566f2e2f9cc7334609da16825eb&w=900",
    plan: "Free Plan",
    joinDate: "Joined January 2025",
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      console.log("User logged out");
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-black text-gray-900 dark:text-white overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-zinc-800 flex justify-between items-center">
        <h2 className="text-lg font-medium">
          {showSettings 
            ? getTranslation("settings", language) 
            : getTranslation("profile", language)
          }
        </h2>
        <button
          onClick={showSettings ? () => setShowSettings(false) : toggleProfile}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors"
          aria-label={showSettings ? "Close Settings" : "Close Profile"}
        >
          <X size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {showSettings ? (
          <div className="space-y-3 sm:space-y-4">
            {/* Theme */}
            <ThemeToggle />

            {/* Language - LanguageSelector */}
            <LanguageSelector />

            {/* Font Size and UI */}
            <button
              className="w-full flex items-center p-3 rounded-lg bg-gray-50 dark:bg-zinc-900 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Change Font Size and UI"
            >
              <Text size={18} className="mr-3" />
              <span>{getTranslation("fontSizeAndUI", language)}</span>
            </button>

            {/* Feedback and Support */}
            <button
              className="w-full flex items-center p-3 rounded-lg bg-gray-50 dark:bg-zinc-900 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Feedback and Support"
            >
              <MessageSquare size={18} className="mr-3" />
              <span>{getTranslation("feedbackAndSupport", language)}</span>
            </button>
          </div>
        ) : (
          <div className="text-center mb-6 sm:mb-8">
            <img
              src={user.avatar}
              alt="Profile"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto mb-3 sm:mb-4 object-cover"
            />
            <h3 className="text-xl font-medium">{user.name}</h3>
            <p className="text-gray-500 dark:text-gray-300">{user.email}</p>
            <div className="mt-2 inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs px-2 py-1 rounded-full">
              {user.plan}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{user.joinDate}</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 sm:p-4 border-t border-gray-200 dark:border-zinc-800 text-center">
        {showSettings ? (
          <button
            onClick={() => setShowSettings(false)}
            className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-zinc-900 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Back to Profile"
          >
            <div className="flex items-center">
              <X size={18} className="mr-3" />
              <span>{getTranslation("backToProfile", language)}</span>
            </div>
          </button>
        ) : (
          <div className="space-y-2">
            <button
              onClick={() => setShowSettings(true)}
              className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-zinc-900 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Open Settings"
            >
              <div className="flex items-center">
                <Settings size={18} className="mr-3" />
                <span>{getTranslation("settings", language)}</span>
              </div>
            </button>
            <button
              className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-zinc-900 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Help and Support"
            >
              <div className="flex items-center">
                <HelpCircle size={18} className="mr-3" />
                <span>{getTranslation("helpAndSupport", language)}</span>
              </div>
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-zinc-900 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors text-red-600 dark:text-red-400"
              aria-label="Log Out"
            >
              <div className="flex items-center">
                <LogOut size={18} className="mr-3" />
                <span>{getTranslation("logOut", language)}</span>
              </div>
            </button>
          </div>
        )}
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 sm:mt-4">VChat v1.0.0</p>
      </div>
    </div>
  );
};

export default Profile;