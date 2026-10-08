import React from 'react';
import {
  ShieldCheck,
  Award,
  Clock,
  Building2,
  CheckCircle2,
  MapPin,
  Wrench,
  Sparkles,
  Phone,
  FileCheck2,
} from 'lucide-react';
import { TestimonialSlider } from './TestimonialSlider';

interface Base44AboutSectionProps {
  onRequestQuote: (modelName?: string) => void;
}

export const Base44AboutSection: React.FC<Base44AboutSectionProps> = ({ onRequestQuote }) => {
  const pillars = [
    {
      icon: Award,
      title: 'Direct Importer — Zero Middlemen',
      description:
        'Deal directly with Toshiba South Africa Head Office. You avoid intermediary broker markups, third-party delays, and outsourced service contracts. All machines, OEM toners, and spare parts come straight from our central warehouse.',
    },
    {
      icon: Clock,
      title: '4–8 Hour Guaranteed Onsite SLA',
      description:
        'When your office printer stops, business stops. Our factory-certified mobile technicians are stationed across Sandton, Pretoria, Midrand, and Ekurhuleni with emergency loan units and replacement parts on board.',
    },
    {
      icon: FileCheck2,
      title: '0% Fixed Escalation via KAGO Finance',
      description:
        'No hidden compound escalation traps. We structure 36, 48, and 60-month rentals with 0% escalation, giving your financial directors predictable, flat-rate monthly budgeting from Day 1 to Day 1800.',
    },
    {
      icon: Wrench,
      title: 'Certified Master Engineers & Remote Telemetry',
      description:
        'Your copiers communicate fleet health directly to our monitoring center. Automated alerts dispatch fresh toner cartridges before your staff runs dry, and issues are resolved proactively before downtime occurs.',
    },
  ];

  const operationalStats = [
    { value: '38', unit: 'Years', label: 'In South Africa', sub: 'Established 1986' },
    { value: '900+', unit: 'Fleets', label: 'Active in Gauteng', sub: 'Corporate, Law, Medical' },
    { value: '4–8h', unit: 'SLA', label: 'Onsite Response', sub: 'Guaranteed dispatch' },
    { value: '0%', unit: 'Escalation', label: 'Predictable Cost', sub: 'Zero hidden inflation' },
  ];

  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-chrome/15 bg-[#0a0c0e] py-20 lg:py-28"
    >
      {/* Decorative ambient background accents */}
      <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        {/* Section Tag & Main Headline */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-primary mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            // Toshiba Head Office · Established in Gauteng
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white leading-tight">
            Direct Manufacturer Backing.
            <span className="block text-chrome/50">Zero Broker Middlemen.</span>
          </h2>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-chrome/70">
            For 38 years, Toshiba South Africa Head Office has powered corporate offices, law firms,
            hospitals, schools, and industrial facilities across Gauteng with heavy-duty multifunction
            copiers, transparent rental agreements, and rapid onsite servicing.
          </p>
        </div>

        {/* Stats Bento Strip */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 mb-16">
          {operationalStats.map((stat, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden rounded-lg border border-chrome/15 bg-gradient-to-b from-[#10141b] to-[#0a0c0e] p-5 sm:p-6 transition-colors hover:border-primary/40 group"
            >
              <div className="font-mono text-[10px] font-semibold uppercase tracking-widest text-primary mb-1">
                {stat.label}
              </div>
              <div className="flex items-baseline gap-1.5 font-heading text-3xl sm:text-4xl font-extrabold uppercase text-white tracking-tight">
                <span>{stat.value}</span>
                <span className="text-xs font-mono font-normal text-chrome/40">{stat.unit}</span>
              </div>
              <div className="mt-1 font-mono text-[11px] text-chrome/50">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Core Value Pillars Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-20">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="relative rounded-lg border border-chrome/10 bg-[#0d1015]/80 p-6 sm:p-7 transition-all hover:border-chrome/30 hover:bg-[#0f131a]"
              >
                <div className="flex items-center gap-3.5 mb-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-primary/30 bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-base sm:text-lg font-bold uppercase tracking-wide text-white">
                    {pillar.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-chrome/65">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Direct Contact Banner */}
        <div className="mb-20 rounded-lg border border-primary/30 bg-gradient-to-r from-primary/15 via-[#10141d] to-[#0a0c0e] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="font-mono text-xs uppercase tracking-widest text-primary font-bold mb-1">
              Direct Gauteng Sales &amp; Dispatch Line
            </div>
            <h4 className="font-heading text-xl sm:text-2xl font-bold uppercase text-white">
              Speak directly with Juan at Toshiba Head Office
            </h4>
            <p className="mt-2 text-sm text-chrome/70">
              No generic switchboards or call center tickets. Call our regional desk for immediate stock checks, custom fleet sizing, and instant leasing calculations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="tel:0783076569"
              className="inline-flex items-center gap-2 rounded border border-white/20 bg-white/5 px-5 py-3 font-mono text-sm font-bold uppercase tracking-wider text-white transition-all hover:border-white hover:bg-white hover:text-black cursor-pointer"
            >
              <Phone className="h-4 w-4 text-primary" />
              <span>078 307 6569</span>
            </a>
            <button
              type="button"
              onClick={() => onRequestQuote()}
              className="inline-flex items-center gap-2 rounded border border-primary bg-primary px-5 py-3 font-heading text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-primary/90 hover:shadow-[0_0_15px_rgba(243,13,34,0.4)] cursor-pointer"
            >
              <span>Instant Quote</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* GAUtENG TESTIMONIAL SLIDER - BY ABOUT US                                */}
        {/* ========================================================================= */}
        <div id="testimonials" className="pt-6 border-t border-chrome/15">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-emerald-400 mb-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              // Proven On Gauteng Ground · Real Success Stories
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-white">
              Trusted by 900+ Gauteng Businesses
            </h3>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-chrome/65">
              Read how legal practices in Sandton, distribution hubs in Midrand, architectural studios in Centurion,
              and healthcare clinics on the East Rand trust Toshiba for guaranteed uptime and lower monthly costs.
            </p>
          </div>

          {/* Testimonial Slider Component */}
          <TestimonialSlider onRequestQuote={onRequestQuote} />
        </div>
      </div>
    </section>
  );
};
