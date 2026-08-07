"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({
  theme: "light",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const saved = localStorage.getItem("mediflow-theme") as Theme | null;
    const initial = saved || "light";
    setTheme(initial);

    const root = document.documentElement;
    if (initial === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
  }, []);

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("mediflow-theme", next);

    const root = document.documentElement;
    if (next === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-black shadow-md bg-slate-900 text-white border-slate-700 hover:bg-slate-800 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-600 dark:hover:bg-slate-700 cursor-pointer active:scale-95 shrink-0"
      title="Switch Light / Dark Theme"
    >
      {theme === "light" ? (
        <>
          <Sun className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span className="hidden sm:inline font-bold">Light</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4 text-teal-400 fill-teal-400" />
          <span className="hidden sm:inline font-bold">Dark</span>
        </>
      )}
    </button>
  );
}
