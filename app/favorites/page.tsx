"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { properties } from "@/data/properties";
import { useFavorites } from "@/hooks/useFavorites";

export default function FavoritesPage() {
  const { favorites, loaded } = useFavorites();
  const saved = properties.filter((p) => favorites.includes(p.id));

  return (
    <div className="min-h-screen">
      <Header />

      <div className="mx-auto max-w-6xl px-6 py-8">
        <h1 className="font-display mb-2 text-2xl text-[var(--color-ink)]">
          Favorites
        </h1>
        <p className="mb-8 text-sm text-[var(--color-ink-soft)]">
          Saved on this device only.
        </p>

        {!loaded ? null : saved.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {saved.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="rounded-sm border border-[var(--color-line)] bg-[var(--color-canvas-alt)] p-12 text-center">
            <p className="text-[var(--color-ink-soft)]">
              You haven&apos;t saved any properties yet.
            </p>
            <Link
              href="/search"
              className="mt-4 inline-block rounded-sm bg-[var(--color-ink)] px-5 py-2.5 text-sm font-medium text-white"
            >
              Browse Listings
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}