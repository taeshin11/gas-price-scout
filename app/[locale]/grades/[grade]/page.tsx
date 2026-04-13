import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { getAllGrades, getGradeBySlug, getAllStates } from "@/lib/fallback";
import { formatPrice, formatChange, getChangeColor, getChangeArrow, WEEK_DATE } from "@/lib/utils";

export const revalidate = 604800;

export async function generateStaticParams() {
  const grades = getAllGrades();
  const locales = ["en", "ko", "ja", "zh", "es", "fr", "de", "pt"];
  return locales.flatMap((locale) =>
    grades.map((grade) => ({ locale, grade: grade.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; grade: string }>;
}): Promise<Metadata> {
  const { grade: gradeSlug } = await params;
  const grade = getGradeBySlug(gradeSlug);
  if (!grade) return { title: "Grade Not Found" };

  return {
    title: `${grade.name} Gas Prices by State — April 2026`,
    description: `${grade.name} gas prices for all 50 US states. National average: ${formatPrice(grade.nationalAvg)} per gallon. Updated weekly.`,
  };
}

export default async function GradePage({
  params,
}: {
  params: Promise<{ locale: string; grade: string }>;
}) {
  const { locale, grade: gradeSlug } = await params;
  const grade = getGradeBySlug(gradeSlug);
  if (!grade) notFound();

  const states = getAllStates();

  // Sort states by price for this grade
  const sortedStates = [...states].sort((a, b) => {
    const validGrades = ["regular", "midgrade", "premium", "diesel"] as const;
    type ValidGrade = (typeof validGrades)[number];
    const safeSlug: ValidGrade = (validGrades as readonly string[]).includes(gradeSlug)
      ? (gradeSlug as ValidGrade)
      : "regular";
    const aPrice = a[safeSlug];
    const bPrice = b[safeSlug];
    return aPrice - bPrice;
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": `${grade.name} Gas Prices by State`,
    "description": `Weekly ${grade.name} gas prices for all 50 US states`,
    "temporalCoverage": WEEK_DATE,
    "keywords": `${grade.name} gas prices, fuel prices by state`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-amber-600 mb-6 flex items-center gap-2">
          <Link href={`/${locale}`} className="hover:text-amber-800">Home</Link>
          <span>›</span>
          <Link href={`/${locale}/grades`} className="hover:text-amber-800">Fuel Grades</Link>
          <span>›</span>
          <span className="text-amber-900 font-medium">{grade.name}</span>
        </nav>

        {/* Hero */}
        <div className="mb-8">
          <div className="flex items-start gap-4 flex-wrap">
            <div
              className="w-4 h-full min-h-16 rounded-full"
              style={{ backgroundColor: grade.color, width: 6 }}
            />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-1">
                {grade.name} Gas Prices — All 50 States
              </h1>
              <p className="text-amber-700">Week of {WEEK_DATE}</p>
              {grade.octane && (
                <span className="inline-block mt-2 text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full font-medium">
                  {grade.octane} Octane
                </span>
              )}
            </div>
          </div>
        </div>

        {/* National avg card */}
        <div className="bg-white border-2 border-amber-300 rounded-2xl px-8 py-6 shadow-lg inline-block mb-8">
          <div className="text-sm text-amber-600 font-medium mb-1">National Average — {grade.name}</div>
          <div className="text-5xl font-bold font-mono tabular-nums text-stone-900 mb-2">
            {formatPrice(grade.nationalAvg)}
          </div>
          <div className="text-sm text-stone-500 mb-2">per gallon</div>
          <div className={`font-semibold font-mono ${getChangeColor(grade.weekChange)}`}>
            {getChangeArrow(grade.weekChange)} {formatChange(grade.weekChange)} this week
          </div>
        </div>

        {/* Description */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
          <p className="text-stone-700 leading-relaxed">{grade.description}</p>
          <p className="text-stone-500 text-sm mt-2">
            <span className="font-medium">Best for:</span> {grade.vehicles}
          </p>
        </div>

        {/* State ranking table */}
        <h2 className="text-xl font-bold text-amber-900 mb-4">
          {grade.name} Prices — All States (Cheapest First)
        </h2>
        <div className="overflow-x-auto rounded-xl border border-amber-200 shadow-sm mb-8">
          <table className="min-w-full bg-white">
            <thead className="bg-amber-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-amber-700 uppercase tracking-wide">Rank</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-amber-700 uppercase tracking-wide">State</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-amber-700 uppercase tracking-wide">
                  {grade.name} ($/gal)
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-amber-700 uppercase tracking-wide">Weekly Change</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-50">
              {sortedStates.map((state, idx) => {
                const validGradeKeys = ["regular", "midgrade", "premium", "diesel"] as const;
                type ValidGradeKey = (typeof validGradeKeys)[number];
                const safeKey: ValidGradeKey = (validGradeKeys as readonly string[]).includes(gradeSlug)
                  ? (gradeSlug as ValidGradeKey)
                  : "regular";
                const price = state[safeKey];
                return (
                  <tr
                    key={state.slug}
                    className={`hover:bg-amber-50 transition-colors ${idx % 2 === 0 ? "bg-white" : "bg-amber-50/30"}`}
                  >
                    <td className="px-4 py-3 text-sm text-amber-600 font-mono">#{idx + 1}</td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/${locale}/states/${state.slug}`}
                        className="font-medium text-amber-900 hover:text-amber-600 flex items-center gap-2"
                      >
                        <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-mono">
                          {state.abbr}
                        </span>
                        {state.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 font-mono font-semibold text-stone-800">
                      {formatPrice(price)}
                    </td>
                    <td className={`px-4 py-3 text-sm font-mono font-semibold ${getChangeColor(state.weekChange)}`}>
                      {getChangeArrow(state.weekChange)} {formatChange(state.weekChange)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Other grades */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-amber-900 mb-4">Other Fuel Types</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {getAllGrades()
              .filter((g) => g.slug !== gradeSlug)
              .map((g) => (
                <Link key={g.slug} href={`/${locale}/grades/${g.slug}`}>
                  <div className="bg-white border border-amber-200 rounded-lg p-4 hover:border-amber-400 transition-colors text-center">
                    <div className="text-sm font-medium text-stone-800 mb-1">{g.name}</div>
                    <div className="font-mono font-bold text-stone-900">{formatPrice(g.nationalAvg)}</div>
                    <div className="text-xs text-stone-400">national avg</div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
