import { Language } from "../context/LanguageContext";

interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

export const translations: Translations = {
  // App-wide elements
  "newChat": {
    "en": "New Chat",
    "hi": "नई चैट",
    "fr": "Nouvelle discussion",
    "zh": "新聊天",
    "ja": "新しいチャット",
    "ko": "새 채팅"
  },
  "chat": {
    "en": "Chat",
    "hi": "चैट",
    "fr": "Discussion",
    "zh": "聊天",
    "ja": "チャット",
    "ko": "채팅"
  },
  "askMeAnything": {
    "en": "Ask me anything...",
    "hi": "कुछ भी पूछें...",
    "fr": "Demandez-moi n'importe quoi...",
    "zh": "问我任何问题...",
    "ja": "何でも聞いてください...",
    "ko": "무엇이든 물어보세요..."
  },
  "apiKeySet": {
    "en": "✅ API Key Set",
    "hi": "✅ एपीआई कुंजी सेट",
    "fr": "✅ Clé API définie",
    "zh": "✅ API密钥已设置",
    "ja": "✅ APIキー設定済み",
    "ko": "✅ API 키 설정됨"
  },
  "enterApiKey": {
    "en": "Enter your API key",
    "hi": "अपनी एपीआई कुंजी दर्ज करें",
    "fr": "Entrez votre clé API",
    "zh": "输入您的API密钥",
    "ja": "APIキーを入力してください",
    "ko": "API 키를 입력하세요"
  },
  "saveApiKey": {
    "en": "Save API Key",
    "hi": "एपीआई कुंजी सहेजें",
    "fr": "Enregistrer la clé API",
    "zh": "保存API密钥",
    "ja": "APIキーを保存",
    "ko": "API 키 저장"
  },
  "removeApiKey": {
    "en": "Remove API Key",
    "hi": "एपीआई कुंजी हटाएं",
    "fr": "Supprimer la clé API",
    "zh": "删除API密钥",
    "ja": "APIキーを削除",
    "ko": "API 키 제거"
  },
  "send": {
    "en": "Send",
    "hi": "भेजें",
    "fr": "Envoyer",
    "zh": "发送",
    "ja": "送信",
    "ko": "보내기"
  },
  "home": {
    "en": "Home",
    "hi": "होम",
    "fr": "Accueil",
    "zh": "首页",
    "ja": "ホーム",
    "ko": "홈"
  },
  "saved": {
    "en": "Saved",
    "hi": "सहेजा गया",
    "fr": "Enregistré",
    "zh": "已保存",
    "ja": "保存済み",
    "ko": "저장됨"
  },
  "suggestedPrompts": {
    "en": "SUGGESTED PROMPTS",
    "hi": "सुझाए गए प्रॉम्प्ट्स",
    "fr": "SUGGESTIONS DE PROMPTS",
    "zh": "建议的提示",
    "ja": "おすすめのプロンプト",
    "ko": "추천 프롬프트"
  },
  
  // Profile & Settings
  "profile": {
    "en": "Profile",
    "hi": "प्रोफाइल",
    "fr": "Profil",
    "zh": "个人资料",
    "ja": "プロフィール",
    "ko": "프로필"
  },
  "settings": {
    "en": "Settings",
    "hi": "सेटिंग्स",
    "fr": "Paramètres",
    "zh": "设置",
    "ja": "設定",
    "ko": "설정"
  },
  "theme": {
    "en": "Theme",
    "hi": "थीम",
    "fr": "Thème",
    "zh": "主题",
    "ja": "テーマ",
    "ko": "테마"
  },
  "darkMode": {
    "en": "Dark Mode",
    "hi": "डार्क मोड",
    "fr": "Mode sombre",
    "zh": "深色模式",
    "ja": "ダークモード",
    "ko": "다크 모드"
  },
  "lightMode": {
    "en": "Light Mode",
    "hi": "लाइट मोड",
    "fr": "Mode clair",
    "zh": "浅色模式",
    "ja": "ライトモード",
    "ko": "라이트 모드"
  },
  "language": {
    "en": "Language",
    "hi": "भाषा",
    "fr": "Langue",
    "zh": "语言",
    "ja": "言語",
    "ko": "언어"
  },
  "fontSizeAndUI": {
    "en": "Font Size & UI",
    "hi": "फॉन्ट आकार और UI",
    "fr": "Taille de police & UI",
    "zh": "字体大小和UI",
    "ja": "フォントサイズとUI",
    "ko": "글꼴 크기 및 UI"
  },
  "feedbackAndSupport": {
    "en": "Feedback & Support",
    "hi": "फीडबैक और सहायता",
    "fr": "Commentaires & Support",
    "zh": "反馈和支持",
    "ja": "フィードバックとサポート",
    "ko": "피드백 및 지원"
  },
  "helpAndSupport": {
    "en": "Help & Support",
    "hi": "सहायता और समर्थन",
    "fr": "Aide & Support",
    "zh": "帮助和支持",
    "ja": "ヘルプとサポート",
    "ko": "도움말 및 지원"
  },
  "logOut": {
    "en": "Log Out",
    "hi": "लॉग आउट",
    "fr": "Se déconnecter",
    "zh": "登出",
    "ja": "ログアウト",
    "ko": "로그아웃"
  },
  "backToProfile": {
    "en": "Back to Profile",
    "hi": "प्रोफ़ाइल पर वापस जाएं",
    "fr": "Retour au profil",
    "zh": "返回个人资料",
    "ja": "プロフィールに戻る",
    "ko": "프로필로 돌아가기"
  },
  
  // Languages
  "english": {
    "en": "English (UK)",
    "hi": "अंग्रेज़ी (यूके)",
    "fr": "Anglais (UK)",
    "zh": "英语（英国）",
    "ja": "英語（イギリス）",
    "ko": "영어 (영국)"
  },
  "hindi": {
    "en": "Hindi",
    "hi": "हिंदी",
    "fr": "Hindi",
    "zh": "印地语",
    "ja": "ヒンディー語",
    "ko": "힌디어"
  },
  "french": {
    "en": "French",
    "hi": "फ्रेंच",
    "fr": "Français",
    "zh": "法语",
    "ja": "フランス語",
    "ko": "프랑스어"
  },
  "chinese": {
    "en": "Chinese",
    "hi": "चीनी",
    "fr": "Chinois",
    "zh": "中文",
    "ja": "中国語",
    "ko": "중국어"
  },
  "japanese": {
    "en": "Japanese",
    "hi": "जापानी",
    "fr": "Japonais",
    "zh": "日语",
    "ja": "日本語",
    "ko": "일본어"
  },
  "korean": {
    "en": "Korean",
    "hi": "कोरियाई",
    "fr": "Coréen",
    "zh": "韩语",
    "ja": "韓国語",
    "ko": "한국어"
  }
};

// Helper function to get translated text
export const getTranslation = (key: string, language: Language): string => {
  if (!translations[key]) {
    console.warn(`Translation key not found: ${key}`);
    return key;
  }
  
  return translations[key][language] || translations[key]["en"];
};