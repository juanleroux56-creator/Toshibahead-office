import React, { useState, useEffect, useRef } from 'react';
import {
  Palette,
  FileText,
  Gauge,
  Wifi,
  Check,
  Zap,
  ArrowRight,
  RotateCcw,
  Layers,
  FileDown,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';
import {
  Base44Printer,
  MatcherAnswers,
  matchBestFitPrinter,
  getAlternativePrinter,
  FORMAT_CURRENCY,
  MACRO_HERO_IMAGE,
  VOLUME_TIER_LABELS,
} from '../data/base44Printers';
import { generateBase44PrinterBrochurePdf } from '../utils/pdfGenerator';

interface Base44HeroMatcherProps {
  printers: Base44Printer[];
  onRequestQuote: (modelName?: string) => void;
}

const QUESTIONS = [
  {
    key: 'colour' as const,
    stepNum: '01',
    title: 'Colour, mono, or both?',
    subheading: 'Choose the document output style required by your team',
    Icon: Palette,
    options: [
      {
        id: 'colour',
        label: 'Colour',
        sub: 'Full-colour marketing, client proposals, presentation decks & black text',
        badge: 'Vivid Colour',
      },
      {
        id: 'mono',
        label: 'Mono',
        sub: 'Dedicated monochrome documents with the lowest running cost per page',
        badge: 'Lowest Cost/Page',
      },
      {
        id: 'both',
        label: 'Both',
        sub: 'Versatile colour MFP that handles heavy daily black & white and vibrant colour',
        badge: 'Most Flexible',
      },
    ],
  },
  {
    key: 'format' as const,
    stepNum: '02',
    title: 'Paper format: A3, A4, or both?',
    subheading: 'Select the paper dimensions your office produces regularly',
    Icon: FileText,
    options: [
      {
        id: 'A4',
        label: 'A4 Only',
        sub: 'Standard daily letters, contracts, invoices & compact desktop footprint',
        badge: 'Compact Footprint',
      },
      {
        id: 'A3',
        label: 'A3 Large Format',
        sub: 'Wide-format financial spreadsheets, architectural plans, diagrams & posters',
        badge: 'Wide Format',
      },
      {
        id: 'both',
        label: 'Both (A3 & A4)',
        sub: 'Floor-standing systems with multiple cassettes for simultaneous A3 & A4 trays',
        badge: 'Dual Cassettes',
      },
    ],
  },
  {
    key: 'volume' as const,
    stepNum: '03',
    title: 'How many pages do you need?',
    subheading: 'Estimated average monthly print and copy volume',
    Icon: Gauge,
    options: [
      {
        id: 'under_5k',
        label: 'Under 5,000 pages / month',
        sub: 'Small practice, boutique consultancy, or 1–5 staff daily usage',
        badge: 'Small Office',
      },
      {
        id: '5k_15k',
        label: '5,000 – 15,000 pages / month',
        sub: 'Steady office team with regular daily contracts, reports & invoicing (5–20 staff)',
        badge: 'Medium Volume',
      },
      {
        id: '15k_45k',
        label: '15,000 – 45,000 pages / month',
        sub: 'Busy accounts, law firm, logistics, or multi-departmental load (20–50 staff)',
        badge: 'High Volume',
      },
      {
        id: '45k_plus',
        label: 'Above 45,000 pages / month',
        sub: 'Central copy hub, enterprise floor, education campus, or production room (50+ staff)',
        badge: 'Enterprise Fleet',
      },
    ],
  },
  {
    key: 'wifi' as const,
    stepNum: '04',
    title: 'Do you need Wi-Fi?',
    subheading: 'Choose your office network connection and mobile print setup',
    Icon: Wifi,
    options: [
      {
        id: 'yes',
        label: 'Yes, Wi-Fi Required',
        sub: 'Wireless laptop printing, Apple AirPrint, Mopria mobile print & Wi-Fi Direct',
        badge: 'Wireless & Mobile',
      },
      {
        id: 'no',
        label: 'No, Wired Ethernet Only',
        sub: 'Direct high-speed Gigabit LAN network cable connected to wall switch',
        badge: 'Gigabit LAN',
      },
      {
        id: 'flexible',
        label: 'Either / Flexible',
        sub: 'Wired or wireless — whichever Toshiba model provides the greatest value',
        badge: 'Best Value',
      },
    ],
  },
];

export const Base44HeroMatcher: React.FC<Base44HeroMatcherProps> = ({
  printers,
  onRequestQuote,
}) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<MatcherAnswers>({
    colour: null,
    format: null,
    volume: null,
    wifi: null,
  });
  const [isSeeking, setIsSeeking] = useState(false);
  const [matchedPrinter, setMatchedPrinter] = useState<Base44Printer | null>(null);
  const [alternativePrinter, setAlternativePrinter] = useState<Base44Printer | null>(null);
  const [selectedTerm, setSelectedTerm] = useState<60 | 36>(60); // Always start with 60 months @ 0% escalation
  const [isHeroScrolling, setIsHeroScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsHeroScrolling(true);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsHeroScrolling(false);
      }, 1200);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const handleSelectOption = (key: keyof MatcherAnswers, val: any) => {
    const updated = { ...answers, [key]: val };
    setAnswers(updated);

    if (stepIndex < QUESTIONS.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      // Final step: Seek best option
      setIsSeeking(true);
      setTimeout(() => {
        const match = matchBestFitPrinter(printers, updated);
        const alt = getAlternativePrinter(printers, updated, match?.id);
        setMatchedPrinter(match);
        setAlternativePrinter(alt);
        setIsSeeking(false);
        setStepIndex(QUESTIONS.length);
      }, 350);
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    }
  };

  const handleReset = () => {
    setStepIndex(0);
    setAnswers({ colour: null, format: null, volume: null, wifi: null });
    setMatchedPrinter(null);
    setAlternativePrinter(null);
    setIsSeeking(false);
  };

  const currentQ = QUESTIONS[stepIndex];

  // Helper label formatters for the summary pills in result view
  const getColourSummary = () => {
    if (answers.colour === 'colour') return 'Colour';
    if (answers.colour === 'mono') return 'Monochrome';
    return 'Colour & Mono (Both)';
  };

  const getFormatSummary = () => {
    if (answers.format === 'A4') return 'A4 Format';
    if (answers.format === 'A3') return 'A3 Format';
    return 'Both A3 & A4 Trays';
  };

  const getVolumeSummary = () => {
    if (answers.volume === 'under_5k') return '< 5,000 pages/mo';
    if (answers.volume === '5k_15k') return '5,000 – 15,000 pages/mo';
    if (answers.volume === '15k_45k') return '15,000 – 45,000 pages/mo';
    return '45,000+ pages/mo';
  };

  const getWifiSummary = () => {
    if (answers.wifi === 'yes') return 'Wi-Fi & AirPrint Enabled';
    if (answers.wifi === 'no') return 'Gigabit Ethernet';
    return 'Flexible Network';
  };

  return (
    <section
      id="matcher"
      className="relative scroll-mt-20 grid grid-cols-1 border-b border-chrome/15 lg:grid-cols-2"
    >
      {/* Left Column: Macro Engineering Image with GPS Coordinates */}
      <div className="relative min-h-[360px] lg:min-h-[640px] overflow-hidden border-b border-chrome/15 lg:border-b-0 lg:border-r">
        <img
          src={MACRO_HERO_IMAGE}
          alt="Macro view of Toshiba printer internal gears and rollers"
          className="h-full w-full object-cover object-center filter brightness-90 contrast-105"
          loading="eager"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c0e] via-[#0a0c0e]/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-[#0a0c0e]/20 lg:to-[#0a0c0e]" />

        {/* Watermark coordinates */}
        <div className="pointer-events-none absolute bottom-4 left-5 font-mono text-[10px] uppercase tracking-widest text-chrome/60">
          26.2041° S · 28.0473° E · Johannesburg Head Office
        </div>

        {/* Floating badge */}
        <div className="absolute top-5 left-5 inline-flex items-center gap-2 border border-primary/40 bg-[#0a0c0e]/85 px-3 py-1.5 backdrop-blur font-mono text-[11px] text-white">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          Toshiba Diagnostic Matcher
        </div>
      </div>

      {/* Right Column: Diagnostic Engine & Questionnaire */}
      <div className="flex items-center px-6 py-12 lg:px-12 bg-[#0a0c0e]">
        <div className="w-full max-w-xl mx-auto lg:mx-0">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
            // Diagnostic engine
          </p>
          <h1 className="font-heading text-3xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-4xl lg:text-5xl">
            Find the printer built for your office volume
          </h1>
          <p className="mt-3 max-w-lg text-xs sm:text-sm leading-relaxed text-chrome/70">
            Four targeted questions. Our diagnostic engine seeks the exact best-fitting Toshiba
            e-STUDIO MFP that suits your workload with zero sales upsell.
          </p>

          <div className="mt-8">
            {/* Seeking animation state */}
            {isSeeking ? (
              <div className="border border-primary/30 bg-[#0c1015] p-10 text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary mb-4 animate-spin">
                  <Gauge className="h-6 w-6" />
                </div>
                <div className="font-heading text-lg font-bold uppercase tracking-wider text-white">
                  Seeking the best option that suits...
                </div>
                <p className="mt-1 font-mono text-xs text-chrome/60">
                  Analyzing 21 Toshiba models for optimal duty cycle, speed, and monthly rental...
                </p>
              </div>
            ) : matchedPrinter ? (
              /* Matched Result View */
              <div className="border border-chrome/20 bg-[#0c1015] p-6 sm:p-7">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-chrome/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 bg-warning/15 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-warning">
                      <Zap className="h-3 w-3" />
                      Lowest-price best match
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-chrome/50">
                      Volume Optimised
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 font-mono text-[11px] text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Ideal Capacity
                  </span>
                </div>

                {/* Match Summary Chips */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="border border-chrome/20 bg-[#07090c] px-2 py-0.5 font-mono text-[10px] text-chrome/75">
                    {getColourSummary()}
                  </span>
                  <span className="border border-chrome/20 bg-[#07090c] px-2 py-0.5 font-mono text-[10px] text-chrome/75">
                    {getFormatSummary()}
                  </span>
                  <span className="border border-chrome/20 bg-[#07090c] px-2 py-0.5 font-mono text-[10px] text-chrome/75">
                    {getVolumeSummary()}
                  </span>
                  <span className="border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-[10px] text-primary">
                    {getWifiSummary()}
                  </span>
                </div>

                {/* Model Title & Picture */}
                <div className="mt-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  {matchedPrinter.image_url && (
                    <img
                      src={matchedPrinter.image_url}
                      alt={matchedPrinter.model}
                      className="h-20 w-20 object-contain bg-[#07090c] border border-chrome/20 p-2 shrink-0"
                    />
                  )}
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                      Toshiba e-STUDIO MFP
                    </span>
                    <h3 className="font-heading text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">
                      {matchedPrinter.model}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-chrome/70 line-clamp-2">
                      {matchedPrinter.description}
                    </p>
                  </div>
                </div>

                {/* 4 Technical Metric Boxes */}
                <div className="mt-5 grid grid-cols-2 gap-px border border-chrome/15 bg-chrome/10 sm:grid-cols-4">
                  <div className="bg-[#0a0c0e] p-3 text-left">
                    <Gauge className="h-3.5 w-3.5 text-primary/70" />
                    <div className="mt-1 font-mono text-base font-bold text-white">
                      {matchedPrinter.speed_ppm}
                    </div>
                    <div className="font-mono text-[9px] uppercase tracking-widest text-chrome/45">
                      PPM Speed
                    </div>
                  </div>
                  <div className="bg-[#0a0c0e] p-3 text-left">
                    <Layers className="h-3.5 w-3.5 text-primary/70" />
                    <div className="mt-1 font-mono text-base font-bold text-white">
                      {(matchedPrinter.duty_cycle / 1000).toFixed(0)}k
                    </div>
                    <div className="font-mono text-[9px] uppercase tracking-widest text-chrome/45">
                      Pages / Mo
                    </div>
                  </div>
                  <div className="bg-[#0a0c0e] p-3 text-left">
                    <FileText className="h-3.5 w-3.5 text-primary/70" />
                    <div className="mt-1 font-mono text-base font-bold text-white">
                      {matchedPrinter.format === 'A3' ? 'A3 & A4' : 'A4 Only'}
                    </div>
                    <div className="font-mono text-[9px] uppercase tracking-widest text-chrome/45">
                      Paper Trays
                    </div>
                  </div>
                  <div className="bg-[#0a0c0e] p-3 text-left">
                    <Wifi className="h-3.5 w-3.5 text-primary/70" />
                    <div className="mt-1 font-mono text-base font-bold text-white">
                      {matchedPrinter.wifi !== false ? 'Wi-Fi' : 'LAN'}
                    </div>
                    <div className="font-mono text-[9px] uppercase tracking-widest text-chrome/45">
                      Network
                    </div>
                  </div>
                </div>

                {/* Rental Price & Term Selector */}
                <div className="mt-5 border-t border-chrome/10 pt-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-chrome/50">
                      Rental Agreement Options (0% Escalation)
                    </span>
                    {/* Term Toggle (Default 60 months @ 0% escalation) */}
                    <div className="inline-flex rounded border border-chrome/20 bg-[#07090c] p-0.5">
                      <button
                        type="button"
                        onClick={() => setSelectedTerm(60)}
                        className={`px-3 py-1 font-mono text-[11px] uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                          selectedTerm === 60
                            ? 'bg-primary text-white shadow-sm'
                            : 'text-chrome/60 hover:text-white'
                        }`}
                      >
                        60 Months (0% Esc)
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedTerm(36)}
                        className={`px-3 py-1 font-mono text-[11px] uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                          selectedTerm === 36
                            ? 'bg-primary text-white shadow-sm'
                            : 'text-chrome/60 hover:text-white'
                        }`}
                      >
                        36 Months (0% Esc)
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 bg-[#07090c] border border-chrome/15 p-3.5">
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-primary font-medium">
                        {selectedTerm}-Month Rental Rate ({selectedTerm === 60 ? 'Standard 5-Year Term' : '3-Year Fast Refresh'})
                      </div>
                      <div className="font-mono text-2xl sm:text-3xl font-bold text-primary mt-0.5">
                        {FORMAT_CURRENCY(
                          selectedTerm === 60
                            ? (matchedPrinter.rental_60mo_0esc || matchedPrinter.monthly_rental)
                            : (matchedPrinter.rental_36mo_0esc || Math.round(matchedPrinter.monthly_rental * 1.35))
                        )}
                        <span className="text-sm text-chrome/50 font-normal">/month ex VAT</span>
                      </div>
                      <div className="font-mono text-[10px] text-chrome/50 mt-1 flex flex-wrap gap-x-3 gap-y-1">
                        <span>0% Annual Escalation</span>
                        <span>·</span>
                        <span>Alternate Term: {FORMAT_CURRENCY(selectedTerm === 60 ? matchedPrinter.rental_36mo_0esc : matchedPrinter.rental_60mo_0esc)}/mo ({selectedTerm === 60 ? '36m' : '60m'})</span>
                      </div>
                    </div>

                    <div className="sm:text-right border-t sm:border-t-0 border-chrome/10 pt-2 sm:pt-0">
                      <div className="font-mono text-[10px] uppercase tracking-widest text-chrome/45">
                        Outright Hardware Cash
                      </div>
                      <div className="font-mono text-sm font-semibold text-white mt-0.5">
                        {FORMAT_CURRENCY(matchedPrinter.final_hardware_price || matchedPrinter.monthly_rental * 36)}
                        <span className="text-[10px] text-chrome/40 font-normal"> ex VAT</span>
                      </div>
                      <div className="font-mono text-[9px] text-emerald-400/80 mt-0.5">
                        KAGO Factor: {selectedTerm === 60 ? matchedPrinter.kago_factor_60 : matchedPrinter.kago_factor_36}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                  <button
                    type="button"
                    onClick={() => onRequestQuote(matchedPrinter.model)}
                    className="group inline-flex flex-1 items-center justify-center gap-2 border border-primary bg-primary px-5 py-3 font-heading text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-primary/90 cursor-pointer"
                  >
                    Request a quote for this model
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => generateBase44PrinterBrochurePdf(matchedPrinter)}
                    className="inline-flex items-center justify-center gap-2 border border-primary/50 bg-[#07090c] px-4 py-3 font-heading text-xs font-bold uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-white cursor-pointer"
                  >
                    <FileDown className="h-4 w-4" />
                    Brochure (PDF)
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center justify-center gap-2 border border-chrome/30 px-4 py-3 font-heading text-xs font-bold uppercase tracking-widest text-chrome/80 transition-colors hover:border-chrome/60 hover:text-white cursor-pointer"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Start over
                  </button>
                </div>

                {/* Alternative Recommendation if available */}
                {alternativePrinter && (
                  <div className="mt-5 border-t border-chrome/10 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-chrome/50">
                        Alternative Option to Consider:
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const temp = matchedPrinter;
                          setMatchedPrinter(alternativePrinter);
                          setAlternativePrinter(temp);
                        }}
                        className="font-mono text-[10px] uppercase tracking-wider text-primary hover:underline cursor-pointer"
                      >
                        Compare this model →
                      </button>
                    </div>
                    <div className="mt-2 flex items-center justify-between bg-[#07090c] border border-chrome/15 p-2.5">
                      <div className="flex items-center gap-2.5">
                        {alternativePrinter.image_url && (
                          <img
                            src={alternativePrinter.image_url}
                            alt={alternativePrinter.model}
                            className="h-9 w-9 object-contain bg-[#0a0c0e] p-1 border border-chrome/10"
                          />
                        )}
                        <div>
                          <div className="font-heading text-xs font-bold text-white uppercase">
                            {alternativePrinter.model}
                          </div>
                          <div className="font-mono text-[10px] text-chrome/55">
                            {alternativePrinter.speed_ppm} PPM · {alternativePrinter.format} · {alternativePrinter.colour === 'colour' ? 'Colour' : 'Mono'}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-xs font-bold text-primary">
                          {FORMAT_CURRENCY(alternativePrinter.monthly_rental)}/mo
                        </div>
                        <div className="font-mono text-[9px] text-chrome/45">
                          {(alternativePrinter.duty_cycle / 1000).toFixed(0)}k duty
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : stepIndex === QUESTIONS.length && !matchedPrinter ? (
              /* No Match Fallback */
              <div className="border border-warning/40 bg-warning/5 p-6 text-center">
                <p className="font-heading text-lg font-bold uppercase tracking-wide text-white">
                  Custom Fleet Configuration Needed
                </p>
                <p className="mt-2 text-xs text-chrome/65">
                  We couldn't match a standard model to that exact combination. Our Toshiba solutions team will engineer a tailored proposal for your requirements.
                </p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => onRequestQuote()}
                    className="flex-1 border border-primary bg-primary px-5 py-3 font-heading text-xs font-bold uppercase tracking-widest text-white hover:bg-primary/90"
                  >
                    Request custom recommendation
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center justify-center gap-2 border border-chrome/30 px-5 py-3 font-heading text-xs font-bold uppercase tracking-widest text-chrome/80 hover:text-white"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Start over
                  </button>
                </div>
              </div>
            ) : (
              /* 4-Step Questionnaire */
              <div className="border border-chrome/20 bg-[#0c1015] p-6 sm:p-7">
                {/* Step indicators */}
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {currentQ && <currentQ.Icon className="h-4 w-4 text-primary" />}
                    <span className="font-mono text-[10px] uppercase tracking-widest text-chrome/55">
                      Question {stepIndex + 1} of {QUESTIONS.length}
                    </span>
                  </div>
                  <div className="flex gap-1.5">
                    {QUESTIONS.map((_, idx) => (
                      <span
                        key={idx}
                        className={`h-1.5 w-6 transition-colors ${
                          idx <= stepIndex ? 'bg-primary' : 'bg-chrome/20'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Question title and subheading */}
                <div>
                  <h2 className="font-heading text-xl font-bold uppercase tracking-tight text-white sm:text-2xl">
                    {currentQ?.title}
                  </h2>
                  <p className="mt-1 text-xs text-chrome/60">
                    {currentQ?.subheading}
                  </p>
                </div>

                {/* Options List */}
                <div className="mt-5 grid gap-2.5">
                  {currentQ?.options.map((opt) => {
                    const isActive = answers[currentQ.key] === opt.id;
                    const IconComp = currentQ.Icon;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleSelectOption(currentQ.key, opt.id)}
                        className={`group relative flex w-full items-center gap-3.5 border p-3.5 text-left transition-all cursor-pointer ${
                          isActive
                            ? 'border-primary bg-primary/10'
                            : 'border-chrome/20 hover:border-chrome/50 hover:bg-chrome/5'
                        }`}
                      >
                        <div className={`p-2 border shrink-0 ${isActive ? 'border-primary/50 bg-primary/20 text-primary' : 'border-chrome/20 bg-[#07090c] text-chrome/60 group-hover:text-white'}`}>
                          <IconComp className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-heading text-sm sm:text-base font-bold uppercase tracking-wide text-white">
                              {opt.label}
                            </span>
                            {opt.badge && (
                              <span className="hidden sm:inline-block border border-chrome/20 bg-[#07090c] px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-chrome/60">
                                {opt.badge}
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-chrome/55 mt-0.5 line-clamp-1">{opt.sub}</div>
                        </div>
                        {isActive && (
                          <Check className="ml-auto h-5 w-5 shrink-0 text-primary" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Navigation Back & Reset buttons */}
                <div className="mt-5 pt-3 border-t border-chrome/10 flex items-center justify-between">
                  {stepIndex > 0 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-chrome/60 hover:text-white transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      Previous question
                    </button>
                  ) : (
                    <span className="font-mono text-[10px] text-chrome/40 uppercase tracking-widest">
                      Step 1 of 4
                    </span>
                  )}

                  {stepIndex > 0 && (
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-chrome/50 hover:text-primary transition-colors cursor-pointer"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      Reset
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator Bar: Arrow Scroll that Lights Up */}
      <div className="col-span-1 lg:col-span-2 border-t border-chrome/15 bg-gradient-to-r from-[#07090c] via-[#0d1117] to-[#07090c] px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 select-none">
        <div className="flex items-center gap-3">
          <div className="relative flex h-2.5 w-2.5">
            <span
              className={`absolute inline-flex h-full w-full rounded-full bg-primary ${
                isHeroScrolling ? 'animate-ping opacity-90' : 'opacity-40'
              }`}
            />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
          </div>
          <span className="font-mono text-[11px] uppercase tracking-widest text-chrome/60">
            {isHeroScrolling ? (
              <span className="text-white font-bold tracking-wider text-primary">
                // SCROLL ACTIVE · ARROW LIGHT ILLUMINATED
              </span>
            ) : (
              '// DIRECT GAUTENG FLEET · SCROLL DOWN TO EXPLORE'
            )}
          </span>
        </div>

        {/* The Arrow Scroll Button that Lights Up */}
        <button
          type="button"
          onClick={() => {
            const el = document.getElementById('fleet');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          className={`group flex items-center gap-3 px-5 py-2 rounded-full border transition-all duration-300 cursor-pointer ${
            isHeroScrolling
              ? 'border-primary bg-[#1f0a0e] text-white shadow-[0_0_22px_rgba(243,13,34,0.85)] scale-105'
              : 'border-chrome/20 bg-[#0e1218] text-chrome/80 hover:border-primary hover:text-white hover:shadow-[0_0_18px_rgba(243,13,34,0.6)]'
          }`}
        >
          <span className="font-heading text-xs font-bold uppercase tracking-wider">
            Scroll To 21 Models
          </span>
          <div className="flex items-center -space-x-1">
            <ChevronDown
              className={`h-4 w-4 transition-all duration-200 ${
                isHeroScrolling
                  ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.9)] animate-chevron-1'
                  : 'text-primary animate-chevron-1'
              }`}
            />
            <ChevronDown
              className={`h-4 w-4 transition-all duration-200 -ml-2.5 ${
                isHeroScrolling
                  ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.9)] animate-chevron-2'
                  : 'text-primary/70 animate-chevron-2'
              }`}
            />
            <ChevronDown
              className={`h-4 w-4 transition-all duration-200 -ml-2.5 ${
                isHeroScrolling
                  ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.9)] animate-chevron-3'
                  : 'text-primary/40 animate-chevron-3'
              }`}
            />
          </div>
        </button>

        <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] text-chrome/40 uppercase tracking-widest">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span>Live Stock · Sandton &amp; Gauteng Fast Delivery</span>
        </div>
      </div>
    </section>
  );
};

