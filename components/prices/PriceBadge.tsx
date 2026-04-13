import { formatPrice, getPriceColor } from "@/lib/utils";

interface PriceBadgeProps {
  price: number;
  nationalAvg?: number;
  size?: "sm" | "md" | "lg";
}

export default function PriceBadge({ price, nationalAvg = 3.40, size = "md" }: PriceBadgeProps) {
  const colorClass = getPriceColor(price, nationalAvg);

  const sizeClasses = {
    sm: "text-sm px-2 py-0.5 font-mono",
    md: "text-base px-3 py-1 font-mono font-semibold",
    lg: "text-2xl px-4 py-2 font-mono font-bold",
  };

  return (
    <span className={`inline-block rounded-full ${colorClass} ${sizeClasses[size]}`}>
      {formatPrice(price)}
    </span>
  );
}
