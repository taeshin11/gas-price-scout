"use client";

import { useState } from "react";
import type { GradeKey } from "@/types/gas";
import { formatPrice } from "@/lib/utils";

interface GradeData {
  regular: number;
  midgrade: number;
  premium: number;
  diesel: number;
  e85?: number;
}

interface GradeTabProps {
  data: GradeData;
  messages: {
    regular: string;
    midgrade: string;
    premium: string;
    diesel: string;
    e85: string;
  };
}

const GRADE_COLORS: Record<string, string> = {
  regular: "bg-emerald-100 text-emerald-800 border-emerald-300",
  midgrade: "bg-yellow-100 text-yellow-800 border-yellow-300",
  premium: "bg-purple-100 text-purple-800 border-purple-300",
  diesel: "bg-gray-100 text-gray-800 border-gray-300",
  e85: "bg-green-100 text-green-800 border-green-300",
};

export default function GradeTab({ data, messages }: GradeTabProps) {
  const [active, setActive] = useState<GradeKey>("regular");

  const grades: Array<{ key: GradeKey; label: string; price: number }> = [
    { key: "regular", label: messages.regular, price: data.regular },
    { key: "midgrade", label: messages.midgrade, price: data.midgrade },
    { key: "premium", label: messages.premium, price: data.premium },
    { key: "diesel", label: messages.diesel, price: data.diesel },
  ];

  if (data.e85) {
    grades.push({ key: "e85", label: messages.e85, price: data.e85 });
  }

  return (
    <div className="bg-white rounded-xl border border-amber-200 shadow-sm p-6">
      <div className="flex flex-wrap gap-2 mb-6">
        {grades.map((g) => (
          <button
            key={g.key}
            onClick={() => setActive(g.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
              active === g.key
                ? GRADE_COLORS[g.key]
                : "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>

      {grades.map((g) =>
        active === g.key ? (
          <div key={g.key} className="text-center py-4">
            <div className="text-5xl font-bold font-mono tabular-nums text-stone-900 mb-2">
              {formatPrice(g.price)}
            </div>
            <div className="text-stone-500 text-sm">per gallon — {g.label}</div>
          </div>
        ) : null
      )}

      {/* All grades overview */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        {grades.map((g) => (
          <button
            key={g.key}
            onClick={() => setActive(g.key)}
            className={`p-3 rounded-lg border text-center transition-all ${
              active === g.key ? "border-amber-400 bg-amber-50" : "border-amber-100 hover:bg-amber-50"
            }`}
          >
            <div className="text-xs text-stone-500 mb-1">{g.label}</div>
            <div className="font-mono font-semibold text-stone-800">{formatPrice(g.price)}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
