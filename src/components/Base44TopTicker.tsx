import React from 'react';
import { Sparkles } from 'lucide-react';
import { TICKER_ITEMS } from '../data/base44Printers';

export const Base44TopTicker: React.FC = () => {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="relative overflow-hidden border-b border-chrome/15 bg-[#0a0c0e] py-2 z-30">
      <div className="flex w-max whitespace-nowrap animate-ticker">
        {items.map((item, idx) => (
          <span
            key={idx}
            className="mx-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-chrome/60"
          >
            <Sparkles className="h-3 w-3 text-primary animate-pulse" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};
