import Link from "next/link";
import type { StatePrice } from "@/types/gas";
import { formatPrice, formatChange, getChangeColor, getChangeArrow } from "@/lib/utils";

interface StateCardProps {
  state: StatePrice;
  locale: string;
  rank?: number;
}

export default function StateCard({ state, locale, rank }: StateCardProps) {
  const isExpensive = state.regular > 3.40;

  return (
    <Link href={`/${locale}/states/${state.slug}`}>
      <div className="bg-white border border-amber-200 rounded-xl p-4 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer">
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="flex items-center gap-2">
              {rank && (
                <span className="text-xs text-amber-500 font-mono">#{rank}</span>
              )}
              <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-mono font-semibold">
                {state.abbr}
              </span>
            </div>
            <h3 className="font-semibold text-amber-900 mt-1">{state.name}</h3>
          </div>
          <span className={`text-sm font-mono font-semibold ${getChangeColor(state.weekChange)}`}>
            {getChangeArrow(state.weekChange)} {formatChange(state.weekChange)}
          </span>
        </div>

        <div className="text-3xl font-bold font-mono tabular-nums text-stone-900 mb-2">
          {formatPrice(state.regular)}
        </div>
        <div className="text-xs text-stone-500 mb-3">Regular / gallon</div>

        <div className="grid grid-cols-2 gap-2 text-xs text-stone-500">
          <div>
            <span className="font-medium">Premium:</span>{" "}
            <span className="font-mono">{formatPrice(state.premium)}</span>
          </div>
          <div>
            <span className="font-medium">Diesel:</span>{" "}
            <span className="font-mono">{formatPrice(state.diesel)}</span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
            isExpensive ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"
          }`}>
            {isExpensive ? "Above avg" : "Below avg"}
          </span>
          <span className="text-xs text-amber-500">{state.stations.toLocaleString()} stations</span>
        </div>
      </div>
    </Link>
  );
}
