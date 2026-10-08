import React from 'react';
import { 
  Clock, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  Percent, 
  Lock, 
  CheckCircle, 
  Activity,
  Zap
} from 'lucide-react';

export const StatChipCards: React.FC = () => {
  const statCards = [
    {
      sysTag: 'SYS.SLA // 01',
      metric: '2–4 HOURS',
      label: 'GUARANTEED ON-SITE RESPONSE',
      subtext: 'Sandton, Pretoria, JHB, Midrand, East & West Rand',
      badge: 'STRICT SLA',
      icon: Clock,
      borderColor: 'border-red-600/60 hover:border-red-500',
      accentBg: 'from-red-950/40 to-slate-900/80',
      ledColor: 'bg-emerald-400'
    },
    {
      sysTag: 'SYS.FLEET // 02',
      metric: '540+ NODES',
      label: 'ACTIVE GAUTENG INSTALLATIONS',
      subtext: 'Medical practices, law firms, logistics & enterprises',
      badge: 'PROVEN SCALE',
      icon: Layers,
      borderColor: 'border-slate-800 hover:border-red-500/80',
      accentBg: 'from-slate-900/90 to-slate-950',
      ledColor: 'bg-emerald-400'
    },
    {
      sysTag: 'SYS.SUPPLY // 03',
      metric: '100% COVERED',
      label: 'FULL TONER & PARTS INCLUSION',
      subtext: 'Genuine Toshiba toner, drums, imaging kits & labor',
      badge: 'ZERO HIDDEN COSTS',
      icon: Zap,
      borderColor: 'border-slate-800 hover:border-red-500/80',
      accentBg: 'from-slate-900/90 to-slate-950',
      ledColor: 'bg-emerald-400'
    },
    {
      sysTag: 'SYS.FINANCE // 04',
      metric: 'R0 UPFRONT',
      label: 'TAX-DEDUCTIBLE OPERATING LEASE',
      subtext: 'Flexible 36 or 60-month rental structures with upgrades',
      badge: '0% DEPOSIT',
      icon: Percent,
      borderColor: 'border-slate-800 hover:border-red-500/80',
      accentBg: 'from-slate-900/90 to-slate-950',
      ledColor: 'bg-red-400'
    },
    {
      sysTag: 'SYS.SECURITY // 05',
      metric: 'AES-256 BIT',
      label: 'POPIA COMPLIANT DATA WIPING',
      subtext: 'Self-encrypting Toshiba SSD with automated overwrite',
      badge: 'HARDENED SEC',
      icon: Lock,
      borderColor: 'border-slate-800 hover:border-red-500/80',
      accentBg: 'from-slate-900/90 to-slate-950',
      ledColor: 'bg-emerald-400'
    },
    {
      sysTag: 'SYS.TELEMETRY // 06',
      metric: '99.8% UPTIME',
      label: 'e-BRIDGE CLOUD DIAGNOSTICS',
      subtext: 'Automated error warning & preemptive toner dispatch',
      badge: 'PROACTIVE',
      icon: Cpu,
      borderColor: 'border-slate-800 hover:border-red-500/80',
      accentBg: 'from-slate-900/90 to-slate-950',
      ledColor: 'bg-cyan-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {statCards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`bg-gradient-to-br ${card.accentBg} border ${card.borderColor} rounded-2xl p-5 relative overflow-hidden transition-all duration-300 hover:shadow-hud-glow group`}
          >
            {/* Background scanline subtle accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-full blur-2xl pointer-events-none group-hover:bg-red-600/10 transition-colors" />

            {/* Top Technical Metadata Bar */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="font-mono text-[10px] font-bold text-red-400/90 tracking-wider uppercase">
                {card.sysTag}
              </span>
              <div className="flex items-center space-x-1.5 bg-slate-950/80 border border-slate-800/80 px-2 py-0.5 rounded text-[9px] font-mono font-bold text-slate-300">
                <span className={`w-1.5 h-1.5 rounded-full ${card.ledColor} animate-pulse`} />
                <span>{card.badge}</span>
              </div>
            </div>

            {/* Metric Display in Condensed Bold Typography */}
            <div className="flex items-baseline justify-between gap-2 mt-1">
              <h4 className="text-2xl sm:text-3xl font-black font-heading text-white tracking-tight uppercase group-hover:text-red-400 transition-colors">
                {card.metric}
              </h4>
              <div className="p-2 bg-slate-950/90 border border-slate-800 rounded-xl text-slate-400 group-hover:text-red-400 group-hover:border-red-900/60 transition-colors">
                <Icon className="w-4 h-4" />
              </div>
            </div>

            {/* Label in Monospace / Technical Uppercase */}
            <p className="text-xs font-mono font-bold text-slate-200 mt-2 uppercase tracking-wide">
              {card.label}
            </p>

            {/* Subtext explanation */}
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              {card.subtext}
            </p>

            {/* Bottom corner tactical HUD crosshair */}
            <div className="absolute bottom-1 right-2 text-[9px] font-mono text-slate-700 select-none">
              +---+
            </div>
          </div>
        );
      })}
    </div>
  );
};
