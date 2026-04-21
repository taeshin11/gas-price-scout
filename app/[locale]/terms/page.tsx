import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 2592000;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Terms of Service — GasPriceScout",
    description:
      "GasPriceScout terms of service: informational use only, no liability for pricing decisions, and site usage rules.",
  };
}

const LAST_UPDATED = "April 13, 2026";

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-amber-600 mb-6 flex items-center gap-2">
        <Link href={`/${locale}`} className="hover:text-amber-800">
          Home
        </Link>
        <span>›</span>
        <span className="text-amber-900 font-medium">Terms of Service</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-2">Terms of Service</h1>
      <p className="text-sm text-stone-400 mb-8">Last updated: {LAST_UPDATED}</p>

      <div className="space-y-8">

        <section className="bg-white border border-amber-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-amber-900 mb-3">Agreement to Terms</h2>
          <p className="text-stone-600 leading-relaxed">
            By accessing or using GasPriceScout at{" "}
            <span className="font-medium text-stone-800">gas-price-scout.vercel.app</span>{" "}
            (the &quot;Site&quot;), you agree to be bound by these Terms of Service. If you do not agree
            with any part of these terms, please do not use the Site.
          </p>
        </section>

        <section className="bg-white border border-amber-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-amber-900 mb-3">Informational Purposes Only</h2>
          <p className="text-stone-600 leading-relaxed mb-3">
            All gas price data displayed on GasPriceScout is provided for{" "}
            <strong>general informational purposes only</strong>. The prices shown are weekly
            averages derived from publicly available data sources including the U.S. Energy
            Information Administration (EIA) and aggregated crowd-sourced data.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
            <strong>Important:</strong> Actual prices at any individual gas station may differ
            significantly from the averages shown on this Site. Prices change frequently and
            can vary by station, time of day, payment method, and other factors. Always verify
            the price at the pump before fueling.
          </div>
        </section>

        <section className="bg-white border border-amber-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-amber-900 mb-3">No Affiliation Disclaimer</h2>
          <p className="text-stone-600 leading-relaxed">
            GasPriceScout is an independent website. We are <strong>not affiliated with,
            endorsed by, or sponsored by</strong> any gas station chain, petroleum company,
            oil refinery, fuel distributor, government agency, or any other organization in
            the fuel industry. Brand names of gas stations or fuel companies mentioned on
            this Site are the property of their respective owners and are referenced solely
            for informational context.
          </p>
        </section>

        <section className="bg-white border border-amber-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-amber-900 mb-3">Limitation of Liability</h2>
          <p className="text-stone-600 leading-relaxed mb-3">
            To the fullest extent permitted by applicable law, GasPriceScout and its operators
            shall not be liable for any direct, indirect, incidental, consequential, or punitive
            damages arising from:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-stone-600 text-sm mb-3">
            <li>Reliance on any gas price data displayed on this Site</li>
            <li>Decisions made (including fuel purchases) based on information from this Site</li>
            <li>Inaccuracies, delays, or omissions in the price data</li>
            <li>Temporary unavailability of the Site or data</li>
            <li>Any damage to your vehicle or property related to fuel decisions</li>
          </ul>
          <p className="text-stone-600 leading-relaxed">
            Use of the Site and reliance on any content herein is at your own risk.
          </p>
        </section>

        <section className="bg-white border border-amber-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-amber-900 mb-3">Accuracy of Data</h2>
          <p className="text-stone-600 leading-relaxed">
            We make reasonable efforts to keep gas price data current and accurate. However,
            we make no warranties or representations, express or implied, regarding the
            completeness, accuracy, reliability, or timeliness of any data displayed.
            Data is sourced from third parties (EIA and aggregated community reports) and
            may contain errors or be subject to reporting delays. GasPriceScout takes no
            responsibility for errors in source data.
          </p>
        </section>

        <section className="bg-white border border-amber-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-amber-900 mb-3">Acceptable Use</h2>
          <p className="text-stone-600 leading-relaxed mb-3">
            You agree to use GasPriceScout only for lawful purposes. You may not:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-stone-600 text-sm">
            <li>Scrape or mass-download price data for commercial redistribution without permission</li>
            <li>Attempt to reverse-engineer, hack, or disrupt the Site or its underlying systems</li>
            <li>Use the Site in any manner that could damage, disable, or impair its operation</li>
            <li>Use automated bots or scripts to excessively query the Site</li>
            <li>Misrepresent GasPriceScout data as your own original research or proprietary data</li>
          </ul>
        </section>

        <section className="bg-white border border-amber-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-amber-900 mb-3">Intellectual Property</h2>
          <p className="text-stone-600 leading-relaxed">
            The design, layout, code, and original content of GasPriceScout are the property of
            GasPriceScout and are protected by applicable copyright and intellectual property laws.
            Gas price data sourced from the EIA is in the public domain. You may share or reference
            our data with attribution, but may not republish or resell it as a commercial product.
          </p>
        </section>

        <section className="bg-white border border-amber-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-amber-900 mb-3">Third-Party Links and Services</h2>
          <p className="text-stone-600 leading-relaxed">
            The Site may display advertising from Google AdSense and may contain links to
            third-party websites. GasPriceScout has no control over the content or practices
            of third-party sites and assumes no responsibility for them. Visiting third-party
            links is at your own risk.
          </p>
        </section>

        <section className="bg-white border border-amber-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-amber-900 mb-3">Changes to Terms</h2>
          <p className="text-stone-600 leading-relaxed">
            We reserve the right to update or modify these Terms of Service at any time.
            Changes will be reflected in the &quot;Last updated&quot; date at the top of this page.
            Your continued use of the Site after any modification constitutes acceptance of
            the new terms.
          </p>
        </section>

        <section className="bg-white border border-amber-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-amber-900 mb-3">Governing Law</h2>
          <p className="text-stone-600 leading-relaxed">
            These Terms of Service shall be governed by and construed in accordance with the
            laws of the United States. Any disputes arising from use of this Site shall be
            resolved through binding arbitration or in the courts of competent jurisdiction
            in the United States.
          </p>
        </section>

        <section className="bg-amber-900 text-amber-100 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-3">Contact</h2>
          <p className="text-amber-300 leading-relaxed">
            Questions about these Terms of Service? Contact us at:{" "}
            <a
              href="mailto:contact@gas-price-scout.vercel.app"
              className="text-white underline hover:text-amber-200 transition-colors"
            >
              contact@gas-price-scout.vercel.app
            </a>
          </p>
          <p className="text-amber-400 text-sm mt-3">
            Also see our{" "}
            <Link href={`/${locale}/privacy`} className="text-amber-200 underline hover:text-white transition-colors">
              Privacy Policy
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
