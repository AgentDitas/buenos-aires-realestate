import { Property } from "@/data/properties";
import { getAlturaScore } from "@/lib/alturaScore";
import { useAppSettings } from "@/contexts/AppSettingsContext";

export default function AlturaScoreBadge({ property }: { property: Property }) {
  const { t } = useAppSettings();
  const { overall } = getAlturaScore(property);

  return (
    <span className="text-xs font-medium text-[var(--color-brass)]">
      {t("alturaScore")}: {overall}/10
    </span>
  );
}