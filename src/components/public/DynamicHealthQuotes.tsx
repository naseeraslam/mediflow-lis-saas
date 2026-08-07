"use client";

import { useState, useEffect } from "react";
import { Quote, HeartPulse, Sparkles } from "lucide-react";

const HEALTH_QUOTES = [
  {
    text: "Wherever the art of Medicine is loved, there is also a love of Humanity.",
    author: "Hippocrates",
    title: "Father of Modern Medicine",
  },
  {
    text: "Medicine is a science of uncertainty and an art of probability. Precision diagnostics illuminate the path.",
    author: "Sir William Osler",
    title: "Co-Founder of Johns Hopkins Medicine",
  },
  {
    text: "Early and precise laboratory diagnosis is the cornerstone of preventive healthcare and life preservation.",
    author: "World Health Organization (WHO)",
    title: "Global Health Standards",
  },
  {
    text: "Pathology is the foundation of clinical medicine and accurate patient care.",
    author: "Dr. William Henry Welch",
    title: "First Dean of Johns Hopkins Medical School",
  },
  {
    text: "To cure sometimes, to relieve often, to comfort always.",
    author: "Dr. Edward Livingston Trudeau",
    title: "Clinical Diagnostic Pioneer",
  },
  {
    text: "The good physician treats the disease; the great physician treats the patient who has the disease.",
    author: "Sir William Osler",
    title: "Clinical Pathology Luminary",
  },
];

export function DynamicHealthQuotes() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % HEALTH_QUOTES.length);
        setFade(true);
      }, 300);
    }, 6000); // Cycles every 6 seconds

    return () => clearInterval(interval);
  }, []);

  const quote = HEALTH_QUOTES[currentIndex];

  return (
    <div className="bg-gradient-to-r from-teal-950/60 via-slate-900 to-sky-950/60 border border-teal-500/30 rounded-3xl p-8 space-y-4 shadow-2xl relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-wider">
          <HeartPulse className="w-4 h-4 text-teal-400 animate-pulse" />
          <span>Clinical Health & Diagnostic Wisdom</span>
        </div>
        <span className="text-[10px] text-slate-400 font-mono">AUTOPLAY (6s CYCLE)</span>
      </div>

      <div
        className={`transition-opacity duration-300 min-h-[90px] flex flex-col justify-center space-y-3 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="relative">
          <Quote className="w-8 h-8 text-teal-500/20 absolute -top-3 -left-3" />
          <p className="text-slate-100 text-lg sm:text-xl font-serif italic leading-relaxed pl-6">
            "{quote.text}"
          </p>
        </div>

        <div className="flex items-center justify-between text-xs pt-2">
          <div>
            <span className="font-extrabold text-teal-300">{quote.author}</span>
            <span className="text-slate-400 text-[11px] block">{quote.title}</span>
          </div>

          <div className="flex items-center gap-1.5">
            {HEALTH_QUOTES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setFade(false);
                  setTimeout(() => {
                    setCurrentIndex(idx);
                    setFade(true);
                  }, 150);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === currentIndex ? "bg-teal-400 w-6" : "bg-slate-700 hover:bg-slate-500"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
