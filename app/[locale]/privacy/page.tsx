import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 2592000;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Privacy Policy — GasPriceScout",
    description:
      "GasPriceScout privacy policy: how we handle anonymous usage data, what we collect, and how we protect your privacy.",
  };
}

const LAST_UPDATED = "April 13, 2026";

export default async function PrivacyPage({
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
        <span className="text-amber-900 font-medium">Privacy Policy</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-2">Privacy Policy</h1>
      <p className="text-sm text-stone-400 mb-8">Last updated: {LAST_UPDATED}</p>

      <div className="prose prose-stone max-w-none space-y-8">

        <section className="bg-white border border-amber-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-amber-900 mb-3">Overview</h2>
          <p className="text-stone-600 leading-relaxed">
            GasPriceScout (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy.
            This Privacy Policy explains what information we collect when you visit{" "}
            <span className="font-medium text-stone-800">gas-price-scout.vercel.app</span>,
            how we use it, and the choices you have. By using this site, you agree to the
            practices described in this policy.
          </p>
        </section>

        <section className="bg-white border border-amber-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-amber-900 mb-3">Information We Collect</h2>
          <h3 className="font-semibold text-stone-800 mb-2">Automatically Collected Data</h3>
          <p className="text-stone-600 leading-relaxed mb-4">
            When you visit our site, we automatically collect anonymous, aggregate usage data including:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-stone-600 text-sm mb-4">
            <li>Pages visited and time spent on each page</li>
            <li>Your general geographic region (country, state — not precise location)</li>
            <li>Browser type and operating system</li>
            <li>Referring URL (how you arrived at our site)</li>
            <li>Device type (desktop, mobile, tablet)</li>
          </ul>
          <p className="text-stone-600 leading-relaxed">
            This data is collected in aggregate and cannot be used to identify you personally.
          </p>

          <h3 className="font-semibold text-stone-800 mt-5 mb-2">Information We Do NOT Collect</h3>
          <ul className="list-disc list-inside space-y-1.5 text-stone-600 text-sm">
            <li>Your name, email address, or any contact information</li>
            <li>Your precise GPS location</li>
            <li>Financial or payment information</li>
            <li>Account credentials of any kind</li>
            <li>Any personal financial data</li>
          </ul>
          <p className="text-stone-600 mt-3 text-sm italic">
            GasPriceScout has no user accounts or registration. We never ask you for personal information.
          </p>
        </section>

        <section className="bg-white border border-amber-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-amber-900 mb-3">How We Use Your Information</h2>
          <p className="text-stone-600 leading-relaxed mb-3">
            Anonymous usage data is used solely to:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-stone-600 text-sm">
            <li>Understand which gas price data is most useful to visitors</li>
            <li>Improve site performance and fix errors</li>
            <li>Monitor overall site health and traffic patterns</li>
            <li>Inform which states and cities to prioritize for data updates</li>
          </ul>
          <p className="text-stone-600 leading-relaxed mt-3">
            We do not sell, rent, or share your data with third parties for marketing purposes.
          </p>
        </section>

        <section className="bg-white border border-amber-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-amber-900 mb-3">Analytics & Advertising</h2>

          <h3 className="font-semibold text-stone-800 mb-2">Google Analytics</h3>
          <p className="text-stone-600 leading-relaxed mb-4">
            We use Google Analytics to collect anonymized usage statistics. Google Analytics uses
            cookies to track sessions. The data collected is subject to{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-600 hover:underline"
            >
              Google&apos;s Privacy Policy
            </a>
            . You can opt out of Google Analytics tracking by installing the{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-600 hover:underline"
            >
              Google Analytics Opt-out Browser Add-on
            </a>
            .
          </p>

          <h3 className="font-semibold text-stone-800 mb-2">Google AdSense</h3>
          <p className="text-stone-600 leading-relaxed">
            GasPriceScout is supported by advertising through Google AdSense (publisher ID:
            ca-pub-7098271335538021). Google may use cookies to serve ads based on your prior visits
            to this site or other sites on the internet. You can opt out of personalized advertising
            by visiting{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-600 hover:underline"
            >
              Google Ads Settings
            </a>
            .
          </p>
        </section>

        <section className="bg-white border border-amber-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-amber-900 mb-3">Cookies</h2>
          <p className="text-stone-600 leading-relaxed">
            We use cookies for analytics and advertising purposes as described above.
            No cookies are set by GasPriceScout itself for tracking user preferences or identity.
            You can control cookie settings through your browser settings. Disabling cookies may
            affect the functionality of third-party services on our site but will not affect
            your ability to view gas price data.
          </p>
        </section>

        <section className="bg-white border border-amber-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-amber-900 mb-3">Security</h2>
          <p className="text-stone-600 leading-relaxed">
            All traffic to GasPriceScout is encrypted via HTTPS (TLS). We do not store any
            personal data on our servers. Since we collect no personal information, there is no
            user data at risk in the event of a security incident.
          </p>
        </section>

        <section className="bg-white border border-amber-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-amber-900 mb-3">Children&apos;s Privacy</h2>
          <p className="text-stone-600 leading-relaxed">
            GasPriceScout does not knowingly collect information from children under 13.
            The site contains publicly available fuel price information and is not directed at
            children.
          </p>
        </section>

        <section className="bg-white border border-amber-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-amber-900 mb-3">Changes to This Policy</h2>
          <p className="text-stone-600 leading-relaxed">
            We may update this Privacy Policy from time to time. Changes will be reflected by
            the &quot;Last updated&quot; date at the top of this page. Continued use of the site after
            any update constitutes your acceptance of the revised policy.
          </p>
        </section>

        <section className="bg-amber-900 text-amber-100 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-3">Contact</h2>
          <p className="text-amber-300 leading-relaxed">
            If you have questions about this Privacy Policy, please contact us at:{" "}
            <a
              href="mailto:contact@gas-price-scout.vercel.app"
              className="text-white underline hover:text-amber-200 transition-colors"
            >
              contact@gas-price-scout.vercel.app
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
