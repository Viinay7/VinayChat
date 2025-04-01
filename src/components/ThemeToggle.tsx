import React from "react";
import { Sun, Moon } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { getTranslation } from "../utils/translations";

const ThemeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(
    document.documentElement.classList.contains("dark")
  );
  const { language } = useLanguage();

  const toggleTheme = () => {
    const newIsDarkMode = !isDarkMode;
    setIsDarkMode(newIsDarkMode);
    
    // Update the class on the document element
    document.documentElement.classList.toggle("dark", newIsDarkMode);
    localStorage.setItem("theme", newIsDarkMode ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-zinc-900 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
      aria-label="Toggle Theme"
    >
      <div className="flex items-center">
        {isDarkMode ? <Sun size={18} className="mr-3" /> : <Moon size={18} className="mr-3" />}
        <span>
          {isDarkMode 
            ? getTranslation("lightMode", language) 
            : getTranslation("darkMode", language)}
        </span>
      </div>
      <div className={`relative inline-flex h-6 w-11 items-center rounded-full ${
        isDarkMode ? "bg-blue-600" : "bg-gray-300"
      }`}>
        <span className={`absolute inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          isDarkMode ? "translate-x-6" : "translate-x-1"
        }`} />
      </div>
    </button>
  );
};

export default ThemeToggle;