"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { properties, Property } from "@/data/properties";

const NEIGHBORHOODS: Property["neighborhood"][] = [
  "Palermo",
  "Recoleta",
  "Belgrano",
  "Puerto Madero",
  "Villa Crespo",
  "San Telmo",
  "Caballito",
  "Núñez",
];

const TYPES: Property["type"][] = ["Apartamento", "PH", "Casa", "Loft"];

type SortOption = "price-asc" | "price-desc" | "beds-desc" | "area-desc";

function SearchPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const operationParam = searchParams.get("operation");
  const operation: "all" | "buy" | "rent" =
    operationParam === "buy" || operationParam === "rent" ? operationParam : "all";

  const selectedNeighborhoods = (searchParams.get("neighborhood") || "")
    .split(",")
    .filter(Boolean);

  const selectedTypes = (searchParams.get("propertyType") || "")
    .split(",")
    .filter(Boolean);

  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const minBeds = Number(searchParams.get("bedrooms") || 0);
  const minBaths = Number(searchParams.get("bathrooms") || 0);

  const sortParam = searchParams.get("sort");
  const sortBy: SortOption =
    sortParam === "price-asc" ||
    sortParam === "price-desc" ||
    sortParam === "beds-desc" ||
    sortParam === "area-desc"
      ? sortParam
      : "price-asc";

  function updateParams(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  function toggleNeighborhood(n: string) {
    const next = selectedNeighborhoods.includes(n)
      ? selectedNeighborhoods.filter((x) => x !== n)
      : [...selectedNeighborhoods, n];
    updateParams({ neighborhood: next.join(",") || null });
  }

  function toggleType(t: string) {
    const next = selectedTypes.includes(t)
      ? selectedTypes.filter((x) => x !== t)
      : [...selectedTypes, t];
    updateParams({ propertyType: next.join(",") || null });
  }

  function clearFilters() {
    router.replace(pathname, { scroll: false });
  }

  const results = properties
    .filter((p) => {
      if (operation !== "all" && p.operation !== operation) return false;
      if (selectedNeighborhoods.length > 0 && !selectedNeighborhoods.includes(p.neighborhood))
        return false;
      if (selectedTypes.length > 0 && !selectedTypes.includes(p.type)) return false;
      if (minPrice && p.priceUSD < Number(minPrice)) return false;
      if (maxPrice && p.priceUSD > Number(maxPrice)) return false;
      if (p.bedrooms < minBeds) return false;
      if (p.bathrooms < minBaths) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.priceUSD - b.priceUSD;
        case "price-desc":
          return b.priceUSD - a.priceUSD;
        case "beds-desc":
          return b.bedrooms - a.bedrooms;
        case "area-desc":
          return b.areaM2 - a.areaM2;
      }
    });

  return (
    <div className="min-h-screen">
      <Header />

      <div className="mx-auto max-w-6xl px-6 py-8">
        <h1 className="font-display mb-6 text-2xl text-[var(--color-ink)]">
          Search Listings
        </h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr_280px]">
          <aside className="flex flex-col gap-6">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[var(--color-brass)]">
                Buy or Rent
              </p>
              <div className="flex overflow-hidden rounded-sm border border-[var(--color-line)]">
                {(["all", "buy", "rent"] as const).map((op) => (
                  <button
                    key={op}
                    onClick={() => updateParams({ operation: op === "all" ? null : op })}
                    className={`flex-1 px-3 py-2 text-sm font-medium capitalize transition-colors ${
                      operation === op
                        ? "bg-[var(--color-patina)] text-white"
                        : "text-[var(--color-ink-soft)]"
                    }`}
                  >
                    {op}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[var(--color-brass)]">
                Price (USD)
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => updateParams({ minPrice: e.target.value || null })}
                  className="w-full rounded-sm border border-[var(--color-line)] bg-white px-2 py-1.5 text-sm outline-none focus:border-[var(--color-patina)]"
                />
                <span className="text-[var(--color-ink-soft)]">–</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => updateParams({ maxPrice: e.target.value || null })}
                  className="w-full rounded-sm border border-[var(--color-line)] bg-white px-2 py-1.5 text-sm outline-none focus:border-[var(--color-patina)]"
                />
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[var(--color-brass)]">
                Bedrooms
              </p>
              <select
                value={minBeds}
                onChange={(e) =>
                  updateParams({ bedrooms: e.target.value === "0" ? null : e.target.value })
                }
                className="w-full rounded-sm border border-[var(--color-line)] bg-white px-2 py-1.5 text-sm outline-none focus:border-[var(--color-patina)]"
              >
                <option value={0}>Any</option>
                <option value={1}>1+</option>
                <option value={2}>2+</option>
                <option value={3}>3+</option>
                <option value={4}>4+</option>
              </select>
            </div>

            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[var(--color-brass)]">
                Bathrooms
              </p>
              <select
                value={minBaths}
                onChange={(e) =>
                  updateParams({ bathrooms: e.target.value === "0" ? null : e.target.value })
                }
                className="w-full rounded-sm border border-[var(--color-line)] bg-white px-2 py-1.5 text-sm outline-none focus:border-[var(--color-patina)]"
              >
                <option value={0}>Any</option>
                <option value={1}>1+</option>
                <option value={2}>2+</option>
                <option value={3}>3+</option>
              </select>
            </div>

            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[var(--color-brass)]">
                Property Type
              </p>
              <div className="flex flex-col gap-1.5">
                {TYPES.map((t) => (
                  <label
                    key={t}
                    className="flex items-center gap-2 text-sm text-[var(--color-ink)]"
                  >
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(t)}
                      onChange={() => toggleType(t)}
                      className="accent-[var(--color-patina)]"
                    />
                    {t}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[var(--color-brass)]">
                Neighborhood
              </p>
              <div className="flex flex-col gap-1.5">
                {NEIGHBORHOODS.map((n) => (
                  <label
                    key={n}
                    className="flex items-center gap-2 text-sm text-[var(--color-ink)]"
                  >
                    <input
                      type="checkbox"
                      checked={selectedNeighborhoods.includes(n)}
                      onChange={() => toggleNeighborhood(n)}
                      className="accent-[var(--color-patina)]"
                    />
                    {n}
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={clearFilters}
              className="rounded-sm border border-[var(--color-ink)] px-3 py-2 text-sm font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-ink)] hover:text-white"
            >
              Clear filters
            </button>
          </aside>

          <div>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-[var(--color-ink-soft)]">
                {results.length} {results.length === 1 ? "property" : "properties"} found
              </p>
              <select
                value={sortBy}
                onChange={(e) => updateParams({ sort: e.target.value })}
                className="rounded-sm border border-[var(--color-line)] bg-white px-2 py-1.5 text-sm outline-none focus:border-[var(--color-patina)]"
              >
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="beds-desc">Most Bedrooms</option>
                <option value="area-desc">Largest (m²)</option>
              </select>
            </div>

            {results.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {results.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <p className="rounded-sm border border-[var(--color-line)] bg-[var(--color-canvas-alt)] p-8 text-center text-[var(--color-ink-soft)]">
                No properties match these filters. Try widening your search.
              </p>
            )}
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-24 flex h-96 flex-col items-center justify-center gap-2 rounded-sm border border-dashed border-[var(--color-line)] bg-[var(--color-canvas-alt)] text-center">
              <svg
                viewBox="0 0 24 24"
                className="h-8 w-8 text-[var(--color-brass)]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M12 21s-7-6.5-7-11a7 7 0 0 1 14 0c0 4.5-7 11-7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              <p className="text-sm font-medium text-[var(--color-ink-soft)]">
                Interactive map
              </p>
              <p className="max-w-[70%] text-xs text-[var(--color-ink-soft)]">Coming soon</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <SearchPageContent />
    </Suspense>
  );
}