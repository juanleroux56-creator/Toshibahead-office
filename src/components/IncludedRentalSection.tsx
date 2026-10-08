import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const IncludedRentalSection: React.FC = () => {
  const inclusions = [
    'Free delivery across Gauteng',
    'Full network installation & setup',
    'Staff training included',
    'Automatic toner delivery',
    '4–8 hour onsite technician SLA',
    'Genuine Toshiba consumables',
  ];

  return (
    <section className="py-12 md:py-16 max-w-7xl mx-auto px-4 md:px-8 w-full border-t border-slate-800">
      <div className="bg-gradient-to-br from-slate-900 via-[#0e1118] to-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-lg">
        <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-8 text-center sm:text-left">
          What's Included with Every Rental
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {inclusions.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 bg-slate-950/50 border border-slate-800/80 rounded-xl px-4 py-3.5"
            >
              <CheckCircle2 className="w-5 h-5 text-rose-500 shrink-0" />
              <span className="text-sm font-semibold text-slate-200">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
