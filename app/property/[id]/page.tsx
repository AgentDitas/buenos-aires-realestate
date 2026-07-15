"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import PropertyCard from "@/components/PropertyCard";
import { properties } from "@/data/properties";

function formatPrice(priceUSD: number, operation: "buy" | "rent") {
  const price = priceUSD.toLocaleString("en-US");
  return operation === "rent" ? `$${price}/mo` : `$${price}`;
}

export default function PropertyDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const property = properties.find((p) => p.id === id);

  if (!property) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <h1 className="font-display text-2xl text-[var(--color-ink)]">
            Property not found
          </h1>
          <p className="mt-2 text-[var(--color-ink-soft)]">
            This listing may have been removed or the link is incorrect.
          </p>
          <Link
            href="/search"
            className="mt-6 inline-block rounded-sm bg-[var(--color-ink)] px-5 py-2 text-sm font-medium text-white"
          >
            Back to Search
          </Link>
        </div>
      </div>
    );
  }

  const whatsappText = "Hi, I am interested in " + property.title + " (" + property.neighborhood + "). Is it still available?";
  const whatsappMessage = encodeURIComponent(whatsappText);
  const whatsappLink = "https://wa.me/" + property.agentWhatsapp + "?text=" + whatsappMessage;

  const similar = properties
    .filter(
      (p) =>
        p.id !== property.id &&
        (p.neighborhood === property.neighborhood || p.type === property.type)
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      <Header />

      <div className="mx-auto max-w-5xl px-6 py-8">
        <Link
          href="/search"
          className="text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
        >
          Back to Search
        </Link>

        <div className="mt-4 grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="relative overflow-hidden rounded-sm bg-[var(--color-canvas-alt)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={property.image}
                alt={property.title}
                style={{
                  width: "100%",
                  height: "420px",
                  objectFit: "cover",
                  objectPosition: "center",
                  display: "block",
                }}
              />
              <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium uppercase tracking-wide text-[var(--color-ink)]">
                {property.operation === "buy" ? "For Sale" : "For Rent"}
              </span>
            </div>

            <p className="mt-6 text-xs font-medium uppercase tracking-wide text-[var(--color-brass)]">
              {property.neighborhood} · {property.type}
            </p>
            <h1 className="font-display mt-1 text-3xl text-[var(--color-ink)]">
              {property.title}
            </h1>
            <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
              {property.address}
            </p>

            <div className="mt-4 flex items-center gap-6 border-y border-[var(--color-line)] py-4 text-sm text-[var(--color-ink)]">
              <span>{property.bedrooms} bed</span>
              <span>{property.bathrooms} bath</span>
              <span>{property.areaM2} m²</span>
            </div>

            <div className="mt-6">
              <h2 className="font-display text-lg text-[var(--color-ink)]">
                Description
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-soft)]">
                {property.descriptionEn}
              </p>
              <p className="mt-3 text-sm italic leading-relaxed text-[var(--color-ink-soft)]">
                {property.descriptionEs}
              </p>
            </div>

            <div className="mt-6">
              <h2 className="font-display text-lg text-[var(--color-ink)]">
                Amenities
              </h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {property.amenities.map((a) => (
                  <span
                    key={a}
                    className="rounded-full border border-[var(--color-line)] px-3 py-1 text-xs text-[var(--color-ink-soft)]"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="sticky top-24 rounded-sm border border-[var(--color-line)] bg-white p-6">
              <p className="font-display text-3xl text-[var(--color-ink)]">
                {formatPrice(property.priceUSD, property.operation)}
              </p>

              <div className="mt-6 border-t border-[var(--color-line)] pt-6">
                <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-brass)]">
                  Listing Agent
                </p>
                <p className="mt-1 font-display text-lg text-[var(--color-ink)]">
                  {property.agentName}
                </p>
              </div>

              
                <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-center gap-2 rounded-sm bg-[#25D366] px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M17.6 6.3A8.9 8.9 0 0 0 3.2 16.9L2 22l5.2-1.4A8.9 8.9 0 0 0 21 11.1a8.9 8.9 0 0 0-3.4-4.8Zm-5.6 13.6a7.4 7.4 0 0 1-3.8-1l-.3-.2-2.8.7.8-2.7-.2-.3A7.4 7.4 0 1 1 19 11.1a7.4 7.4 0 0 1-7 8.8Zm4-5.5c-.2-.1-1.3-.6-1.5-.7-.2-.1-.3-.1-.5.1-.1.2-.5.7-.6.8-.1.1-.2.1-.4 0a6 6 0 0 1-1.8-1.1 6.7 6.7 0 0 1-1.2-1.5c-.1-.2 0-.3.1-.4l.3-.4.2-.3v-.3l-.6-1.5c-.2-.4-.3-.3-.5-.3h-.4a.8.8 0 0 0-.6.3 2.5 2.5 0 0 0-.8 1.9c0 1.1.8 2.2 1 2.4.1.1 1.7 2.6 4.1 3.6.6.2 1 .4 1.4.5.6.2 1.1.1 1.5.1.5-.1 1.3-.5 1.5-1 .2-.5.2-.9.1-1l-.3-.2Z" />
                </svg>
                Contact via WhatsApp
              </a>

              <p className="mt-3 text-center text-xs text-[var(--color-ink-soft)]">
                Opens a pre-filled message on WhatsApp
              </p>
            </div>
          </div>
        </div>

        {similar.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display mb-6 text-2xl text-[var(--color-ink)]">
              Similar Properties
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}