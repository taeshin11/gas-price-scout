import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { getNationalTrendData } from "@/lib/fallback";
import { formatPrice, WEEK_DATE } from "@/lib/utils";
import TrendChart from "@/components/prices/TrendChart";

export const revalidate = 604800;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "US Gas Price History — 12-Week Trend",
    description: "Historical national gas price trend data for regular, premium, and diesel. 12-week chart updated weekly from EIA data.",
  };
}

export default async function HistoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const trendData = getNationalTrendData();
  const latest = trendData[trendData.length - 1];
  const oldest = trendData[0];
  const regularChange = latest.regular - oldest.regular;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-amber-600 mb-6 flex items-center gap-2">
        <Link href={`/${locale}`} className="hover:text-amber-800">Home</Link>
        <span>›</span>
        <span className="text-amber-900 font-medium">Price History</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-2">
          National Gas Price History
        </h1>
        <p className="text-amber-700">
          12-week trend for regular, premium, and diesel. Data from EIA.
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-amber-200 rounded-xl p-6 shadow-sm">
          <div className="text-sm text-stone-500 mb-1">Current (Regular)</div>
          <div className="text-3xl font-bold font-mono text-stone-900">{formatPrice(latest.regular)}</div>
          <div className="text-xs text-stone-400 mt-1">as of {WEEK_DATE}</div>
        </div>
        <div className="bg-white border border-amber-200 rounded-xl p-6 shadow-sm">
          <div className="text-sm text-stone-500 mb-1">12 Weeks Ago</div>
          <div className="text-3xl font-bold font-mono text-stone-900">{formatPrice(oldest.regular)}</div>
          <div className="text-xs text-stone-400 mt-1">{oldest.date}</div>
        </div>
        <div className="bg-white border border-amber-200 rounded-xl p-6 shadow-sm">
          <div className="text-sm text-stone-500 mb-1">12-Week Change</div>
          <div className={`text-3xl font-bold font-mono ${regularChange < 0 ? "text-emerald-600" : "text-red-500"}`}>
            {regularChange >= 0 ? "+" : ""}{regularChange.toFixed(3)}
          </div>
          <div className="text-xs text-stone-400 mt-1">regular unleaded</div>
        </div>
      </div>

      {/* Main chart */}
      <div className="mb-8">
        <TrendChart data={trendData} title="National Gas Prices — 12-Week Trend" />
      </div>

      {/* Data table */}
      <div className="bg-white border border-amber-200 rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="p-4 bg-amber-50 border-b border-amber-200">
          <h2 className="text-lg font-bold text-amber-900">Weekly Price Data</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-amber-50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-amber-700 uppercase tracking-wide">Week</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-amber-700 uppercase tracking-wide">Regular</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-amber-700 uppercase tracking-wide">Premium</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-amber-700 uppercase tracking-wide">Diesel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-50">
              {[...trendData].reverse().map((point, idx) => (
                <tr
                  key={point.date}
                  className={`${idx === 0 ? "bg-amber-50" : idx % 2 === 0 ? "bg-white" : "bg-amber-50/30"}`}
                >
                  <td className="px-4 py-3 text-sm text-stone-600 font-medium">
                    {point.date}
                    {idx === 0 && (
                      <span className="ml-2 text-xs bg-amber-200 text-amber-800 px-1.5 py-0.5 rounded-full">
                        Current
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-mono text-sm font-semibold text-emerald-700">
                    {formatPrice(point.regular)}
                  </td>
                  <td className="px-4 py-3 font-mono text-sm text-purple-700">
                    {formatPrice(point.premium)}
                  </td>
                  <td className="px-4 py-3 font-mono text-sm text-gray-600">
                    {formatPrice(point.diesel)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700">
        <strong>Data Source:</strong> U.S. Energy Information Administration (EIA).
        Prices are weekly averages updated every Monday. Historical data represents national averages for all grades.
      </div>
    </div>
  );
}
