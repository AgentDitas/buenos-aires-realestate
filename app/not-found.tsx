"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAppSettings } from "@/contexts/AppSettingsContext";

export default function NotFound() {
  const { t } = useAppSettings();

  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center">
        <p className="font-display text-6xl text-[var(--color-patina)]">404</p>
        <h1 className="font-display mt-4 text-2xl text-[var(--color-ink)]">
          {t("pageNotFound")}
        </h1>
        <p className="mt-3 text-sm text-[var(--color-ink-soft)]">
          {t("pageNotFoundDetail")}
        </p>
        <div className="mt-8 flex gap-3">
          <Link
            href="/"
            className="rounded-sm bg-[var(--color-ink)] px-5 py-2.5 text-sm font-medium text-white"
          >
            {t("backToHome")}
          </Link>
          <Link
            href="/search"
            className="rounded-sm border border-[var(--color-ink)] px-5 py-2.5 text-sm font-medium text-[var(--color-ink)]"
          >
            {t("browseListings")}
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}