import { Property } from "@/data/properties";
import { getAlturaScore, ScoreItem } from "@/lib/alturaScore";
import { useAppSettings } from "@/contexts/AppSettingsContext";

const LABEL_KEYS: Record<
  ScoreItem["key"],
  "investmentPotential" | "foreignBuyerFriendliness" | "walkability" | "valueForMoney"
> = {
  investment: "investmentPotential",
  foreignBuyer: "foreignBuyerFriendliness",
  walkability: "walkability",
  valueForMoney: "valueForMoney",
};

const EXPLANATION_KEYS: Record<
  ScoreItem["key"],
  "investmentExplanation" | "foreignBuyerExplanation" | "walkabilityExplanation" | "valueExplanation"
> = {
  investment: "investmentExplanation",
  foreignBuyer: "foreignBuyerExplanation",
  walkability: "walkabilityExplanation",
  valueForMoney: "valueExplanation",
};

export default function AlturaScorePanel({ property }: { property: Property }) {
  const { t } = useAppSettings();
  const { overall, items } = getAlturaScore(property);

  return (
    <div className="mt-8 rounded-sm border border-[var(--color-line)] bg-white p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg text-[var(--color-ink)]">{t("alturaScore")}</h2>
        <span className="font-display text-2xl text-[var(--color-patina)]">{overall}/10</span>
      </div>
      <p className="mt-1 text-xs text-[var(--color-ink-soft)]">{t("alturaScoreIntro")}</p>

      <div className="mt-4 flex flex-col gap-4">
        {items.map((item, i) => (
          <div
            key={item.key}
            className={i > 0 ? "border-t border-[var(--color-line)] pt-3" : ""}
          >
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-[var(--color-ink)]">{t(LABEL_KEYS[item.key])}</span>
              <span className="font-display text-[var(--color-brass)]">{item.value}/10</span>
            </div>
            <p className="mt-1 text-xs text-[var(--color-ink-soft)]">
              {t(EXPLANATION_KEYS[item.key])}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-[var(--color-ink-soft)]">{t("illustrativeEstimatesOnly")}</p>
    </div>
  );
}