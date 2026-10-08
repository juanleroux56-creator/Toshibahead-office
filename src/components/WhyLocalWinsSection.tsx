import React from 'react';
import { CheckCircle2, Award, Clock, MapPin, Building2 } from 'lucide-react';

export const WhyLocalWinsSection: React.FC = () => {
  const points = [
    'Pay-per-print Service & Toner Plan — only pay for what you print',
    'Month-to-month rentals available on refurbished machines',
    'Certified Toshiba technicians & genuine consumables',
    'Direct from the importer — no middleman, no waiting on parts',
    'Proudly serving South African businesses for 38 years',
  ];

  const stats = [
    { value: '900+', label: 'Businesses served', icon: Building2 },
    { value: '21', label: 'Printer models', icon: Award },
    { value: '48h', label: 'Typical install', icon: Clock },
    { value: '38', label: 'Years in business', icon: MapPin },
  ];

  return (
    <section id="about" className="py-16 md:py-24 max-w-7xl mx-auto px-4 md:px-8 w-full border-t border-slate-800">
      <div className="grid md:grid-cols-12 gap-12 items-center">
        {/* Left Column */}
        <div className="md:col-span-7">
          <p className="text-xs font-bold text-rose-500 uppercase tracking-widest mb-2.5">
            Why Local Wins
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4 leading-tight">
            A team down the road when you need us the most.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mb-8 leading-relaxed">
            When your machine stops, your business stops. Our Gauteng-based technicians respond onsite within 4–8 business hours, with toner, parts and loan units on hand so you keep printing.
          </p>

          <ul className="space-y-3.5">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                <span className="leading-snug">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: Stats Bento Grid */}
        <div className="md:col-span-5 grid grid-cols-2 gap-4">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 text-center hover:border-slate-700 transition-all shadow-sm"
              >
                <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-500 mx-auto flex items-center justify-center mb-3">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-3xl font-extrabold text-white mb-1 tracking-tight">
                  {item.value}
                </div>
                <div className="text-xs font-medium text-slate-400">
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
