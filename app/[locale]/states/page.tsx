import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getStatesRanked } from "@/lib/fallback";
import PriceTable from "@/components/prices/PriceTable";
import StateCard from "@/components/prices/StateCard";

export const revalidate = 604800;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return {
    title: "Gas Prices by State — All 50 States Ranked",
    description: "Compare gas prices across all 50 US states. See regular, premium, and diesel prices ranked cheapest to most expensive, updated weekly.",
  };
}

export default async function StatesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "table" });
  const ts = await getTranslations({ locale, namespace: "sections" });

  const states = getStatesRanked();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-2">
          Gas Prices by State
        </h1>
        <p className="text-amber-700">
          All 50 states ranked by regular unleaded price — updated weekly from EIA data.
        </p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-amber-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold font-mono text-emerald-600">
            ${states[0].regular.toFixed(3)}
          </div>
          <div className="text-xs text-stone-500 mt-1">Cheapest ({states[0].name})</div>
        </div>
        <div className="bg-white border border-amber-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold font-mono text-red-500">
            ${states[states.length - 1].regular.toFixed(3)}
          </div>
          <div className="text-xs text-stone-500 mt-1">Most expensive ({states[states.length - 1].name})</div>
        </div>
        <div className="bg-white border border-amber-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold font-mono text-stone-800">
            ${(states.reduce((s, st) => s + st.regular, 0) / states.length).toFixed(3)}
          </div>
          <div className="text-xs text-stone-500 mt-1">National Average</div>
        </div>
        <div className="bg-white border border-amber-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold font-mono text-amber-600">
            {states.length}
          </div>
          <div className="text-xs text-stone-500 mt-1">States tracked</div>
        </div>
      </div>

      {/* Table */}
      <h2 className="text-xl font-bold text-amber-900 mb-4">{ts("allStates")}</h2>
      <PriceTable
        states={states}
        locale={locale}
        messages={{
          rank: t("rank"),
          state: t("state"),
          regular: t("regular"),
          midgrade: t("midgrade"),
          premium: t("premium"),
          diesel: t("diesel"),
          change: t("change"),
        }}
      />

      {/* Cards grid */}
      <h2 className="text-xl font-bold text-amber-900 mt-12 mb-4">Browse by State</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {states.map((state, i) => (
          <StateCard key={state.slug} state={state} locale={locale} rank={i + 1} />
        ))}
      </div>
    </div>
  );
}
