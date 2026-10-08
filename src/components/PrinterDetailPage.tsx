import React from 'react';
import { ToshibaPrinter, TOSHIBA_PRINTERS } from '../data/toshibaPrinters';
import {
  ArrowLeft,
  MessageSquare,
  Phone,
  Download,
  Gauge,
  Layers,
  Sparkles,
  CheckCircle2,
  FileText
} from 'lucide-react';

interface PrinterDetailPageProps {
  printer: ToshibaPrinter;
  onBack: () => void;
  onSelectPrinter: (printer: ToshibaPrinter) => void;
  onRequestQuote: (printer: ToshibaPrinter) => void;
}

export const PrinterDetailPage: React.FC<PrinterDetailPageProps> = ({
  printer,
  onBack,
  onSelectPrinter,
  onRequestQuote,
}) => {
  const relatedPrinters = TOSHIBA_PRINTERS.filter(
    (p) => p.id !== printer.id && (p.category === printer.category || p.format === printer.format)
  ).slice(0, 3);

  const specLabels: Record<string, string> = {
    imaging: 'Imaging / Copy System',
    processor: 'Processor',
    memory: 'Memory / Storage',
    paperCapacity: 'Paper Capacity',
    paperSize: 'Paper Size Range',
    display: 'Display / Control Panel',
    warmUpTime: 'Warm-Up Time',
    powerConsumption: 'Power Consumption',
    dimensions: 'Dimensions (W x D x H)',
    weight: 'Weight',
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Toshiba Team, I am interested in a quote and specs for the ${printer.model} (${printer.format} ${printer.category}). Please advise on rental rates and availability.`
  );

  return (
    <div className="min-h-screen bg-[#0b0d13] text-white">
      {/* Top breadcrumb navigation */}
      <div className="border-b border-slate-800 bg-[#080a0e] py-4">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-semibold text-rose-500 hover:text-rose-400 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all printers</span>
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14">
        {/* Main Details Grid */}
        <div className="grid lg:grid-cols-12 gap-10 items-start mb-16">
          {/* Left Column: Product Image Frame */}
          <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-3xl p-8 flex items-center justify-center min-h-[380px] lg:sticky lg:top-24">
            {printer.image ? (
              <img
                src={printer.image}
                alt={printer.model}
                referrerPolicy="no-referrer"
                className="max-h-80 max-w-full object-contain"
              />
            ) : (
              <FileText className="w-20 h-20 text-slate-700" />
            )}
          </div>

          {/* Right Column: Title, Quick Specs & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-md ${
                  printer.category === 'colour'
                    ? 'bg-blue-950/90 text-blue-300 border border-blue-800'
                    : 'bg-slate-800 text-slate-300 border border-slate-700'
                }`}
              >
                {printer.format} · {printer.category === 'colour' ? 'Colour' : 'Mono'}
              </span>

              {printer.inStock !== false && (
                <span className="text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  In Stock in Gauteng
                </span>
              )}

              {printer.featured && (
                <span className="text-xs font-semibold bg-rose-950/80 text-rose-300 border border-rose-800/60 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                  Featured Model
                </span>
              )}
            </div>

            {/* Model Name & Tagline */}
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
              {printer.model}
            </h1>
            <p className="text-base text-rose-400 font-semibold mb-6">
              {printer.tagline}
            </p>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              {printer.description}
            </p>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full mb-8">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 text-center">
                <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">
                  Speed
                </div>
                <div className="text-base sm:text-lg font-bold text-white flex items-center justify-center gap-1">
                  <Gauge className="w-4 h-4 text-rose-500" />
                  <span>{printer.speed} PPM</span>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 text-center">
                <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">
                  Format
                </div>
                <div className="text-base sm:text-lg font-bold text-white flex items-center justify-center gap-1">
                  <Layers className="w-4 h-4 text-rose-500" />
                  <span>{printer.format}</span>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 text-center">
                <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">
                  Type
                </div>
                <div className="text-base sm:text-lg font-bold text-white capitalize">
                  {printer.category}
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 text-center">
                <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">
                  Rental
                </div>
                <div className="text-sm sm:text-base font-bold text-rose-400">
                  {printer.rentalFrom || 'Contact'}
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full mb-8">
              <button
                onClick={() => onRequestQuote(printer)}
                className="flex-1 min-w-[160px] py-3 px-6 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md transition-colors cursor-pointer text-center"
              >
                Request a Quote
              </button>

              <a
                href={`https://wa.me/27786792279?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[160px] py-3 px-6 rounded-xl bg-[#25D366] hover:bg-[#1db954] text-white font-bold text-sm shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>WhatsApp Us</span>
              </a>

              {printer.brochureUrl && (
                <a
                  href={printer.brochureUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold border border-slate-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4 text-rose-400" />
                  <span>Brochure</span>
                </a>
              )}

              <a
                href="tel:0117964828"
                className="py-3 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-sm font-semibold border border-slate-800 transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-rose-500" />
                <span>011 796 4828</span>
              </a>
            </div>

            {/* Quick Guarantees */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 w-full grid sm:grid-cols-2 gap-2 text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-500" />
                Free delivery across Gauteng
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-500" />
                4–8 hour onsite technician SLA
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-500" />
                Full network setup &amp; staff training
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-500" />
                Month-to-month or fixed terms
              </span>
            </div>
          </div>
        </div>

        {/* Technical Specifications Table */}
        <section className="border-t border-slate-800 pt-12 mb-16">
          <h2 className="text-2xl font-black text-white tracking-tight mb-6">
            Technical Specifications
          </h2>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="divide-y divide-slate-800">
              {Object.entries(printer.specs).map(([key, value]) => {
                if (!value) return null;
                const label = specLabels[key] || key.charAt(0).toUpperCase() + key.slice(1);
                return (
                  <div
                    key={key}
                    className="grid grid-cols-1 sm:grid-cols-3 p-4 sm:px-6 hover:bg-slate-800/30 transition-colors"
                  >
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 sm:mb-0">
                      {label}
                    </span>
                    <span className="sm:col-span-2 text-sm text-slate-200 font-medium leading-relaxed">
                      {value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Video Tour Section (if available) */}
        {printer.youtubeId && (
          <section className="border-t border-slate-800 pt-12 mb-16">
            <h2 className="text-2xl font-black text-white tracking-tight mb-4">
              Watch {printer.model} in Action
            </h2>
            <div className="aspect-video max-w-4xl bg-black rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${printer.youtubeId}`}
                title={`${printer.model} Video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </section>
        )}

        {/* You Might Also Like */}
        {relatedPrinters.length > 0 && (
          <section className="border-t border-slate-800 pt-12">
            <h2 className="text-2xl font-black text-white tracking-tight mb-6">
              You Might Also Like
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedPrinters.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectPrinter(item);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-slate-900/60 border border-slate-800 hover:border-rose-600 rounded-2xl p-5 cursor-pointer group transition-all"
                >
                  <div className="bg-[#07090e] rounded-xl flex items-center justify-center h-36 mb-3 p-2">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.model}
                        referrerPolicy="no-referrer"
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <FileText className="w-10 h-10 text-slate-700" />
                    )}
                  </div>
                  <h3 className="font-bold text-white text-sm group-hover:text-rose-400 transition-colors">
                    {item.model}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-1 mt-1">
                    {item.tagline}
                  </p>
                  <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <span>{item.speed} PPM</span>
                    <span className="text-rose-400 font-semibold">{item.rentalFrom || 'Rent or Buy'}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
