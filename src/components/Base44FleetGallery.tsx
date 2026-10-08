import React, { useState } from 'react';
import { Gauge, Layers, FileText, ArrowRight, Info, FileDown } from 'lucide-react';
import {
  Base44Printer,
  FORMAT_CURRENCY,
  VOLUME_TIER_BADGES,
} from '../data/base44Printers';
import { generateBase44PrinterBrochurePdf } from '../utils/pdfGenerator';

interface Base44FleetGalleryProps {
  printers: Base44Printer[];
  onRequestQuote: (modelName: string) => void;
  onViewSpecs?: (printer: Base44Printer) => void;
}

const FILTER_GROUPS = [
  {
    key: 'colour' as const,
    label: 'Output',
    options: [
      { id: 'all', label: 'All' },
      { id: 'colour', label: 'Colour' },
      { id: 'mono', label: 'Mono' },
    ],
  },
  {
    key: 'format' as const,
    label: 'Format',
    options: [
      { id: 'all', label: 'All' },
      { id: 'A4', label: 'A4' },
      { id: 'A3', label: 'A3' },
    ],
  },
  {
    key: 'volume_tier' as const,
    label: 'Volume',
    options: [
      { id: 'all', label: 'All' },
      { id: 'small_office', label: 'Small' },
      { id: 'medium_volume', label: 'Medium' },
      { id: 'enterprise', label: 'Enterprise' },
    ],
  },
];

