import React from 'react';
import { MessageSquare, ArrowRight, ShieldCheck, CheckCircle2, Phone, Mail, UserCheck, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onBrowsePrinters: () => void;
  onGetQuote: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onBrowsePrinters,
  onGetQuote,
}) => {
  const stats = [
    { value: '900+', label: 'Gauteng businesses served' },
    { value: '16', label: 'Toshiba fleet models' },
    { value: '48h', label: 'Average office install' },
    { value: '38', label: 'Years authorised service' },
  ];

  const deployments = [
    'Sandton law office · 20ppm Colour A4 · e-STUDIO 2020AC',
    'Pretoria campus · 65ppm Mono A3 · e-STUDIO 6518A',
    'Centurion accounting firm · 50ppm Mono A4 · e-STUDIO 5018A',
    'Midrand logistics depot · 25ppm Colour A4 · e-STUDIO 2520AC',
    'Johannesburg commercial HQ · 85ppm Mono A3 · e-STUDIO 8518A',
    'Bedfordview medical practice · 33ppm Colour A4 · e-STUDIO 330AC',
    'Fourways marketing agency · 45ppm Colour A3 · e-STUDIO 4525AC',
  ];

  return (
    <section className="relative overflow-hidden bg-[#080a0e] text-white border-b border-slate-800">
      {/* Background subtle technical grid styling */}
      <div className="absolute inset-0 bg-gradient-to-b from-rose-950/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute -top-40 right-0 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-20 grid lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Copy & Actions */}
        <div className="lg:col-span-7 flex flex-col items-start">
          {/* Technical diagnostic eyebrow */}
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-rose-500 font-bold">
              // GAUTENG FLEET &amp; RENTALS
            </span>
            <span className="text-slate-600">·</span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-400 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Stock Available
            </span>
          </div>

          {/* Main Headline in Space Grotesk */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading uppercase tracking-tight leading-[1.05] mb-5 text-white">
            Find the Printer Built For Your{' '}
            <span className="text-rose-500">Office Volume.</span>
          </h1>

          {/* Subtext */}
          <p className="text-sm sm:text-base text-slate-300 mb-6 leading-relaxed max-w-2xl">
            Rent or buy Toshiba multifunction office printers direct from the official importer.
            One honest recommendation — the smallest, most economical model that actually absorbs your workload without upselling. Free delivery, installation &amp; staff training across Gauteng.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 mb-7 w-full sm:w-auto">
            <button
              onClick={onGetQuote}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-lg shadow-rose-900/30 transition-all cursor-pointer flex items-center justify-center gap-2 uppercase font-heading tracking-wider"
            >
              <span>Request Fast Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="https://wa.me/27786792279?text=Hello%20Juan%2C%20I%20would%20like%20a%20quote%20for%20a%20Toshiba%20office%20printer%20rental."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1db954] text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>WhatsApp Direct</span>
            </a>

            <button
              onClick={onBrowsePrinters}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm border border-slate-800 transition-all cursor-pointer flex items-center justify-center"
            >
              Browse 16 Models
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>No pushy sales calls — transparent pricing</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Response within 60 minutes</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Free on-site assessment across Gauteng</span>
            </span>
          </div>
        </div>

        {/* Right Column: 4 Stats Cards + Direct Specialist Desk */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3.5">
            {stats.map((item) => (
              <div
                key={item.label}
                className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-4 sm:p-5 text-center hover:border-slate-700 transition-all shadow-sm"
              >
                <div className="text-2xl sm:text-3xl font-black font-mono text-rose-500 mb-1 tracking-tight">
                  {item.value}
                </div>
                <div className="text-[11px] sm:text-xs font-medium text-slate-400 leading-snug">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* Direct Line to Juan (Specialist accountability) */}
          <div className="bg-gradient-to-br from-slate-900 via-[#0b0e14] to-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-rose-600/20 border border-rose-500/30 text-rose-400 flex items-center justify-center shrink-0">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-rose-400 uppercase tracking-widest block font-bold">
                  Direct Specialist Line
                </span>
                <span className="text-white font-bold text-sm block">
                  Juan · Toshiba Head Office
                </span>
              </div>
            </div>

            <div className="flex flex-col items-start sm:items-end text-xs font-mono gap-1">
              <a
                href="tel:0783076569"
                className="text-white hover:text-rose-400 font-bold flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-rose-500" />
                <span>078 307 6569</span>
              </a>
              <a
                href="mailto:juanlr@toshiba-sa.co.za"
                className="text-slate-400 hover:text-rose-400 text-[11px] flex items-center gap-1.5 transition-colors"
              >
                <Mail className="w-3 h-3 text-slate-500" />
                <span>juanlr@toshiba-sa.co.za</span>
              </a>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 flex items-center gap-3 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong className="text-slate-200">Factory Authorised:</strong> 100% genuine Toshiba toner cartridges and certified regional parts warranty.
            </span>
          </div>
        </div>
      </div>

      {/* Marquee ticker of recent Gauteng deployments */}
      <div className="border-t border-slate-800/80 bg-[#05070a] py-2.5 overflow-hidden">
        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
          {[...deployments, ...deployments].map((dep, idx) => (
            <span key={idx} className="text-[11px] font-mono text-slate-400 flex items-center gap-2 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block shrink-0" />
              <span className="text-slate-300 font-semibold">{dep.split('·')[0]}</span>
              <span className="text-slate-500">·</span>
              <span className="text-rose-400">{dep.split('·')[1]}</span>
              <span className="text-slate-500">·</span>
              <span className="text-white font-bold">{dep.split('·')[2]}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
