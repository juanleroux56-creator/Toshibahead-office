import React, { useState, useEffect } from 'react';
import { PrinterModel, QuoteLead, FinanceOption } from '../types';
import { TOSHIBA_CATALOG, GAUTENG_LOCATIONS } from '../data/printerCatalog';
import { saveLead } from '../utils/leadsStorage';
import { generateSingleModelPdf } from '../utils/pdfGenerator';
import { PrinterImage } from './PrinterImage';
import { 
  FileText, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Phone, 
  Mail, 
  Download, 
  Sparkles, 
  ArrowLeft,
  Building,
  User,
  MapPin,
  MessageSquare,
  Terminal,
  Clock
} from 'lucide-react';

interface QuoteFormProps {
  selectedModel: PrinterModel | null;
  onBrowseCatalog: () => void;
  onLeadSubmitted: (lead: QuoteLead) => void;
}

export const QuoteForm: React.FC<QuoteFormProps> = ({
  selectedModel,
  onBrowseCatalog,
  onLeadSubmitted,
}) => {
  const [modelId, setModelId] = useState<string>(selectedModel ? selectedModel.id : TOSHIBA_CATALOG[2].id);
  const [fullName, setFullName] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [location, setLocation] = useState<string>(GAUTENG_LOCATIONS[0]);
  const [financeOption, setFinanceOption] = useState<FinanceOption>('rental_36');
  const [estimatedVolume, setEstimatedVolume] = useState<string>('8,000–45,000 pages/mo');
  const [message, setMessage] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedLead, setSubmittedLead] = useState<QuoteLead | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedModel) {
      setModelId(selectedModel.id);
    }
  }, [selectedModel]);

  const currentModel = TOSHIBA_CATALOG.find(p => p.id === modelId) || TOSHIBA_CATALOG[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Basic Validation
    if (!fullName.trim() || !companyName.trim() || !email.trim() || !phone.trim()) {
      setValidationError('Please complete all required fields: Full Name, Company, Email, and Phone Number.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setValidationError('Please provide a valid business email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const newLead = await saveLead({
        fullName: fullName.trim(),
        companyName: companyName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        location,
        modelId: currentModel.id,
        modelName: currentModel.name,
        monthlyRental36ZAR: currentModel.rental36moZAR ?? null,
        monthlyRental60ZAR: currentModel.rental60moZAR ?? null,
        outrightPriceZAR: currentModel.outrightPriceZAR ?? null,
        financeOption,
        estimatedVolume,
        message: message.trim(),
        source: selectedModel ? 'matcher_prefill' : 'direct_quote_form',
      });

      setSubmittedLead(newLead);
      onLeadSubmitted(newLead);
    } catch (err) {
      console.error('Error saving quote lead:', err);
      setValidationError('An unexpected error occurred while saving your request. Please try again or call 011 796 4828.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Quotation Command Banner with Toshiba Watermark */}
      <div className="bg-[#090d16] border border-red-950/80 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-hud-glow">
        {/* Giant Toshiba Logo Background */}
        <div className="absolute right-0 bottom-0 select-none pointer-events-none opacity-[0.03] text-9xl font-black text-white font-heading">
          TOSHIBA
        </div>

        <div className="relative z-10 space-y-4 max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-red-950/90 border border-red-800/80 px-3 py-1 rounded-full text-red-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Terminal className="w-3.5 h-3.5 text-red-500" />
            <span>[SYS.QUOTATION // DIRECT GAUTENG PROPOSAL DESK]</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight uppercase leading-tight">
            OFFICIAL RENTAL PROPOSAL CONSOLE
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
            Receive a formal, tax-compliant PDF proposal within 2 business hours. Includes machine serial reservation, full maintenance SLA, delivery, and installation across Gauteng.
          </p>

          <div className="flex items-center space-x-4 pt-2 font-mono text-xs text-slate-400">
            <div className="flex items-center gap-1.5 text-red-400 font-bold">
              <Clock className="w-3.5 h-3.5" />
              <span>[2-HOUR SLA TURNAROUND]</span>
            </div>
            <span className="text-slate-800">|</span>
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>[100% INCLUSIVE MAINTENANCE]</span>
            </div>
          </div>
        </div>
      </div>

      {/* SUBMISSION CONFIRMATION VIEW */}
      {submittedLead ? (
        <div className="bg-[#090c13] border-2 border-emerald-500/80 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl font-mono animate-fadeIn">
          <div className="w-16 h-16 bg-emerald-950/80 border border-emerald-600 rounded-full flex items-center justify-center mx-auto text-emerald-400 shadow-md">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs text-emerald-400 font-bold uppercase">[TRANSMISSION_CONFIRMED]</span>
            <h2 className="text-2xl sm:text-3xl font-black font-heading text-white uppercase">
              QUOTE REQUEST #{submittedLead.id} LOGGED
            </h2>
            <p className="text-xs text-slate-300 font-sans max-w-md mx-auto">
              Thank you, <strong className="text-white">{submittedLead.fullName}</strong>. Juan Le Roux will compile your tailored proposal for <strong className="text-white">{submittedLead.modelName}</strong> and email it to <strong className="text-white">{submittedLead.email}</strong>.
            </p>
          </div>

          {/* Lead Summary Card */}
          <div className="bg-[#04060a] border border-slate-800 rounded-2xl p-5 text-left text-xs max-w-lg mx-auto space-y-2">
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-500">[COMPANY]:</span>
              <span className="font-bold text-white">{submittedLead.companyName}</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-500">[LOCATION]:</span>
              <span className="font-bold text-white">{submittedLead.location}</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-500">[EQUIPMENT]:</span>
              <span className="font-bold text-red-400">{submittedLead.modelName}</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-500">[STRUCTURE]:</span>
              <span className="font-bold text-white uppercase">{submittedLead.financeOption.replace('_', ' ')}</span>
            </div>
            <div className="flex justify-between pt-1 text-[11px] text-slate-500">
              <span>[TIMESTAMP]:</span>
              <span>{new Date(submittedLead.createdAt).toLocaleString()}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4 font-mono text-xs">
            <button
              onClick={() => generateSingleModelPdf(currentModel)}
              className="py-3 px-5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-xl font-bold flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-red-500" />
              <span>DOWNLOAD {currentModel?.modelNumber || 'e-STUDIO'} SPEC SHEET</span>
            </button>

            <button
              onClick={() => {
                setSubmittedLead(null);
                setFullName('');
                setCompanyName('');
                setEmail('');
                setPhone('');
                setMessage('');
              }}
              className="py-3 px-5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-black shadow-red-glow cursor-pointer uppercase"
            >
              SUBMIT ANOTHER INQUIRY
            </button>
          </div>
        </div>
      ) : (
        /* ACTIVE QUOTE SUBMISSION FORM */
        <form onSubmit={handleSubmit} className="bg-[#090c13] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 font-mono">
          
          {/* Error Message */}
          {validationError && (
            <div className="bg-red-950/80 border border-red-800 p-4 rounded-xl text-xs text-red-300 font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>{validationError}</span>
            </div>
          )}

          {/* SECTION 1: HARDWARE SELECTION */}
          <div className="space-y-4">
            <div className="flex justify-between items-baseline border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-red-500 uppercase tracking-wider">[SECTION_01 // HARDWARE TARGET]</span>
              <button
                type="button"
                onClick={onBrowseCatalog}
                className="text-[11px] text-slate-400 hover:text-red-400 font-bold cursor-pointer"
              >
                [BROWSE_ALL_MODELS]
              </button>
            </div>

            <div className="grid md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-8">
                <label className="block text-xs font-bold text-slate-300 mb-1 uppercase">
                  Selected Toshiba Copier Model *
                </label>
                <select
                  value={modelId}
                  onChange={(e) => setModelId(e.target.value)}
                  className="w-full py-2.5 px-3 text-xs bg-[#04060a] border border-slate-800 rounded-xl focus:outline-none focus:border-red-600 text-slate-200 cursor-pointer uppercase font-bold"
                >
                  {TOSHIBA_CATALOG.map(p => (
                    <option key={p.id} value={p.id} className="bg-[#090c13]">
                      {p.name} — {p.format} {p.category === 'color' ? 'Colour' : 'Mono'} ({p.speedText})
                    </option>
                  ))}
                </select>
              </div>

              {/* Hardware Preview Chip */}
              <div className="md:col-span-4 bg-[#04060a] border border-slate-800 p-3 rounded-xl flex items-center space-x-3">
                <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center p-1 border border-slate-800 shrink-0">
                  <PrinterImage printer={currentModel} maxHeightClass="max-h-[38px]" />
                </div>
                <div className="text-[11px] leading-tight overflow-hidden">
                  <strong className="text-white block truncate">{currentModel?.modelNumber || 'e-STUDIO'}</strong>
                  <span className="text-red-400 block font-bold">
                    {currentModel?.rental36moZAR ? `R${currentModel.rental36moZAR}/mo (36m)` : 'Custom quote'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: CONTACT INFORMATION */}
          <div className="space-y-4">
            <span className="text-xs font-bold text-red-500 uppercase tracking-wider block border-b border-slate-800 pb-2">
              [SECTION_02 // CLIENT DETAILS & GAUTENG LOCATION]
            </span>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1 uppercase">
                  Full Contact Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Michael van der Merwe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full py-2.5 px-3 text-xs bg-[#04060a] border border-slate-800 rounded-xl focus:outline-none focus:border-red-600 text-slate-100 placeholder:text-slate-600 font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1 uppercase">
                  Company / Organization Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Legal Solutions Pty Ltd"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full py-2.5 px-3 text-xs bg-[#04060a] border border-slate-800 rounded-xl focus:outline-none focus:border-red-600 text-slate-100 placeholder:text-slate-600 font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1 uppercase">
                  Work Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="michael@apexlegal.co.za"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-2.5 px-3 text-xs bg-[#04060a] border border-slate-800 rounded-xl focus:outline-none focus:border-red-600 text-slate-100 placeholder:text-slate-600 font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1 uppercase">
                  Contact Telephone / Mobile *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="011 555 0192 or 082 123 4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full py-2.5 px-3 text-xs bg-[#04060a] border border-slate-800 rounded-xl focus:outline-none focus:border-red-600 text-slate-100 placeholder:text-slate-600 font-sans"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-300 mb-1 uppercase">
                  Gauteng Metro Location / Installation Hub *
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full py-2.5 px-3 text-xs bg-[#04060a] border border-slate-800 rounded-xl focus:outline-none focus:border-red-600 text-slate-200 cursor-pointer uppercase font-bold"
                >
                  {GAUTENG_LOCATIONS.map(loc => (
                    <option key={loc} value={loc} className="bg-[#090c13]">
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* SECTION 3: FINANCE STRUCTURE */}
          <div className="space-y-4">
            <span className="text-xs font-bold text-red-500 uppercase tracking-wider block border-b border-slate-800 pb-2">
              [SECTION_03 // FINANCE & OPERATING PREFERENCE]
            </span>

            <div className="grid sm:grid-cols-3 gap-3">
              <label className={`p-4 rounded-xl border cursor-pointer text-left transition-all ${
                financeOption === 'rental_36' 
                  ? 'bg-red-950/60 border-red-600 text-white' 
                  : 'bg-[#04060a] border-slate-800 text-slate-400 hover:border-slate-700'
              }`}>
                <input
                  type="radio"
                  name="finance"
                  value="rental_36"
                  checked={financeOption === 'rental_36'}
                  onChange={() => setFinanceOption('rental_36')}
                  className="sr-only"
                />
                <span className="text-xs font-bold block text-white uppercase">[36-MO RENTAL]</span>
                <span className="text-[11px] block text-red-400 font-bold mt-1">
                  {currentModel.rental36moZAR ? `R${currentModel.rental36moZAR.toLocaleString()}/mo` : 'Quote only'}
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">Faster upgrade cycle</span>
              </label>

              <label className={`p-4 rounded-xl border cursor-pointer text-left transition-all ${
                financeOption === 'rental_60' 
                  ? 'bg-red-950/60 border-red-600 text-white' 
                  : 'bg-[#04060a] border-slate-800 text-slate-400 hover:border-slate-700'
              }`}>
                <input
                  type="radio"
                  name="finance"
                  value="rental_60"
                  checked={financeOption === 'rental_60'}
                  onChange={() => setFinanceOption('rental_60')}
                  className="sr-only"
                />
                <span className="text-xs font-bold block text-white uppercase">[60-MO RENTAL]</span>
                <span className="text-[11px] block text-emerald-400 font-bold mt-1">
                  {currentModel.rental60moZAR ? `R${currentModel.rental60moZAR.toLocaleString()}/mo` : 'Quote only'}
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">Lowest monthly OPEX</span>
              </label>

              <label className={`p-4 rounded-xl border cursor-pointer text-left transition-all ${
                financeOption === 'purchase' 
                  ? 'bg-red-950/60 border-red-600 text-white' 
                  : 'bg-[#04060a] border-slate-800 text-slate-400 hover:border-slate-700'
              }`}>
                <input
                  type="radio"
                  name="finance"
                  value="purchase"
                  checked={financeOption === 'purchase'}
                  onChange={() => setFinanceOption('purchase')}
                  className="sr-only"
                />
                <span className="text-xs font-bold block text-white uppercase">[OUTRIGHT BUY]</span>
                <span className="text-[11px] block text-slate-300 font-bold mt-1">
                  {currentModel.outrightPriceZAR ? `R${currentModel.outrightPriceZAR.toLocaleString()} ex VAT` : 'Quote only'}
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">Direct equipment asset</span>
              </label>
            </div>
          </div>

          {/* SECTION 4: OPTIONAL NOTES */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-300 uppercase">
              Specific Accessories or Workload Notes (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Need additional paper cassette drawers, staple finisher, or secure cloud scan setup..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full py-2.5 px-3 text-xs bg-[#04060a] border border-slate-800 rounded-xl focus:outline-none focus:border-red-600 text-slate-100 placeholder:text-slate-600 font-sans"
            />
          </div>

          {/* SUBMIT BUTTON */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 bg-red-600 hover:bg-red-700 disabled:bg-slate-800 text-white rounded-2xl font-black text-sm shadow-red-glow transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
            >
              {isSubmitting ? (
                <>
                  <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>TRANSMITTING INQUIRY TO GAUTENG DESK...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>GENERATE &amp; TRANSMIT OFFICIAL PROPOSAL INQUIRY</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
