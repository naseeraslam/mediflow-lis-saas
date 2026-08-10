"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Language, translations } from "@/lib/i18n";
import { Globe } from "lucide-react";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations["en"]) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key) => translations["en"][key] || key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("mediflow-lang") as Language | null;
    if (saved && (saved === "en" || saved === "ur")) {
      setLanguageState(saved);
      if (saved === "ur") {
        document.documentElement.setAttribute("dir", "rtl");
      } else {
        document.documentElement.setAttribute("dir", "ltr");
      }
    }
  }, []);

  function setLanguage(lang: Language) {
    setLanguageState(lang);
    localStorage.setItem("mediflow-lang", lang);
    if (lang === "ur") {
      document.documentElement.setAttribute("dir", "rtl");
    } else {
      document.documentElement.setAttribute("dir", "ltr");
    }
  }

  function t(key: keyof typeof translations["en"]): string {
    return translations[language]?.[key] || translations["en"][key] || key;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageToggle() {
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <div className="inline-flex items-center rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 p-0.5 shadow-sm text-xs font-bold shrink-0">
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
          language === "en"
            ? "bg-teal-600 text-white shadow-sm"
            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
        }`}
      >
        <span>🇬🇧 EN</span>
      </button>
      <button
        type="button"
        onClick={() => setLanguage("ur")}
        className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 font-sans ${
          language === "ur"
            ? "bg-teal-600 text-white shadow-sm font-extrabold"
            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 font-bold"
        }`}
      >
        <span>🇵🇰 اردو</span>
      </button>
    </div>
  );
}
