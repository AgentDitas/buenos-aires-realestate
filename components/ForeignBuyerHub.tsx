import { Property } from "@/data/properties";
import { NEIGHBORHOOD_INFO } from "@/data/neighborhoodInfo";
import { estimatePurchaseCosts, formatRange, formatUSD } from "@/lib/purchaseEstimate";

const BUYING_STEPS = [
  "Inquiry",
  "Property Video Tour",
  "Offer",
  "Attorney Review",
  "Purchase Agreement",
  "Closing",
  "Receive Keys",
];

function StarRating({ value }: { value: number }) {
  return (
    <span className="text-[var(--color-brass)]" aria-label={`${value} out of 5`}>
      {"★".repeat(value)}
      <span className="text-[var(--color-line)]">{"★".repeat(5 - value)}</span>
    </span>
  );
}

export default function ForeignBuyerHub({ property }: { property: Property }) {
  const isBuy = property.operation === "buy";
  const info = NEIGHBORHOOD_INFO[property.neighborhood];
  const costs = isBuy
    ? estimatePurchaseCosts(property.priceUSD, property.areaM2)
    : null;

  return (
    <div className="mt-16 border-t border-[var(--color-line)] pt-12">
      {isBuy && costs && (
        <>
          {/* Buying as a Foreigner */}
          <div className="rounded-sm border border-[var(--color-line)] bg-[var(--color-canvas-alt)] p-6">
            <h2 className="font-display text-xl text-[var(--color-ink)]">
              🌎 Buying as a Foreigner
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-brass)]">
                  Can Foreigners Buy?
                </p>
                <p className="mt-1 text-sm text-[var(--color-ink)]">✅ Yes</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-brass)]">
                  Estimated Time to Close
                </p>
                <p className="mt-1 text-sm text-[var(--color-ink)]">30–60 days</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-brass)]">
                  Purchase Method
                </p>
                <p className="mt-1 text-sm text-[var(--color-ink)]">Remote purchase available</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-brass)]">
                  Language Support
                </p>
                <p className="mt-1 text-sm text-[var(--color-ink)]">English-speaking agent available</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-brass)]">
                  Legal Assistance
                </p>
                <p className="mt-1 text-sm text-[var(--color-ink)]">Available through trusted partners</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-brass)]">
                  Financing
                </p>
                <p className="mt-1 text-sm text-[var(--color-ink)]">
                  Cash purchase recommended — mortgage availability varies
                </p>
              </div>
            </div>
          </div>

          {/* Cost breakdown */}
          <div className="mt-8">
            <h2 className="font-display text-xl text-[var(--color-ink)]">
              💰 Estimated Total Purchase Cost
            </h2>
            <div className="mt-4 overflow-hidden rounded-sm border border-[var(--color-line)]">
              {[
                ["Property Price", formatUSD(property.priceUSD)],
                ["Estimated Closing Costs", formatRange(costs.closingCostMin, costs.closingCostMax)],
                ["Estimated Cash Required", formatRange(costs.cashRequiredMin, costs.cashRequiredMax)],
                ["Monthly HOA (expensas)", `${formatUSD(costs.monthlyHOA)}/mo`],
                ["Estimated Property Taxes", `${formatUSD(costs.monthlyPropertyTax)}/mo`],
              ].map(([label, value], i) => (
                <div
                  key={label}
                  className={`flex items-center justify-between px-4 py-3 text-sm ${
                    i % 2 === 0 ? "bg-white" : "bg-[var(--color-canvas-alt)]"
                  }`}
                >
                  <span className="text-[var(--color-ink-soft)]">{label}</span>
                  <span className="font-display text-[var(--color-ink)]">{value}</span>
                </div>
              ))}
            </div>
            <p className="mt-2 text-xs text-[var(--color-ink-soft)]">
              Estimates for illustration only — actual costs vary by transaction.
            </p>
          </div>

          {/* Buying process */}
          <div className="mt-8">
            <h2 className="font-display text-xl text-[var(--color-ink)]">
              📄 Buying Process
            </h2>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-0">
              {BUYING_STEPS.map((step, i) => (
                <div key={step} className="flex items-center">
                  <span className="rounded-full border border-[var(--color-line)] bg-white px-3 py-1.5 text-xs font-medium text-[var(--color-ink)]">
                    {i + 1}. {step}
                  </span>
                  {i < BUYING_STEPS.length - 1 && (
                    <span className="mx-2 hidden text-[var(--color-brass)] sm:inline">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Neighborhood snapshot */}
      {info && (
        <div className="mt-8">
          <h2 className="font-display text-xl text-[var(--color-ink)]">
            📍 Neighborhood Snapshot — {property.neighborhood}
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 rounded-sm border border-[var(--color-line)] bg-white p-6 sm:grid-cols-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--color-ink-soft)]">Walkability</span>
              <StarRating value={info.walkability} />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--color-ink-soft)]">Nightlife</span>
              <StarRating value={info.nightlife} />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--color-ink-soft)]">Families</span>
              <StarRating value={info.families} />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--color-ink-soft)]">Parks</span>
              <StarRating value={info.parks} />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--color-ink-soft)]">Luxury</span>
              <StarRating value={info.luxury} />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--color-ink-soft)]">Digital Nomads</span>
              <StarRating value={info.digitalNomads} />
            </div>

            <div className="col-span-full mt-2 border-t border-[var(--color-line)] pt-4 text-sm">
              <p className="text-[var(--color-ink-soft)]">
                Average Price/m²:{" "}
                <span className="text-[var(--color-ink)]">
                  {formatUSD(info.avgPricePerM2)}
                </span>
              </p>
              <p className="mt-1 text-[var(--color-ink-soft)]">
                Popular Restaurants:{" "}
                <span className="text-[var(--color-ink)]">{info.popularRestaurants}</span>
              </p>
              <p className="mt-1 text-[var(--color-ink-soft)]">
                Subway Access:{" "}
                <span className="text-[var(--color-ink)]">{info.subwayAccess}</span>
              </p>
            </div>
          </div>
          <p className="mt-2 text-xs text-[var(--color-ink-soft)]">
            Illustrative estimates for prototype purposes only.
          </p>
        </div>
      )}

      {/* Consultation CTA */}
      <div className="mt-8 rounded-sm bg-[var(--color-patina)] p-6 text-center text-white">
        <h2 className="font-display text-xl">📞 Need Help?</h2>
        <p className="mt-2 text-sm text-white/90">
          Book a free consultation — we&apos;ll connect you with a realtor,
          attorney, accountant, and property manager.
        </p>
        <a
          href={`https://wa.me/${property.agentWhatsapp}?text=${encodeURIComponent(
            "Hi, I would like to book a free consultation about buying property in Buenos Aires."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block rounded-sm bg-white px-6 py-3 text-sm font-medium text-[var(--color-patina)]"
        >
          Book a Free Consultation
        </a>
      </div>
    </div>
  );
}
