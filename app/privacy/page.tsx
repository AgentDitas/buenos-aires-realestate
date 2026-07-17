import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="font-display text-3xl text-[var(--color-ink)]">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-[var(--color-ink-soft)]">
          This is a placeholder Privacy Policy for the Altura prototype.
          A complete, legally reviewed policy will be published before
          this site is used to collect real user data or handle real
          property inquiries.
        </p>
      </div>
      <Footer />
    </div>
  );
}
