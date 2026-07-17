// Illustrative scoring formula for prototype purposes only —
// not a real investment or financial model.

import { Property } from "@/data/properties";
import { NEIGHBORHOOD_INFO } from "@/data/neighborhoodInfo";

export function estimateInvestmentScore(property: Property): number {
  const info = NEIGHBORHOOD_INFO[property.neighborhood];
  if (!info) return 5;

  const pricePerM2 = property.priceUSD / property.areaM2;
  const ratio = info.avgPricePerM2 / pricePerM2;
  let score = 5 + (ratio - 1) * 10;
  score = Math.max(1, Math.min(10, score));
  return Math.round(score * 10) / 10;
}
