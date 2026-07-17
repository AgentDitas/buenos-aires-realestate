"use client";

import { Suspense, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { properties, Property } from "@/data/properties";
import { useAppSettings } from "@/contexts/AppSettingsContext";

const PropertyMap = dynamic(() => import("@/components/PropertyMap"), {
  ssr: false,
});

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

const TYPES: { value: Property["type"]; key: "apartamento" | "ph" | "casa" | "loft" }[] = [
  { value: "Apartamento", key: "apartamento" },
  { value: "PH", key: "ph" },
  { value: "Casa", key: "casa" },
  { value: "Loft", key: "loft" },
];

type SortOption = "price-asc" | "price-desc" | "beds-desc" | "area-desc";

function SearchPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { t } = useAppSettings();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

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

  const filterControls = (
    <>
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[var(--color-brass)]">
          {t("buyOrRent")}
        </p>
        <div className="flex overflow-hidden rounded-sm border border-[var(--color-line)]">
          {(["all", "buy", "rent"] as const).map((op) => (
            <button
              key={op}
              onClick={() => updateParams({ operation: op === "all" ? null : op })}
              className={`flex-1 px-3 py-2 text-sm font-medium transition-colors ${
                operation === op
                  ? "bg-[var(--color-patina)] text-white"
                  : "text-[var(--color-ink-soft)]"
              }`}
            >
              {t(op)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[var(--color-brass)]">
          {t("price")}
        </p>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder={t("min")}
            value={minPrice}
            onChange={(e) => updateParams({ minPrice: e.target.value || null })}
            className="w-full rounded-sm border border-[var(--color-line)] bg-white px-2 py-1.5 text-sm outline-none focus:border-[var(--color-patina)]"
          />
          <span className="text-[var(--color-ink-soft)]">–</span>
          <input
            type="number"
            placeholder={t("max")}
            value={maxPrice}
            onChange={(e) => updateParams({ maxPrice: e.target.value || null })}
            className="w-full rounded-sm border border-[var(--color-line)] bg-white px-2 py-1.5 text-sm outline-none focus:border-[var(--color-patina)]"
          />
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[var(--color-brass)]">
          {t("bedrooms")}
        </p>
        <select
          value={minBeds}
          onChange={(e) =>
            updateParams({ bedrooms: e.target.value === "0" ? null : e.target.value })
          }
          className="w-full rounded-sm border border-[var(--color-line)] bg-white px-2 py-1.5 text-sm outline-none focus:border-[var(--color-patina)]"
        >
          <option value={0}>{t("any")}</option>
          <option value={1}>1+</option>
          <option value={2}>2+</option>
          <option value={3}>3+</option>
          <option value={4}>4+</option>
        </select>
      </div>

      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[var(--color-brass)]">
          {t("bathrooms")}
        </p>
        <select
          value={minBaths}
          onChange={(e) =>
            updateParams({ bathrooms: e.target.value === "0" ? null : e.target.value })
          }
          className="w-full rounded-sm border border-[var(--color-line)] bg-white px-2 py-1.5 text-sm outline-none focus:border-[var(--color-patina)]"
        >
          <option value={0}>{t("any")}</option>
          <option value={1}>1+</option>
          <option value={2}>2+</option>
          <option value={3}>3+</option>
        </select>
      </div>

      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[var(--color-brass)]">
          {t("propertyType")}
        </p>
        <div className="flex flex-col gap-1.5">
          {TYPES.map(({ value, key }) => (
            <label key={value} className="flex items-center gap-2 text-sm text-[var(--color-ink)]">
              <input
                type="checkbox"
                checked={selectedTypes.includes(value)}
                onChange={() => toggleType(value)}
                className="accent-[var(--color-patina)]"
              />
              {t(key)}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[var(--color-brass)]">
          {t("neighborhood")}
        </p>
        <div className="flex flex-col gap-1.5">
          {NEIGHBORHOODS.map((n) => (
            <label key={n} className="flex items-center gap-2 text-sm text-[var(--color-ink)]">
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
        {t("clearFilters")}
      </button>
    </>
  );

  return (
    <div className="min-h-screen">
      <Header />

      <div className="mx-auto max-w-6xl px-6 py-8">
        <h1 className="font-display mb-6 text-2xl text-[var(--color-ink)]">
          {t("searchListings")}
        </h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr_280px]">
          <aside className="hidden flex-col gap-6 lg:flex">{filterControls}</aside>

          <div>
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-sm text-[var(--color-ink-soft)]">
                {results.length} {results.length === 1 ? t("propertyFound") : t("propertiesFound")}
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="rounded-sm border border-[var(--color-ink)] px-3 py-1.5 text-sm font-medium text-[var(--color-ink)] lg:hidden"
                >
                  {t("filtersLabel")}
                </button>
                <select
                  value={sortBy}
                  onChange={(e) => updateParams({ sort: e.target.value })}
                  className="rounded-sm border border-[var(--color-line)] bg-white px-2 py-1.5 text-sm outline-none focus:border-[var(--color-patina)]"
                >
                  <option value="price-asc">{t("sortPriceLowHigh")}</option>
                  <option value="price-desc">{t("sortPriceHighLow")}</option>
                  <option value="beds-desc">{t("sortMostBedrooms")}</option>
                  <option value="area-desc">{t("sortLargest")}</option>
                </select>
              </div>
            </div>

            {results.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {results.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <p className="rounded-sm border border-[var(--color-line)] bg-[var(--color-canvas-alt)] p-8 text-center text-[var(--color-ink-soft)]">
                {t("noPropertiesMatch")}
              </p>
            )}
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-24 h-96 overflow-hidden rounded-sm border border-[var(--color-line)]">
              <PropertyMap properties={results} />
            </div>
          </div>
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-lg bg-[var(--color-canvas)] p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg text-[var(--color-ink)]">{t("filtersLabel")}</h2>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                aria-label="Close filters"
                className="text-2xl leading-none text-[var(--color-ink-soft)]"
              >
                ×
              </button>
            </div>
            <div className="flex flex-col gap-6">{filterControls}</div>
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="mt-6 w-full rounded-sm bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-white"
            >
              {t("showProperties")} {results.length}{" "}
              {results.length === 1 ? t("propertyFound") : t("propertiesFound")}
            </button>
          </div>
        </div>
      )}

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