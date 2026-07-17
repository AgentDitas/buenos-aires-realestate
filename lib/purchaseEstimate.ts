// Rough illustrative formulas for prototype purposes — not real legal,
// tax, or financial advice. Replace with sourced figures before launch.

export function estimatePurchaseCosts(priceUSD: number, areaM2: number) {
    const closingCostMin = Math.round(priceUSD * 0.05);
    const closingCostMax = Math.round(priceUSD * 0.08);
    const cashRequiredMin = priceUSD + closingCostMin;
    const cashRequiredMax = priceUSD + closingCostMax;
    const monthlyHOA = Math.round(areaM2 * 3);
    const monthlyPropertyTax = Math.round((priceUSD * 0.005) / 12);
  
    return {
      closingCostMin,
      closingCostMax,
      cashRequiredMin,
      cashRequiredMax,
      monthlyHOA,
      monthlyPropertyTax,
    };
  }
  
  function formatUSD(n: number) {
    return `$${n.toLocaleString("en-US")}`;
  }
  
  export function formatRange(min: number, max: number) {
    return `${formatUSD(min)}–${formatUSD(max)}`;
  }
  
  export { formatUSD };
  