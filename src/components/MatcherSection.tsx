import React, { useState } from 'react';
import { ToshibaPrinter, TOSHIBA_PRINTERS } from '../data/toshibaPrinters';
import { RotateCcw, Printer, ArrowRight, Check, Sparkles } from 'lucide-react';

interface MatcherSectionProps {
  onSelectPrinter: (printer: ToshibaPrinter) => void;
}

export const MatcherSection: React.FC<MatcherSectionProps> = ({ onSelectPrinter }) => {
  const [step, setStep] = useState<'colour' | 'format' | 'volume' | 'result'>('colour');
  const [selectedColour, setSelectedColour] = useState<'colour' | 'mono' | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<'A4' | 'A3' | null>(null);
  const [selectedVolume, setSelectedVolume] = useState<'low' | 'medium' | 'high' | null>(null);
  const [matches, setMatches] = useState<ToshibaPrinter[]>([]);

  const handleReset = () => {
    setStep('colour');
    setSelectedColour(null);
    setSelectedFormat(null);
    setSelectedVolume(null);
    setMatches([]);
  };

  const handleSelectColour = (val: 'colour' | 'mono') => {
    setSelectedColour(val);
    setStep('format');
  };

  const handleSelectFormat = (val: 'A4' | 'A3') => {
    setSelectedFormat(val);
    setStep('volume');
  };

  const handleSelectVolume = (val: 'low' | 'medium' | 'high') => {
    setSelectedVolume(val);

    // Matching Algorithm
    const minSpeed = val === 'low' ? 0 : val === 'medium' ? 25 : 45;
    const maxSpeed = val === 'low' ? 30 : val === 'medium' ? 50 : 999;

    const filtered = TOSHIBA_PRINTERS.filter((p) => {
      const matchCat = p.category === selectedColour;
      const matchFormat = selectedFormat === 'A4' ? true : p.format === 'A3';
      const matchSpeed = p.speed >= minSpeed && p.speed <= maxSpeed;
      return matchCat && matchFormat && matchSpeed;
    })
      .sort((a, b) => a.speed - b.speed)
      .slice(0, 3);

    // Fallback if no strict match
    const finalResults =
      filtered.length > 0
        ? filtered
        : TOSHIBA_PRINTERS.filter((p) => p.category === selectedColour).slice(0, 2);

    setMatches(finalResults);
    setStep('result');
  };

  return (
    <section id="matcher" className="py-16 md:py-24 max-w-7xl mx-auto px-4 md:px-8 w-full border-t border-slate-800">
      <div className="grid md:grid-cols-12 gap-12 items-start">
        {/* Left Side: Pitch and steps explanation */}
        <div className="md:col-span-5">
          <p className="text-xs font-bold text-rose-500 uppercase tracking-widest mb-2.5">
            Find Your Match
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
            Which printer fits your office?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mb-8 leading-relaxed">
            Answer three short questions. We'll match you to the smallest Toshiba model that fits your colour preference, paper size, and monthly volume — then you can view specs or request a quote.
          </p>

          <ul className="space-y-4">
            {[
              { step: '1', text: 'Colour or mono?' },
              { step: '2', text: 'A3 or A4 paper size?' },
              { step: '3', text: 'Monthly print volume?' },
            ].map(({ step: num, text }) => (
              <li key={num} className="flex items-center gap-3.5 text-sm text-slate-300">
                <span className="w-7 h-7 rounded-full bg-rose-600/20 border border-rose-500/40 text-rose-400 text-xs font-bold flex items-center justify-center shrink-0">
                  {num}
                </span>
                <span className="font-medium">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side: Interactive Card Wizard */}
        <div className="md:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          {/* Card header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
            <div>
              <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                {step === 'colour' && 'Step 1 of 3'}
                {step === 'format' && 'Step 2 of 3'}
                {step === 'volume' && 'Step 3 of 3'}
                {step === 'result' && 'Your Match'}
              </p>
              <h3 className="text-base font-bold text-white mt-0.5">
                Printer Matcher
              </h3>
            </div>

            {step !== 'colour' && (
              <button
                onClick={handleReset}
                className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Step 1: Colour vs Mono */}
          {step === 'colour' && (
            <div>
              <p className="font-bold text-white text-base mb-4">
                1. Colour or mono?
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    value: 'colour' as const,
                    label: 'Colour',
                    desc: 'Marketing, client proposals, branded documents',
                  },
                  {
                    value: 'mono' as const,
                    label: 'Mono',
                    desc: 'Contracts, invoices, high-volume black & white',
                  },
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => handleSelectColour(item.value)}
                    className="border border-slate-800 bg-slate-950/60 hover:border-rose-600 hover:bg-rose-950/20 rounded-2xl p-5 text-left transition-all cursor-pointer group"
                  >
                    <p className="font-bold text-white text-base group-hover:text-rose-400 transition-colors">
                      {item.label}
                    </p>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Format */}
          {step === 'format' && (
            <div>
              <p className="font-bold text-white text-base mb-4">
                2. Paper size needed?
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    value: 'A4' as const,
                    label: 'A4 only',
                    desc: 'Standard letter-size documents & desktop footprints',
                  },
                  {
                    value: 'A3' as const,
                    label: 'A3 & A4',
                    desc: 'Drawings, spreadsheets, floorplans, large brochures',
                  },
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => handleSelectFormat(item.value)}
                    className="border border-slate-800 bg-slate-950/60 hover:border-rose-600 hover:bg-rose-950/20 rounded-2xl p-5 text-left transition-all cursor-pointer group"
                  >
                    <p className="font-bold text-white text-base group-hover:text-rose-400 transition-colors">
                      {item.label}
                    </p>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Volume */}
          {step === 'volume' && (
            <div>
              <p className="font-bold text-white text-base mb-4">
                3. Monthly print volume?
              </p>
              <div className="flex flex-col gap-3">
                {[
                  {
                    value: 'low' as const,
                    label: 'Low (under 2,000 pages)',
                    desc: 'Small office, boutique practice, occasional printing',
                  },
                  {
                    value: 'medium' as const,
                    label: 'Medium (2,000–10,000)',
                    desc: 'Regular busy office, medical centre or legal department',
                  },
                  {
                    value: 'high' as const,
                    label: 'High (10,000+ pages)',
                    desc: 'High-volume production, school or commercial document centre',
                  },
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => handleSelectVolume(item.value)}
                    className="border border-slate-800 bg-slate-950/60 hover:border-rose-600 hover:bg-rose-950/20 rounded-2xl p-4 sm:p-5 text-left transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div>
                      <p className="font-bold text-white text-sm sm:text-base group-hover:text-rose-400 transition-colors">
                        {item.label}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        {item.desc}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-rose-400 transition-colors shrink-0 ml-3" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Result View */}
          {step === 'result' && (
            <div>
              <p className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-rose-500" />
                <span>Your best matches — smallest model first:</span>
              </p>

              <div className="flex flex-col gap-3.5">
                {matches.map((printer, index) => (
                  <div
                    key={printer.id}
                    className={`border rounded-2xl p-4 sm:p-5 transition-all ${
                      index === 0
                        ? 'border-rose-600/70 bg-rose-950/20 shadow-md shadow-rose-950/30'
                        : 'border-slate-800 bg-slate-950/60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-rose-600/20 text-rose-400">
                          <Printer className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-white text-sm sm:text-base">
                              {printer.model}
                            </h4>
                            {index === 0 && (
                              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-rose-600 text-white">
                                Best fit
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-slate-400">
                            {printer.format} · {printer.category === 'colour' ? 'Colour' : 'Mono'}
                          </span>
                        </div>
                      </div>

                      <span className="text-xs font-bold text-slate-300 bg-slate-800 px-2.5 py-1 rounded-lg shrink-0">
                        {printer.speed} PPM
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                      {printer.tagline}
                    </p>

                    <div className="mt-4 flex items-center gap-2.5">
                      <button
                        onClick={() => onSelectPrinter(printer)}
                        className="text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
                      >
                        View Specs & Quote
                      </button>

                      <a
                        href="#contact"
                        className="text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-3.5 py-2 rounded-lg transition-colors"
                      >
                        Get Quote
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
