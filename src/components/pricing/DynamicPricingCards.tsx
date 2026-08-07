"use client";

import { useState } from "react";
import Link from "next/link";
import { SUPPORTED_CURRENCIES, formatCurrency } from "@/lib/currency";
import { Check, Sparkles, ArrowRight, Globe } from "lucide-react";

export interface PlanItem {
  id?: string;
  name: string;
  priceInUSD: number;
  currency?: string;
  billing: string;
  description: string;
  features: string[];
  popular: boolean;
}

export function DynamicPricingCards({ plans, defaultCurrency = "USD" }: { plans: PlanItem[]; defaultCurrency?: string }) {
  const [selectedCurrency, setSelectedCurrency] = useState(defaultCurrency);

  const currencyConfig = SUPPORTED_CURRENCIES[selectedCurrency] || SUPPORTED_CURRENCIES.USD;

  return (
    <div className="space-y-12">
      {/* Global Currency Selector Dropdown */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
          <Globe className="w-4 h-4 text-teal-400" />
          <span>Platform Base Currency (Configured by Super Admin):</span>
        </div>

        <select
          value={selectedCurrency}
          onChange={(e) => setSelectedCurrency(e.target.value)}
          className="p-3 px-4 bg-slate-900 border border-teal-500/40 rounded-xl text-teal-300 font-bold text-xs outline-none focus:border-teal-400 shadow-xl cursor-pointer"
        >
          {Object.values(SUPPORTED_CURRENCIES).map((c) => (
            <option key={c.code} value={c.code}>
              {c.name} ({c.symbol})
            </option>
          ))}
        </select>

        {selectedCurrency !== "USD" && (
          <span className="text-[11px] text-slate-400 font-mono">
            (Rate: 1 USD ≈ {currencyConfig.symbol}{currencyConfig.exchangeRateFromUSD.toLocaleString()})
          </span>
        )}
      </div>

      {/* Dynamic Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => {
          const formattedPrice = formatCurrency(plan.priceInUSD, selectedCurrency);

          return (
            <div
              key={index}
              className={`rounded-2xl p-8 space-y-6 flex flex-col justify-between transition-all border ${
                plan.popular
                  ? "bg-slate-900 border-teal-500/80 shadow-2xl shadow-teal-500/10 relative"
                  : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-teal-400 to-sky-400 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-lg">
                  <Sparkles className="w-3 h-3 fill-slate-950" /> Most Popular
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-100">{plan.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">{plan.description}</p>
                </div>

                <div className="flex items-baseline gap-1 pt-2">
                  <span className="text-4xl font-black text-teal-400">{formattedPrice}</span>
                  <span className="text-slate-400 text-xs font-mono">/ {plan.billing}</span>
                </div>

                <ul className="space-y-3 pt-4 text-xs text-slate-300 border-t border-slate-800">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-teal-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                <Link
                  href="/register"
                  className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                    plan.popular
                      ? "bg-gradient-to-r from-teal-400 to-sky-400 text-slate-950 hover:from-teal-300 hover:to-sky-300 shadow-lg shadow-teal-500/20"
                      : "bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700"
                  }`}
                >
                  <span>Get Started ({plan.name})</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
