// Illustrative scoring formulas for prototype purposes only —
// not a real analytical or financial model.

import { Property, properties } from "@/data/properties";
import { NEIGHBORHOOD_INFO } from "@/data/neighborhoodInfo";
import { estimateInvestmentScore } from "@/lib/comparisonMetrics";

export type ScoreItem = {
  key: "investment" | "foreignBuyer" | "walkability" | "valueForMoney";
  value: number;
};

export type AlturaScoreResult = {
  overall: number;
  items: ScoreItem[];
};

function estimateValueForMoney(property: Property): number {
  const sameOperation = properties.filter((p) => p.operation === property.operation);
  const avgPricePerM2 =
    sameOperation.reduce((sum, p) => sum + p.priceUSD / p.areaM2, 0) / sameOperation.length;
  const pricePerM2 = property.priceUSD / property.areaM2;
  const ratio = avgPricePerM2 / pricePerM2;
  let score = 5 + (ratio - 1) * 10;
  score = Math.max(1, Math.min(10, score));
  return Math.round(score * 10) / 10;
}

export function getAlturaScore(property: Property): AlturaScoreResult {
  const investment = estimateInvestmentScore(property);
  const foreignBuyer = property.operation === "buy" ? 9.5 : 6.5;
  const info = NEIGHBORHOOD_INFO[property.neighborhood];
  const walkability = info ? Math.round((info.walkability / 5) * 10 * 10) / 10 : 5;
  const valueForMoney = estimateValueForMoney(property);

  const items: ScoreItem[] = [
    { key: "investment", value: investment },
    { key: "foreignBuyer", value: foreignBuyer },
    { key: "walkability", value: walkability },
    { key: "valueForMoney", value: valueForMoney },
  ];

  const overall =
    Math.round((items.reduce((sum, i) => sum + i.value, 0) / items.length) * 10) / 10;

  return { overall, items };
}
