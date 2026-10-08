import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  MapPin,
  Building,
  TrendingDown,
  Printer,
  Sparkles,
  Play,
  Pause,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  category: 'legal' | 'logistics' | 'healthcare' | 'design' | 'education';
  quote: string;
  model: string;
  metricBadge: string;
  secondaryStat: string;
  contractType: string;
  rating: number;
}

export const GAUTENG_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'sandton-law',
    name: 'Advocate Thabo M.',
    role: 'Senior Litigation Partner',
    company: 'Commercial Litigation Advocates',
    location: 'Sandton CBD · Northern Hub',
    category: 'legal',
    quote:
      'We moved away from a national supplier after months of slow response times. Our legal practice handles sensitive High Court bundles, and the dual Toshiba e-STUDIO 3525AC fleet with encrypted PIN-release printing cut our monthly spend by 38%. When we needed an emergency toner delivery before a trial, the Sandton dispatch technician arrived in under 85 minutes.',
    model: 'e-STUDIO 3525AC',
    metricBadge: '38% Cost Reduction',
    secondaryStat: '< 85 Min Emergency Response',
    contractType: '60-Month Managed Rental · 0% Escalation',
    rating: 5,
  },
  {
    id: 'midrand-logistics',
    name: 'Willem Van Der Merwe',
    role: 'Logistics Operations Director',
    company: 'Apex Trans-Gauteng Supply Chain',
    location: 'Waterfall City · Midrand Corridor',
    category: 'logistics',
    quote:
      'Running a 24/7 freight depot produces over 85,000 consignment waybills, manifests, and customs notes every month. Downtime is simply not an option. Juan and his team deployed the heavy-duty e-STUDIO 6528A mono workhorse. Toshiba automated telemetry replenishes toner cartridges before our floor supervisors even know they are low.',
    model: 'e-STUDIO 6528A',
    metricBadge: '85,000 Pages / Month',
    secondaryStat: '99.8% Fleet Uptime Over 18 Mo',
    contractType: '60-Month Workhorse Lease · Direct SLA',
    rating: 5,
  },
  {
    id: 'centurion-arch',
    name: 'Dr. Nadia Pieterse',
    role: 'Principal Partner & Architect',
    company: 'Apex Habitat Architects & Urban Planners',
    location: 'Highveld Techno Park · Centurion',
    category: 'design',
    quote:
      'Presenting municipal submission drawings and luxury residential renders demands razor-sharp A3 color fidelity. The e-STUDIO 4525AC reproduces our AutoCAD and Revit models with exceptional line precision. Antonie handled the entire installation, seamlessly networking 18 CAD stations in one morning without upfront capital outlay.',
    model: 'e-STUDIO 4525AC',
    metricBadge: 'True 1200dpi CAD Precision',
    secondaryStat: 'R0 Upfront Capital Outlay',
    contractType: '60-Month Studio Rental · 0% Escalation',
    rating: 5,
  },
  {
    id: 'bedfordview-medical',
    name: 'Lesley Caddy',
    role: 'Operations & Practice Director',
    company: 'Bedfordview Multi-Specialist Clinic',
    location: 'Bedfordview · East Rand Corridor',
    category: 'healthcare',
    quote:
      'Thank you so much for the fast and efficient service we have received from Antonie. In healthcare, patient referral cards and lab scans must be digitized instantly without doctor delays. Our dual-scan Toshiba 2528A processes 240 images per minute straight into POPIA-compliant cloud records. As long as I manage this clinic, we will never change from Toshiba.',
    model: 'e-STUDIO 2528A',
    metricBadge: '240 ipm Duplex Scanning',
    secondaryStat: 'POPIA-Compliant Data Wipe',
    contractType: 'Medical Rental Plan · Direct Toner Supply',
    rating: 5,
  },
  {
    id: 'rosebank-finance',
    name: 'Farhad Patel',
    role: 'Chief Financial Officer',
    company: 'Meridian Capital & Wealth Advisory',
    location: 'Rosebank Commercial Strip · JHB',
    category: 'legal',
    quote:
      'Before switching to Toshiba Head Office, our firm was locked into an ambiguous lease with a broker that carried 15% annual compound escalations and hidden per-page penalties. Juan provided an open 0% fixed escalation contract. We upgraded to the e-STUDIO 3025AC, and our quarterly print budget is completely fixed with zero surprise charges.',
    model: 'e-STUDIO 3025AC',
    metricBadge: '0% Compound Escalation',
    secondaryStat: 'Zero Hidden Toner Surcharges',
    contractType: '36-Month Executive Rental · Fixed Cost',
    rating: 5,
  },
  {
    id: 'randburg-academy',
    name: 'Madelaine Posthumus',
    role: 'Bursar & Campus Administrator',
    company: 'Randburg Preparatory & High Campus',
    location: 'Randburg & Cresta Metro · JHB',
    category: 'education',
    quote:
      'I would like to commend Keanan on his fabulous service. Printing term examination packs, workbooks, and daily curriculum worksheets for over 700 learners used to cause panic every exam cycle. Keanan installed the e-STUDIO 5528A high-volume MFP, trained our staff, and had all teacher laptops configured within two hours.',
    model: 'e-STUDIO 5528A',
    metricBadge: '700+ Learners Supported',
    secondaryStat: 'Same-Day Full Deployment',
    contractType: 'Campus Managed Fleet · Pay-Per-Page',
    rating: 5,
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All Gauteng' },
  { id: 'legal', label: 'Legal & Corporate' },
  { id: 'logistics', label: 'Logistics & Supply' },
  { id: 'design', label: 'Architecture & Design' },
  { id: 'healthcare', label: 'Healthcare & Medical' },
  { id: 'education', label: 'Education & Schools' },
];

