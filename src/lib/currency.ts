/**
 * MediFlow Global Multi-Currency Support Engine
 * Supports PKR, INR, USD, GBP, EUR, AED, SAR, PHP, CAD, AUD, etc.
 */

export interface CurrencyConfig {
  code: string;
  symbol: string;
  name: string;
  exchangeRateFromUSD: number; // Conversion rate relative to 1 USD
}

export const SUPPORTED_CURRENCIES: Record<string, CurrencyConfig> = {
  USD: { code: "USD", symbol: "$", name: "US Dollar (USD)", exchangeRateFromUSD: 1.0 },
  PKR: { code: "PKR", symbol: "Rs. ", name: "Pakistani Rupee (PKR)", exchangeRateFromUSD: 278.5 },
  INR: { code: "INR", symbol: "₹ ", name: "Indian Rupee (INR)", exchangeRateFromUSD: 83.9 },
  GBP: { code: "GBP", symbol: "£", name: "British Pound (GBP)", exchangeRateFromUSD: 0.79 },
  EUR: { code: "EUR", symbol: "€", name: "Euro (EUR)", exchangeRateFromUSD: 0.92 },
  AED: { code: "AED", symbol: "AED ", name: "UAE Dirham (AED)", exchangeRateFromUSD: 3.67 },
  SAR: { code: "SAR", symbol: "SAR ", name: "Saudi Riyal (SAR)", exchangeRateFromUSD: 3.75 },
  PHP: { code: "PHP", symbol: "₱", name: "Philippine Peso (PHP)", exchangeRateFromUSD: 57.2 },
  CAD: { code: "CAD", symbol: "CA$ ", name: "Canadian Dollar (CAD)", exchangeRateFromUSD: 1.37 },
  AUD: { code: "AUD", symbol: "A$ ", name: "Australian Dollar (AUD)", exchangeRateFromUSD: 1.52 },
};

/**
 * Formats a numeric price in the target currency
 */
export function formatCurrency(amountInUSD: number, currencyCode: string = "USD"): string {
  const config = SUPPORTED_CURRENCIES[currencyCode] || SUPPORTED_CURRENCIES.USD;
  const converted = Math.round(amountInUSD * config.exchangeRateFromUSD);
  return `${config.symbol}${converted.toLocaleString("en-US")}`;
}

/**
 * Formats raw amount with currency symbol
 */
export function formatPriceWithSymbol(amount: number, currencyCode: string = "USD"): string {
  const config = SUPPORTED_CURRENCIES[currencyCode] || SUPPORTED_CURRENCIES.USD;
  return `${config.symbol}${amount.toLocaleString("en-US")}`;
}
