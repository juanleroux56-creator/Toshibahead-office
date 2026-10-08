import React from 'react';
import { 
  Activity, 
  ShieldAlert, 
  Zap, 
  MapPin, 
  Clock, 
  Cpu, 
  CheckCircle2, 
  TrendingUp 
} from 'lucide-react';

export const StatTicker: React.FC = () => {
  const tickerItems = [
    {
      code: 'FLEET.STATUS',
      label: '540+ ACTIVE ENTERPRISE UNITS',
      status: 'OPERATIONAL',
      icon: Activity,
      highlight: true
    },
    {
      code: 'GAUTENG.SLA',
      label: 'AVG DISPATCH LATENCY: 2.3 HOURS',
      status: 'SANDTON / PRETORIA / JHB',
      icon: Clock,
      highlight: false
    },
    {
      code: 'CONSUMABLES',
      label: '100% GENUINE TONER & DRUMS INCLUDED',
      status: 'AUTO-REPLENISH',
      icon: Zap,
      highlight: false
    },
    {
      code: 'FINANCE.TIER',
      label: 'R0 INITIAL CAPITAL EXPENDITURE',
      status: '36 / 60-MO RENTALS',
      icon: TrendingUp,
      highlight: true
    },
    {
      code: 'SECURITY.PROTOCOL',
      label: 'POPIA / GDPR SED SELF-ENCRYPTING SSD',
      status: 'AES-256 BIT',
      icon: CheckCircle2,
      highlight: false
    },
    {
      code: 'FLEET.TELEMETRY',
      label: 'e-BRIDGE CLOUDCONNECT LIVE DIAGNOSTICS',
      status: 'ACTIVE_LINK',
      icon: Cpu,
      highlight: true
    },
    {
      code: 'TECH.HOTLINE',
      label: 'DIRECT DESK: 011 796 4828 // JUAN LE ROUX',
      status: 'DISPATCH READY',
      icon: MapPin,
      highlight: false
    }
  ];

  // Duplicate for seamless infinite scroll loop
  const displayItems = [...tickerItems, ...tickerItems];

  return (
    <div className="w-full bg-[#05070b] border-y border-red-950/60 overflow-hidden py-2 select-none relative z-30 shadow-inner">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#05070b] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#05070b] to-transparent z-10 pointer-events-none" />
      
      <div className="flex items-center">
        {/* Left Live Indicator Badge */}
        <div className="shrink-0 bg-red-950/90 border-r border-red-800/80 px-3 py-1 text-[10px] font-mono font-bold text-red-400 flex items-center gap-1.5 z-20 shadow-md">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span className="tracking-widest uppercase">LIVE TELEMETRY</span>
        </div>

        {/* Continuous Marquee Stream */}
        <div className="overflow-hidden flex-1">
          <div className="animate-ticker flex items-center space-x-6">
            {displayItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx} 
                  className="flex items-center space-x-2 text-xs font-mono tracking-tight shrink-0 bg-slate-900/60 border border-slate-800/90 px-3 py-1 rounded-md"
                >
                  <span className="text-red-500 font-black">[{item.code}]</span>
                  <span className="text-slate-200 font-bold">{item.label}</span>
                  <span className="text-slate-600">//</span>
                  <span className={`text-[11px] font-extrabold uppercase px-1.5 py-0.2 rounded ${
                    item.highlight 
                      ? 'bg-red-950/80 text-red-400 border border-red-800/60' 
                      : 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                  }`}>
                    {item.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
