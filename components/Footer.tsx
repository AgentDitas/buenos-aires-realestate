import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-line)] bg-[var(--color-canvas-alt)]">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <span className="font-display text-xl text-[var(--color-ink)]">
              Altura
            </span>
            <p className="mt-3 text-sm text-[var(--color-ink-soft)]">
              Buenos Aires real estate for local and international buyers.
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-brass)]">
              Explore
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-[var(--color-ink-soft)]">
              <li>
                <Link href="/search?operation=buy" className="hover:text-[var(--color-ink)]">
                  Buy
                </Link>
              </li>
              <li>
                <Link href="/search?operation=rent" className="hover:text-[var(--color-ink)]">
                  Rent
                </Link>
              </li>
              <li>
                <Link href="/#neighborhoods" className="hover:text-[var(--color-ink)]">
                  Neighborhoods
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-brass)]">
              Contact
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-[var(--color-ink-soft)]">
              <li>
                <a
                  href="https://wa.me/5491122334455"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-ink)]"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-brass)]">
              Legal
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-[var(--color-ink-soft)]">
              <li>
                <Link href="/privacy" className="hover:text-[var(--color-ink)]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[var(--color-ink)]">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-[var(--color-line)] pt-6 text-center text-xs text-[var(--color-ink-soft)]">
          Altura — Buenos Aires real estate for local and international buyers.
        </div>
      </div>
    </footer>
  );
}