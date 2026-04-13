"use client";

import { useState } from "react";
import Link from "next/link";
import type { StatePrice } from "@/types/gas";
import { formatPrice, formatChange, getChangeColor, getChangeArrow } from "@/lib/utils";
import { ChevronUp, ChevronDown } from "lucide-react";

interface PriceTableProps {
  states: StatePrice[];
  locale: string;
  messages: {
    rank: string;
    state: string;
    regular: string;
    midgrade: string;
    premium: string;
    diesel: string;
    change: string;
  };
}

type SortKey = "rank" | "regular" | "premium" | "diesel" | "weekChange";

export default function PriceTable({ states, locale, messages }: PriceTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("regular");
  const [sortAsc, setSortAsc] = useState(true);

  const sorted = [...states].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    return sortAsc ? aVal - bVal : bVal - aVal;
  });

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ChevronUp size={14} className="text-amber-300" />;
    return sortAsc ? (
      <ChevronUp size={14} className="text-amber-700" />
    ) : (
      <ChevronDown size={14} className="text-amber-700" />
    );
  };

  const th = (label: string, key: SortKey) => (
    <th
      key={key}
      onClick={() => handleSort(key)}
      className="px-4 py-3 text-left text-xs font-semibold text-amber-700 uppercase tracking-wide cursor-pointer select-none hover:bg-amber-100 transition-colors"
    >
      <div className="flex items-center gap-1">
        {label} <SortIcon col={key} />
      </div>
    </th>
  );

  return (
    <div className="overflow-x-auto rounded-xl border border-amber-200 shadow-sm">
      <table className="min-w-full bg-white">
        <thead className="bg-amber-50 sticky top-0">
          <tr>
            {th(messages.rank, "rank")}
            <th className="px-4 py-3 text-left text-xs font-semibold text-amber-700 uppercase tracking-wide">
              {messages.state}
            </th>
            {th(messages.regular, "regular")}
            {th(messages.premium, "premium")}
            {th(messages.diesel, "diesel")}
            {th(messages.change, "weekChange")}
          </tr>
        </thead>
        <tbody className="divide-y divide-amber-50">
          {sorted.map((state, idx) => (
            <tr
              key={state.slug}
              className={`hover:bg-amber-50 transition-colors ${idx % 2 === 0 ? "bg-white" : "bg-amber-50/30"}`}
            >
              <td className="px-4 py-3 text-sm text-amber-600 font-mono w-12">
                #{idx + 1}
              </td>
              <td className="px-4 py-3">
                <Link
                  href={`/${locale}/states/${state.slug}`}
                  className="font-medium text-amber-900 hover:text-amber-600 transition-colors flex items-center gap-2"
                >
                  <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-mono">
                    {state.abbr}
                  </span>
                  {state.name}
                </Link>
              </td>
              <td className="px-4 py-3 font-mono text-sm font-semibold text-stone-800">
                {formatPrice(state.regular)}
              </td>
              <td className="px-4 py-3 font-mono text-sm text-stone-600">
                {formatPrice(state.premium)}
              </td>
              <td className="px-4 py-3 font-mono text-sm text-stone-600">
                {formatPrice(state.diesel)}
              </td>
              <td className={`px-4 py-3 text-sm font-mono font-semibold ${getChangeColor(state.weekChange)}`}>
                {getChangeArrow(state.weekChange)} {formatChange(state.weekChange)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
