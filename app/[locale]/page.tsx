import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import {
  getAllStates,
  getCheapestStates,
  getMostExpensiveStates,
  getNationalTrendData,
  getAllCities,
} from "@/lib/fallback";
import { formatPrice, formatChange, getChangeColor, getChangeArrow, WEEK_DATE, NATIONAL_AVG, NATIONAL_CHANGE } from "@/lib/utils";
import PriceTable from "@/components/prices/PriceTable";
import TrendChart from "@/components/prices/TrendChart";
import StateCard from "@/components/prices/StateCard";

export const revalidate = 604800;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: `Gas Prices by State Today (April 2026) — GasPriceScout`,
    description: "Track US gas prices by state and city. See national averages, rankings, and 12-week trends updated weekly from EIA data.",
    openGraph: {
      title: "GasPriceScout — US Gas Prices by State",
      description: "Find the cheapest gas near you — state and city rankings updated weekly.",
      url: `https://gas-price-scout.vercel.app/${locale}`,
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "name": "GasPriceScout",
      "url": "https://gas-price-scout.vercel.app",
      "description": "US gas prices by state and city, updated weekly",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://gas-price-scout.vercel.app/en/states/{search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Why do gas prices vary by state?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Gas prices vary by state due to differences in state and local taxes, proximity to refineries and pipelines, environmental regulations, and local market competition.",
          },
        },
        {
          "@type": "Question",
          "name": "How often are gas prices updated?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "GasPriceScout updates prices weekly every Monday, using data from the U.S. Energy Information Administration (EIA).",
          },
        },
      ],
    },
  ],
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });
  const ts = await getTranslations({ locale, namespace: "sections" });
  const tt = await getTranslations({ locale, namespace: "table" });
  const tfaq = await getTranslations({ locale, namespace: "faq" });

  const allStates = getAllStates();
  const cheapest = getCheapestStates(5);
  const expensive = getMostExpensiveStates(5);
  const trendData = getNationalTrendData();
  const topCities = getAllCities().slice(0, 12);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-bold text-amber-900 mb-3">
            {t("title")}
          </h1>
          <p className="text-amber-700 text-lg mb-8">{t("subtitle")}</p>

          {/* National Average Card */}
          <div className="inline-block bg-white border-2 border-amber-300 rounded-2xl px-8 py-6 shadow-lg mb-6">
            <div className="text-sm text-amber-600 font-medium mb-1">{t("nationalAvg")}</div>
            <div className="text-6xl md:text-7xl font-bold font-mono tabular-nums text-stone-900 mb-2">
              {formatPrice(NATIONAL_AVG)}
            </div>
            <div className="text-sm text-stone-500 mb-3">{t("perGallon")} · {t("asOf")} {WEEK_DATE}</div>
            <div className={`inline-flex items-center gap-1 text-lg font-semibold font-mono ${getChangeColor(NATIONAL_CHANGE)}`}>
              {getChangeArrow(NATIONAL_CHANGE)} {formatChange(NATIONAL_CHANGE)} {t("weekChange")}
            </div>
          </div>
        </div>

        {/* Ad placeholder */}
        <div className="my-6 w-full bg-amber-100 border border-amber-200 rounded-lg h-20 flex items-center justify-center text-amber-400 text-sm">
          {/* ADSTERRA_NATIVE_BANNER_PLACEHOLDER */}
          Advertisement
        </div>

        {/* Cheapest & Most Expensive */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">💚</span>
              {ts("cheapestStates")}
            </h2>
            <div className="space-y-3">
              {cheapest.map((state, i) => (
                <Link key={state.slug} href={`/${locale}/states/${state.slug}`}>
                  <div className="bg-white border border-emerald-200 rounded-lg p-3 flex items-center justify-between hover:border-emerald-400 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-emerald-600 font-bold w-6">#{i + 1}</span>
                      <div>
                        <div className="font-medium text-stone-800">{state.name}</div>
                        <div className="text-xs text-stone-500">{state.abbr}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-stone-900">{formatPrice(state.regular)}</div>
                      <div className={`text-xs font-mono ${getChangeColor(state.weekChange)}`}>
                        {getChangeArrow(state.weekChange)} {formatChange(state.weekChange)}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">🔴</span>
              {ts("mostExpensiveStates")}
            </h2>
            <div className="space-y-3">
              {expensive.map((state, i) => (
                <Link key={state.slug} href={`/${locale}/states/${state.slug}`}>
                  <div className="bg-white border border-red-200 rounded-lg p-3 flex items-center justify-between hover:border-red-400 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-red-500 font-bold w-6">#{i + 1}</span>
                      <div>
                        <div className="font-medium text-stone-800">{state.name}</div>
                        <div className="text-xs text-stone-500">{state.abbr}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-stone-900">{formatPrice(state.regular)}</div>
                      <div className={`text-xs font-mono ${getChangeColor(state.weekChange)}`}>
                        {getChangeArrow(state.weekChange)} {formatChange(state.weekChange)}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Trend Chart */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-amber-900 mb-4">{ts("trendChart")}</h2>
          <TrendChart data={trendData} title={ts("trendChart")} />
        </div>

        {/* Ad placeholder */}
        <div className="my-8 w-full bg-amber-100 border border-amber-200 rounded-lg h-16 flex items-center justify-center text-amber-400 text-sm">
          {/* ADSTERRA_DISPLAY_BANNER_PLACEHOLDER */}
          Advertisement
        </div>

        {/* State Rankings Table */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-amber-900">{ts("allStates")}</h2>
            <Link
              href={`/${locale}/states`}
              className="text-sm text-amber-600 hover:text-amber-800 font-medium"
            >
              View all →
            </Link>
          </div>
          <PriceTable
            states={allStates}
            locale={locale}
            messages={{
              rank: tt("rank"),
              state: tt("state"),
              regular: tt("regular"),
              midgrade: tt("midgrade"),
              premium: tt("premium"),
              diesel: tt("diesel"),
              change: tt("change"),
            }}
          />
        </div>

        {/* Top Cities */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-amber-900">{ts("topCities")}</h2>
            <Link
              href={`/${locale}/cities`}
              className="text-sm text-amber-600 hover:text-amber-800 font-medium"
            >
              All cities →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {topCities.map((city) => (
              <Link key={city.slug} href={`/${locale}/cities/${city.slug}`}>
                <div className="bg-white border border-amber-200 rounded-lg p-3 hover:border-amber-400 transition-colors">
                  <div className="text-xs text-stone-500 mb-0.5">{city.abbr}</div>
                  <div className="font-medium text-stone-800 text-sm mb-1">{city.name}</div>
                  <div className="font-mono font-bold text-stone-900">{formatPrice(city.regular)}</div>
                  <div className={`text-xs font-mono mt-0.5 ${getChangeColor(city.weekChange)}`}>
                    {getChangeArrow(city.weekChange)} {formatChange(city.weekChange)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-12 bg-white rounded-xl border border-amber-200 p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-amber-900 mb-6">{tfaq("title")}</h2>
          <div className="space-y-5">
            {(["q1", "q2", "q3", "q4"] as const).map((q, i) => (
              <div key={q} className="border-b border-amber-100 pb-5 last:border-0 last:pb-0">
                <h3 className="font-semibold text-amber-900 mb-2 flex items-start gap-2">
                  <span className="text-amber-400 font-bold mt-0.5">Q{i + 1}.</span>
                  {tfaq(q)}
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed pl-6">
                  {tfaq(`a${i + 1}` as "a1" | "a2" | "a3" | "a4")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
