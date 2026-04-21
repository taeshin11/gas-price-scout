import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Script from 'next/script';
import { FeedbackButton } from '@/components/FeedbackButton';
import { AdSocialBar } from '@/components/ads/AdSocialBar';

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: {
      template: "%s | GasPriceScout",
      default: "Today's Gas Prices by State & City | GasPriceScout",
    },
    description:
      "Find current gas prices near you. Compare regular, premium, and diesel prices by state and city. Updated daily from nationwide fuel price data.",
    keywords: [
      "gas prices",
      "gas prices near me",
      "cheapest gas",
      "fuel prices today",
      "gas price by state",
      "diesel prices",
      "gas price map",
    ],
    openGraph: {
      title: "Today's Gas Prices by State & City | GasPriceScout",
      description:
        "Find current gas prices near you. Compare regular, premium, and diesel prices by state and city. Updated daily from nationwide fuel price data.",
      url: `https://gas-price-scout.vercel.app/${locale}`,
      siteName: "GasPriceScout",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Today's Gas Prices by State & City | GasPriceScout",
      description:
        "Find current gas prices near you. Compare regular, premium, and diesel prices by state and city. Updated daily.",
    },
    alternates: {
      canonical: `https://gas-price-scout.vercel.app/${locale}`,
      languages: {
        "en": "https://gas-price-scout.vercel.app/en",
        "es": "https://gas-price-scout.vercel.app/es",
        "fr": "https://gas-price-scout.vercel.app/fr",
        "de": "https://gas-price-scout.vercel.app/de",
        "ko": "https://gas-price-scout.vercel.app/ko",
        "ja": "https://gas-price-scout.vercel.app/ja",
        "zh": "https://gas-price-scout.vercel.app/zh",
        "pt": "https://gas-price-scout.vercel.app/pt",
      },
    },
    other: {
      "google-adsense-account": "ca-pub-7098271335538021",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "ko" | "ja" | "zh" | "es" | "fr" | "de" | "pt")) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "nav" });
  const tf = await getTranslations({ locale, namespace: "footer" });

  return (
    <div className="min-h-screen flex flex-col bg-amber-50">
      <Navbar
        locale={locale}
        messages={{
          home: t("home"),
          states: t("states"),
          cities: t("cities"),
          grades: t("grades"),
          history: t("history"),
        }}
      />
      <main className="flex-1">{children}</main>
      <AdSocialBar />
      <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7098271335538021" crossOrigin="anonymous" strategy="afterInteractive" />
      <FeedbackButton siteName="GasPriceScout" />
      <Footer
        locale={locale}
        messages={{
          dataSource: tf("dataSource"),
          updateFreq: tf("updateFreq"),
          rights: tf("rights"),
        }}
      />
    </div>
  );
}
