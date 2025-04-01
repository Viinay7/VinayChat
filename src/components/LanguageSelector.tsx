import React, { useState } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { useLanguage, Language } from "../context/LanguageContext";
import { getTranslation } from "../utils/translations";

interface LanguageOption {
  code: Language;
  name: string;
  key: string;
}

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [showDropdown, setShowDropdown] = useState(false);

  const languageOptions: LanguageOption[] = [
    { code: "en", name: "English (UK)", key: "english" },
    { code: "hi", name: "हिंदी", key: "hindi" },
    { code: "fr", name: "Français", key: "french" },
    { code: "zh", name: "中文", key: "chinese" },
    { code: "ja", name: "日本語", key: "japanese" },
    { code: "ko", name: "한국어", key: "korean" }
  ];

  const handleLanguageChange = (code: Language) => {
    setLanguage(code);
    setShowDropdown(false);
  };

  // Get the current language name
  const currentLanguageName = languageOptions.find(option => option.code === language)?.name || "English";

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-zinc-900 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
        aria-label="Change Language"
      >
        <div className="flex items-center">
          <Globe size={18} className="mr-3" />
          <span>{getTranslation("language", language)}</span>
        </div>
        <ChevronDown
          size={16}
          className={`transition-transform ${showDropdown ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute z-10 mt-1 w-full rounded-md shadow-lg bg-white dark:bg-zinc-900 ring-1 ring-black ring-opacity-5 dark:ring-zinc-700">
          <div className="py-1 max-h-56 overflow-auto">
            {languageOptions.map((option) => (
              <button
                key={option.code}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-zinc-800 flex items-center justify-between ${
                  language === option.code ? "bg-gray-50 dark:bg-zinc-800" : ""
                }`}
                onClick={() => handleLanguageChange(option.code)}
              >
                <span>{getTranslation(option.key, language)}</span>
                {language === option.code && <Check size={16} className="text-blue-500" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;