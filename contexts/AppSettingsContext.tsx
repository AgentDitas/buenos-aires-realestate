"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "EN" | "ES";
export type Currency = "USD" | "ARS";

// Approximate rate — not live. Update this number as real rates shift.
const ARS_PER_USD = 1200;

type AppSettings = {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (cur: Currency) => void;
  formatAmount: (usdAmount: number, isRent: boolean) => string;
};

const AppSettingsContext = createContext<AppSettings | undefined>(undefined);

export function AppSettingsProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("EN");
  const [currency, setCurrency] = useState<Currency>("USD");

  function formatAmount(usdAmount: number, isRent: boolean) {
    const suffix = isRent ? (language === "ES" ? "/mes" : "/mo") : "";
    if (currency === "USD") {
      return `US$${usdAmount.toLocaleString("en-US")}${suffix}`;
    }
    const arsAmount = Math.round(usdAmount * ARS_PER_USD);
    return `AR$${arsAmount.toLocaleString("es-AR")}${suffix}`;
  }

  return (
    <AppSettingsContext.Provider
      value={{ language, setLanguage, currency, setCurrency, formatAmount }}
    >
      {children}
    </AppSettingsContext.Provider>
  );
}

export function useAppSettings() {
  const context = useContext(AppSettingsContext);
  if (!context) {
    throw new Error("useAppSettings must be used inside AppSettingsProvider");
  }
  return context;
}