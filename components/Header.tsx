"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [language, setLanguage] = useState<"EN" | "ES">("EN");
  const [currency, setCurrency] = useState<"USD" | "ARS">("USD");

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--color-line)] bg-[var(--color-canvas)]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-xl tracking-tight">
          Altura
        </Link>

        <nav className="hidden gap-8 text-sm font-medium text-[var(--color-ink-soft)] md:flex">
          <Link href="/search?operation=buy" className="hover:text-[var(--color-ink)]">
            Buy
          </Link>
          <Link href="/search?operation=rent" className="hover:text-[var(--color-ink)]">
            Rent
          </Link>
          <Link href="/#neighborhoods" className="hover:text-[var(--color-ink)]">
            Neighborhoods
          </Link>
        </nav>

        <div className="flex items-center gap-2 text-xs font-medium">
          <div className="flex overflow-hidden rounded-full border border-[var(--color-line)]">
            {(["EN", "ES"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-3 py-1.5 transition-colors ${
                  language === lang
                    ? "bg-[var(--color-ink)] text-white"
                    : "text-[var(--color-ink-soft)]"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
          <div className="flex overflow-hidden rounded-full border border-[var(--color-line)]">
            {(["USD", "ARS"] as const).map((cur) => (
              <button
                key={cur}
                onClick={() => setCurrency(cur)}
                className={`px-3 py-1.5 transition-colors ${
                  currency === cur
                    ? "bg-[var(--color-ink)] text-white"
                    : "text-[var(--color-ink-soft)]"
                }`}
              >
                {cur}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
