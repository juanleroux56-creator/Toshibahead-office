import React from 'react';
import { MapPin, Clock, Truck, ShieldCheck, Phone, CheckCircle2 } from 'lucide-react';

export const GautengCoverageSection: React.FC = () => {
  const regions = [
    {
      name: 'Sandton & Northern Suburbs',
      areas: 'Sandton CBD, Rosebank, Bryanston, Rivonia, Morningside, Fourways',
      sla: '4 Hour On-site SLA',
      techs: 'Dedicated North Team',
    },
    {
      name: 'Pretoria & Centurion',
      areas: 'Menlyn, Brooklyn, Hatfield, Pretoria CBD, Centurion Tech Park, Highveld',
      sla: '4 Hour On-site SLA',
      techs: 'Tshwane Regional Hub',
    },
    {
      name: 'Midrand & Waterfall',
      areas: 'Waterfall City, Kyalami, Halfway House, Grand Central',
      sla: '2–4 Hour Priority SLA',
      techs: 'Central Corridor Fleet',
    },
    {
      name: 'East Rand / Ekurhuleni',
      areas: 'Bedfordview, Edenvale, Kempton Park, Boksburg, Benoni, Germiston',
      sla: '4–6 Hour On-site SLA',
      techs: 'East Industrial Fleet',
    },
    {
      name: 'West Rand & Roodepoort',
      areas: 'Constantia Kloof, Roodepoort, Krugersdorp, Randburg, Cresta',
      sla: '4–6 Hour On-site SLA',
      techs: 'West Metro Van Team',
    },
    {
      name: 'Johannesburg CBD & South',
      areas: 'Braamfontein, JHB CBD, Ormonde, City Deep, Alberton, Aeroton',
      sla: '4–6 Hour On-site SLA',
      techs: 'Central Commercial Fleet',
    },
  ];

  return (
    <section id="coverage" className="py-16 md:py-24 max-w-7xl mx-auto px-4 md:px-8 w-full border-t border-slate-800">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-emerald-400 font-bold mb-2">
            // On-site dispatch network
          </p>
          <h2 className="text-3xl sm:text-4xl font-black font-heading uppercase text-white tracking-tight">
            Gauteng SLA Hubs &amp; Dispatch
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl leading-relaxed">
            Unlike brokers who sub-contract calls to third parties, certified Toshiba technicians are stationed directly across Gauteng hubs with guaranteed 4–8 hour on-site SLAs.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="tel:0783076569"
            className="px-5 py-2.5 rounded-xl bg-[#0b0e14] hover:bg-slate-900 text-slate-200 text-xs sm:text-sm font-mono font-semibold border border-slate-800 transition-colors flex items-center gap-2"
          >
            <Phone className="w-4 h-4 text-rose-500" />
            <span>Direct Desk: Juan 078 307 6569</span>
          </a>
        </div>
      </div>

      {/* Coverage Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {regions.map((region, idx) => (
          <div
            key={idx}
            className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 text-rose-500 font-bold text-base">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <h3 className="text-white text-sm sm:text-base font-bold tracking-tight">
                    {region.name}
                  </h3>
                </div>
              </div>
              <p className="text-xs text-slate-400 mb-4 line-clamp-2 leading-relaxed">
                {region.areas}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {region.sla}
              </span>
              <span className="text-slate-400 text-[11px]">
                {region.techs}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Delivery Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-[#0e121a] to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-600/20 border border-rose-600/30 flex items-center justify-center shrink-0 text-rose-400">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-bold text-white">
              Free Delivery &amp; Network Setup Across the Entire Province
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Zero delivery fees, zero installation fees, and full on-site staff training included on all rentals.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold text-slate-300 shrink-0">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            48h Typical Delivery
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-rose-500" />
            100% Genuine Toners
          </span>
        </div>
      </div>
    </section>
  );
};
