"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import { properties } from "@/data/properties";
import PropertyCard from "@/components/PropertyCard";

const NEIGHBORHOODS = [
  "Palermo",
  "Recoleta",
  "Belgrano",
  "Puerto Madero",
  "Villa Crespo",
  "San Telmo",
  "Caballito",
  "Núñez",
] as const;

export default function Home() {
  const [operation, setOperation] = useState<"buy" | "rent">("buy");

  const featured = properties.slice(0, 6);

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--color-line)]">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.12]"
          viewBox="0 0 800 400"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <path
            d="M0 320 C 150 280, 250 340, 400 300 S 650 240, 800 280"
            stroke="var(--color-patina)"
            strokeWidth="2"
          />
          {[
            [120, 150],
            [260, 90],
            [400, 130],
            [540, 80],
            [660, 140],
          ].map(([cx, cy], i) => (
            <g key={i}>
              <line
                x1={cx}
                y1={cy}
                x2={cx}
                y2={cy + 120}
                stroke="var(--color-brass)"
                strokeWidth="1"
              />
              <circle cx={cx} cy={cy} r="5" fill="var(--color-brass)" />
            </g>
          ))}
        </svg>

        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <h1 className="font-display max-w-xl text-4xl leading-tight text-[var(--color-ink)] md:text-5xl">
            Buenos Aires real estate, made clear for buyers anywhere.
          </h1>
          <p className="mt-4 max-w-md text-[var(--color-ink-soft)]">
            Browse apartments, PHs, and houses across the city&apos;s
            best neighborhoods — priced in USD, built for local and
            international buyers alike.
          </p>

          {/* Search bar */}
          <div className="mt-8 flex max-w-2xl flex-col gap-3 rounded-sm border border-[var(--color-line)] bg-white p-3 shadow-sm sm:flex-row sm:items-center">
            <div className="flex overflow-hidden rounded-sm border border-[var(--color-line)]">
              {(["buy", "rent"] as const).map((op) => (
                <button
                  key={op}
                  onClick={() => setOperation(op)}
                  className={`px-4 py-2 text-sm font-medium capitalize transition-colors ${
                    operation === op
                      ? "bg-[var(--color-patina)] text-white"
                      : "text-[var(--color-ink-soft)]"
                  }`}
                >
                  {op}
                </button>
              ))}
            </div>

            <select
              className="flex-1 border-none bg-transparent text-sm text-[var(--color-ink)] outline-none"
              defaultValue=""
            >
              <option value="" disabled>
                Select a neighborhood
              </option>
              {NEIGHBORHOODS.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>

            <Link
              href="/search"
              className="rounded-sm bg-[var(--color-ink)] px-5 py-2 text-center text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Search
            </Link>
          </div>
        </div>
      </section>

      {/* Featured listings */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-2xl text-[var(--color-ink)]">
            Featured Listings
          </h2>
          <span className="text-sm text-[var(--color-ink-soft)]">
            {properties.length} properties total
          </span>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* Neighborhoods */}
      <section
        id="neighborhoods"
        className="border-t border-[var(--color-line)] bg-[var(--color-canvas-alt)]"
      >
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="font-display mb-8 text-2xl text-[var(--color-ink)]">
            Explore by Neighborhood
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {NEIGHBORHOODS.map((n) => {
              const count = properties.filter(
                (p) => p.neighborhood === n
              ).length;
              return (
                <Link
                  href="/search"
                  key={n}
                  className="cursor-pointer rounded-sm border border-[var(--color-line)] bg-[var(--color-canvas)] p-5 transition-shadow hover:shadow-md"
                >
                  <p className="font-display text-lg text-[var(--color-ink)]">
                    {n}
                  </p>
                  <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
                    {count} {count === 1 ? "listing" : "listings"}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--color-line)] px-6 py-8 text-center text-sm text-[var(--color-ink-soft)]">
        <span className="font-display text-[var(--color-ink)]">Altura</span>{" "}
        — Buenos Aires real estate, built for the world. Prototype in
        progress.
      </footer>
    </div>
  );
}
