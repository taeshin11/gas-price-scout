import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import {
  getAllCities,
  getCityBySlug,
  getStateBySlug,
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
import GradeTab from "@/components/prices/GradeTab";
import TrendChart from "@/components/prices/TrendChart";

export const revalidate = 604800;

export async function generateStaticParams() {
  const cities = getAllCities();
  const locales = ["en", "ko", "ja", "zh", "es", "fr", "de", "pt"];
  return locales.flatMap((locale) =>
    cities.map((city) => ({ locale, city: city.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; city: string }>;
}): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return { title: "City Not Found" };

  return {
    title: `${city.name}, ${city.abbr} Gas Prices Today`,
    description: `Current gas prices in ${city.name}: Regular ${formatPrice(city.regular)}, Premium ${formatPrice(city.premium)}, Diesel ${formatPrice(city.diesel)}. Updated weekly.`,
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ locale: string; city: string }>;
}) {
  const { locale, city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const t = await getTranslations({ locale, namespace: "cityDetail" });
  const tg = await getTranslations({ locale, namespace: "grade" });

  const state = getStateBySlug(city.stateSlug);
  const trendData = getStateTrendData(city.stateSlug);
  const vsNational = city.regular - NATIONAL_AVG;

  // Nearby cities (same state)
  const allCities = getAllCities();
  const nearbyCities = allCities
    .filter((c) => c.stateSlug === city.stateSlug && c.slug !== city.slug)
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": `${city.name} Gas Prices`,
    "description": `Weekly gas prices for ${city.name}, ${city.abbr}`,
    "spatialCoverage": `${city.name}, ${city.state}`,
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
          <Link href={`/${locale}/cities`} className="hover:text-amber-800">Cities</Link>
          <span>›</span>
          {state && (
            <>
              <Link href={`/${locale}/states/${state.slug}`} className="hover:text-amber-800">
                {state.name}
              </Link>
              <span>›</span>
            </>
          )}
          <span className="text-amber-900 font-medium">{city.name}</span>
        </nav>

        {/* Hero */}
        <div className="mb-8">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-1">
                {city.name}, {city.abbr} {t("title")}
              </h1>
              <p className="text-amber-700">Week of {WEEK_DATE}</p>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold font-mono tabular-nums text-stone-900">
                {formatPrice(city.regular)}
              </div>
              <div className="text-sm text-stone-500">Regular / gallon</div>
              <div className={`text-lg font-semibold font-mono mt-1 ${getChangeColor(city.weekChange)}`}>
                {getChangeArrow(city.weekChange)} {formatChange(city.weekChange)} this week
              </div>
            </div>
          </div>
        </div>

        {/* vs National */}
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 ${
          vsNational < 0 ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
        }`}>
          {vsNational < 0 ? "▼" : "▲"} {Math.abs(vsNational).toFixed(3)} vs. national avg ({formatPrice(NATIONAL_AVG)})
        </div>

        {/* Grade tabs */}
        <div className="mb-8">
          <GradeTab
            data={city}
            messages={{
              regular: tg("regular"),
              midgrade: tg("midgrade"),
              premium: tg("premium"),
              diesel: tg("diesel"),
              e85: tg("e85"),
            }}
          />
        </div>

        {/* Trend chart (state-level) */}
        <div className="mb-8">
          <p className="text-xs text-stone-400 mb-2">Showing {city.state} state trend</p>
          <TrendChart
            data={trendData}
            title={`${city.name} Area — Gas Price Trend (12 Weeks)`}
          />
        </div>

        {/* State comparison */}
        {state && (
          <div className="bg-white border border-amber-200 rounded-xl p-6 shadow-sm mb-8">
            <h2 className="text-lg font-bold text-amber-900 mb-4">
              vs. {t("stateAvg")} ({state.name})
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Regular", city: city.regular, state: state.regular },
                { label: "Midgrade", city: city.midgrade, state: state.midgrade },
                { label: "Premium", city: city.premium, state: state.premium },
                { label: "Diesel", city: city.diesel, state: state.diesel },
              ].map((g) => (
                <div key={g.label} className="border border-amber-100 rounded-lg p-3">
                  <div className="text-xs text-stone-500 mb-2">{g.label}</div>
                  <div className="flex items-end gap-2">
                    <div>
                      <div className="text-xs text-stone-400">{city.name}</div>
                      <div className="font-mono font-bold text-stone-900">{formatPrice(g.city)}</div>
                    </div>
                    <div className="text-stone-300">vs</div>
                    <div>
                      <div className="text-xs text-stone-400">{state.abbr} avg</div>
                      <div className="font-mono text-stone-600">{formatPrice(g.state)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Nearby cities */}
        {nearbyCities.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-amber-900 mb-4">{t("nearbyCity")}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {nearbyCities.map((nc) => (
                <Link key={nc.slug} href={`/${locale}/cities/${nc.slug}`}>
                  <div className="bg-white border border-amber-200 rounded-lg p-4 hover:border-amber-400 transition-colors">
                    <div className="font-medium text-stone-800 mb-1">{nc.name}</div>
                    <div className="font-mono font-bold text-stone-900">{formatPrice(nc.regular)}</div>
                    <div className={`text-xs font-mono ${getChangeColor(nc.weekChange)}`}>
                      {getChangeArrow(nc.weekChange)} {formatChange(nc.weekChange)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back links */}
        <div className="flex gap-4">
          {state && (
            <Link
              href={`/${locale}/states/${state.slug}`}
              className="inline-block bg-amber-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-600 transition-colors"
            >
              ← {t("backToState")} {state.name}
            </Link>
          )}
          <Link
            href={`/${locale}/cities`}
            className="inline-block bg-white border border-amber-300 text-amber-700 px-6 py-3 rounded-lg font-medium hover:bg-amber-50 transition-colors"
          >
            All Cities
          </Link>
        </div>
      </div>
    </>
  );
}
