import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  verification: {
    google: "WddgcbVJsL2BGHNAje5m6DK56IcR0Mw5UOqozI2Xtrc",
  },
  title: "GasPriceScout — Gas Prices by State and City",
  description: "Find the cheapest gas near you — state and city rankings updated weekly from EIA data.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-amber-50">{children}</body>
    </html>
  );
}
