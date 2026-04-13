export function formatPrice(price: number): string {
  return `$${price.toFixed(3)}`;
}

export function formatChange(change: number): string {
  const sign = change >= 0 ? "+" : "";
  return `${sign}${change.toFixed(3)}`;
}

export function getPriceColor(price: number, nationalAvg = 3.40): string {
  if (price < nationalAvg - 0.3) return "bg-emerald-100 text-emerald-800";
  if (price < nationalAvg + 0.3) return "bg-yellow-100 text-yellow-800";
  return "bg-red-100 text-red-800";
}

export function getChangeColor(change: number): string {
  if (change < 0) return "text-emerald-600";
  if (change > 0) return "text-red-500";
  return "text-gray-500";
}

export function getChangeArrow(change: number): string {
  if (change < 0) return "▼";
  if (change > 0) return "▲";
  return "—";
}

export function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export const WEEK_DATE = "April 13, 2026";
export const NATIONAL_AVG = 3.40;
export const NATIONAL_CHANGE = -0.02;
