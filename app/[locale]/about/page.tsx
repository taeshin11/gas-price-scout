import type { Metadata } from "next";
import Link from "next/link";
import { Fuel, Database, Mail, MapPin, BarChart3 } from "lucide-react";

export const revalidate = 2592000;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "About GasPriceScout — US Gas Price Tracker",
    description:
      "Learn about GasPriceScout: how we track regular, mid-grade, premium, and diesel prices by state and city across the USA, and where our data comes from.",
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-amber-600 mb-6 flex items-center gap-2">
        <Link href={`/${locale}`} className="hover:text-amber-800">
          Home
        </Link>
        <span>›</span>
        <span className="text-amber-900 font-medium">About</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-amber-500 text-white rounded-xl p-2.5">
            <Fuel size={28} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-amber-900">
            About GasPriceScout
          </h1>
        </div>
        <p className="text-lg text-amber-700 leading-relaxed">
          GasPriceScout is a free, independent tool that helps drivers across the United States
          find and compare gas prices by state and city — so you can make informed decisions
          before heading to the pump.
        </p>
      </div>

      {/* Mission */}
      <div className="bg-white border border-amber-200 rounded-xl p-6 shadow-sm mb-8">
        <h2 className="text-xl font-bold text-amber-900 mb-3">Our Mission</h2>
        <p className="text-stone-600 leading-relaxed">
          Fuel costs are one of the largest recurring expenses for American households and businesses.
          Our mission is simple: give every driver transparent, easy-to-read gas price data without
          paywalls, sign-ups, or clutter. We believe that knowing where prices are cheapest — and why
          they vary — is a fundamental consumer right.
        </p>
      </div>

      {/* What We Track */}
      <div className="bg-white border border-amber-200 rounded-xl p-6 shadow-sm mb-8">
        <h2 className="text-xl font-bold text-amber-900 mb-4">What We Track</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              label: "Regular Unleaded",
              desc: "The most common fuel grade (87 octane). Tracked for all 50 states and hundreds of cities.",
              color: "text-emerald-600",
              bg: "bg-emerald-50 border-emerald-200",
            },
            {
              label: "Mid-Grade",
              desc: "89 octane blend. Suitable for vehicles that recommend — but don't require — premium.",
              color: "text-blue-600",
              bg: "bg-blue-50 border-blue-200",
            },
            {
              label: "Premium",
              desc: "91–93 octane. Required by high-performance and turbocharged engines.",
              color: "text-purple-600",
              bg: "bg-purple-50 border-purple-200",
            },
            {
              label: "Diesel",
              desc: "Tracked nationwide for trucks, SUVs, and fleet vehicles.",
              color: "text-gray-600",
              bg: "bg-gray-50 border-gray-200",
            },
          ].map((item) => (
            <div
              key={item.label}
              className={`border rounded-lg p-4 ${item.bg}`}
            >
              <div className={`font-semibold mb-1 ${item.color}`}>{item.label}</div>
              <p className="text-sm text-stone-600">{item.desc}</p>
            </div>
          ))}
        </div>

        <p className="text-stone-600 mt-4 leading-relaxed">
          We provide rankings for all 50 US states and over 100 major cities, along with 12-week
          trend charts so you can see whether prices are rising or falling in your area.
        </p>
      </div>

      {/* Data Sources */}
      <div className="bg-white border border-amber-200 rounded-xl p-6 shadow-sm mb-8">
        <h2 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
          <Database size={20} className="text-amber-600" />
          Data Sources
        </h2>
        <div className="space-y-4">
          <div className="border-l-4 border-amber-400 pl-4">
            <div className="font-semibold text-stone-800">U.S. Energy Information Administration (EIA)</div>
            <p className="text-sm text-stone-600 mt-1">
              The EIA is the official statistical and analytical agency of the U.S. Department of Energy.
              Their Weekly Petroleum and Other Liquids data provides the authoritative source for retail
              gasoline and diesel prices by region and state.
            </p>
          </div>
          <div className="border-l-4 border-amber-300 pl-4">
            <div className="font-semibold text-stone-800">Aggregated Crowd-Sourced Data</div>
            <p className="text-sm text-stone-600 mt-1">
              City-level and hyperlocal data is supplemented by aggregated, anonymized reports from
              fuel-tracking communities (similar in methodology to GasBuddy-style crowd-sourcing),
              giving finer granularity at the metro level.
            </p>
          </div>
        </div>
        <p className="text-amber-700 text-sm mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3">
          Prices are updated weekly every Monday. City-level prices may lag by 1–2 days.
          Always verify prices at the pump — real-world prices can differ slightly from published averages.
        </p>
      </div>

      {/* Coverage */}
      <div className="bg-white border border-amber-200 rounded-xl p-6 shadow-sm mb-8">
        <h2 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
          <MapPin size={20} className="text-amber-600" />
          Coverage
        </h2>
        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            { value: "50", label: "States" },
            { value: "100+", label: "Cities" },
            { value: "4", label: "Fuel Grades" },
          ].map((stat) => (
            <div key={stat.label} className="bg-amber-50 border border-amber-200 rounded-lg py-4">
              <div className="text-3xl font-bold text-amber-700">{stat.value}</div>
              <div className="text-sm text-stone-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* About the Site */}
      <div className="bg-white border border-amber-200 rounded-xl p-6 shadow-sm mb-8">
        <h2 className="text-xl font-bold text-amber-900 mb-3 flex items-center gap-2">
          <BarChart3 size={20} className="text-amber-600" />
          Multilingual Support
        </h2>
        <p className="text-stone-600 leading-relaxed">
          GasPriceScout is available in 8 languages — English, Spanish, French, German, Korean,
          Japanese, Chinese, and Portuguese — so that drivers from all backgrounds can access
          US fuel price information in their preferred language.
        </p>
      </div>

      {/* Contact */}
      <div className="bg-amber-900 text-amber-100 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
          <Mail size={20} />
          Contact Us
        </h2>
        <p className="text-amber-300 leading-relaxed mb-2">
          Have a question, found a data discrepancy, or want to suggest a feature?
          We&apos;d love to hear from you.
        </p>
        <p className="text-amber-200 font-medium">
          Email:{" "}
          <a
            href="mailto:contact@gas-price-scout.vercel.app"
            className="underline hover:text-white transition-colors"
          >
            contact@gas-price-scout.vercel.app
          </a>
        </p>
        <p className="text-amber-400 text-sm mt-3">
          We are an independent site with no affiliation to any gas station chain, oil company,
          or government agency.
        </p>
      </div>
    </div>
  );
}
