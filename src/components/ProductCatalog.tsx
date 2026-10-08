import React, { useState } from 'react';
import { 
  PrinterModel, 
  FilterState, 
  PrinterCategory, 
  PrinterFormat, 
  VolumeTier 
} from '../types';
import { TOSHIBA_CATALOG } from '../data/printerCatalog';
import { generateCatalogPdf } from '../utils/pdfGenerator';
import { ProductCard } from './ProductCard';
import { 
  Search, 
  Filter, 
  Sparkles, 
  Download, 
  FileText, 
  Printer,
  ChevronDown,
  Terminal,
  Layers,
  Cpu
} from 'lucide-react';

interface ProductCatalogProps {
  onSelectModelForQuote: (model: PrinterModel) => void;
  onViewModelDetails: (model: PrinterModel) => void;
  onOpenMatcher: () => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onSelectModelForQuote,
  onViewModelDetails,
  onOpenMatcher,
}) => {
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    format: 'all',
    volumeTier: 'all',
    searchQuery: '',
    sortBy: 'recommended',
  });

  const filteredPrinters = TOSHIBA_CATALOG.filter(printer => {
    if (filters.category !== 'all' && printer.category !== filters.category) {
      return false;
    }
    if (filters.format !== 'all' && printer.format !== filters.format) {
      return false;
    }
    if (filters.volumeTier !== 'all' && printer.volumeTier !== filters.volumeTier) {
      return false;
    }
    if (filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase();
      const matchName = printer.name.toLowerCase().includes(q);
      const matchNumber = printer.modelNumber.toLowerCase().includes(q);
      const matchNotes = printer.keyNotes.some(k => k.toLowerCase().includes(q));
      if (!matchName && !matchNumber && !matchNotes) return false;
    }
    return true;
  }).sort((a, b) => {
    if (filters.sortBy === 'price_low') {
      const pA = a.rental36moZAR ?? 999999;
      const pB = b.rental36moZAR ?? 999999;
      return pA - pB;
    }
    if (filters.sortBy === 'price_high') {
      const pA = a.rental36moZAR ?? -1;
      const pB = b.rental36moZAR ?? -1;
      return pB - pA;
    }
    if (filters.sortBy === 'speed_high') {
      return b.speed - a.speed;
    }
    return 0; // recommended
  });

  const handleDownloadCatalog = () => {
    let title = 'Full Toshiba Head Office Catalog';
    if (filters.category !== 'all') title += ` - ${filters.category === 'color' ? 'Colour' : 'Mono'}`;
    if (filters.format !== 'all') title += ` (${filters.format})`;
    generateCatalogPdf(filteredPrinters, title);
  };

  return (
    <div className="space-y-8">
      {/* Catalog Header & Command Banner with Toshiba Watermark */}
      <div className="bg-[#090d16] border border-red-950/80 rounded-3xl p-6 sm:p-8 text-white flex flex-wrap items-center justify-between gap-6 shadow-hud-glow relative overflow-hidden">
        {/* Giant Toshiba Logo Background */}
        <div className="absolute right-0 bottom-0 select-none pointer-events-none opacity-[0.03] text-9xl font-black text-white font-heading">
          TOSHIBA
        </div>

        <div className="space-y-2 max-w-2xl z-10">
          <div className="inline-flex items-center space-x-2 bg-red-950/90 border border-red-800/80 px-3 py-0.5 rounded-full text-red-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Terminal className="w-3.5 h-3.5 text-red-500" />
            <span>[FLEET_INVENTORY // ALL 10 HARDWARE NODES]</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black font-heading tracking-tight uppercase">
            TOSHIBA e-STUDIO ENTERPRISE CATALOG
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-xl leading-relaxed">
            Industrial monochrome and CMYK production copiers with full 36/60-month operating rentals, 0% upfront deposit, and complete on-site SLA coverage.
          </p>
        </div>

        {/* Action Buttons: PDF Export & Matcher Shortcut */}
        <div className="flex flex-wrap items-center gap-3 z-10 font-mono text-xs">
          <button
            onClick={handleDownloadCatalog}
            className="flex items-center space-x-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 rounded-xl font-bold border border-slate-700 hover:border-slate-500 transition-all cursor-pointer shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-red-500" />
            <span>EXPORT_CATALOG.PDF ({filteredPrinters.length})</span>
          </button>

          <button
            onClick={onOpenMatcher}
            className="flex items-center space-x-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-extrabold shadow-red-glow transition-all cursor-pointer uppercase tracking-wider"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>LAUNCH 3-STEP MATCHER</span>
          </button>
        </div>
      </div>

      {/* TACTICAL FILTER CONTROLS BAR */}
      <div className="bg-[#090c13] border border-slate-800/90 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4 font-mono">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search Field */}
          <div className="relative sm:col-span-2 lg:col-span-2">
            <Search className="w-4 h-4 text-red-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="SEARCH BY MODEL // 2521AC, 409S, 7527AC, COLOUR..."
              value={filters.searchQuery}
              onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
              className="w-full pl-9 pr-3 py-2.5 text-xs bg-[#04060a] border border-slate-800 rounded-xl focus:outline-none focus:border-red-600 focus:bg-[#070a10] text-slate-100 placeholder:text-slate-600 uppercase"
            />
          </div>

          {/* Colour vs Mono Filter */}
          <div>
            <select
              value={filters.category}
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value as any }))}
              className="w-full py-2.5 px-3 text-xs bg-[#04060a] border border-slate-800 rounded-xl focus:outline-none focus:border-red-600 text-slate-200 cursor-pointer uppercase font-bold"
            >
              <option value="all">[TYPE: ALL SPECTRUM]</option>
              <option value="color">CMYK FULL COLOUR</option>
              <option value="mono">MONOCHROME ONLY</option>
            </select>
          </div>

          {/* Format Filter (A4 vs A3) */}
          <div>
            <select
              value={filters.format}
              onChange={(e) => setFilters(prev => ({ ...prev, format: e.target.value as any }))}
              className="w-full py-2.5 px-3 text-xs bg-[#04060a] border border-slate-800 rounded-xl focus:outline-none focus:border-red-600 text-slate-200 cursor-pointer uppercase font-bold"
            >
              <option value="all">[FORMAT: A4 &amp; A3]</option>
              <option value="A4">A4 COMPACT DESKTOP</option>
              <option value="A3">A3/A4 FLOOR STANDING</option>
            </select>
          </div>

          {/* Volume Tier & Sort */}
          <div>
            <select
              value={filters.volumeTier}
              onChange={(e) => setFilters(prev => ({ ...prev, volumeTier: e.target.value as any }))}
              className="w-full py-2.5 px-3 text-xs bg-[#04060a] border border-slate-800 rounded-xl focus:outline-none focus:border-red-600 text-slate-200 cursor-pointer uppercase font-bold"
            >
              <option value="all">[TIER: ALL VOLUMES]</option>
              <option value="small">SMALL OFFICE (&lt;35K/MO)</option>
              <option value="medium">WORKGROUP (35K–105K)</option>
              <option value="enterprise">ENTERPRISE (105K+)</option>
            </select>
          </div>
        </div>

        {/* Filter Summary Tags & Results Count */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-xs text-slate-400 font-mono">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-300">[ACTIVE_MODELS: {filteredPrinters.length} NODES]</span>
            {(filters.category !== 'all' || filters.format !== 'all' || filters.volumeTier !== 'all' || filters.searchQuery) && (
              <button
                onClick={() => setFilters({ category: 'all', format: 'all', volumeTier: 'all', searchQuery: '', sortBy: 'recommended' })}
                className="text-red-500 hover:text-red-400 font-bold text-[11px] cursor-pointer"
              >
                [RESET_FILTERS]
              </button>
            )}
          </div>

          {/* Quick Sort Dropdown */}
          <div className="flex items-center space-x-2">
            <span className="text-[11px] text-slate-500">[SORT_METRIC]:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
              className="text-xs bg-transparent border-0 font-bold text-slate-200 focus:outline-none cursor-pointer uppercase"
            >
              <option value="recommended" className="bg-[#090c13]">FEATURED RECOMMENDATION</option>
              <option value="price_low" className="bg-[#090c13]">RENTAL: LOWEST FIRST</option>
              <option value="price_high" className="bg-[#090c13]">RENTAL: HIGHEST FIRST</option>
              <option value="speed_high" className="bg-[#090c13]">PRINT SPEED: FASTEST FIRST</option>
            </select>
          </div>
        </div>
      </div>

      {/* PRODUCT CARDS GRID */}
      {filteredPrinters.length === 0 ? (
        <div className="bg-[#090c13] border border-slate-800 rounded-3xl p-12 text-center space-y-4 font-mono">
          <Printer className="w-12 h-12 text-red-500/60 mx-auto" />
          <h3 className="text-lg font-black text-white uppercase font-heading">[NO_HARDWARE_MATCHES_FOUND]</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Adjust your category or volume filters, or launch the automated matcher to calculate machine parameters.
          </p>
          <button
            onClick={() => setFilters({ category: 'all', format: 'all', volumeTier: 'all', searchQuery: '', sortBy: 'recommended' })}
            className="px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-xl shadow-red-glow uppercase"
          >
            RESET ALL FILTERS
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrinters.map(printer => (
            <ProductCard
              key={printer.id}
              printer={printer}
              onSelectModelForQuote={onSelectModelForQuote}
              onViewModelDetails={onViewModelDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
};