interface TestimonialSliderProps {
  onRequestQuote?: (modelName: string) => void;
}

export const TestimonialSlider: React.FC<TestimonialSliderProps> = ({ onRequestQuote }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const filteredTestimonials =
    selectedCategory === 'all'
      ? GAUTENG_TESTIMONIALS
      : GAUTENG_TESTIMONIALS.filter((t) => t.category === selectedCategory);

  // Reset index if category changes and current index is out of bounds
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
  }, [filteredTestimonials.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length);
  }, [filteredTestimonials.length]);

  // Autoplay timer
  useEffect(() => {
    if (!isAutoPlaying || filteredTestimonials.length <= 1) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, filteredTestimonials.length, nextSlide]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  };

  const activeItem = filteredTestimonials[currentIndex] || filteredTestimonials[0];

  return (
    <div
      ref={sliderRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="outline-none"
      aria-label="Gauteng Client Testimonial Slider"
    >
      {/* Category Pills & Controls Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        {/* Industry Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setIsAutoPlaying(false);
                }}
                className={`px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-all rounded-sm border cursor-pointer ${
                  isActive
                    ? 'border-primary bg-primary text-white font-bold shadow-[0_0_12px_rgba(243,13,34,0.35)]'
                    : 'border-white/10 bg-[#12161c] text-chrome/60 hover:border-chrome/30 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Play/Pause & Slider Counters */}
        <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto font-mono text-xs text-chrome/60">
          <button
            type="button"
            onClick={() => setIsAutoPlaying((prev) => !prev)}
            className="flex items-center gap-1.5 rounded border border-white/10 bg-[#12161c] px-2.5 py-1 text-chrome/70 transition-colors hover:border-chrome/30 hover:text-white cursor-pointer"
            title={isAutoPlaying ? 'Pause autoplay' : 'Resume autoplay'}
          >
            {isAutoPlaying ? (
              <>
                <Pause className="h-3 w-3 text-primary" />
                <span className="text-[10px] uppercase">Auto</span>
              </>
            ) : (
              <>
                <Play className="h-3 w-3 text-emerald-400" />
                <span className="text-[10px] uppercase">Paused</span>
              </>
            )}
          </button>

          <span className="tracking-widest">
            <span className="text-white font-bold">{String(currentIndex + 1).padStart(2, '0')}</span>
            <span className="text-chrome/30"> / </span>
            <span>{String(filteredTestimonials.length).padStart(2, '0')}</span>
          </span>

          {/* Prev / Next Arrows that Light Up */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                prevSlide();
                setIsAutoPlaying(false);
              }}
              className="flex h-8 w-8 items-center justify-center rounded border border-white/15 bg-[#12161c] text-chrome/70 transition-all duration-200 hover:border-primary hover:bg-[#22070b] hover:text-white hover:shadow-[0_0_16px_rgba(243,13,34,0.85)] active:scale-90 cursor-pointer group"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-4 w-4 transition-transform group-hover:scale-110 group-hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.9)]" />
            </button>
            <button
              type="button"
              onClick={() => {
                nextSlide();
                setIsAutoPlaying(false);
              }}
              className="flex h-8 w-8 items-center justify-center rounded border border-white/15 bg-[#12161c] text-chrome/70 transition-all duration-200 hover:border-primary hover:bg-[#22070b] hover:text-white hover:shadow-[0_0_16px_rgba(243,13,34,0.85)] active:scale-90 cursor-pointer group"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-4 w-4 transition-transform group-hover:scale-110 group-hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.9)]" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Slide Card */}
      {activeItem && (
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative overflow-hidden rounded-lg border border-chrome/15 bg-gradient-to-br from-[#0e1218] via-[#0b0e13] to-[#07090c] p-6 sm:p-8 lg:p-10 shadow-2xl transition-all duration-300"
        >
          {/* Subtle Top Red Glow Strip */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-80" />

          {/* Background Ambient Watermark */}
          <div className="pointer-events-none absolute right-4 bottom-2 select-none font-mono text-[90px] font-black uppercase text-white/[0.02] sm:text-[140px] leading-none">
            Gauteng
          </div>

          <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Quote & Testimonial Details */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              <div>
                {/* Meta Badges Row */}
                <div className="flex flex-wrap items-center gap-2.5 mb-5">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
                    <ShieldCheck className="h-3 w-3" />
                    <span>Verified Gauteng Client</span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#171c24] px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-chrome/70">
                    <MapPin className="h-3 w-3 text-primary" />
                    <span>{activeItem.location}</span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-primary">
                    <Printer className="h-3 w-3" />
                    <span>{activeItem.model}</span>
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-1.5 mb-4 text-amber-400">
                  {[...Array(activeItem.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-2 font-mono text-xs font-semibold text-white/90">
                    5.0 / 5.0 SLA Rating
                  </span>
                </div>

                {/* Quotation Body */}
                <div className="relative my-4">
                  <Quote className="absolute -top-3 -left-3 h-8 w-8 text-primary/20 pointer-events-none rotate-180" />
                  <p className="font-heading text-lg sm:text-xl md:text-2xl font-normal leading-relaxed text-slate-100 tracking-tight pl-3">
                    "{activeItem.quote}"
                  </p>
                </div>
              </div>

              {/* Author & Business Sign-off */}
              <div className="mt-8 pt-6 border-t border-chrome/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  {/* Monogram Badge */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-primary/40 bg-gradient-to-br from-primary/20 to-[#12161f] font-heading text-base font-bold text-white shadow-inner">
                    {activeItem.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <h4 className="font-heading text-base font-bold uppercase tracking-wide text-white">
                      {activeItem.name}
                    </h4>
                    <p className="font-mono text-xs text-primary font-medium">
                      {activeItem.role}
                    </p>
                    <p className="font-sans text-xs text-chrome/60 flex items-center gap-1.5 mt-0.5">
                      <Building className="h-3 w-3 text-chrome/40" />
                      {activeItem.company}
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right font-mono text-[11px] text-chrome/50">
                  <span className="block text-chrome/70 font-semibold">{activeItem.contractType}</span>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1 sm:justify-end mt-0.5">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                    Direct Head Office SLA
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Key Operational Metrics & Model Match Callout */}
            <div className="lg:col-span-4 flex flex-col justify-between rounded-lg border border-white/10 bg-[#080b0f]/90 p-5 sm:p-6 backdrop-blur-sm">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
                    // Operational Outcome
                  </span>
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                </div>

                {/* Primary Metric Box */}
                <div className="rounded border border-primary/30 bg-primary/5 p-4 mb-3">
                  <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-wider mb-1">
                    <TrendingDown className="h-4 w-4" />
                    <span>Primary Advantage</span>
                  </div>
                  <div className="font-heading text-2xl font-black uppercase text-white tracking-tight">
                    {activeItem.metricBadge}
                  </div>
                </div>

                {/* Secondary Reliability Box */}
                <div className="rounded border border-white/10 bg-white/[0.02] p-4 mb-6">
                  <div className="text-chrome/50 font-mono text-[10px] uppercase tracking-widest mb-1">
                    Verified Performance
                  </div>
                  <div className="font-heading text-base font-bold text-emerald-400 tracking-tight">
                    {activeItem.secondaryStat}
                  </div>
                </div>

                {/* Machine Fleet Tag */}
                <div className="mb-6 rounded border border-chrome/10 bg-[#0d1117] p-3 text-xs">
                  <span className="font-mono text-[10px] uppercase text-chrome/40 block mb-1">
                    Equipped Machine
                  </span>
                  <span className="font-heading font-bold text-white text-sm">
                    Toshiba {activeItem.model}
                  </span>
                  <span className="text-[11px] text-chrome/60 block mt-0.5">
                    Genuine OEM toners, automated dispatch &amp; onsite servicing included.
                  </span>
                </div>
              </div>

              {/* Action Button: Match or Quote this Model */}
              {onRequestQuote && (
                <button
                  type="button"
                  onClick={() => onRequestQuote(activeItem.model)}
                  className="group flex w-full items-center justify-center gap-2 rounded border border-primary bg-primary px-4 py-3 font-heading text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(243,13,34,0.4)] cursor-pointer"
                >
                  <span>Rent This Model</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Progress Dots Indicator */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {filteredTestimonials.map((item, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setCurrentIndex(idx);
                setIsAutoPlaying(false);
              }}
              className={`h-2 transition-all rounded-full cursor-pointer ${
                isActive
                  ? 'w-8 bg-primary shadow-[0_0_8px_rgba(243,13,34,0.6)]'
                  : 'w-2 bg-chrome/20 hover:bg-chrome/50'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
};
