"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Fuel } from "lucide-react";

interface NavbarProps {
  locale: string;
  messages: {
    home: string;
    states: string;
    cities: string;
    grades: string;
    history: string;
  };
}

const LOCALES = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
  { code: "fr", label: "FR" },
  { code: "de", label: "DE" },
  { code: "ko", label: "KO" },
  { code: "ja", label: "JA" },
  { code: "zh", label: "ZH" },
  { code: "pt", label: "PT" },
];

export default function Navbar({ locale, messages }: NavbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const localePath = `/${locale}`;

  const navLinks = [
    { href: `${localePath}`, label: messages.home },
    { href: `${localePath}/states`, label: messages.states },
    { href: `${localePath}/cities`, label: messages.cities },
    { href: `${localePath}/grades`, label: messages.grades },
    { href: `${localePath}/history`, label: messages.history },
  ];

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    return segments.join("/");
  };

  return (
    <nav className="bg-amber-50 border-b border-amber-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <div className="bg-amber-500 text-white rounded-lg p-1.5">
              <Fuel size={20} />
            </div>
            <span className="font-bold text-xl text-amber-900">GasPriceScout</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.href || (link.href !== localePath && pathname.startsWith(link.href))
                    ? "bg-amber-200 text-amber-900"
                    : "text-amber-800 hover:bg-amber-100"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Locale switcher (desktop) */}
          <div className="hidden md:flex items-center gap-1">
            {LOCALES.map((loc) => (
              <Link
                key={loc.code}
                href={switchLocale(loc.code)}
                className={`text-xs px-2 py-1 rounded transition-colors ${
                  locale === loc.code
                    ? "bg-amber-500 text-white font-semibold"
                    : "text-amber-700 hover:bg-amber-100"
                }`}
              >
                {loc.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-amber-800"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-amber-50 border-t border-amber-200 px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2 rounded-md text-sm font-medium ${
                pathname === link.href ? "bg-amber-200 text-amber-900" : "text-amber-800"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 flex flex-wrap gap-1">
            {LOCALES.map((loc) => (
              <Link
                key={loc.code}
                href={switchLocale(loc.code)}
                className={`text-xs px-2 py-1 rounded ${
                  locale === loc.code ? "bg-amber-500 text-white" : "text-amber-700 hover:bg-amber-100"
                }`}
              >
                {loc.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
