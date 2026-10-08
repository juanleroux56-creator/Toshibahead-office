import React from 'react';
import { Printer, Phone, Mail, ShieldCheck } from 'lucide-react';
import { QUOTE_BG_IMAGE } from '../data/base44Printers';

interface Base44FooterProps {
  onOpenAdmin?: () => void;
}

export const Base44Footer: React.FC<Base44FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer className="relative overflow-hidden border-t border-chrome/15 bg-[#0a0c0e]">
      {/* Background Graphic Texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage: `url(${QUOTE_BG_IMAGE})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c0e] via-[#0a0c0e]/90 to-[#0a0c0e]/70" />

      <div className="relative mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand & Mission Statement */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <Printer className="h-6 w-6 text-primary" />
              <span className="font-heading text-lg font-bold uppercase tracking-[0.18em] text-white">
                Toshiba<span className="px-1 text-primary">·</span>Head Office
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-chrome/65">
              Printer rentals, sales and service for offices across South Africa. Toshiba hardware,
              directly supported from our South African Head Office — Johannesburg, Pretoria, Ekurhuleni and nationwide.
            </p>
            <div className="mt-6 flex flex-wrap gap-6 font-mono text-[11px] uppercase tracking-widest text-chrome/45">
              <span>Rentals</span>
              <span>Sales</span>
              <span>Service</span>
              <span>Consumables</span>
            </div>
          </div>

          {/* Active Now / Specialist Card */}
          <div className="border border-primary/30 bg-[#07090c]/80 p-5">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary font-medium">
                Direct line · Active now
              </span>
            </div>
            <div className="mt-4 font-heading text-base font-bold uppercase tracking-wide text-white">
              Juan — Toshiba Head Office
            </div>
            <a
              href="tel:0783076569"
              className="mt-3 flex items-center gap-2 font-mono text-lg text-white transition-colors hover:text-primary"
            >
              <Phone className="h-4 w-4 text-primary" />
              078 307 6569
            </a>
            <a
              href="mailto:juanlr@toshiba-sa.co.za"
              className="mt-2 flex items-center gap-2 font-mono text-sm text-chrome/80 transition-colors hover:text-primary"
            >
              <Mail className="h-4 w-4 text-primary" />
              juanlr@toshiba-sa.co.za
            </a>
          </div>
        </div>

        {/* Bottom Geographical & Copyright Bar */}
        <div className="mt-12 flex flex-col gap-3 border-t border-chrome/15 pt-6 font-mono text-[10px] uppercase tracking-widest text-chrome/45 sm:flex-row sm:items-center sm:justify-between">
          <span>26.2041° S · 28.0473° E · Gauteng, South Africa</span>
          <div className="flex flex-wrap items-center gap-4">
            {onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 text-chrome/60 transition-colors hover:text-white cursor-pointer"
                title="Gauteng Admin CRM (PIN: 1234)"
              >
                <ShieldCheck className="h-3 w-3 text-primary" />
                <span>CRM Leads Portal</span>
              </button>
            )}
            <span>© {new Date().getFullYear()} Toshiba Head Office — Rentals · Sales · Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
