import React, { useState } from 'react';
import { MessageSquare, Phone, CheckCircle2, Send, Check } from 'lucide-react';
import { saveLead } from '../utils/leadsStorage';
import { QuoteLead } from '../types';

interface QuoteSectionProps {
  initialService?: string;
  initialPrinterModel?: string;
}

export const QuoteSection: React.FC<QuoteSectionProps> = ({
  initialService,
  initialPrinterModel,
}) => {
  const needOptions = [
    'Printer rental',
    'Outright purchase',
    'Service & Toner Plan',
    'Maintenance & repairs',
    'Print software / PaperCut',
    'Toner & consumables',
    'Not sure yet, advise me',
  ];

  const [selectedNeeds, setSelectedNeeds] = useState<string[]>(
    initialService ? [initialService] : ['Printer rental']
  );
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(
    initialPrinterModel ? `Enquiring specifically about ${initialPrinterModel}.` : ''
  );
  const [submitted, setSubmitted] = useState(false);

  const toggleNeed = (item: string) => {
    if (selectedNeeds.includes(item)) {
      setSelectedNeeds(selectedNeeds.filter((n) => n !== item));
    } else {
      setSelectedNeeds([...selectedNeeds, item]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const needsString = selectedNeeds.length > 0 ? selectedNeeds.join(', ') : 'Not specified';

    // WhatsApp pre-filled text
    const textLines = [
      `*New Enquiry — Toshiba SA*`,
      ``,
      `*Name:* ${name}`,
      company ? `*Company:* ${company}` : null,
      `*Email:* ${email}`,
      `*Phone:* ${phone}`,
      `*Needs:* ${needsString}`,
      initialPrinterModel ? `*Model:* ${initialPrinterModel}` : null,
      message ? `*Message:* ${message}` : null,
    ].filter(Boolean);

    const waUrl = `https://wa.me/27786792279?text=${encodeURIComponent(textLines.join('\n'))}`;

    // Save lead record in background
    try {
      const newLead: QuoteLead = {
        id: `TSA-${Date.now().toString().slice(-6)}`,
        fullName: name,
        companyName: company || 'Self-employed / Direct',
        email,
        phone,
        location: 'Gauteng, South Africa',
        modelId: initialPrinterModel || 'general_enquiry',
        modelName: initialPrinterModel || (selectedNeeds.join(' & ') || 'General Enquiry'),
        monthlyRental36ZAR: null,
        monthlyRental60ZAR: null,
        outrightPriceZAR: null,
        financeOption: 'rental_36',
        estimatedVolume: 'Unspecified',
        message: `${needsString}. Notes: ${message}`,
        status: 'new',
        source: 'quote_form_whatsapp',
        createdAt: new Date().toISOString(),
      };
      await saveLead(newLead);
    } catch (err) {
      console.error('Lead save error:', err);
    }

    // Open WhatsApp
    window.open(waUrl, '_blank');
    setSubmitted(true);
  };

  return (
    <section id="contact" className="bg-[#090b10] text-white py-16 md:py-24 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-12 gap-12 items-start">
        {/* Left Column: Direct Contact & Guarantees */}
        <div className="md:col-span-5">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-rose-500 font-bold mb-2.5">
            // Direct dispatch inquiry
          </p>
          <h2 className="text-3xl sm:text-4xl font-black font-heading uppercase text-white tracking-tight mb-4">
            Fast Official Quote · Within 60 Minutes
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mb-6 leading-relaxed">
            No endless broker runaround. A Toshiba Head Office technician and specialist from our Ferndale hub will review your monthly workload and provide a binding written quotation with exact per-page SLA rates.
          </p>

          {/* Direct Technical Contacts Card */}
          <div className="p-4 rounded-2xl bg-[#05070a] border border-slate-800/80 mb-6 space-y-2 font-mono text-xs">
            <div className="text-slate-500 uppercase text-[10px] tracking-wider font-bold">
              Direct Specialist Line
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-white font-bold">Juan Le Roux</span>
              <a href="tel:0783076569" className="text-rose-400 font-bold hover:underline">
                078 307 6569
              </a>
            </div>
            <div className="flex items-baseline justify-between text-slate-400 text-[11px]">
              <span>Email:</span>
              <a href="mailto:juanlr@toshiba-sa.co.za" className="text-slate-300 hover:text-white">
                juanlr@toshiba-sa.co.za
              </a>
            </div>
            <div className="flex items-baseline justify-between text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
              <span>Switchboard:</span>
              <a href="tel:0117964828" className="text-slate-300 hover:text-white">
                011 796 4828
              </a>
            </div>
          </div>

          <ul className="space-y-3 mb-8">
            {[
              'Guaranteed response in under 60 minutes during business hours',
              'R0 upfront deposit operating leases (36 or 60 months)',
              'Includes toner, proactive maintenance & 4–8h Gauteng SLA',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3">
            <a
              href="https://wa.me/27783076569"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-[#25D366] hover:bg-[#1db954] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer font-heading uppercase tracking-wider"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Direct WhatsApp Juan</span>
            </a>

            <a
              href="tel:0783076569"
              className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-[#0b0e14] hover:bg-slate-900 text-white font-semibold text-xs sm:text-sm border border-slate-800 transition-all cursor-pointer font-mono"
            >
              <Phone className="w-4 h-4 text-rose-500" />
              <span>Call Juan: 078 307 6569</span>
            </a>
          </div>
        </div>

        {/* Right Column: Quote Form */}
        <div className="md:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col gap-4 shadow-xl"
          >
            <h3 className="text-xl font-bold text-white mb-1">
              Tell us what you print.
            </h3>

            {submitted && (
              <div className="p-4 bg-emerald-950/60 border border-emerald-800/80 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Thank you! WhatsApp has been opened with your enquiry pre-filled.</span>
              </div>
            )}

            {/* Name & Company */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="quote-name" className="text-slate-300 text-xs font-semibold">
                  Name *
                </label>
                <input
                  id="quote-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Smith"
                  className="h-10 w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-rose-500 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="quote-company" className="text-slate-300 text-xs font-semibold">
                  Company
                </label>
                <input
                  id="quote-company"
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Acme Ltd."
                  className="h-10 w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-rose-500 transition-colors"
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="quote-email" className="text-slate-300 text-xs font-semibold">
                  Email *
                </label>
                <input
                  id="quote-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@gmail.com"
                  className="h-10 w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-rose-500 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="quote-phone" className="text-slate-300 text-xs font-semibold">
                  Phone *
                </label>
                <input
                  id="quote-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="011 000 0000"
                  className="h-10 w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-rose-500 transition-colors"
                />
              </div>
            </div>

            {/* What do you need? */}
            <div>
              <label className="text-slate-300 text-xs font-semibold mb-2 block">
                What do you need?
              </label>
              <div className="flex flex-wrap gap-2">
                {needOptions.map((opt) => {
                  const isSelected = selectedNeeds.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => toggleNeed(opt)}
                      className={`text-xs px-3.5 py-1.5 rounded-full border cursor-pointer transition-all font-medium ${
                        isSelected
                          ? 'bg-rose-600 border-rose-600 text-white shadow-sm'
                          : 'border-slate-700 bg-slate-950/40 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="quote-message" className="text-slate-300 text-xs font-semibold">
                Message (optional)
              </label>
              <textarea
                id="quote-message"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your printing needs..."
                className="w-full rounded-xl border border-slate-700 bg-slate-950/60 p-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-rose-500 transition-colors resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1db954] text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Send via WhatsApp</span>
            </button>

            <p className="text-[11px] text-slate-500 text-center">
              Your details will open pre-filled in WhatsApp.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};
