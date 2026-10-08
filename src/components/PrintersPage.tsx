import React, { useState, useMemo } from 'react';
import { ToshibaPrinter, TOSHIBA_PRINTERS } from '../data/toshibaPrinters';
import { Search, Gauge, Download, ArrowLeft, FileText, CheckCircle2 } from 'lucide-react';

interface PrintersPageProps {
  onSelectPrinter: (printer: ToshibaPrinter) => void;
  onBackHome: () => void;
  onGetQuoteForPrinter?: (model: string) => void;
}

export const PrintersPage: React.FC<PrintersPageProps> = ({
  onSelectPrinter,
  onBackHome,
  onGetQuoteForPrinter,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'colour' | 'mono'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const counts = useMemo(() => {
    return {
      all: TOSHIBA_PRINTERS.length,
      colour: TOSHIBA_PRINTERS.filter((p) => p.category === 'colour').length,
      mono: TOSHIBA_PRINTERS.filter((p) => p.category === 'mono').length,
    };
  }, []);

  const filteredPrinters = useMemo(() => {
    return TOSHIBA_PRINTERS.filter((p) => {
      const matchCat = activeCategory === 'all' || p.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        !query ||
        p.model.toLowerCase().includes(query) ||
        p.tagline.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.format.toLowerCase().includes(query);
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0d13] text-white">
      {/* Banner */}
      <section className="bg-[#080a0e] text-white py-14 border-b border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <button
            onClick={onBackHome}
            className="inline-flex items-center gap-2 text-xs font-semibold text-rose-500 hover:text-rose-400 mb-6 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <p className="text-xs font-bold text-rose-500 uppercase tracking-widest mb-2">
            The Range
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-3">
            Toshiba e-STUDIO Printers
          </h1>
          <p className="text-slate-300 max-w-2xl text-sm sm:text-base leading-relaxed">
            A4 and A3, mono and full colour — available to rent or buy anywhere in Gauteng. Free delivery and installation included.
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="border-b border-slate-800 bg-[#0e1118]/80 sticky top-16 z-30 backdrop-blur py-4">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-xl w-full sm:w-auto">
            {(['all', 'colour', 'mono'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat} ({counts[cat]})
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by model or feature..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-rose-500 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Printer Catalog Grid */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12 flex-1 w-full">
        {filteredPrinters.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800">
            <p className="text-slate-400 text-base mb-3">
              No printers found matching "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="text-xs font-bold text-rose-500 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPrinters.map((printer) => (
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

                  {/* 4-Metric Precision Spec Grid */}
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

                {/* Footer specs & actions */}
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
                      <button
                        onClick={() => onGetQuoteForPrinter?.(printer.model)}
                        className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold py-2 px-2 rounded-xl transition-colors flex items-center justify-center font-heading uppercase tracking-wider"
                      >
                        Quote
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
