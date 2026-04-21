import type { Metadata } from "next";
import Link from "next/link";
import { Search, MapPin, TrendingDown, ChevronRight } from "lucide-react";

export const revalidate = 2592000;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "How to Use GasPriceScout — Find the Cheapest Gas Near You",
    description:
      "Step-by-step guide to finding cheap gas prices near you. FAQs about how often prices update, why prices vary by location, and tips to save money on fuel.",
  };
}

const faqs = [
  {
    q: "How often are gas prices updated?",
    a: "GasPriceScout updates prices weekly every Monday, using the latest data from the U.S. Energy Information Administration (EIA). City-level prices may reflect a 1–2 day lag. For the most up-to-date price at a specific station, check at the pump.",
  },
  {
    q: "Why do gas prices vary by location?",
    a: "Fuel prices differ by state and city due to several factors: state and local fuel taxes (which vary widely — California taxes are much higher than Texas, for example), distance from refineries and pipelines, local environmental regulations requiring special fuel blends, and the level of market competition in each area.",
  },
  {
    q: "What is the cheapest fuel type?",
    a: "Regular unleaded (87 octane) is always the cheapest grade at the pump. Unless your car's owner manual specifically requires premium or mid-grade fuel, you can safely use regular and save money. Using premium in a car that doesn't need it provides no benefit.",
  },
  {
    q: "How can I save money on gas?",
    a: "Fill up on Tuesday or Wednesday — prices typically rise ahead of weekends. Use a gas rewards credit card or grocery store loyalty program for discounts. Compare prices by state before a road trip. Keep your tires properly inflated to improve fuel economy. Avoid top-tier premium if your car doesn't require it.",
  },
  {
    q: "What does 'regular', 'mid-grade', and 'premium' mean?",
    a: "These refer to the octane rating of the fuel. Regular is 87 octane, mid-grade is 89 octane, and premium is 91–93 octane. Higher octane fuel resists engine knock (pre-ignition) and is needed by high-compression or turbocharged engines. Most standard vehicles run perfectly on regular.",
  },
  {
    q: "Why does diesel sometimes cost more than regular gas?",
    a: "Diesel pricing is influenced by different supply and demand factors than gasoline. Diesel demand is tied heavily to commercial trucking, heating oil, and farming. During high-demand periods (winter, supply disruptions), diesel can exceed premium gasoline prices. Refining costs and taxes also differ.",
  },
  {
    q: "What states have the cheapest gas?",
    a: "States in the Gulf Coast region — Texas, Louisiana, Mississippi — typically have the lowest gas prices due to proximity to refineries and lower state fuel taxes. Mississippi and Oklahoma are consistently among the cheapest. Check our States page for the current up-to-date rankings.",
  },
  {
    q: "What states have the most expensive gas?",
    a: "California consistently has the highest gas prices in the contiguous US due to its high state fuel tax, unique environmental blend requirements (CARB fuel), and fewer pipeline connections. Hawaii and Alaska also have high prices due to transport costs. Check our States page for live rankings.",
  },
  {
    q: "Are prices on GasPriceScout guaranteed to match what I see at the pump?",
    a: "No. GasPriceScout shows weekly state and city averages from official EIA data. Individual stations may be higher or lower than the average. Prices change daily at many stations. Use our data for general guidance and comparison — always verify the price before you fill up.",
  },
  {
    q: "What is the difference between the city price and the state average?",
    a: "The state average is the mean retail price across all stations in that state. City prices represent the average for a specific metropolitan area. Urban areas often have slightly different prices than the state average due to higher real estate costs, more competition, and different local tax rates.",
  },
];

