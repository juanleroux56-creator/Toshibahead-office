import React from 'react';
import { Printer, Phone, MessageSquare, Mail, MapPin } from 'lucide-react';
import { TOSHIBA_PRINTERS, ToshibaPrinter } from '../data/toshibaPrinters';

interface FooterSectionProps {
  onNavigate: (path: string) => void;
  onSelectPrinter: (printer: ToshibaPrinter) => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  onNavigate,
  onSelectPrinter,
}) => {
  const popularModels = TOSHIBA_PRINTERS.slice(0, 7);

  const handleLinkClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (href.startsWith('/#')) {
      onNavigate('/');
      setTimeout(() => {
        const id = href.replace('/#', '');
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      onNavigate(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#07080b] border-t border-slate-800 text-slate-400 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Col 1: About Brand */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <div className="bg-rose-600 rounded-lg p-2 text-white shadow-md">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-white text-xl tracking-tight block">
                TOSHIBA
              </span>
              <span className="block text-[10px] text-slate-400 font-semibold tracking-widest uppercase">
                South Africa
              </span>
            </div>
          </div>

          <p className="text-slate-400 text-xs leading-relaxed">
            Official Toshiba and Duplo importer for South Africa. Office printer rentals from R400/month, outright purchases, and pay-per-print toner plans across Gauteng.
          </p>

          <p className="text-[11px] text-slate-500">
            Certified Toshiba technicians &amp; genuine consumables.
          </p>
        </div>

        {/* Col 2: Popular Models */}
        <div>
          <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4">
            Popular Models
          </h4>
          <ul className="space-y-2">
            {popularModels.map((printer) => (
              <li key={printer.id}>
                <button
                  type="button"
                  onClick={() => onSelectPrinter(printer)}
                  className="hover:text-rose-400 transition-colors text-left cursor-pointer flex items-center justify-between w-full"
                >
                  <span>{printer.model}</span>
                  <span className="text-[10px] text-slate-500">{printer.format}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Quick Links */}
        <div>
          <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2.5">
            {[
              { label: 'Home', href: '/' },
              { label: 'All Printers & Copiers', href: '/printers' },
              { label: 'Rent vs Buy Guide', href: '/#rent-vs-buy' },
              { label: 'Gauteng Regional SLA', href: '/#coverage' },
              { label: 'Free Office Print Audit', href: '/#print-audit' },
              { label: 'Get a Free Quote', href: '/#contact' },
            ].map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(link.href, e)}
                  className="hover:text-rose-400 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Contact info */}
        <div>
          <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4">
            Contact Us
          </h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-rose-500 shrink-0" />
              <a href="tel:0117964828" className="hover:text-white transition-colors">
                011 796 4828
              </a>
            </li>

            <li className="flex items-center gap-2.5">
              <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
              <a
                href="https://wa.me/27786792279"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                078 679 2279 (WhatsApp)
              </a>
            </li>

            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-rose-500 shrink-0" />
              <a href="mailto:juanlr@toshiba-sa.co.za" className="hover:text-white transition-colors">
                juanlr@toshiba-sa.co.za
              </a>
            </li>

            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span className="text-slate-400">
                Gauteng, South Africa (4–8h onsite response across JHB &amp; Pretoria)
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
        <p>© 2026 Toshiba South Africa. All rights reserved. Official Toshiba &amp; Duplo Importer.</p>
        <p>Gauteng Office Printer Rentals, Sales &amp; Pay-Per-Print Service.</p>
      </div>
    </footer>
  );
};
