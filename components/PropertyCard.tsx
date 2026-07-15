import Link from "next/link";
import { Property } from "@/data/properties";

function formatPrice(property: Property) {
  const price = property.priceUSD.toLocaleString("en-US");
  return property.operation === "rent" ? `$${price}/mo` : `$${price}`;
}

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-sm border border-[var(--color-line)] bg-white/40 transition-shadow hover:shadow-lg">
      <div className="relative overflow-hidden bg-[var(--color-canvas-alt)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={property.image}
          alt={property.title}
          style={{
            width: "100%",
            height: "175px",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
          }}
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium uppercase tracking-wide text-[var(--color-ink)]">
          {property.operation === "buy" ? "For Sale" : "For Rent"}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-brass)]">
          {property.neighborhood} · {property.type}
        </p>
        <h3 className="font-display text-lg leading-snug text-[var(--color-ink)]">
          {property.title}
        </h3>

        <div className="flex items-center gap-4 text-sm text-[var(--color-ink-soft)]">
          <span>{property.bedrooms} bed</span>
          <span>{property.bathrooms} bath</span>
          <span>{property.areaM2} m²</span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="font-display text-xl text-[var(--color-ink)]">
            {formatPrice(property)}
          </span>
          <Link
            href={`/property/${property.id}`}
            className="rounded-sm border border-[var(--color-ink)] px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-[var(--color-ink)] transition-colors hover:bg-[var(--color-ink)] hover:text-white"
          >
            View
          </Link>
        </div>
      </div>
    </article>
  );
}
