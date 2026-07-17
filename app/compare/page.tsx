"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { properties } from "@/data/properties";
import { NEIGHBORHOOD_INFO } from "@/data/neighborhoodInfo";
import { estimatePurchaseCosts, formatRange, formatUSD } from "@/lib/purchaseEstimate";
import { estimateInvestmentScore } from "@/lib/comparisonMetrics";
import { useCompare } from "@/hooks/useCompare";
import { useAppSettings } from "@/contexts/AppSettingsContext";

export default function ComparePage() {
  const { compareIds, removeFromCompare, clearCompare, loaded } = useCompare();
  const { t, language } = useAppSettings();
  const items = properties.filter((p) => compareIds.includes(p.id));

  if (!loaded) {
    return (
      <div className="min-h-screen">
        <Header />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />

      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl text-[var(--color-ink)]">
              {t("compareProperties")}
            </h1>
            <p className="mt-1 text-sm text-[var(--color-ink-soft)]">{t("upToThree")}</p>
          </div>
          {items.length > 0 && (
            <button
              onClick={clearCompare}
              className="rounded-sm border border-[var(--color-ink)] px-3 py-2 text-sm font-medium text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-white"
            >
              {t("clearAll")}
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="rounded-sm border border-[var(--color-line)] bg-[var(--color-canvas-alt)] p-12 text-center">
            <p className="text-[var(--color-ink-soft)]">{t("noPropertiesSelected")}</p>
            <Link
              href="/search"
              className="mt-4 inline-block rounded-sm bg-[var(--color-ink)] px-5 py-2.5 text-sm font-medium text-white"
            >
              {t("browseListings")}
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse text-sm">
              <thead>
                <tr>
                  <th className="w-40 border-b border-[var(--color-line)] p-3 text-left text-xs font-medium uppercase tracking-wide text-[var(--color-brass)]">
                    &nbsp;
                  </th>
                  {items.map((p) => (
                    <th key={p.id} className="border-b border-[var(--color-line)] p-3 text-left">
                      <div
                        className="mb-2 h-24 w-full rounded-sm bg-[var(--color-canvas-alt)] bg-cover bg-center"
                        style={{ backgroundImage: `url(${p.image})` }}
                      />
                      <Link
                        href={`/property/${p.id}`}
                        className="font-display text-base text-[var(--color-ink)] hover:underline"
                      >
                        {language === "ES" ? p.titleEs : p.title}
                      </Link>
                      <p className="mt-1 text-xs text-[var(--color-ink-soft)]">
                        {p.neighborhood} · {p.type}
                      </p>
                      <button
                        onClick={() => removeFromCompare(p.id)}
                        className="mt-2 text-xs text-[var(--color-brass)] hover:underline"
                      >
                        {t("remove")}
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    label: t("price"),
                    render: (p: (typeof items)[number]) =>
                      p.operation === "rent"
                        ? `${formatUSD(p.priceUSD)}/mo`
                        : formatUSD(p.priceUSD),
                  },
                  {
                    label: `${t("bed")} / ${t("bath")}`,
                    render: (p: (typeof items)[number]) => `${p.bedrooms} ${t("bed")} · ${p.bathrooms} ${t("bath")}`,
                  },
                  {
                    label: t("size"),
                    render: (p: (typeof items)[number]) => `${p.areaM2} m²`,
                  },
                  {
                    label: t("estCashNeeded"),
                    render: (p: (typeof items)[number]) => {
                      if (p.operation !== "buy") return "—";
                      const c = estimatePurchaseCosts(p.priceUSD, p.areaM2);
                      return formatRange(c.cashRequiredMin, c.cashRequiredMax);
                    },
                  },
                  {
                    label: t("estClosingCosts"),
                    render: (p: (typeof items)[number]) => {
                      if (p.operation !== "buy") return "—";
                      const c = estimatePurchaseCosts(p.priceUSD, p.areaM2);
                      return formatRange(c.closingCostMin, c.closingCostMax);
                    },
                  },
                  {
                    label: t("monthlyHoaShort"),
                    render: (p: (typeof items)[number]) => {
                      const c = estimatePurchaseCosts(p.priceUSD, p.areaM2);
                      return `${formatUSD(c.monthlyHOA)}/mo`;
                    },
                  },
                  {
                    label: t("walkability"),
                    render: (p: (typeof items)[number]) =>
                      "★".repeat(NEIGHBORHOOD_INFO[p.neighborhood]?.walkability ?? 0) || "—",
                  },
                  {
                    label: t("nightlife"),
                    render: (p: (typeof items)[number]) =>
                      "★".repeat(NEIGHBORHOOD_INFO[p.neighborhood]?.nightlife ?? 0) || "—",
                  },
                  {
                    label: t("investmentScore"),
                    render: (p: (typeof items)[number]) => `${estimateInvestmentScore(p)}/10`,
                  },
                  {
                    label: t("foreignBuyerFriendly"),
                    render: (p: (typeof items)[number]) =>
                      p.operation === "buy" ? t("yes") : "N/A",
                  },
                  {
                    label: t("remoteClosing"),
                    render: (p: (typeof items)[number]) =>
                      p.operation === "buy" ? t("available") : "N/A",
                  },
                ].map((row) => (
                  <tr key={row.label}>
                    <td className="border-b border-[var(--color-line)] p-3 text-xs font-medium uppercase tracking-wide text-[var(--color-ink-soft)]">
                      {row.label}
                    </td>
                    {items.map((p) => (
                      <td
                        key={p.id}
                        className="border-b border-[var(--color-line)] p-3 text-[var(--color-ink)]"
                      >
                        {row.render(p)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-xs text-[var(--color-ink-soft)]">
              {t("compareEstimatesNote")}
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}