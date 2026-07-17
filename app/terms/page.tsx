import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | Altura",
  description:
    "The terms governing your use of the Altura real estate platform.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="font-display text-3xl text-[var(--color-ink)]">
          Terms of Service
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-[var(--color-ink-soft)]">
          This is a placeholder Terms of Service for the Altura prototype.
          A complete, legally reviewed version will be published before
          this site is used for real listings or transactions.
        </p>
      </div>
      <Footer />
    </div>
  );
}
