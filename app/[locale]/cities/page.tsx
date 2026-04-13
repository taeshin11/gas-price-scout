import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { getAllCities } from "@/lib/fallback";
import { formatPrice, formatChange, getChangeColor, getChangeArrow } from "@/lib/utils";

export const revalidate = 604800;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Gas Prices by City — Major US Cities",
    description: "Find current gas prices in major US cities. Compare regular, premium, and diesel prices across 50+ cities updated weekly.",
  };
}

export default async function CitiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "sections" });

  const cities = getAllCities();

  // Group cities by state
  const byState = cities.reduce<Record<string, typeof cities>>((acc, city) => {
    if (!acc[city.state]) acc[city.state] = [];
    acc[city.state].push(city);
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-amber-600 mb-6 flex items-center gap-2">
        <Link href={`/${locale}`} className="hover:text-amber-800">Home</Link>
        <span>›</span>
        <span className="text-amber-900 font-medium">Cities</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-2">
          Gas Prices by City
        </h1>
        <p className="text-amber-700">
          Current gas prices in {cities.length} major US cities — updated weekly.
        </p>
      </div>

      {/* All Cities Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-12">
        {cities.map((city) => (
          <Link key={city.slug} href={`/${locale}/cities/${city.slug}`}>
            <div className="bg-white border border-amber-200 rounded-lg p-3 hover:border-amber-400 hover:shadow-sm transition-all">
              <div className="text-xs text-stone-400 mb-0.5">{city.abbr}</div>
              <div className="font-medium text-stone-800 text-sm leading-tight mb-2">{city.name}</div>
              <div className="font-mono font-bold text-stone-900 text-base">{formatPrice(city.regular)}</div>
              <div className={`text-xs font-mono ${getChangeColor(city.weekChange)}`}>
                {getChangeArrow(city.weekChange)} {formatChange(city.weekChange)}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* By State */}
      <h2 className="text-xl font-bold text-amber-900 mb-6">Cities by State</h2>
      <div className="space-y-6">
        {Object.entries(byState)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([stateName, stateCities]) => (
            <div key={stateName}>
              <h3 className="text-base font-semibold text-amber-800 mb-3 border-b border-amber-100 pb-2">
                {stateName}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {stateCities.map((city) => (
                  <Link key={city.slug} href={`/${locale}/cities/${city.slug}`}>
                    <div className="flex items-center justify-between bg-white border border-amber-100 rounded-lg px-3 py-2 hover:border-amber-300 transition-colors">
                      <span className="text-sm text-stone-700">{city.name}</span>
                      <span className="font-mono text-sm font-semibold text-stone-900 ml-2">
                        {formatPrice(city.regular)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
