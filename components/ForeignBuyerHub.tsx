import { Property } from "@/data/properties";
import { NEIGHBORHOOD_INFO } from "@/data/neighborhoodInfo";
import { estimatePurchaseCosts, formatRange, formatUSD } from "@/lib/purchaseEstimate";
import { useAppSettings } from "@/contexts/AppSettingsContext";

function StarRating({ value }: { value: number }) {
  return (
    <span className="text-[var(--color-brass)]" aria-label={`${value} out of 5`}>
      {"★".repeat(value)}
      <span className="text-[var(--color-line)]">{"★".repeat(5 - value)}</span>
    </span>
  );
}

export default function ForeignBuyerHub({ property }: { property: Property }) {
  const { t } = useAppSettings();
  const isBuy = property.operation === "buy";
  const info = NEIGHBORHOOD_INFO[property.neighborhood];
  const costs = isBuy
    ? estimatePurchaseCosts(property.priceUSD, property.areaM2)
    : null;

  const buyingSteps = [
    t("stepInquiry"),
    t("stepVideoTour"),
    t("stepOffer"),
    t("stepAttorneyReview"),
    t("stepPurchaseAgreement"),
    t("stepClosing"),
    t("stepKeys"),
  ];

  return (
    <div className="mt-16 border-t border-[var(--color-line)] pt-12">
      {isBuy && costs && (
        <>
          <div className="rounded-sm border border-[var(--color-line)] bg-[var(--color-canvas-alt)] p-6">
            <h2 className="font-display text-xl text-[var(--color-ink)]">
              {t("buyingAsForeigner")}
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-brass)]">
                  {t("canForeignersBuy")}
                </p>
                <p className="mt-1 text-sm text-[var(--color-ink)]">{t("yesAnswer")}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-brass)]">
                  {t("estimatedTimeToClose")}
                </p>
                <p className="mt-1 text-sm text-[var(--color-ink)]">{t("days3060")}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-brass)]">
                  {t("purchaseMethod")}
                </p>
                <p className="mt-1 text-sm text-[var(--color-ink)]">{t("remotePurchaseAvailable")}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-brass)]">
                  {t("languageSupport")}
                </p>
                <p className="mt-1 text-sm text-[var(--color-ink)]">{t("englishSpeakingAgentAvailable")}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-brass)]">
                  {t("legalAssistance")}
                </p>
                <p className="mt-1 text-sm text-[var(--color-ink)]">{t("availableTrustedPartners")}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-brass)]">
                  {t("financing")}
                </p>
                <p className="mt-1 text-sm text-[var(--color-ink)]">{t("financingDetail")}</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="font-display text-xl text-[var(--color-ink)]">
              {t("estimatedTotalCost")}
            </h2>
            <div className="mt-4 overflow-hidden rounded-sm border border-[var(--color-line)]">
              {[
                [t("propertyPrice"), formatUSD(property.priceUSD)],
                [t("estimatedClosingCosts"), formatRange(costs.closingCostMin, costs.closingCostMax)],
                [t("estimatedCashRequired"), formatRange(costs.cashRequiredMin, costs.cashRequiredMax)],
                [t("monthlyHoa"), `${formatUSD(costs.monthlyHOA)}/mo`],
                [t("estimatedPropertyTaxes"), `${formatUSD(costs.monthlyPropertyTax)}/mo`],
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
              {t("estimatesIllustrationOnly")}
            </p>
          </div>

          <div className="mt-8">
            <h2 className="font-display text-xl text-[var(--color-ink)]">
              {t("buyingProcess")}
            </h2>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-0">
              {buyingSteps.map((step, i) => (
                <div key={step} className="flex items-center">
                  <span className="rounded-full border border-[var(--color-line)] bg-white px-3 py-1.5 text-xs font-medium text-[var(--color-ink)]">
                    {i + 1}. {step}
                  </span>
                  {i < buyingSteps.length - 1 && (
                    <span className="mx-2 hidden text-[var(--color-brass)] sm:inline">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {info && (
        <div className="mt-8">
          <h2 className="font-display text-xl text-[var(--color-ink)]">
            {t("neighborhoodSnapshot")} — {property.neighborhood}
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 rounded-sm border border-[var(--color-line)] bg-white p-6 sm:grid-cols-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--color-ink-soft)]">{t("walkability")}</span>
              <StarRating value={info.walkability} />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--color-ink-soft)]">{t("nightlife")}</span>
              <StarRating value={info.nightlife} />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--color-ink-soft)]">{t("families")}</span>
              <StarRating value={info.families} />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--color-ink-soft)]">{t("parks")}</span>
              <StarRating value={info.parks} />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--color-ink-soft)]">{t("luxury")}</span>
              <StarRating value={info.luxury} />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--color-ink-soft)]">{t("digitalNomads")}</span>
              <StarRating value={info.digitalNomads} />
            </div>

            <div className="col-span-full mt-2 border-t border-[var(--color-line)] pt-4 text-sm">
              <p className="text-[var(--color-ink-soft)]">
                {t("avgPricePerM2")}:{" "}
                <span className="text-[var(--color-ink)]">
                  {formatUSD(info.avgPricePerM2)}
                </span>
              </p>
              <p className="mt-1 text-[var(--color-ink-soft)]">
                {t("popularRestaurants")}:{" "}
                <span className="text-[var(--color-ink)]">{info.popularRestaurants}</span>
              </p>
              <p className="mt-1 text-[var(--color-ink-soft)]">
                {t("subwayAccess")}:{" "}
                <span className="text-[var(--color-ink)]">{info.subwayAccess}</span>
              </p>
            </div>
          </div>
          <p className="mt-2 text-xs text-[var(--color-ink-soft)]">
            {t("illustrativeEstimatesOnly")}
          </p>
        </div>
      )}

      <div className="mt-8 rounded-sm bg-[var(--color-patina)] p-6 text-center text-white">
        <h2 className="font-display text-xl">{t("needHelp")}</h2>
        <p className="mt-2 text-sm text-white/90">{t("bookConsultation")}</p>
        <a
          href={`https://wa.me/${property.agentWhatsapp}?text=${encodeURIComponent(
            "Hi, I would like to book a free consultation about buying property in Buenos Aires."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block rounded-sm bg-white px-6 py-3 text-sm font-medium text-[var(--color-patina)]"
        >
          {t("bookFreeConsultation")}
        </a>
      </div>
    </div>
  );
}