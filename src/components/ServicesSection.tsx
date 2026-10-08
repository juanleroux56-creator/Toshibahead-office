import React from 'react';
import {
  Printer,
  FileSpreadsheet,
  ShoppingBag,
  Wrench,
  Truck,
  RefreshCw,
  ArrowUpRight
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectService?: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const services = [
    {
      icon: Printer,
      title: 'Printer Rentals',
      desc: 'All-inclusive office printer rentals from R400/month with zero capital outlay. Rental, toner, parts and servicing in one flat monthly price.',
      badge: 'From R400/mo',
    },
    {
      icon: FileSpreadsheet,
      title: 'Service & Toner Plan',
      desc: 'Optional pay-per-print cover. Toner, parts, servicing and callouts all handled — billed on what you actually print.',
      badge: 'Pay Per Print',
    },
    {
      icon: ShoppingBag,
      title: 'Outright Purchases',
      desc: "Buy Toshiba and Duplo machines outright with full setup, staff training and a support agreement you can cancel on 30 days' notice.",
      badge: 'Zero Interest',
    },
    {
      icon: Wrench,
      title: 'Maintenance & Repairs',
      desc: 'Certified Toshiba technicians onsite within 4–8 business hours across Johannesburg, Pretoria and greater Gauteng.',
      badge: '4–8h SLA',
    },
    {
      icon: Truck,
      title: 'Free Delivery & Setup',
      desc: 'Free delivery in Gauteng, network configuration and staff training, usually within 48 hours.',
      badge: '48h Install',
    },
    {
      icon: RefreshCw,
      title: 'Upgrades & Trade-ins',
      desc: 'Trade your old Toshiba machine for a newer model. We manage the entire swap with zero downtime.',
      badge: 'Zero Downtime',
    },
  ];

  return (
    <section id="services" className="py-16 md:py-24 max-w-7xl mx-auto px-4 md:px-8 w-full">
      <div className="max-w-3xl mb-12">
        <p className="text-xs font-bold text-rose-500 uppercase tracking-widest mb-2.5">
          What We Do
        </p>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
          Every way to put a printer in your office.
        </h2>
        <p className="text-base text-slate-400 leading-relaxed">
          Printer rentals, outright sales and an optional pay-per-print Service & Toner Plan for South African SMEs and enterprises. One local team, no surprises.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-rose-600/50 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 group shadow-sm relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-semibold text-rose-400 bg-rose-950/40 border border-rose-900/40 px-2.5 py-1 rounded-full">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-rose-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-800/60 flex items-center justify-between">
                <a
                  href="#contact"
                  onClick={() => onSelectService?.(item.title)}
                  className="text-xs font-semibold text-rose-400 group-hover:text-rose-300 flex items-center gap-1 cursor-pointer"
                >
                  <span>Enquire about this</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