export default async function HowToUsePage({
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
        <span className="text-amber-900 font-medium">How to Use / FAQ</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-3">
          How to Find Cheap Gas Near You
        </h1>
        <p className="text-lg text-amber-700 leading-relaxed">
          GasPriceScout makes it easy to compare fuel prices across the US. Here&apos;s how to get
          the most out of the site, plus answers to the most common questions.
        </p>
      </div>

      {/* 3-Step Guide */}
      <div className="bg-white border border-amber-200 rounded-xl p-6 shadow-sm mb-10">
        <h2 className="text-xl font-bold text-amber-900 mb-6">3-Step Guide</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center">
            <div className="bg-amber-100 text-amber-700 rounded-full w-14 h-14 flex items-center justify-center mb-3">
              <Search size={24} />
            </div>
            <div className="text-amber-500 font-bold text-sm mb-1">STEP 1</div>
            <h3 className="font-semibold text-stone-800 mb-2">Find Your State</h3>
            <p className="text-sm text-stone-600">
              Go to the{" "}
              <Link href={`/${locale}/states`} className="text-amber-600 hover:underline">
                States page
              </Link>{" "}
              to see a ranked list of all 50 states from cheapest to most expensive. Click any
              state to see detailed city-level prices within it.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-amber-100 text-amber-700 rounded-full w-14 h-14 flex items-center justify-center mb-3">
              <MapPin size={24} />
            </div>
            <div className="text-amber-500 font-bold text-sm mb-1">STEP 2</div>
            <h3 className="font-semibold text-stone-800 mb-2">Compare Cities</h3>
            <p className="text-sm text-stone-600">
              Browse the{" "}
              <Link href={`/${locale}/cities`} className="text-amber-600 hover:underline">
                Cities page
              </Link>{" "}
              for metro-area pricing. Compare regular, mid-grade, premium, and diesel across
              major US cities to plan your route or road trip.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-amber-100 text-amber-700 rounded-full w-14 h-14 flex items-center justify-center mb-3">
              <TrendingDown size={24} />
            </div>
            <div className="text-amber-500 font-bold text-sm mb-1">STEP 3</div>
            <h3 className="font-semibold text-stone-800 mb-2">Watch the Trend</h3>
            <p className="text-sm text-stone-600">
              Check the{" "}
              <Link href={`/${locale}/history`} className="text-amber-600 hover:underline">
                Price History
              </Link>{" "}
              page for a 12-week national trend chart. If prices are falling, it may be worth
              waiting a few days before filling up.
            </p>
          </div>
        </div>
      </div>

      {/* Fuel Grade Guide */}
      <div className="bg-white border border-amber-200 rounded-xl p-6 shadow-sm mb-10">
        <h2 className="text-xl font-bold text-amber-900 mb-4">Which Fuel Grade Should I Use?</h2>
        <div className="space-y-3">
          {[
            {
              grade: "Regular (87)",
              rec: "Recommended for most cars",
              tip: "Unless your owner's manual says otherwise, use regular. It's the cheapest and perfectly safe for standard engines.",
              color: "border-emerald-400 bg-emerald-50",
              label: "bg-emerald-100 text-emerald-700",
            },
            {
              grade: "Mid-Grade (89)",
              rec: "Rarely necessary",
              tip: "A middle option that saves money over premium without dropping to regular. Only needed if your manual specifically recommends it.",
              color: "border-blue-400 bg-blue-50",
              label: "bg-blue-100 text-blue-700",
            },
            {
              grade: "Premium (91–93)",
              rec: "Required for performance/turbo engines",
              tip: "Use only if your manual says 'required'. If it says 'recommended', regular is fine — you may see a very slight performance difference, but no engine damage.",
              color: "border-purple-400 bg-purple-50",
              label: "bg-purple-100 text-purple-700",
            },
            {
              grade: "Diesel",
              rec: "Diesel engines only",
              tip: "Never put diesel in a gasoline car or vice versa. Diesel engines are more fuel-efficient but require a dedicated fueling infrastructure.",
              color: "border-gray-400 bg-gray-50",
              label: "bg-gray-100 text-gray-700",
            },
          ].map((item) => (
            <div key={item.grade} className={`border-l-4 rounded-r-lg p-4 ${item.color}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${item.label}`}>
                  {item.grade}
                </span>
                <span className="text-sm font-semibold text-stone-700">{item.rec}</span>
              </div>
              <p className="text-sm text-stone-600">{item.tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Gas Saving Tips */}
      <div className="bg-amber-900 text-amber-100 rounded-xl p-6 mb-10">
        <h2 className="text-xl font-bold text-white mb-4">Tips to Save on Gas</h2>
        <ul className="space-y-2.5">
          {[
            "Fill up Tuesday or Wednesday — prices typically spike before weekends.",
            "Use a gas rewards credit card to earn 2–5% cash back on fuel purchases.",
            "Enroll in grocery store loyalty programs — many offer $0.05–$0.25/gallon discounts.",
            "Keep tires properly inflated — under-inflation can reduce MPG by 0.5% per PSI.",
            "Avoid excessive idling — it burns fuel without moving you anywhere.",
            "Check GasPriceScout's States page before a road trip to plan cheaper fill-up stops.",
            "Don't top off the tank — modern cars have vapor recovery systems and extra fuel can be wasted.",
          ].map((tip) => (
            <li key={tip} className="flex items-start gap-2 text-sm text-amber-200">
              <ChevronRight size={16} className="mt-0.5 text-amber-400 flex-shrink-0" />
              {tip}
            </li>
          ))}
        </ul>
      </div>

      {/* FAQ */}
      <div className="bg-white border border-amber-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-amber-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border-b border-amber-100 pb-6 last:border-0 last:pb-0"
            >
              <h3 className="font-semibold text-amber-900 mb-2 flex items-start gap-2">
                <span className="text-amber-400 font-bold mt-0.5 flex-shrink-0">Q.</span>
                {faq.q}
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed pl-6">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
