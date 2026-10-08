import React, { useState } from 'react';
import { 
  PrinterCategory, 
  PrinterFormat, 
  QuestionnaireAnswers, 
  PrinterModel 
} from '../types';
import { TOSHIBA_CATALOG } from '../data/printerCatalog';
import { matchPrinter, MatchResult } from '../utils/matcher';
import { generateSingleModelPdf } from '../utils/pdfGenerator';
import { PrinterImage } from './PrinterImage';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  ShieldCheck, 
  Download, 
  FileText, 
  MessageSquare, 
  HelpCircle, 
  Printer, 
  ChevronRight, 
  TrendingDown, 
  Layers, 
  Zap, 
  Phone,
  Terminal,
  Cpu
} from 'lucide-react';

interface PrinterMatcherProps {
  onSelectModelForQuote: (model: PrinterModel) => void;
  onBrowseCatalog: () => void;
}

export const PrinterMatcher: React.FC<PrinterMatcherProps> = ({
  onSelectModelForQuote,
  onBrowseCatalog,
}) => {
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<QuestionnaireAnswers>({
    colorPreference: null,
    formatPreference: null,
    volumeRange: null,
  });
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);

  const handleColorSelect = (color: PrinterCategory) => {
    setAnswers(prev => ({ ...prev, colorPreference: color }));
    setStep(2);
  };

  const handleFormatSelect = (format: PrinterFormat) => {
    setAnswers(prev => ({ ...prev, formatPreference: format }));
    setStep(3);
  };

  const handleVolumeSelect = (volume: 'under_8k' | '8k_to_45k' | 'above_45k') => {
    const finalAnswers = { ...answers, volumeRange: volume };
    setAnswers(finalAnswers);
    const result = matchPrinter(finalAnswers);
    setMatchResult(result);
    setStep(4);
  };

  const handleReset = () => {
    setAnswers({
      colorPreference: null,
      formatPreference: null,
      volumeRange: null,
    });
    setMatchResult(null);
    setStep(1);
  };

  const handleDownloadPdf = (model: PrinterModel) => {
    generateSingleModelPdf(model);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Intro Command Banner */}
      <div className="bg-[#0b0e14] border border-slate-800 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10 space-y-4 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-rose-500 font-bold">
              // Diagnostic engine
            </span>
            <span className="text-slate-600">·</span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-amber-400 font-bold">
              Best-Fit Algorithm
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight uppercase leading-[1.08]">
            Find the Printer Built For Your Office Volume
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
            Three questions. One honest recommendation — the smallest, cheapest Toshiba that actually meets your workload. No upsell, no sales pitch.
          </p>

          {/* Quick Value Metrics */}
          <div className="pt-3 grid grid-cols-3 gap-3 border-t border-slate-800/80 font-mono text-[11px]">
            <div>
              <span className="text-slate-500 block uppercase text-[10px]">Optimization</span>
              <strong className="text-white font-bold">LOWEST OPEX</strong>
            </div>
            <div>
              <span className="text-slate-500 block uppercase text-[10px]">Rental Deposit</span>
              <strong className="text-emerald-400 font-bold">R0 UPFRONT</strong>
            </div>
            <div>
              <span className="text-slate-500 block uppercase text-[10px]">Gauteng SLA</span>
              <strong className="text-rose-400 font-bold">4–8H ON-SITE</strong>
            </div>
          </div>
        </div>
      </div>

      {/* QUESTIONNAIRE WIZARD CONTAINER */}
      <div className="bg-[#090b10] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 relative overflow-hidden">
        {/* Step Indicator Breadcrumbs */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 text-xs font-mono">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span className="font-bold text-white uppercase tracking-wider">
              {step === 1 && '01 / OUTPUT COLOR'}
              {step === 2 && '02 / PAPER FORMAT'}
              {step === 3 && '03 / MONTHLY VOLUME'}
              {step === 4 && '04 / RECOMMENDATION GENERATED'}
            </span>
          </div>
          {step > 1 && (
            <button
              onClick={handleReset}
              className="flex items-center space-x-1 text-slate-400 hover:text-rose-400 text-xs font-bold transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Diagnostic</span>
            </button>
          )}
        </div>

        {/* STEP 1: COLOUR VS MONOCHROME */}
        {step === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="space-y-2">
              <span className="text-xs text-red-500 font-bold uppercase tracking-wider">[PARAM_01 // CHROMATIC REQUIREMENT]</span>
              <h2 className="text-2xl sm:text-3xl font-black font-heading text-white uppercase">
                Do you require Full Colour (CMYK) or Black &amp; White (Mono) only?
              </h2>
              <p className="text-xs text-slate-400 font-sans">
                Monochrome copiers offer lower cost-per-page for pure text and invoicing. Colour copiers are ideal for marketing and client proposals.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              {/* Option: Colour */}
              <button
                onClick={() => handleColorSelect('color')}
                className="p-6 bg-[#04060a] border border-slate-800 hover:border-red-600 rounded-2xl text-left transition-all hover:shadow-hud-glow cursor-pointer group space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">🎨</span>
                  <span className="text-[10px] bg-red-950/80 text-red-400 border border-red-800/80 px-2 py-0.5 rounded font-bold uppercase">
                    [POPULAR]
                  </span>
                </div>
                <h3 className="text-lg font-black text-white group-hover:text-red-400 transition-colors uppercase font-heading">
                  Full Colour &amp; Black/White (CMYK)
                </h3>
                <p className="text-xs text-slate-400 font-sans">
                  Produces rich marketing collateral, financial graphics, client presentations, and everyday office paperwork.
                </p>
                <div className="text-xs font-bold text-red-500 flex items-center gap-1 pt-1">
                  <span>SELECT CHROMATIC</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>

              {/* Option: Monochrome */}
              <button
                onClick={() => handleColorSelect('mono')}
                className="p-6 bg-[#04060a] border border-slate-800 hover:border-red-600 rounded-2xl text-left transition-all hover:shadow-hud-glow cursor-pointer group space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">📄</span>
                  <span className="text-[10px] bg-slate-900 text-slate-300 border border-slate-700 px-2 py-0.5 rounded font-bold uppercase">
                    [MAX_EFFICIENCY]
                  </span>
                </div>
                <h3 className="text-lg font-black text-white group-hover:text-red-400 transition-colors uppercase font-heading">
                  Black &amp; White Only (Mono)
                </h3>
                <p className="text-xs text-slate-400 font-sans">
                  Lowest cost per page. Optimized for high-volume invoices, legal briefs, delivery notes, and internal documents.
                </p>
                <div className="text-xs font-bold text-slate-300 group-hover:text-red-500 flex items-center gap-1 pt-1">
                  <span>SELECT MONO</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: PAPER FORMAT (A4 VS A3) */}
        {step === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="space-y-2">
              <span className="text-xs text-red-500 font-bold uppercase tracking-wider">[PARAM_02 // MEDIA DIMENSION]</span>
              <h2 className="text-2xl sm:text-3xl font-black font-heading text-white uppercase">
                What paper formats does your organization process?
              </h2>
              <p className="text-xs text-slate-400 font-sans">
                A4 handles standard letters and contracts. A3 accommodates architectural drawings, oversized spreadsheets, and folded booklets.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              {/* Option: A4 Standard */}
              <button
                onClick={() => handleFormatSelect('A4')}
                className="p-6 bg-[#04060a] border border-slate-800 hover:border-red-600 rounded-2xl text-left transition-all hover:shadow-hud-glow cursor-pointer group space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">📐</span>
                  <span className="text-[10px] bg-slate-900 text-slate-300 border border-slate-700 px-2 py-0.5 rounded font-bold uppercase">
                    [COMPACT_DESKTOP]
                  </span>
                </div>
                <h3 className="text-lg font-black text-white group-hover:text-red-400 transition-colors uppercase font-heading">
                  Standard A4 Only (Letter / Legal)
                </h3>
                <p className="text-xs text-slate-400 font-sans">
                  Compact tabletop footprint. Perfect for medical clinics, accounting suites, and spaces without need for large ledger sheets.
                </p>
                <div className="text-xs font-bold text-slate-300 group-hover:text-red-500 flex items-center gap-1 pt-1">
                  <span>SELECT A4 FORMAT</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>

              {/* Option: A3 + A4 Floor Standing */}
              <button
                onClick={() => handleFormatSelect('A3')}
                className="p-6 bg-[#04060a] border border-slate-800 hover:border-red-600 rounded-2xl text-left transition-all hover:shadow-hud-glow cursor-pointer group space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">📑</span>
                  <span className="text-[10px] bg-red-950/80 text-red-400 border border-red-800/80 px-2 py-0.5 rounded font-bold uppercase">
                    [ENTERPRISE_STANDARD]
                  </span>
                </div>
                <h3 className="text-lg font-black text-white group-hover:text-red-400 transition-colors uppercase font-heading">
                  Full A3 &amp; A4 (Floor Standing)
                </h3>
                <p className="text-xs text-slate-400 font-sans">
                  Heavy-duty multi-drawer console with stapling, ledger diagrams, booklet making, and high paper capacity.
                </p>
                <div className="text-xs font-bold text-red-500 flex items-center gap-1 pt-1">
                  <span>SELECT A3/A4 FORMAT</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: ESTIMATED MONTHLY VOLUME */}
        {step === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="space-y-2">
              <span className="text-xs text-red-500 font-bold uppercase tracking-wider">[PARAM_03 // MONTHLY DUTY WORKLOAD]</span>
              <h2 className="text-2xl sm:text-3xl font-black font-heading text-white uppercase">
                What is your estimated monthly page volume?
              </h2>
              <p className="text-xs text-slate-400 font-sans">
                Our algorithm matches the smallest engine that safely absorbs your peak load without overheating or premature drum wear.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 pt-2">
              {/* Option 1: Light Volume */}
              <button
                onClick={() => handleVolumeSelect('under_8k')}
                className="p-5 bg-[#04060a] border border-slate-800 hover:border-red-600 rounded-2xl text-left transition-all hover:shadow-hud-glow cursor-pointer group space-y-2.5"
              >
                <span className="text-xs font-mono font-bold text-slate-500">[TIER_01 // LIGHT]</span>
                <h3 className="text-base font-black text-white group-hover:text-red-400 uppercase font-heading">
                  Under 8,000 Pages / Mo
                </h3>
                <p className="text-[11px] text-slate-400 font-sans">
                  1 to 10 users. Standard office reporting, scanning, and occasional copy runs.
                </p>
                <span className="text-xs font-bold text-red-500 block pt-1">SELECT TIER 1 &rarr;</span>
              </button>

              {/* Option 2: Medium Workgroup */}
              <button
                onClick={() => handleVolumeSelect('8k_to_45k')}
                className="p-5 bg-[#04060a] border border-slate-800 hover:border-red-600 rounded-2xl text-left transition-all hover:shadow-hud-glow cursor-pointer group space-y-2.5"
              >
                <span className="text-xs font-mono font-bold text-red-500">[TIER_02 // MEDIUM]</span>
                <h3 className="text-base font-black text-white group-hover:text-red-400 uppercase font-heading">
                  8,000 – 45,000 Pages / Mo
                </h3>
                <p className="text-[11px] text-slate-400 font-sans">
                  10 to 45 users. Busy corporate department, daily statements, multi-page scan batches.
                </p>
                <span className="text-xs font-bold text-red-500 block pt-1">SELECT TIER 2 &rarr;</span>
              </button>

              {/* Option 3: Heavy Production */}
              <button
                onClick={() => handleVolumeSelect('above_45k')}
                className="p-5 bg-[#04060a] border border-slate-800 hover:border-red-600 rounded-2xl text-left transition-all hover:shadow-hud-glow cursor-pointer group space-y-2.5"
              >
                <span className="text-xs font-mono font-bold text-slate-500">[TIER_03 // HEAVY]</span>
                <h3 className="text-base font-black text-white group-hover:text-red-400 uppercase font-heading">
                  45,000+ Pages / Mo
                </h3>
                <p className="text-[11px] text-slate-400 font-sans">
                  High-volume commercial printing, educational exams, legal archives, central copy rooms.
                </p>
                <span className="text-xs font-bold text-red-500 block pt-1">SELECT TIER 3 &rarr;</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: RECOMMENDATION ENGINE RESULTS */}
        {step === 4 && matchResult && (() => {
          const primary = matchResult.primaryMatch || matchResult.bestMatch || TOSHIBA_CATALOG[0];
          const upgrade = matchResult.upgradeOption || matchResult.alternativeMatch;

          return (
            <div className="space-y-8 animate-fadeIn">
              {/* Match Diagnostic Eyebrow Banner */}
              <div className="bg-[#05070a] border border-amber-500/40 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        LOWEST-PRICE MATCH
                      </span>
                      <span className="font-mono text-xs text-slate-400">Best-fit diagnostic</span>
                    </div>
                    <p className="text-xs text-slate-300 font-sans mt-1">
                      {matchResult.reasoning || matchResult.volumeNote || 'The smallest, most economical Toshiba that meets your workload without upselling.'}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest hidden sm:inline">
                  4–8H GAUTENG SLA
                </span>
              </div>

              {/* PRIMARY RECOMMENDED MODEL CARD */}
              <div className="bg-[#0b0e14] border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-6">
                {/* Badges */}
                <div className="flex flex-wrap justify-between items-start gap-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-rose-600 text-white text-xs font-bold font-heading uppercase px-3 py-1 rounded-md tracking-wider">
                      RECOMMENDED · {primary.modelNumber}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {primary.format} · {primary.category === 'colour' ? 'Colour' : 'Monochrome'}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-amber-400 font-semibold">
                    Lowest TCO Match
                  </span>
                </div>

                {/* Grid: Image + Details */}
                <div className="grid md:grid-cols-12 gap-6 items-center">
                  {/* Product Photo Showcase */}
                  <div className="md:col-span-5 bg-[#05070a] border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center min-h-[220px]">
                    <PrinterImage 
                      printer={primary} 
                      maxHeightClass="max-h-[190px]" 
                    />
                    <span className="text-xs font-bold text-slate-300 font-heading uppercase tracking-wider mt-2">
                      {primary.name}
                    </span>
                  </div>

                  {/* Specs and Pricing Breakdown */}
                  <div className="md:col-span-7 space-y-4">
                    <div>
                      <h2 className="text-2xl font-black font-heading text-white uppercase tracking-tight">
                        {primary.name}
                      </h2>
                      <p className="text-xs text-slate-400 font-sans mt-1 leading-relaxed">
                        {primary.description}
                      </p>
                    </div>

                    {/* 4-Metric Monospace Spec Grid */}
                    <div className="grid grid-cols-4 gap-px bg-slate-800 border border-slate-800 rounded-lg overflow-hidden text-center">
                      <div className="bg-[#080a0e] py-2 px-1">
                        <div className="font-mono text-sm font-bold text-white">{primary.speedPPM}</div>
                        <div className="font-mono text-[9px] uppercase tracking-wider text-slate-500">PPM</div>
                      </div>
                      <div className="bg-[#080a0e] py-2 px-1">
                        <div className="font-mono text-sm font-bold text-white">
                          {primary.dutyCycleMaxPages ? `${Math.round(primary.dutyCycleMaxPages / 1000)}k` : '50k'}
                        </div>
                        <div className="font-mono text-[9px] uppercase tracking-wider text-slate-500">/mo</div>
                      </div>
                      <div className="bg-[#080a0e] py-2 px-1">
                        <div className="font-mono text-sm font-bold text-white">{primary.format}</div>
                        <div className="font-mono text-[9px] uppercase tracking-wider text-slate-500">Format</div>
                      </div>
                      <div className="bg-[#080a0e] py-2 px-1">
                        <div className="font-mono text-sm font-bold text-white">{primary.category === 'colour' ? 'Colour' : 'Mono'}</div>
                        <div className="font-mono text-[9px] uppercase tracking-wider text-slate-500">Output</div>
                      </div>
                    </div>

                    {/* Monthly Pricing Block */}
                    <div className="bg-[#05070a] border border-slate-800 p-4 rounded-xl flex items-baseline justify-between">
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 block">36-Month Operating Lease</span>
                        <span className="font-mono text-2xl font-black text-rose-500">
                          {primary.rental36moZAR 
                            ? `R${primary.rental36moZAR.toLocaleString()} / mo` 
                            : 'CONTACT FOR QUOTE'}
                        </span>
                      </div>
                      <span className="font-mono text-[11px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-1 rounded">
                        R0 Upfront Deposit
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      <button
                        onClick={() => onSelectModelForQuote(primary)}
                        className="flex-1 py-3 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer font-heading uppercase tracking-wider shadow-lg shadow-rose-950/40"
                      >
                        <span>Request a Quote For This Model</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDownloadPdf(primary)}
                        className="py-3 px-3 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="Download Spec Sheet"
                      >
                        <Download className="w-4 h-4 text-rose-400" />
                        <span>PDF</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* UPGRADE ALTERNATIVE CARD (IF AVAILABLE) */}
              {upgrade && (
                <div className="bg-[#0b0e14] border border-slate-800 rounded-2xl p-5 space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-slate-400 font-bold uppercase">// STEP-UP WORKGROUP ALTERNATIVE</span>
                    <span className="text-rose-400 font-bold">{upgrade.modelNumber}</span>
                  </div>
                  <div className="flex flex-wrap justify-between items-center gap-4">
                    <div>
                      <h4 className="text-base font-black font-heading text-white uppercase">
                        {upgrade.name}
                      </h4>
                      <p className="text-xs text-slate-400 font-sans mt-0.5">
                        Faster print speeds ({upgrade.speedPPM} PPM) and higher duty cycle headroom for growing teams.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectModelForQuote(upgrade)}
                        className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold uppercase tracking-wider rounded-xl border border-slate-700 font-heading"
                      >
                        Quote Upgrade Model &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Actions */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-800 text-xs font-mono">
                <button
                  onClick={handleReset}
                  className="text-slate-400 hover:text-rose-400 font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Diagnostic</span>
                </button>

                <button
                  onClick={onBrowseCatalog}
                  className="text-rose-400 hover:text-white font-bold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Browse All 16 Fleet Models</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
};
