"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Property } from "@/data/properties";
import { useAppSettings } from "@/contexts/AppSettingsContext";
import { useFavorites } from "@/hooks/useFavorites";
import { useCompare } from "@/hooks/useCompare";

export default function PropertyCard({ property }: { property: Property }) {
  const { formatAmount, t, language } = useAppSettings();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isComparing, toggleCompare, isFull } = useCompare();
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  function checkAlreadyLoaded(img: HTMLImageElement | null) {
    imgRef.current = img;
    if (img && img.complete && img.naturalWidth > 0) {
      setLoaded(true);
    }
  }

  const favorited = isFavorite(property.id);
  const comparing = isComparing(property.id);
  const compareDisabled = !comparing && isFull;
  const displayTitle = language === "ES" ? property.titleEs : property.title;

  return (
    <Link
      href={`/property/${property.id}`}
      className="group flex flex-col overflow-hidden rounded-sm border border-[var(--color-line)] bg-white/40 transition-all duration-[250ms] ease-out hover:-translate-y-1 hover:shadow-xl"
    >
      <div
        className="relative overflow-hidden bg-[var(--color-canvas-alt)]"
        style={{ height: "175px" }}
      >
        {!loaded && !errored && (
          <div className="absolute inset-0 animate-pulse bg-[var(--color-line)]" />
        )}

        {errored ? (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--color-patina)] to-[var(--color-patina-light)]">
            <svg
              viewBox="0 0 64 64"
              className="h-10 w-10 text-white/70"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M8 30 L32 12 L56 30" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14 28 V52 H50 V28" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="27" y="36" width="10" height="16" />
            </svg>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            ref={checkAlreadyLoaded}
            src={property.image}
            alt={displayTitle}
            onLoad={() => setLoaded(true)}
            onError={() => setErrored(true)}
            style={{
              width: "100%",
              height: "175px",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
              opacity: loaded ? 1 : 0,
              transition: "opacity 250ms ease-out",
            }}
            className="transition-transform duration-[250ms] ease-out group-hover:scale-[1.03]"
          />
        )}

        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium uppercase tracking-wide text-[var(--color-ink)]">
          {property.operation === "buy" ? t("forSale") : t("forRent")}
        </span>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(property.id);
          }}
          aria-label={favorited ? "Remove from favorites" : "Save to favorites"}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 transition-transform hover:scale-110"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill={favorited ? "#B23A48" : "none"}
            stroke={favorited ? "#B23A48" : "var(--color-ink)"}
            strokeWidth="1.8"
          >
            <path d="M12 20.5S3 14.6 3 8.9C3 5.9 5.4 3.5 8.3 3.5c1.7 0 3.2.8 4.2 2.1a5.2 5.2 0 0 1 8.5 4c0 5.7-9 11.9-9 11.9Z" />
          </svg>
        </button>

        <button
          type="button"
          disabled={compareDisabled}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleCompare(property.id);
          }}
          className={`absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
            comparing
              ? "bg-[var(--color-patina)] text-white"
              : compareDisabled
              ? "cursor-not-allowed bg-white/70 text-[var(--color-ink-soft)]"
              : "bg-white/90 text-[var(--color-ink)] hover:bg-white"
          }`}
        >
          {comparing ? `✓ ${t("comparing")}` : `+ ${t("compare")}`}
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-brass)]">
          {property.neighborhood} · {property.type}
        </p>
        <h3 className="font-display text-lg leading-snug text-[var(--color-ink)]">
          {displayTitle}
        </h3>

        <div className="flex items-center gap-4 text-sm text-[var(--color-ink-soft)]">
          <span>{property.bedrooms} {t("bed")}</span>
          <span>{property.bathrooms} {t("bath")}</span>
          <span>{property.areaM2} m²</span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="font-display text-xl text-[var(--color-ink)]">
            {formatAmount(property.priceUSD, property.operation === "rent")}
          </span>
          <span className="rounded-sm border border-[var(--color-line)] px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-[var(--color-ink-soft)] transition-colors group-hover:border-[var(--color-ink)] group-hover:text-[var(--color-ink)]">
            {t("view")}
          </span>
        </div>
      </div>
    </Link>
  );
}