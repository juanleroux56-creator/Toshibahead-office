import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Phone, 
  Sparkles, 
  FileText, 
  Zap, 
  Layers, 
  Cpu, 
  Award,
  Terminal,
  Activity
} from 'lucide-react';

interface GautengServiceSectionProps {
  onRequestQuote: () => void;
  onOpenMatcher: () => void;
}

export const GautengServiceSection: React.FC<GautengServiceSectionProps> = ({
  onRequestQuote,
  onOpenMatcher,
}) => {
  const serviceHubs = [
    { name: 'Sandton & Bryanston', latency: '45–90 min SLA', status: 'DISPATCH READY' },
    { name: 'Pretoria East & Hatfield', latency: '60–120 min SLA', status: 'DISPATCH READY' },
    { name: 'Johannesburg CBD & Rosebank', latency: '45–90 min SLA', status: 'DISPATCH READY' },
    { name: 'Midrand & Waterfall City', latency: '45–90 min SLA', status: 'DISPATCH READY' },
    { name: 'Centurion & Highveld', latency: '45–90 min SLA', status: 'DISPATCH READY' },
    { name: 'Bedfordview & East Rand', latency: '60–120 min SLA', status: 'DISPATCH READY' },
    { name: 'Randburg & Roodepoort', latency: '60–120 min SLA', status: 'DISPATCH READY' },
    { name: 'Kempton Park & O.R. Tambo', latency: '60–120 min SLA', status: 'DISPATCH READY' },
  ];

  const slaInclusions = [
    {
      code: 'SLA.01 // TONER_SUPPLY',
      title: '100% GENUINE TONER REPLENISHMENT',
      desc: 'Black and high-yield CMYK toner cartridges dispatched preemptively via e-BRIDGE cloud monitoring.'
    },
    {
      code: 'SLA.02 // DRUMS_MAINTENANCE',
      title: 'DRUMS, DEVELOPERS & IMAGING KITS',
      desc: 'All internal hardware wear components covered at zero supplementary charge.'
    },
    {
      code: 'SLA.03 // LABOUR_DISPATCH',
      title: 'ON-SITE LABOUR & TRAVEL EXPENSES',
      desc: 'Certified Toshiba system engineers dispatch directly to your office with guaranteed SLA response.'
    },
    {
      code: 'SLA.04 // CLOUD_SECURITY',
      title: 'POPIA / GDPR DATA SECURITY WIPE',
      desc: 'SSD encryption protocols with automated cryptographic overwrite for all scanned materials.'
    }
  ];

  return (
    <div className="space-y-8 font-mono">
      {/* SLA Hero Banner with Giant Toshiba Watermark */}
      <div className="bg-[#090d16] border border-red-950/80 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-hud-glow">
        <div className="absolute right-0 bottom-0 select-none pointer-events-none opacity-[0.03] text-9xl font-black text-white font-heading">
          TOSHIBA
        </div>

        <div className="relative z-10 space-y-4 max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-red-950/90 border border-red-800/80 px-3 py-1 rounded-full text-red-400 text-xs font-bold uppercase tracking-wider">
            <Terminal className="w-3.5 h-3.5 text-red-500" />
            <span>[SYS.SLA // GAUTENG DIRECT DISPATCH PROTOCOL]</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight uppercase leading-tight">
            GAUTENG FLEET SERVICE &amp; 2–4 HOUR SLA
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
            Enterprise managed print service engineered for zero downtime. Certified field technicians, proactive diagnostic telemetry, and all-inclusive toner replenishment.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onRequestQuote}
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-extrabold shadow-red-glow uppercase tracking-wider"
            >
              REQUEST CUSTOM SLA PROPOSAL
            </button>
            <a
              href="tel:0117964828"
              className="px-5 py-2.5 bg-[#04060a] hover:bg-slate-900 text-slate-200 border border-slate-800 rounded-xl text-xs font-bold"
            >
              DISPATCH HOTLINE // 011 796 4828
            </a>
          </div>
        </div>
      </div>

      {/* GAUTENG DISPATCH HUBS MATRIX */}
      <div className="bg-[#090c13] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex justify-between items-baseline border-b border-slate-800 pb-3">
          <div>
            <span className="text-xs text-red-500 font-bold uppercase">[DISPATCH_HUBS // GAUTENG COMMERCIAL METRO]</span>
            <h2 className="text-xl sm:text-2xl font-black font-heading text-white uppercase mt-0.5">
              ACTIVE REGIONAL SERVICE SATELLITES
            </h2>
          </div>
          <span className="text-xs text-emerald-400 font-bold uppercase hidden sm:inline">
            [STATUS: ALL SATELLITES GREEN]
          </span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {serviceHubs.map((hub, idx) => (
            <div
              key={idx}
              className="bg-[#04060a] border border-slate-800/90 rounded-2xl p-4 space-y-2 hover:border-red-600 transition-colors"
            >
              <div className="flex items-center justify-between text-[10px] text-slate-500">
                <span>HUB_0{idx + 1}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <h3 className="text-sm font-black text-white uppercase font-heading">
                {hub.name}
              </h3>
              <div className="text-[11px] text-red-400 font-bold">
                {hub.latency}
              </div>
              <div className="text-[9px] text-slate-400 uppercase bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                {hub.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FULL INCLUSIONS BREAKDOWN */}
      <div className="grid sm:grid-cols-2 gap-4">
        {slaInclusions.map((inc, idx) => (
          <div
            key={idx}
            className="bg-[#090c13] border border-slate-800 rounded-2xl p-5 space-y-2 relative overflow-hidden"
          >
            <span className="text-[10px] font-bold text-red-500 uppercase">{inc.code}</span>
            <h3 className="text-base font-black font-heading text-white uppercase">
              {inc.title}
            </h3>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              {inc.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
