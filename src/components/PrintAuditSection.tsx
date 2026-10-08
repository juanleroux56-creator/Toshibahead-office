import React, { useState } from 'react';
import { Calculator, MessageSquare, CheckCircle2, ArrowRight, FileSpreadsheet, Sparkles } from 'lucide-react';

interface PrintAuditSectionProps {
  onRequestAudit?: () => void;
}

export const PrintAuditSection: React.FC<PrintAuditSectionProps> = ({ onRequestAudit }) => {
  const [pagesPerMonth, setPagesPerMonth] = useState<number>(3500);
  const [printType, setPrintType] = useState<'mixed' | 'mono' | 'colour'>('mixed');

  // Calculate estimated monthly market cost vs Toshiba cost
  // Typical market cost per page in SA: Mono ~18-25c, Colour ~90c-R1.40
  // Toshiba bundled cost: Mono ~9-12c, Colour ~55-70c
  const getSavings = () => {
    let marketCostPerPage = 0.35;
    let toshibaCostPerPage = 0.20;

    if (printType === 'mono') {
      marketCostPerPage = 0.22;
      toshibaCostPerPage = 0.11;
    } else if (printType === 'colour') {
      marketCostPerPage = 1.15;
      toshibaCostPerPage = 0.68;
    }

    const marketMonthly = pagesPerMonth * marketCostPerPage + 1200; // includes typical legacy machine rental
    const toshibaMonthly = pagesPerMonth * toshibaCostPerPage + 650;
    const monthlySavings = Math.max(250, Math.round(marketMonthly - toshibaMonthly));
    const yearlySavings = monthlySavings * 12;

    return { monthlySavings, yearlySavings };
  };

  const { monthlySavings, yearlySavings } = getSavings();

  const handleAuditClick = () => {
    if (onRequestAudit) {
      onRequestAudit();
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const auditWhatsapp = encodeURIComponent(
    `Hi Juan, I would like to request a Free 15-Minute Print Audit for my office. We print approx ${pagesPerMonth.toLocaleString()} pages/month (${printType}). Please advise on potential savings.`
  );

  return (
    <section id="print-audit" className="py-16 md:py-24 max-w-7xl mx-auto px-4 md:px-8 w-full border-t border-slate-800">
      <div className="bg-gradient-to-br from-slate-900/90 via-[#0e131d] to-[#140b10] border-2 border-rose-600/30 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
        {/* Background ambient glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative grid lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Offer Details */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-rose-400 font-bold">
                // Cost audit diagnostic
              </span>
              <span className="text-slate-600">·</span>
              <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-400 font-bold">
                Zero Cost / No Obligation
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black font-heading uppercase text-white tracking-tight leading-tight mb-4">
              Free 15-Minute Office Print Audit &amp; Sample Pack
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
              Paying too much on an existing copier lease? Send us a copy of your recent invoice or estimated monthly page volume. We will analyze your per-page charges line-by-line and show you the exact monthly savings you unlock with direct Toshiba Head Office pricing.
            </p>

            {/* 3 Step Process */}
            <div className="grid sm:grid-cols-3 gap-3.5 w-full mb-8">
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5">
                <span className="w-6 h-6 rounded-full bg-rose-600/30 text-rose-400 font-black text-xs flex items-center justify-center mb-2">
                  1
                </span>
                <h4 className="text-xs font-bold text-white mb-1">Send 1 Invoice</h4>
                <p className="text-[11px] text-slate-400 leading-snug">
                  WhatsApp or email a copy of your current provider's bill.
                </p>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5">
                <span className="w-6 h-6 rounded-full bg-rose-600/30 text-rose-400 font-black text-xs flex items-center justify-center mb-2">
                  2
                </span>
                <h4 className="text-xs font-bold text-white mb-1">Cost Breakdown</h4>
                <p className="text-[11px] text-slate-400 leading-snug">
                  We audit your actual mono and colour per-page rates.
                </p>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5">
                <span className="w-6 h-6 rounded-full bg-rose-600/30 text-rose-400 font-black text-xs flex items-center justify-center mb-2">
                  3
                </span>
                <h4 className="text-xs font-bold text-white mb-1">Sample Pack</h4>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Receive a comparison report and test print sheets at your office.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full">
              <button
                onClick={handleAuditClick}
                className="py-3 px-6 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Request Your Free Audit</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/27786792279?text=${auditWhatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-5 rounded-xl bg-[#25D366] hover:bg-[#1db954] text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Send Bill via WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Quick Savings Estimator */}
          <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider mb-3">
                <Calculator className="w-4 h-4" />
                <span>Instant Savings Estimator</span>
              </div>

              {/* Monthly pages slider */}
              <div className="mb-5">
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-slate-300">Estimated Monthly Pages:</span>
                  <span className="text-rose-400 font-bold text-sm">
                    {pagesPerMonth.toLocaleString()} pages
                  </span>
                </div>
                <input
                  type="range"
                  min={500}
                  max={20000}
                  step={500}
                  value={pagesPerMonth}
                  onChange={(e) => setPagesPerMonth(Number(e.target.value))}
                  className="w-full accent-rose-600 cursor-pointer h-2 bg-slate-800 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>500 (Small)</span>
                  <span>10,000 (Medium)</span>
                  <span>20,000+ (High)</span>
                </div>
              </div>

              {/* Print type selector */}
              <div className="mb-6">
                <span className="text-xs font-semibold text-slate-300 block mb-2">
                  Document Type:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'mono', label: 'Black & White' },
                    { id: 'mixed', label: 'Mixed (70/30)' },
                    { id: 'colour', label: 'Full Colour' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setPrintType(t.id as any)}
                      className={`py-1.5 px-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                        printType === t.id
                          ? 'bg-rose-600 text-white border-rose-500'
                          : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Savings Results Display */}
              <div className="bg-rose-950/40 border border-rose-900/60 rounded-xl p-4 text-center mb-4">
                <span className="text-xs font-medium text-rose-300 block mb-1">
                  Estimated Typical Monthly Savings
                </span>
                <div className="text-3xl font-black text-white">
                  R{monthlySavings.toLocaleString()}
                  <span className="text-xs font-normal text-slate-400"> / mo</span>
                </div>
                <div className="text-xs font-bold text-emerald-400 mt-1">
                  ≈ R{yearlySavings.toLocaleString()} saved per year
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 text-center leading-relaxed">
              *Savings estimate based on average Gauteng competitor copy rates vs Toshiba Head Office fleet tariffs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
