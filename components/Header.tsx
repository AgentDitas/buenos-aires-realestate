"use client";

import { useState } from "react";
import Link from "next/link";
import { useAppSettings } from "@/contexts/AppSettingsContext";
import { useFavorites } from "@/hooks/useFavorites";
import { useCompare } from "@/hooks/useCompare";

export default function Header() {
  const { language, setLanguage, currency, setCurrency } = useAppSettings();
  const { favorites } = useFavorites();
  const { compareIds } = useCompare();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--color-line)] bg-[var(--color-canvas)]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-xl tracking-tight">
          Altura
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-[var(--color-ink-soft)] md:flex">
          <Link href="/search?operation=buy" className="hover:text-[var(--color-ink)]">
            Buy
          </Link>
          <Link href="/search?operation=rent" className="hover:text-[var(--color-ink)]">
            Rent
          </Link>
          <Link href="/#neighborhoods" className="hover:text-[var(--color-ink)]">
            Neighborhoods
          </Link>
          <Link
            href="/favorites"
            className="flex items-center gap-1.5 hover:text-[var(--color-ink)]"
          >
            Favorites
            {favorites.length > 0 && (
              <span className="rounded-full bg-[var(--color-patina)] px-1.5 py-0.5 text-[10px] font-semibold text-white">
                {favorites.length}
              </span>
            )}
          </Link>
          <Link
            href="/compare"
            className="flex items-center gap-1.5 hover:text-[var(--color-ink)]"
          >
            Compare
            {compareIds.length > 0 && (
              <span className="rounded-full bg-[var(--color-brass)] px-1.5 py-0.5 text-[10px] font-semibold text-white">
                {compareIds.length}
              </span>
            )}
          </Link>
        </nav>

        <div className="hidden items-center gap-2 text-xs font-medium md:flex">
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

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`block h-0.5 w-6 bg-[var(--color-ink)] transition-transform ${
              menuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-[var(--color-ink)] transition-opacity ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-[var(--color-ink)] transition-transform ${
              menuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-[var(--color-line)] bg-[var(--color-canvas)] px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4 text-sm font-medium text-[var(--color-ink)]">
            <Link href="/search?operation=buy" onClick={() => setMenuOpen(false)}>
              Buy
            </Link>
            <Link href="/search?operation=rent" onClick={() => setMenuOpen(false)}>
              Rent
            </Link>
            <Link href="/#neighborhoods" onClick={() => setMenuOpen(false)}>
              Neighborhoods
            </Link>
            <Link
              href="/favorites"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2"
            >
              Favorites
              {favorites.length > 0 && (
                <span className="rounded-full bg-[var(--color-patina)] px-1.5 py-0.5 text-[10px] font-semibold text-white">
                  {favorites.length}
                </span>
              )}
            </Link>
            <Link
              href="/compare"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2"
            >
              Compare
              {compareIds.length > 0 && (
                <span className="rounded-full bg-[var(--color-brass)] px-1.5 py-0.5 text-[10px] font-semibold text-white">
                  {compareIds.length}
                </span>
              )}
            </Link>
          </nav>

          <div className="mt-5 flex items-center gap-3 border-t border-[var(--color-line)] pt-4">
            <div className="flex overflow-hidden rounded-full border border-[var(--color-line)]">
              {(["EN", "ES"] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-3 py-1.5 text-xs font-medium transition-colors ${
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
                  className={`px-3 py-1.5 text-xs font-medium transition-colors ${
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
      )}
    </header>
  );
}