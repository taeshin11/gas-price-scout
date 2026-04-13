import Link from "next/link";
import { Fuel } from "lucide-react";

interface FooterProps {
  locale: string;
  messages: {
    dataSource: string;
    updateFreq: string;
    rights: string;
  };
}

export default function Footer({ locale, messages }: FooterProps) {
  return (
    <footer className="bg-amber-900 text-amber-100 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-amber-500 text-white rounded-lg p-1.5">
                <Fuel size={18} />
              </div>
              <span className="font-bold text-lg text-white">GasPriceScout</span>
            </div>
            <p className="text-amber-300 text-sm">
              Find the cheapest gas near you — state and city rankings updated weekly.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-amber-300">
              <li><Link href={`/${locale}/states`} className="hover:text-white transition-colors">All States</Link></li>
              <li><Link href={`/${locale}/cities`} className="hover:text-white transition-colors">Major Cities</Link></li>
              <li><Link href={`/${locale}/grades`} className="hover:text-white transition-colors">Fuel Grades</Link></li>
              <li><Link href={`/${locale}/history`} className="hover:text-white transition-colors">Price History</Link></li>
            </ul>
          </div>

          {/* Data info */}
          <div>
            <h3 className="font-semibold text-white mb-3">Data Source</h3>
            <p className="text-amber-300 text-sm mb-1">{messages.dataSource}</p>
            <p className="text-amber-400 text-xs">{messages.updateFreq}</p>
            <p className="text-amber-400 text-xs mt-4">
              &copy; {new Date().getFullYear()} GasPriceScout. {messages.rights}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
