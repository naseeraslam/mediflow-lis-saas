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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
      className="p-2 px-3 rounded-xl border transition-all flex items-center gap-2 text-xs font-black shadow-md bg-teal-500/10 hover:bg-teal-500/20 border-teal-500/30 text-teal-800 dark:text-teal-300 cursor-pointer active:scale-95"
      title="Switch Theme"
    >
      {theme === "light" ? (
        <>
          <Sun className="w-4 h-4 text-amber-500 fill-amber-400" />
          <span className="hidden sm:inline">Light</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4 text-teal-400 fill-teal-400" />
          <span className="hidden sm:inline">Dark</span>
        </>
      )}
    </button>
  );
}
