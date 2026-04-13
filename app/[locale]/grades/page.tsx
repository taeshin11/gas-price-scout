import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { getAllGrades, getStatesRanked } from "@/lib/fallback";
import { formatPrice, formatChange, getChangeColor, getChangeArrow } from "@/lib/utils";

export const revalidate = 604800;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Fuel Types & Gas Grades — Regular, Premium, Diesel, E85",
    description: "Compare regular, midgrade, premium, diesel, and E85 gas prices across all 50 US states. See national averages by fuel grade.",
  };
}

export default async function GradesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tg = await getTranslations({ locale, namespace: "grade" });
  const ts = await getTranslations({ locale, namespace: "sections" });

  const grades = getAllGrades();
  const states = getStatesRanked();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-amber-600 mb-6 flex items-center gap-2">
        <Link href={`/${locale}`} className="hover:text-amber-800">Home</Link>
        <span>›</span>
        <span className="text-amber-900 font-medium">Fuel Grades</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-2">
          Fuel Grade Comparison
        </h1>
        <p className="text-amber-700">
          National average prices for all fuel types, updated weekly.
        </p>
      </div>

      {/* Grade Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {grades.map((grade) => (
          <Link key={grade.slug} href={`/${locale}/grades/${grade.slug}`}>
            <div className="bg-white border border-amber-200 rounded-xl p-6 hover:border-amber-400 hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-stone-900">{grade.name}</h2>
                  {grade.octane && (
                    <span className="text-xs text-amber-600 font-medium">
                      {grade.octane} Octane
                    </span>
                  )}
                </div>
                <div
                  className="w-4 h-4 rounded-full mt-1"
                  style={{ backgroundColor: grade.color }}
                />
              </div>

              <div className="text-4xl font-bold font-mono tabular-nums text-stone-900 mb-1">
                {formatPrice(grade.nationalAvg)}
              </div>
              <div className="text-sm text-stone-500 mb-3">National Average / gallon</div>

              <div className={`text-sm font-mono font-semibold ${getChangeColor(grade.weekChange)}`}>
                {getChangeArrow(grade.weekChange)} {formatChange(grade.weekChange)} this week
              </div>

              <p className="text-xs text-stone-500 mt-4 leading-relaxed line-clamp-2">
                {grade.description}
              </p>

              <div className="mt-4 text-xs text-amber-600 font-medium">
                View all 50 states →
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="bg-white border border-amber-200 rounded-xl shadow-sm overflow-hidden mb-12">
        <div className="p-4 bg-amber-50 border-b border-amber-200">
          <h2 className="text-lg font-bold text-amber-900">{ts("gradeComparison")}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-amber-50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-amber-700 uppercase tracking-wide">State</th>
                {grades.slice(0, 4).map((g) => (
                  <th key={g.slug} className="px-4 py-3 text-left text-xs font-semibold text-amber-700 uppercase tracking-wide">
                    {g.name.split(" ")[0]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-50">
              {states.slice(0, 15).map((state, idx) => (
                <tr
                  key={state.slug}
                  className={`hover:bg-amber-50 transition-colors ${idx % 2 === 0 ? "bg-white" : "bg-amber-50/30"}`}
                >
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
                  <td className="px-4 py-3 font-mono text-sm font-semibold text-emerald-700">
                    {formatPrice(state.regular)}
                  </td>
                  <td className="px-4 py-3 font-mono text-sm text-yellow-700">
                    {formatPrice(state.midgrade)}
                  </td>
                  <td className="px-4 py-3 font-mono text-sm text-purple-700">
                    {formatPrice(state.premium)}
                  </td>
                  <td className="px-4 py-3 font-mono text-sm text-gray-600">
                    {formatPrice(state.diesel)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-amber-50 border-t border-amber-100 text-center">
          <Link
            href={`/${locale}/states`}
            className="text-sm text-amber-600 hover:text-amber-800 font-medium"
          >
            View all 50 states →
          </Link>
        </div>
      </div>
    </div>
  );
}
