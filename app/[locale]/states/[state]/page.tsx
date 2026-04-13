import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import {
  getAllStates,
  getStateBySlug,
  getCitiesByState,
  getStateTrendData,
} from "@/lib/fallback";
import {
  formatPrice,
  formatChange,
  getChangeColor,
  getChangeArrow,
  NATIONAL_AVG,
  WEEK_DATE,
} from "@/lib/utils";
import TrendChart from "@/components/prices/TrendChart";
import GradeTab from "@/components/prices/GradeTab";

export const revalidate = 604800;

export async function generateStaticParams() {
  const states = getAllStates();
  const locales = ["en", "ko", "ja", "zh", "es", "fr", "de", "pt"];
  return locales.flatMap((locale) =>
    states.map((state) => ({ locale, state: state.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; state: string }>;
}): Promise<Metadata> {
  const { state: stateSlug } = await params;
  const state = getStateBySlug(stateSlug);
  if (!state) return { title: "State Not Found" };

  return {
    title: `${state.name} Gas Prices This Week: Regular, Premium & Diesel`,
    description: `Current gas prices in ${state.name}: Regular ${formatPrice(state.regular)}, Premium ${formatPrice(state.premium)}, Diesel ${formatPrice(state.diesel)}. Updated weekly.`,
    openGraph: {
      title: `${state.name} Gas Prices — GasPriceScout`,
      description: `Regular: ${formatPrice(state.regular)} | Premium: ${formatPrice(state.premium)} | Diesel: ${formatPrice(state.diesel)}`,
    },
  };
}

export default async function StatePage({
  params,
}: {
  params: Promise<{ locale: string; state: string }>;
}) {
  const { locale, state: stateSlug } = await params;
  const state = getStateBySlug(stateSlug);
  if (!state) notFound();

  const t = await getTranslations({ locale, namespace: "stateDetail" });
  const tg = await getTranslations({ locale, namespace: "grade" });

  const cities = getCitiesByState(stateSlug);
  const trendData = getStateTrendData(stateSlug);
  const vsNational = state.regular - NATIONAL_AVG;
  const allStates = getAllStates().sort((a, b) => a.regular - b.regular);
  const stateRank = allStates.findIndex((s) => s.slug === stateSlug) + 1;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": `${state.name} Gas Prices`,
    "description": `Weekly gas prices for ${state.name}`,
    "spatialCoverage": state.name,
    "temporalCoverage": WEEK_DATE,
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
          <Link href={`/${locale}/states`} className="hover:text-amber-800">States</Link>
          <span>›</span>
          <span className="text-amber-900 font-medium">{state.name}</span>
        </nav>

        {/* Hero */}
        <div className="mb-8">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-1">
                {state.name} {t("title")}
              </h1>
              <p className="text-amber-700">
                {t("weekOf")} {WEEK_DATE} · Rank #{stateRank} of 50
              </p>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold font-mono tabular-nums text-stone-900">
                {formatPrice(state.regular)}
              </div>
              <div className="text-sm text-stone-500">Regular / gallon</div>
              <div className={`text-lg font-semibold font-mono mt-1 ${getChangeColor(state.weekChange)}`}>
                {getChangeArrow(state.weekChange)} {formatChange(state.weekChange)} this week
              </div>
            </div>
          </div>
        </div>

        {/* vs National */}
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 ${
          vsNational < 0 ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
        }`}>
          {vsNational < 0 ? "▼" : "▲"} {Math.abs(vsNational).toFixed(3)} {t("vsNational")} ({formatPrice(NATIONAL_AVG)})
        </div>

        {/* Grade tabs */}
        <div className="mb-8">
          <GradeTab
            data={state}
            messages={{
              regular: tg("regular"),
              midgrade: tg("midgrade"),
              premium: tg("premium"),
              diesel: tg("diesel"),
              e85: tg("e85"),
            }}
          />
        </div>

        {/* Trend chart */}
        <div className="mb-8">
          <TrendChart
            data={trendData}
            title={`${state.name} Gas Price Trend (12 Weeks)`}
          />
        </div>

        {/* Cities in state */}
        {cities.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-amber-900 mb-4">
              {t("citiesInState")} {state.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {cities.map((city) => (
                <Link key={city.slug} href={`/${locale}/cities/${city.slug}`}>
                  <div className="bg-white border border-amber-200 rounded-lg p-4 hover:border-amber-400 transition-colors">
                    <div className="font-semibold text-stone-800 mb-2">{city.name}</div>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-mono font-bold text-stone-900">{formatPrice(city.regular)}</div>
                        <div className="text-xs text-stone-500">Regular</div>
                      </div>
                      <div className={`text-sm font-mono font-semibold ${getChangeColor(city.weekChange)}`}>
                        {getChangeArrow(city.weekChange)} {formatChange(city.weekChange)}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Price breakdown */}
        <div className="bg-white border border-amber-200 rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-lg font-bold text-amber-900 mb-4">All Fuel Types — {state.name}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Regular", price: state.regular, color: "emerald" },
              { label: "Midgrade", price: state.midgrade, color: "yellow" },
              { label: "Premium", price: state.premium, color: "purple" },
              { label: "Diesel", price: state.diesel, color: "gray" },
            ].map((g) => (
              <div key={g.label} className="text-center border border-amber-100 rounded-lg p-4">
                <div className="text-xs text-stone-500 mb-1">{g.label}</div>
                <div className="text-2xl font-bold font-mono text-stone-900">
                  {formatPrice(g.price)}
                </div>
                <div className="text-xs text-stone-400 mt-1">per gallon</div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link
            href={`/${locale}/states`}
            className="inline-block bg-amber-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-600 transition-colors"
          >
            ← {t("viewAllStates")}
          </Link>
        </div>
      </div>
    </>
  );
}
