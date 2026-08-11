"use client";

import { useLanguage } from "@/components/i18n/LanguageToggle";

export function PricingHeaderClient() {
  const { t } = useLanguage();

  return (
    <div className="text-center max-w-3xl mx-auto space-y-3">
      <span className="text-[11px] font-mono font-bold text-teal-700 dark:text-teal-400 tracking-widest uppercase bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20 inline-block">
        ISO 15189 Multi-Currency SaaS
      </span>
      <h1 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
        {t("pricingTitle")}
      </h1>
      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium max-w-xl mx-auto leading-relaxed">
        {t("pricingSubtitle")}
      </p>
    </div>
  );
}
