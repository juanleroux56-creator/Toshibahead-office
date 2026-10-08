import React, { useState } from 'react';
import { ToshibaPrinter, TOSHIBA_PRINTERS } from '../data/toshibaPrinters';
import { ArrowRight, Download, CheckCircle, Gauge, FileText } from 'lucide-react';

interface FeaturedPrintersSectionProps {
  onSelectPrinter: (printer: ToshibaPrinter) => void;
  onBrowseAll: () => void;
}

export const FeaturedPrintersSection: React.FC<FeaturedPrintersSectionProps> = ({
  onSelectPrinter,
  onBrowseAll,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'colour' | 'mono'>('all');

  // Show the featured printers or top representatives
  const featuredList = TOSHIBA_PRINTERS.filter((p) => {
    if (activeTab === 'all') {
      return p.featured || ['2822af', '409s', '331ac', '2021ac', '2528a', '449s', '6526ac', '2329a'].includes(p.id);
    }
    return p.category === activeTab;
  }).slice(0, 8);

  return (
    <section id="printers" className="py-16 md:py-24 max-w-7xl mx-auto px-4 md:px-8 w-full border-t border-slate-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-rose-500 font-bold mb-2">
            // Fleet gallery
          </p>
          <h2 className="text-3xl sm:text-4xl font-black font-heading uppercase text-white tracking-tight">
            The Full Toshiba Fleet
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl">
            Every model is a reliable office workhorse. Filter by output to inspect print speeds, duty cycles, and direct Toshiba Head Office rental rates across Gauteng.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex bg-[#05070a] border border-slate-800 p-1 rounded-xl">
            {(['all', 'colour', 'mono'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab === 'all' ? 'All Models' : tab}
              </button>
            ))}
          </div>

          <button
            onClick={onBrowseAll}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white text-xs font-bold uppercase tracking-wider border border-slate-800 transition-all cursor-pointer font-heading"
          >
            <span>All {TOSHIBA_PRINTERS.length} Models</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Grid of printers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {featuredList.map((printer) => (
          <div
            key={printer.id}
            className="bg-[#0b0e14] border border-slate-800/90 hover:border-slate-700 rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:shadow-2xl transition-all duration-200 group relative"
          >
            <div>
              {/* Badges */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span
                  className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                    printer.category === 'colour'
                      ? 'bg-rose-950/80 text-rose-300 border border-rose-800/60'
                      : 'bg-slate-800 text-slate-300 border border-slate-700'
                  }`}
                >
                  {printer.format} · {printer.category === 'colour' ? 'Colour' : 'Mono'}
                </span>

                {printer.inStock !== false && (
                  <span className="text-[10px] font-mono font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 px-2 py-0.5 rounded flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    In Stock
                  </span>
                )}
              </div>

              {/* Product Image */}
              <div
                onClick={() => onSelectPrinter(printer)}
                className="bg-[#05070a] rounded-xl flex items-center justify-center h-44 mb-3.5 p-3 border border-slate-800/80 group-hover:border-slate-700 transition-colors overflow-hidden cursor-pointer"
              >
                {printer.image ? (
                  <img
                    src={printer.image}
                    alt={printer.model}
                    referrerPolicy="no-referrer"
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                ) : (
                  <FileText className="w-12 h-12 text-slate-700" />
                )}
              </div>

              {/* Model & Tagline */}
              <h3
                onClick={() => onSelectPrinter(printer)}
                className="font-bold text-white text-base group-hover:text-rose-400 transition-colors cursor-pointer font-heading uppercase tracking-tight"
              >
                {printer.model}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2 mt-1 mb-3 leading-relaxed">
                {printer.tagline}
              </p>

              {/* 4-Metric Precision Spec Grid (Base44 style) */}
              <div className="grid grid-cols-4 gap-px bg-slate-800/80 border border-slate-800/80 rounded-lg overflow-hidden my-3 text-center">
                <div className="bg-[#07090e] py-1.5 px-1">
                  <div className="font-mono text-xs font-bold text-white">{printer.speed}</div>
                  <div className="font-mono text-[9px] uppercase tracking-wider text-slate-500">PPM</div>
                </div>
                <div className="bg-[#07090e] py-1.5 px-1">
                  <div className="font-mono text-xs font-bold text-white">
                    {printer.dutyCycle || '50k'}
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-wider text-slate-500">/mo</div>
                </div>
                <div className="bg-[#07090e] py-1.5 px-1">
                  <div className="font-mono text-xs font-bold text-white">{printer.format}</div>
                  <div className="font-mono text-[9px] uppercase tracking-wider text-slate-500">Format</div>
                </div>
                <div className="bg-[#07090e] py-1.5 px-1">
                  <div className="font-mono text-xs font-bold text-white">{printer.category === 'colour' ? 'Colour' : 'Mono'}</div>
                  <div className="font-mono text-[9px] uppercase tracking-wider text-slate-500">Output</div>
                </div>
              </div>
            </div>

            {/* Footer details & action */}
            <div className="pt-3 border-t border-slate-800/80">
              <div className="flex items-baseline justify-between mb-3">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 block">
                    Monthly Rental
                  </span>
                  <span className="font-mono text-sm font-bold text-rose-400">
                    {printer.rentalFrom || 'From R650 /mo'}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                  R0 Deposit
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onSelectPrinter(printer)}
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs py-2 px-2.5 rounded-xl transition-colors cursor-pointer text-center font-heading uppercase tracking-wider"
                >
                  View Specs
                </button>

                {printer.brochureUrl ? (
                  <a
                    href={printer.brochureUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold py-2 px-2 rounded-xl transition-colors flex items-center justify-center gap-1 font-heading uppercase tracking-wider"
                  >
                    <Download className="w-3 h-3 text-rose-400" />
                    <span>PDF</span>
                  </a>
                ) : (
                  <a
                    href="#contact"
                    className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold py-2 px-2 rounded-xl transition-colors flex items-center justify-center font-heading uppercase tracking-wider"
                  >
                    Quote
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile browse all link */}
      <div className="mt-8 text-center sm:hidden">
        <button
          onClick={onBrowseAll}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-slate-200 text-sm font-semibold border border-slate-700"
        >
          <span>Browse all {TOSHIBA_PRINTERS.length} models</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