export const Base44FleetGallery: React.FC<Base44FleetGalleryProps> = ({
  printers,
  onRequestQuote,
  onViewSpecs,
}) => {
  const [filters, setFilters] = useState({
    colour: 'all',
    format: 'all',
    volume_tier: 'all',
  });
  const [rentalTerm, setRentalTerm] = useState<'60' | '36' | 'both'>('60'); // Always start with 60 0% escalation

  const handleFilterChange = (groupKey: string, val: string) => {
    setFilters((prev) => ({ ...prev, [groupKey]: val }));
  };

  const filteredPrinters = printers.filter((p) => {
    if (filters.colour !== 'all' && p.colour !== filters.colour) return false;
    if (filters.format !== 'all' && p.format !== filters.format) return false;
    if (filters.volume_tier !== 'all' && p.volume_tier !== filters.volume_tier) return false;
    return true;
  });

  return (
    <section id="fleet" className="scroll-mt-20 border-b border-chrome/15 px-5 py-16 lg:px-8 bg-[#0a0c0e]">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading & Count */}
        <div className="flex flex-col gap-4 border-b border-chrome/15 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
              // Fleet gallery
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
              The full Toshiba fleet
            </h2>
            <p className="mt-2 max-w-xl text-sm text-chrome/65">
              Every model is a tool, not a toy. Filter by output, format and volume to narrow the field.
            </p>
          </div>
          <div className="font-mono text-xs uppercase tracking-widest text-chrome/50">
            {filteredPrinters.length} {filteredPrinters.length === 1 ? 'model' : 'models'} shown
          </div>
        </div>

        {/* Filter Pills and Term Toggle */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-6 border-b border-chrome/15 pb-6">
          <div className="flex flex-wrap gap-6">
            {FILTER_GROUPS.map((group) => (
              <div key={group.key} className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-chrome/45">
                  {group.label}
                </span>
                <div className="flex flex-wrap gap-1">
                  {group.options.map((opt) => {
                    const isActive = (filters as any)[group.key] === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleFilterChange(group.key, opt.id)}
                        className={`border px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest transition-colors ${
                          isActive
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-chrome/20 text-chrome/60 hover:border-chrome/40 hover:text-white'
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Rental Option Selector (Always start with 60 0% escalation) */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-primary font-medium">
              Rental Option (0% Esc):
            </span>
            <div className="inline-flex rounded border border-chrome/20 bg-[#07090c] p-0.5">
              <button
                type="button"
                onClick={() => setRentalTerm('60')}
                className={`px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                  rentalTerm === '60'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-chrome/60 hover:text-white'
                }`}
              >
                60 Months
              </button>
              <button
                type="button"
                onClick={() => setRentalTerm('36')}
                className={`px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                  rentalTerm === '36'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-chrome/60 hover:text-white'
                }`}
              >
                36 Months
              </button>
              <button
                type="button"
                onClick={() => setRentalTerm('both')}
                className={`px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                  rentalTerm === 'both'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-chrome/60 hover:text-white'
                }`}
              >
                Compare Both
              </button>
            </div>
          </div>
        </div>

        {/* Printers Grid or Empty State */}
        {filteredPrinters.length === 0 ? (
          <div className="border border-chrome/15 bg-[#0c1015] py-20 text-center mt-8">
            <p className="font-heading text-lg font-bold uppercase tracking-wide text-white">
              No models match those filters
            </p>
            <p className="mt-2 text-sm text-chrome/60">
              Try widening your selection, or request a quote and we'll source the right fit.
            </p>
            <button
              type="button"
              onClick={() => onRequestQuote('')}
              className="mt-5 border border-primary bg-primary px-5 py-2.5 font-heading text-xs font-bold uppercase tracking-widest text-white hover:bg-primary/90 transition-colors"
            >
              Request a quote
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPrinters.map((printer) => (
              <div
                key={printer.id}
                className="group relative flex flex-col border border-chrome/20 bg-[#0c1015] transition-all hover:border-primary/60 hover:shadow-lg hover:shadow-black/40"
              >
                {/* Card Top Sub-Bar */}
                <div className="flex items-center justify-between border-b border-chrome/15 px-4 py-3 bg-[#0a0c0e]/50">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-chrome/50">
                    Toshiba · {printer.format} · {printer.colour}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-primary font-medium">
                    {VOLUME_TIER_BADGES[printer.volume_tier] || printer.volume_tier}
                  </span>
                </div>

                {/* Aspect ratio Image */}
                {printer.image_url && (
                  <div
                    onClick={() => onViewSpecs?.(printer)}
                    className="relative aspect-[16/10] w-full overflow-hidden border-b border-chrome/15 bg-[#0a0c0e] p-4 flex items-center justify-center cursor-pointer group/img"
                    title="Click to view specifications and download brochure"
                  >
                    <img
                      src={printer.image_url}
                      alt={printer.model}
                      className="max-h-full max-w-full object-contain filter drop-shadow-md transition-transform duration-300 group-hover/img:scale-105"
                      loading="lazy"
                    />
                    {printer.featured && (
                      <span className="absolute top-2.5 right-2.5 bg-primary/20 border border-primary/40 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-primary">
                        Featured
                      </span>
                    )}
                  </div>
                )}

                {/* Card Body */}
                <div className="flex flex-1 flex-col p-5">
                  <h3
                    onClick={() => onViewSpecs?.(printer)}
                    className="font-heading text-xl font-bold uppercase tracking-tight text-white hover:text-primary transition-colors cursor-pointer"
                    title="Click to view specifications and download brochure"
                  >
                    {printer.model}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-chrome/60 line-clamp-2 min-h-[2.5rem]">
                    {printer.description}
                  </p>

                  {/* 3 Technical Metric Boxes */}
                  <div className="mt-5 grid grid-cols-3 gap-px border border-chrome/15 bg-chrome/10">
                    <div className="bg-[#0a0c0e] p-3 text-left">
                      <Gauge className="h-3.5 w-3.5 text-primary/70" />
                      <div className="mt-2 font-mono text-base font-bold text-white">
                        {printer.speed_ppm}
                      </div>
                      <div className="font-mono text-[9px] uppercase tracking-widest text-chrome/45">
                        ppm
                      </div>
                    </div>
                    <div className="bg-[#0a0c0e] p-3 text-left">
                      <Layers className="h-3.5 w-3.5 text-primary/70" />
                      <div className="mt-2 font-mono text-base font-bold text-white">
                        {(printer.duty_cycle / 1000).toFixed(0)}k
                      </div>
                      <div className="font-mono text-[9px] uppercase tracking-widest text-chrome/45">
                        /mo
                      </div>
                    </div>
                    <div className="bg-[#0a0c0e] p-3 text-left">
                      <FileText className="h-3.5 w-3.5 text-primary/70" />
                      <div className="mt-2 font-mono text-base font-bold text-white">
                        {printer.format}
                      </div>
                      <div className="font-mono text-[9px] uppercase tracking-widest text-chrome/45">
                        max
                      </div>
                    </div>
                  </div>

                  {/* Rental Price & Actions */}
                  <div className="mt-5 border-t border-chrome/10 pt-3">
                    {rentalTerm === 'both' ? (
                      <div className="grid grid-cols-2 gap-2 mb-3 bg-[#0a0c0e] p-2.5 border border-chrome/15">
                        <div>
                          <div className="font-mono text-[9px] uppercase tracking-wider text-chrome/50">
                            60m (0% Esc)
                          </div>
                          <div className="font-mono text-base font-bold text-primary">
                            {FORMAT_CURRENCY(printer.rental_60mo_0esc || printer.monthly_rental)}
                            <span className="text-[10px] text-chrome/50 font-normal">/mo</span>
                          </div>
                        </div>
                        <div className="border-l border-chrome/15 pl-2">
                          <div className="font-mono text-[9px] uppercase tracking-wider text-chrome/50">
                            36m (0% Esc)
                          </div>
                          <div className="font-mono text-base font-bold text-white">
                            {FORMAT_CURRENCY(printer.rental_36mo_0esc || Math.round(printer.monthly_rental * 1.35))}
                            <span className="text-[10px] text-chrome/50 font-normal">/mo</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="mb-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] uppercase tracking-widest text-chrome/50">
                            {rentalTerm === '60' ? '60 Months (0% Esc)' : '36 Months (0% Esc)'}
                          </span>
                          <span className="font-mono text-[9px] text-emerald-400">
                            Cash: {FORMAT_CURRENCY(printer.final_hardware_price || printer.monthly_rental * 36)}
                          </span>
                        </div>
                        <div className="flex items-baseline gap-2 mt-0.5">
                          <div className="font-mono text-2xl font-bold text-primary">
                            {FORMAT_CURRENCY(
                              rentalTerm === '60'
                                ? (printer.rental_60mo_0esc || printer.monthly_rental)
                                : (printer.rental_36mo_0esc || Math.round(printer.monthly_rental * 1.35))
                            )}
                            <span className="text-sm text-chrome/50 font-normal">/mo ex VAT</span>
                          </div>
                          <span className="font-mono text-[10px] text-chrome/40">
                            ({rentalTerm === '60' ? '36m' : '60m'}: {FORMAT_CURRENCY(rentalTerm === '60' ? printer.rental_36mo_0esc : printer.rental_60mo_0esc)}/mo)
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-1.5 pt-1">
                      <div className="font-mono text-[9px] uppercase tracking-wider text-chrome/40">
                        {printer.kago_band ? `KAGO Band ${printer.kago_band}` : '0% Escalation'}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => generateBase44PrinterBrochurePdf(printer)}
                          title="Download official brochure PDF"
                          className="inline-flex items-center gap-1 border border-chrome/20 bg-[#0a0c0e] px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-chrome/80 hover:border-primary/50 hover:text-primary transition-colors cursor-pointer"
                        >
                          <FileDown className="h-3.5 w-3.5 text-primary" />
                          <span className="hidden sm:inline">Brochure</span>
                        </button>
                        {onViewSpecs && (
                          <button
                            type="button"
                            onClick={() => onViewSpecs(printer)}
                            title="View detailed technical specs"
                            className="p-1.5 border border-chrome/20 text-chrome/60 hover:text-white hover:border-chrome/50 transition-colors cursor-pointer"
                          >
                            <Info className="h-3.5 w-3.5" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => onRequestQuote(printer.model)}
                          className="group/btn inline-flex items-center gap-1.5 border border-primary bg-primary/10 px-3 py-1.5 font-heading text-[11px] font-bold uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-white cursor-pointer"
                        >
                          Quote
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
