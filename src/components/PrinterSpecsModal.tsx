import React, { useState } from 'react';
import { X, Gauge, Layers, FileText, Palette, Shield, Zap, ArrowRight, FileDown, ExternalLink, Check } from 'lucide-react';
import { Base44Printer, FORMAT_CURRENCY, VOLUME_TIER_LABELS } from '../data/base44Printers';
import { generateBase44PrinterBrochurePdf } from '../utils/pdfGenerator';
import { TOSHIBA_PRINTERS } from '../data/toshibaPrinters';

interface PrinterSpecsModalProps {
  printer: Base44Printer | null;
  onClose: () => void;
  onRequestQuote: (model: string) => void;
}

export const PrinterSpecsModal: React.FC<PrinterSpecsModalProps> = ({
  printer,
  onClose,
  onRequestQuote,
}) => {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!printer) return null;

  const matchedOfficial = TOSHIBA_PRINTERS.find(
    (tp) => tp.model.toLowerCase().replace(/\s+/g, '') === printer.model.toLowerCase().replace(/\s+/g, '')
  );

  const handleDownloadBrochure = () => {
    setDownloading(true);
    try {
      generateBase44PrinterBrochurePdf(printer);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3500);
    } catch (e) {
      console.error('PDF generation error:', e);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl border border-chrome/20 bg-[#0c1015] shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-chrome/15 p-5 bg-[#0a0c0e]">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-primary font-medium">
              Technical Specification Sheet
            </div>
            <h3 className="font-heading text-xl font-bold uppercase tracking-tight text-white mt-0.5">
              {printer.model}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadBrochure}
              className="inline-flex items-center gap-1.5 border border-primary/40 bg-primary/10 px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-widest text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer"
              title="Download official brochure PDF"
            >
              {downloadSuccess ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Downloaded</span>
                </>
              ) : (
                <>
                  <FileDown className="h-3.5 w-3.5" />
                  <span>{downloading ? 'Preparing...' : 'Brochure (PDF)'}</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 border border-chrome/20 text-chrome/60 hover:text-white hover:border-chrome/50 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {/* Printer image & brief */}
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            {printer.image_url && (
              <div className="w-48 h-36 bg-[#0a0c0e] border border-chrome/15 p-3 flex items-center justify-center shrink-0">
                <img
                  src={printer.image_url}
                  alt={printer.model}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            )}
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-chrome/50">
                Toshiba Head Office · {printer.format} · {printer.colour === 'colour' ? 'Colour' : 'Monochrome'}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-chrome/70">
                {printer.description}
              </p>
              <div className="mt-3 flex flex-wrap items-baseline gap-3">
                <div className="font-mono text-2xl font-bold text-primary">
                  {FORMAT_CURRENCY(printer.monthly_rental)}
                  <span className="text-xs text-chrome/50 font-normal">/month</span>
                </div>
                <button
                  type="button"
                  onClick={handleDownloadBrochure}
                  className="inline-flex items-center gap-1 font-mono text-xs text-primary hover:underline cursor-pointer"
                >
                  <FileDown className="h-3.5 w-3.5" />
                  <span>Download Spec Sheet &amp; Brochure</span>
                </button>
              </div>
            </div>
          </div>

          {/* Key Metric Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px border border-chrome/15 bg-chrome/10">
            <div className="bg-[#0a0c0e] p-3">
              <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-chrome/45">
                <Gauge className="h-3 w-3 text-primary" /> Speed
              </div>
              <div className="mt-1 font-mono text-lg font-bold text-white">
                {printer.speed_ppm} ppm
              </div>
            </div>
            <div className="bg-[#0a0c0e] p-3">
              <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-chrome/45">
                <Layers className="h-3 w-3 text-primary" /> Duty cycle
              </div>
              <div className="mt-1 font-mono text-lg font-bold text-white">
                {(printer.duty_cycle / 1000).toFixed(0)}k /mo
              </div>
            </div>
            <div className="bg-[#0a0c0e] p-3">
              <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-chrome/45">
                <FileText className="h-3 w-3 text-primary" /> Format
              </div>
              <div className="mt-1 font-mono text-lg font-bold text-white">
                {printer.format}
              </div>
            </div>
            <div className="bg-[#0a0c0e] p-3">
              <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-chrome/45">
                <Palette className="h-3 w-3 text-primary" /> Output
              </div>
              <div className="mt-1 font-mono text-lg font-bold text-white">
                {printer.colour === 'colour' ? 'Colour' : 'Mono'}
              </div>
            </div>
          </div>

          {/* Commercial Finance & Rental Calculations (0% Escalation) */}
          <div className="border border-primary/40 bg-[#07090c] p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="font-mono text-[10px] uppercase tracking-widest text-primary font-bold">
                // Commercial Lease Options · KAGO Finance Rate Sheet
              </div>
              <div className="font-mono text-[10px] text-chrome/50">
                0% Annual Escalation
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-[#0a0c0e] border border-primary/50 p-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-primary font-semibold">
                    60 Months (Default)
                  </span>
                  <span className="font-mono text-[9px] bg-primary/20 text-primary px-1.5 py-0.5">0% Esc</span>
                </div>
                <div className="font-mono text-xl font-bold text-white mt-1">
                  {FORMAT_CURRENCY(printer.rental_60mo_0esc || printer.monthly_rental)}
                  <span className="text-xs text-chrome/50 font-normal">/mo</span>
                </div>
                <div className="font-mono text-[9px] text-chrome/40 mt-1">
                  KAGO Factor: {printer.kago_factor_60 ? printer.kago_factor_60.toFixed(5) : '0.02611'} · 05-Oct-26
                </div>
              </div>

              <div className="bg-[#0a0c0e] border border-chrome/20 p-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-chrome/70 font-semibold">
                    36 Months
                  </span>
                  <span className="font-mono text-[9px] bg-chrome/15 text-chrome/70 px-1.5 py-0.5">0% Esc</span>
                </div>
                <div className="font-mono text-xl font-bold text-white mt-1">
                  {FORMAT_CURRENCY(printer.rental_36mo_0esc || Math.round(printer.monthly_rental * 1.35))}
                  <span className="text-xs text-chrome/50 font-normal">/mo</span>
                </div>
                <div className="font-mono text-[9px] text-chrome/40 mt-1">
                  KAGO Factor: {printer.kago_factor_36 ? printer.kago_factor_36.toFixed(5) : '0.03660'} · 05-Oct-26
                </div>
              </div>

              <div className="bg-[#0a0c0e] border border-chrome/20 p-3">
                <div className="font-mono text-[10px] uppercase tracking-wider text-chrome/70 font-semibold">
                  Outright Hardware
                </div>
                <div className="font-mono text-xl font-bold text-white mt-1">
                  {FORMAT_CURRENCY(printer.final_hardware_price || printer.monthly_rental * 36)}
                  <span className="text-xs text-chrome/50 font-normal"> ex VAT</span>
                </div>
                <div className="font-mono text-[9px] text-emerald-400/80 mt-1">
                  Wholesale + Category &amp; Tier Markup
                </div>
              </div>
            </div>

            {printer.kago_band && (
              <div className="mt-2.5 pt-2.5 border-t border-chrome/10 flex flex-wrap items-center justify-between gap-y-1 font-mono text-[10px] text-chrome/60">
                <span>Lease Bracket: KAGO Band {printer.kago_band}</span>
                <span>Base Hardware: {FORMAT_CURRENCY(printer.base_hardware_price || 0)}</span>
                <span>TP-Link Wireless: +{FORMAT_CURRENCY(printer.tp_link_addon || 2195)}</span>
                <span>Category Markup: +{FORMAT_CURRENCY(printer.markup_category || 0)}</span>
                {printer.markup_tier > 0 && <span>Tier Markup: +{FORMAT_CURRENCY(printer.markup_tier)}</span>}
              </div>
            )}
          </div>

          {/* Detailed Specs if matched */}
          {matchedOfficial?.specs && (
            <div className="border border-chrome/15 bg-[#0a0c0e] p-4">
              <div className="font-mono text-[10px] uppercase tracking-widest text-chrome/55 mb-2.5 flex items-center gap-1.5">
                <Zap className="h-3 w-3 text-primary" /> Technical Hardware Architecture
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-[11px]">
                {matchedOfficial.specs.processor && (
                  <div className="text-chrome/70">
                    <span className="text-chrome/40 block text-[9px] uppercase">Processor:</span>
                    {matchedOfficial.specs.processor}
                  </div>
                )}
                {matchedOfficial.specs.memory && (
                  <div className="text-chrome/70">
                    <span className="text-chrome/40 block text-[9px] uppercase">Memory:</span>
                    {matchedOfficial.specs.memory}
                  </div>
                )}
                {matchedOfficial.specs.paperCapacity && (
                  <div className="text-chrome/70">
                    <span className="text-chrome/40 block text-[9px] uppercase">Paper Capacity:</span>
                    {matchedOfficial.specs.paperCapacity}
                  </div>
                )}
                {matchedOfficial.specs.warmUpTime && (
                  <div className="text-chrome/70">
                    <span className="text-chrome/40 block text-[9px] uppercase">Warm-Up Time:</span>
                    {matchedOfficial.specs.warmUpTime}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Included Services & SLA */}
          <div className="border border-chrome/15 bg-[#0a0c0e] p-4">
            <div className="font-mono text-[10px] uppercase tracking-widest text-chrome/55 mb-2 flex items-center gap-1.5">
              <Shield className="h-3 w-3 text-primary" /> Toshiba Head Office SLA &amp; Rental Inclusions
            </div>
            <ul className="text-xs text-chrome/70 space-y-1.5 list-disc list-inside">
              <li>Free delivery, professional installation and network integration</li>
              <li>Toner-inclusive managed print plans with automated toner replenishment</li>
              <li>2 to 4-hour guaranteed on-site technical response time</li>
              <li>Full operator training for all office administrative staff</li>
              <li>e-BRIDGE cloud remote monitoring &amp; self-diagnostics enabled</li>
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-chrome/15 p-4 bg-[#0a0c0e]">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadBrochure}
              className="inline-flex items-center gap-2 border border-primary/50 bg-[#07090c] px-4 py-2 font-heading text-xs font-bold uppercase tracking-widest text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer"
            >
              <FileDown className="h-4 w-4" />
              <span>Download Brochure (PDF)</span>
            </button>
            {matchedOfficial?.brochureUrl && (
              <a
                href={matchedOfficial.brochureUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 border border-chrome/20 px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-chrome/70 hover:text-white hover:border-chrome/40 transition-colors"
              >
                <ExternalLink className="h-3 w-3" />
                <span>Original PDF</span>
              </a>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="border border-chrome/30 px-4 py-2 font-heading text-xs font-bold uppercase tracking-widest text-chrome/80 hover:text-white transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onRequestQuote(printer.model);
                onClose();
              }}
              className="group inline-flex items-center gap-2 border border-primary bg-primary px-5 py-2 font-heading text-xs font-bold uppercase tracking-widest text-white hover:bg-primary/90 transition-colors cursor-pointer"
            >
              Request quote for {printer.model}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
