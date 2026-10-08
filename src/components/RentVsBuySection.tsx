import React, { useState } from 'react';
import { Check, X, Shield, Sparkles, TrendingUp, HelpCircle, ArrowRight } from 'lucide-react';

interface RentVsBuySectionProps {
  onSelectOption?: (option: string) => void;
}

export const RentVsBuySection: React.FC<RentVsBuySectionProps> = ({ onSelectOption }) => {
  const [selectedTerm, setSelectedTerm] = useState<'36' | '60'>('36');

  const scrollToContact = (customNote?: string) => {
    if (onSelectOption && customNote) {
      onSelectOption(customNote);
    }
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="rent-vs-buy" className="py-16 md:py-24 max-w-7xl mx-auto px-4 md:px-8 w-full border-t border-slate-800">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-rose-500 font-bold mb-2.5">
          // Financial procurement analysis
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading uppercase text-white tracking-tight">
          Should You Rent or Buy Your Office Printer?
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
          Over 85% of South African businesses choose an operating rental lease because it conserves working capital and includes all toner, maintenance parts, on-site technician visits, and seamless technology refreshes.
        </p>

        {/* Term switch pill */}
        <div className="inline-flex items-center gap-1.5 p-1 bg-[#0b0e14] border border-slate-800 rounded-full mt-6 text-xs font-mono">
          <span className="text-slate-400 pl-3 pr-2 font-medium">Lease Term:</span>
          <button
            onClick={() => setSelectedTerm('36')}
            className={`px-3 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
              selectedTerm === '36'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            36 Months (Flexible)
          </button>
          <button
            onClick={() => setSelectedTerm('60')}
            className={`px-3 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
              selectedTerm === '60'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            60 Months (Lowest OPEX)
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-stretch">
        {/* Card 1: Operating Rental Lease (Recommended) */}
        <div className="relative bg-gradient-to-b from-slate-900/95 to-[#0e121a] border-2 border-rose-500/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl shadow-rose-950/20">
          {/* Top highlight ribbon */}
          <div className="absolute -top-3.5 left-6 bg-rose-600 text-white text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full flex items-center gap-1.5 shadow-md">
            <Sparkles className="w-3 h-3 fill-white" />
            Recommended for 85% of Businesses
          </div>

          <div>
            <div className="flex items-start justify-between gap-4 mb-4 mt-2">
              <div>
                <h3 className="text-2xl font-black text-white tracking-tight">
                  Operating Rental Lease
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Predictable, fully inclusive monthly expenditure
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block font-medium">Starting from</span>
                <span className="text-2xl sm:text-3xl font-black text-rose-400">R400</span>
                <span className="text-xs text-slate-400"> / month</span>
              </div>
            </div>

            <div className="p-3.5 bg-rose-950/30 border border-rose-900/50 rounded-xl mb-6 flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-rose-400 shrink-0" />
              <p className="text-xs text-rose-200 leading-snug">
                <strong>100% Tax Deductible (OpEx):</strong> Monthly payments qualify as standard operating costs, lowering your company tax liability immediately.
              </p>
            </div>

            <ul className="space-y-3.5 mb-8">
              {[
                { title: 'Zero Capital Outlay', desc: 'Keep your cash reserves and banking facilities free for core business operations.' },
                { title: 'Toner & Servicing Included', desc: 'All toners, replacement drums, preventative maintenance, and labour covered.' },
                { title: '4–8 Hour On-site SLA', desc: 'Certified technicians dispatched directly across Gauteng with loan unit guarantee.' },
                { title: 'Free Technology Upgrades', desc: `Upgrade to newer, faster models at the end of your ${selectedTerm}-month term.` },
                { title: 'Full Delivery & Network Setup', desc: 'Our technicians configure drivers on all staff PCs and Macs at zero charge.' },
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <strong className="text-white block font-semibold">{item.title}</strong>
                    <span className="text-slate-400 text-xs">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => scrollToContact(`Operating Rental Lease (${selectedTerm} Months)`)}
            className="w-full py-3.5 px-6 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-lg shadow-rose-950/40 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Quote on {selectedTerm}-Month Rental</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Card 2: Outright Purchase */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-slate-700 transition-all">
          <div>
            <div className="flex items-start justify-between gap-4 mb-4 mt-2">
              <div>
                <h3 className="text-2xl font-black text-white tracking-tight">
                  Outright Purchase
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Full capital ownership from day one
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block font-medium">Payment</span>
                <span className="text-xl sm:text-2xl font-black text-slate-200">Once-off</span>
                <span className="text-xs text-slate-400 block">Upfront invoice</span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-800/60 border border-slate-700/60 rounded-xl mb-6 flex items-center gap-3">
              <Shield className="w-5 h-5 text-slate-400 shrink-0" />
              <p className="text-xs text-slate-300 leading-snug">
                <strong>Balance Sheet Asset (CapEx):</strong> Depreciates over 3–5 years. Ideal for government institutions, NGOs, or organizations with dedicated CapEx budgets.
              </p>
            </div>

            <ul className="space-y-3.5 mb-8">
              {[
                { title: 'Immediate Asset Ownership', desc: 'Equipment is logged directly on your fixed asset register from Day 1.', positive: true },
                { title: 'Optional Maintenance SLA', desc: 'Can be paired with an optional cost-per-copy service plan for toner & parts.', positive: true },
                { title: 'Large Initial Capital Outlay', desc: 'Requires full invoice settlement upfront (R15,000 to R150,000+ depending on model).', positive: false },
                { title: 'Depreciation & Obsolescence Risk', desc: 'You retain older hardware after 4–5 years rather than getting free upgraded models.', positive: false },
                { title: 'Separate Toner Purchase Risk', desc: 'Unbudgeted toner & drum replacements if operating without a managed service contract.', positive: false },
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    item.positive ? 'bg-slate-800 text-slate-300' : 'bg-amber-500/15 text-amber-400'
                  }`}>
                    {item.positive ? (
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    ) : (
                      <HelpCircle className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <div>
                    <strong className="text-white block font-semibold">{item.title}</strong>
                    <span className="text-slate-400 text-xs">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => scrollToContact('Outright Purchase Inquiry')}
            className="w-full py-3.5 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-sm border border-slate-700 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Request Outright Purchase Pricing</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
