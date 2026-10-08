import React, { useState, useEffect } from 'react';
import {
  User,
  Building2,
  Mail,
  Phone,
  Printer,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  Loader2,
  ExternalLink,
  Send,
  MessageCircle,
  FileDown,
  Copy,
  Check,
  AlertTriangle,
} from 'lucide-react';
import {
  Base44Printer,
  QUOTE_BG_IMAGE,
} from '../data/base44Printers';
import { saveLead } from '../utils/leadsStorage';
import { generateBase44PrinterBrochurePdf } from '../utils/pdfGenerator';

interface Base44QuoteSectionProps {
  model: string;
  printers: Base44Printer[];
  onSubmitLead?: (lead: any) => Promise<void> | void;
}

const inputClass =
  'w-full border border-chrome/20 bg-[#07090c] px-4 py-3 text-sm text-white placeholder:text-chrome/40 outline-none transition-colors focus:border-primary';

export const Base44QuoteSection: React.FC<Base44QuoteSectionProps> = ({
  model,
  printers,
  onSubmitLead,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    model: '',
    message: '',
  });
  const [financeOption, setFinanceOption] = useState<'rental_60' | 'rental_36' | 'cash'>('rental_60'); // Always start with 60 0% escalation
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedLeadId, setSubmittedLeadId] = useState<string>('');
  const [emailStatus, setEmailStatus] = useState<'sent' | 'pending'>('sent');
  const [needsActivation, setNeedsActivation] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (model) {
      setFormData((prev) => ({ ...prev, model }));
    }
  }, [model]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const selectedPrinter = printers.find((p) => p.model === formData.model);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMessage('Name, email and phone number are required.');
      return;
    }

    setSubmitting(true);
    try {
      // 1. Save lead to Firestore and local persistent storage
      const saved = await saveLead({
        fullName: formData.name.trim(),
        companyName: formData.company.trim() || 'Private / Office Client',
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        location: 'Gauteng',
        modelId: formData.model ? formData.model.toLowerCase().replace(/\s+/g, '-') : 'general-inquiry',
        modelName: formData.model || 'Toshiba Head Office Fleet Recommendation',
        monthlyRental36ZAR: selectedPrinter?.rental_36mo_0esc ?? null,
        monthlyRental60ZAR: selectedPrinter?.rental_60mo_0esc ?? selectedPrinter?.monthly_rental ?? null,
        outrightPriceZAR: selectedPrinter?.final_hardware_price ?? selectedPrinter?.base_hardware_price ?? null,
        financeOption: financeOption === 'rental_60' ? 'rental_60' : financeOption === 'rental_36' ? 'rental_36' : 'purchase',
        estimatedVolume: selectedPrinter ? `${(selectedPrinter.duty_cycle / 1000).toFixed(0)}k pages/mo` : 'Standard office volume',
        message: formData.message.trim() || 'Direct website quote inquiry',
        source: formData.model ? 'interactive_matcher' : 'quote_terminal',
      });

      setSubmittedLeadId(saved.id);

      // 2. Transmit real email notification via FormSubmit AJAX to BOTH addresses
      const financeLabel =
        financeOption === 'rental_60'
          ? `60 Months Rental (0% Escalation) @ R${(selectedPrinter?.rental_60mo_0esc || 0).toLocaleString('en-ZA')}/mo ex VAT`
          : financeOption === 'rental_36'
          ? `36 Months Rental (0% Escalation) @ R${(selectedPrinter?.rental_36mo_0esc || 0).toLocaleString('en-ZA')}/mo ex VAT`
          : `Outright Cash Purchase @ R${(selectedPrinter?.final_hardware_price || 0).toLocaleString('en-ZA')} ex VAT`;

      const emailPayload = {
        _subject: `[Toshiba Head Office Quote #${saved.id}] ${formData.company || formData.name} - ${formData.model || 'General Fleet Inquiry'} (${financeOption === 'rental_60' ? '60m' : financeOption === 'rental_36' ? '36m' : 'Cash'})`,
        _replyto: formData.email,
        Reference_ID: saved.id,
        Customer_Name: formData.name,
        Company: formData.company || 'Private / Office Client',
        Phone: formData.phone,
        Email: formData.email,
        Model_Requested: formData.model || 'Recommendation requested',
        Finance_Option: financeLabel,
        Rate_Band: selectedPrinter?.kago_band ? `KAGO Band ${selectedPrinter.kago_band}` : 'Standard',
        Requirements_or_Message: formData.message || 'No additional notes',
        Date_Submitted: new Date().toLocaleString('en-ZA'),
      };

      try {
        let activationRequired = false;

        const results = await Promise.allSettled([
          fetch('https://formsubmit.co/ajax/juanlr@toshiba-sa.co.za', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({ ...emailPayload, _cc: 'juanleroux56@gmail.com' }),
          }),
          fetch('https://formsubmit.co/ajax/juanleroux56@gmail.com', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify(emailPayload),
          }),
        ]);

        for (const res of results) {
          if (res.status === 'fulfilled') {
            try {
              const data = await res.value.json();
              if (
                data.message?.toLowerCase().includes('activation') ||
                data.message?.toLowerCase().includes('activate') ||
                data.success === 'false'
              ) {
                activationRequired = true;
              }
            } catch {
              // ignore parse errors
            }
          }
        }

        setNeedsActivation(activationRequired);
        setEmailStatus('sent');
      } catch (mailErr) {
        console.warn('FormSubmit background notification fallback:', mailErr);
      }

      // 3. Inform parent handler if configured
      if (onSubmitLead) {
        await onSubmitLead(saved);
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error('Quote submission error:', err);
      setErrorMessage(
        err?.message || 'Something went wrong. Please call Juan directly on 078 307 6569.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setSubmitted(false);
    setSubmittedLeadId('');
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      model: '',
      message: '',
    });
  };

  // Pre-formatted links for guaranteed delivery
  const whatsappMessage = encodeURIComponent(
    `Hi Juan, I just submitted a quote request on the Toshiba Head Office website:\n\n*Reference:* ${submittedLeadId || 'New Inquiry'}\n*Name:* ${formData.name}\n*Company:* ${formData.company || 'N/A'}\n*Phone:* ${formData.phone}\n*Email:* ${formData.email}\n*Model of interest:* ${formData.model || 'General recommendation'}\n*Requirements:* ${formData.message || 'Please send written quote and SLA options.'}`
  );

  const mailtoHref = `mailto:juanlr@toshiba-sa.co.za?cc=juanleroux56@gmail.com&subject=${encodeURIComponent(
    `[Toshiba Head Office Quote #${submittedLeadId || 'Inquiry'}] ${formData.company || formData.name} - ${formData.model || 'Printer Quote'}`
  )}&body=${encodeURIComponent(
    `Hi Juan,\n\nI have submitted a printer quote inquiry for Toshiba Head Office.\n\nMy Details:\n- Name: ${formData.name}\n- Company: ${formData.company || 'N/A'}\n- Phone: ${formData.phone}\n- Email: ${formData.email}\n- Model of interest: ${formData.model || 'General recommendation'}\n- Workload / Requirements: ${formData.message || 'Please provide pricing & per-page copy rate'}\n\nPlease reply with an official quotation and availability.\n\nKind regards,\n${formData.name}`
  )}`;

  return (
    <section id="quote" className="scroll-mt-20 px-5 py-16 lg:px-8 bg-[#0a0c0e]">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
            // Transaction terminal
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
            Get your quote
          </h2>
        </div>

        {/* Submitted Success View */}
        {submitted ? (
          <div className="mx-auto max-w-3xl border border-primary/40 bg-primary/5 p-8 text-center sm:p-12">
            <div className="mx-auto flex h-14 w-14 items-center justify-center border border-primary bg-primary/10">
              <CheckCircle2 className="h-7 w-7 text-primary" />
            </div>
            
            <span className="mt-4 inline-block font-mono text-xs uppercase tracking-widest text-primary font-semibold">
              Ref: {submittedLeadId} · Logged to Cloud
            </span>

            <h3 className="mt-2 font-heading text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">
              Quote request transmitted
            </h3>
            
            <p className="mt-3 text-sm leading-relaxed text-chrome/80 max-w-xl mx-auto">
              Thanks <span className="text-white font-semibold">{formData.name}</span>. Your requirements have been saved to the Toshiba Head Office database and notifications have been dispatched to <span className="text-primary font-mono">juanlr@toshiba-sa.co.za</span> &amp; <span className="text-primary font-mono">juanleroux56@gmail.com</span>.
            </p>

            {/* Verification & Transmission Badges */}
            <div className="mt-6 flex flex-wrap justify-center gap-2 max-w-xl mx-auto font-mono text-[11px]">
              <span className="inline-flex items-center gap-1.5 border border-primary/40 bg-primary/10 px-3 py-1 text-primary">
                <CheckCircle2 className="h-3 w-3" /> Database Record Created
              </span>
              <span className="inline-flex items-center gap-1.5 border border-primary/40 bg-primary/10 px-3 py-1 text-primary">
                <Mail className="h-3 w-3" /> Notification Dispatched
              </span>
              <span className="inline-flex items-center gap-1.5 border border-chrome/20 bg-[#07090c] px-3 py-1 text-chrome/70">
                2-Hour SLA Response
              </span>
            </div>

            {/* Activation Notice Alert */}
            <div className="mt-6 border border-amber-500/40 bg-amber-500/10 p-4 text-left max-w-xl mx-auto">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 shrink-0 text-amber-400 mt-0.5" />
                <div className="text-xs text-amber-200/90 leading-relaxed">
                  <div className="font-heading font-bold uppercase tracking-wider text-amber-300 text-[11px]">
                    Note on FormSubmit Email Delivery:
                  </div>
                  <p className="mt-1">
                    If this is your first time receiving quotes, FormSubmit sends a <strong>one-time activation email</strong>. Check your inbox or Spam folder at <strong className="text-white">juanleroux56@gmail.com</strong> and <strong className="text-white">juanlr@toshiba-sa.co.za</strong> for an email titled <em>"Action Required: Confirm your form"</em> and click <strong>"Activate Form"</strong> to allow instant forwarding.
                  </p>
                  <p className="mt-2 text-amber-200/75">
                    You can also use the <strong>"Open in Email Client"</strong> button below to send this quote directly from Outlook or Gmail with zero reliance on mail relays.
                  </p>
                </div>
              </div>
            </div>

            {/* Download Brochure for Selected Model */}
            {selectedPrinter && (
              <div className="mt-5 border border-primary/30 bg-[#07090c] p-4 max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
                <div className="flex items-center gap-3">
                  {selectedPrinter.image_url && (
                    <img
                      src={selectedPrinter.image_url}
                      alt={selectedPrinter.model}
                      className="h-12 w-12 object-contain bg-[#0a0c0e] border border-chrome/15 p-1 shrink-0"
                    />
                  )}
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-primary">
                      Equipment Brochure Available
                    </div>
                    <div className="font-heading text-sm font-bold text-white uppercase">
                      {selectedPrinter.model}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => generateBase44PrinterBrochurePdf(selectedPrinter)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-primary bg-primary/20 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer"
                >
                  <FileDown className="h-4 w-4" />
                  Download Brochure (PDF)
                </button>
              </div>
            )}

            {/* Instant Direct Transmission Options */}
            <div className="mt-6 border border-chrome/15 bg-[#07090c]/90 p-5 text-left max-w-xl mx-auto">
              <div className="font-mono text-[10px] uppercase tracking-widest text-chrome/50 mb-3">
                // Direct Transmission &amp; Backup
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <a
                  href={`https://wa.me/27783076569?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-emerald-500/50 bg-emerald-500/10 px-4 py-3 font-heading text-xs font-bold uppercase tracking-widest text-emerald-400 transition-colors hover:bg-emerald-500/20"
                >
                  <MessageCircle className="h-4 w-4" />
                  Instant WhatsApp to Juan
                </a>

                <a
                  href={mailtoHref}
                  className="inline-flex items-center justify-center gap-2 border border-chrome/30 bg-[#0c1015] px-4 py-3 font-heading text-xs font-bold uppercase tracking-widest text-white transition-colors hover:border-primary hover:text-primary"
                >
                  <Send className="h-4 w-4" />
                  Open in Email Client
                </a>
              </div>

              {/* Copy summary button */}
              <div className="mt-3 pt-3 border-t border-chrome/10 flex items-center justify-between">
                <span className="font-mono text-[10px] text-chrome/50">
                  Lead Ref: {submittedLeadId}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const text = `Toshiba Head Office Quote #${submittedLeadId}\nName: ${formData.name}\nCompany: ${formData.company || 'N/A'}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nModel: ${formData.model || 'Recommendation'}\nMessage: ${formData.message || 'N/A'}`;
                    navigator.clipboard.writeText(text);
                    setCopiedSummary(true);
                    setTimeout(() => setCopiedSummary(false), 3000);
                  }}
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-chrome/70 hover:text-white transition-colors cursor-pointer"
                >
                  {copiedSummary ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied to clipboard</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Inquiry Summary</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Direct Specialist Contacts */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3 text-sm text-chrome/70 sm:flex-row">
              <a
                href="tel:0783076569"
                className="inline-flex items-center gap-2 font-mono transition-colors hover:text-primary"
              >
                <Phone className="h-4 w-4 text-primary" />
                <span>078 307 6569</span>
              </a>
              <span className="hidden text-chrome/30 sm:inline">·</span>
              <a
                href="mailto:juanlr@toshiba-sa.co.za"
                className="inline-flex items-center gap-2 font-mono transition-colors hover:text-primary"
              >
                <Mail className="h-4 w-4 text-primary" />
                <span>juanlr@toshiba-sa.co.za</span>
              </a>
            </div>

            <button
              type="button"
              onClick={handleResetForm}
              className="mt-8 border border-chrome/30 px-5 py-2.5 font-heading text-[11px] font-bold uppercase tracking-widest text-chrome/80 transition-colors hover:border-chrome/60 hover:text-white"
            >
              Submit another request
            </button>
          </div>
        ) : (
          /* Split Quote Card */
          <div className="grid grid-cols-1 border border-chrome/15 bg-[#0c1015] lg:grid-cols-5">
            {/* Left Side (The Brief & Specialist info) */}
            <div
              className="relative flex flex-col justify-between border-b border-chrome/15 p-8 lg:col-span-2 lg:border-b-0 lg:border-r lg:p-10"
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(10, 12, 14, 0.88), rgba(10, 12, 14, 0.96)), url(${QUOTE_BG_IMAGE})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
                  // The brief
                </p>
                <h3 className="mt-2 font-heading text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">
                  Request your quote
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-chrome/70">
                  Tell us what you need. We'll confirm stock, pricing, and setup — no call-centre,
                  no pressure.
                </p>

                {formData.model && (
                  <div className="mt-6 border border-primary/40 bg-primary/10 p-4">
                    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-primary">
                      <Printer className="h-3.5 w-3.5" />
                      Model selected
                    </div>
                    <div className="mt-1 font-heading text-lg font-bold uppercase tracking-tight text-white">
                      {formData.model}
                    </div>
                    <p className="mt-1 text-xs text-chrome/60">
                      Editable in the form if you'd like a different model.
                    </p>
                  </div>
                )}
              </div>

              {/* Specialist Contact Block */}
              <div className="mt-8 border-t border-chrome/15 pt-6">
                <div className="font-mono text-[10px] uppercase tracking-widest text-chrome/50">
                  Direct line · Juan
                </div>
                <a
                  href="tel:0783076569"
                  className="mt-1 flex items-center gap-2 font-mono text-lg text-white transition-colors hover:text-primary"
                >
                  <Phone className="h-4 w-4 text-primary" />
                  078 307 6569
                </a>
                <a
                  href="mailto:juanlr@toshiba-sa.co.za"
                  className="mt-1 flex items-center gap-2 font-mono text-sm text-chrome/80 transition-colors hover:text-primary"
                >
                  <Mail className="h-4 w-4 text-primary" />
                  juanlr@toshiba-sa.co.za
                </a>
              </div>
            </div>

            {/* Right Side (Form Terminal) */}
            <form onSubmit={handleSubmit} className="p-8 lg:col-span-3 lg:p-10">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Full name */}
                <label className="block">
                  <span className="mb-1.5 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-chrome/55">
                    <User className="h-3 w-3 text-primary/70" />
                    Full name *
                  </span>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Jane Molefe"
                    className={inputClass}
                  />
                </label>

                {/* Company */}
                <label className="block">
                  <span className="mb-1.5 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-chrome/55">
                    <Building2 className="h-3 w-3 text-primary/70" />
                    Company
                  </span>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleChange('company', e.target.value)}
                    placeholder="Acme Logistics (Pty) Ltd"
                    className={inputClass}
                  />
                </label>

                {/* Email */}
                <label className="block">
                  <span className="mb-1.5 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-chrome/55">
                    <Mail className="h-3 w-3 text-primary/70" />
                    Work email *
                  </span>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="jane@acme.co.za"
                    className={inputClass}
                  />
                </label>

                {/* Phone */}
                <label className="block">
                  <span className="mb-1.5 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-chrome/55">
                    <Phone className="h-3 w-3 text-primary/70" />
                    Phone number *
                  </span>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="082 123 4567"
                    className={inputClass}
                  />
                </label>

                {/* Model selection */}
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-chrome/55">
                    <Printer className="h-3 w-3 text-primary/70" />
                    Printer model of interest
                  </span>
                  <select
                    value={formData.model}
                    onChange={(e) => handleChange('model', e.target.value)}
                    className={`${inputClass} bg-[#07090c] text-white`}
                  >
                    <option value="" className="bg-[#0c1015] text-chrome/60">
                      Select a model (or leave open for recommendation)
                    </option>
                    {printers.map((p) => (
                      <option key={p.id} value={p.model} className="bg-[#0c1015] text-white">
                        {p.model} · {p.format} · {p.colour} · 60m: R{(p.rental_60mo_0esc || p.monthly_rental).toLocaleString('en-ZA')}/mo · 36m: R{(p.rental_36mo_0esc || 0).toLocaleString('en-ZA')}/mo
                      </option>
                    ))}
                  </select>
                </label>

                {/* Finance / Agreement Option (Always start with 60 0% escalation) */}
                <div className="sm:col-span-2">
                  <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-chrome/55">
                    Agreement / Finance Option (0% Escalation)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setFinanceOption('rental_60')}
                      className={`p-3 border text-left transition-colors cursor-pointer ${
                        financeOption === 'rental_60'
                          ? 'border-primary bg-primary/10 text-white'
                          : 'border-chrome/20 bg-[#07090c] text-chrome/60 hover:border-chrome/40 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] font-bold uppercase tracking-wider">
                          60-Month Rental
                        </span>
                        {financeOption === 'rental_60' && (
                          <span className="bg-primary text-white text-[9px] font-mono px-1.5 py-0.2">Default</span>
                        )}
                      </div>
                      <div className="font-mono text-xs text-primary font-bold mt-1">
                        {selectedPrinter
                          ? `R${(selectedPrinter.rental_60mo_0esc || selectedPrinter.monthly_rental).toLocaleString('en-ZA')} /mo`
                          : 'Calculated from price'}
                      </div>
                      <div className="font-mono text-[9px] text-chrome/40 mt-0.5">
                        0% Escalation {selectedPrinter ? `· Factor ${selectedPrinter.kago_factor_60}` : ''}
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFinanceOption('rental_36')}
                      className={`p-3 border text-left transition-colors cursor-pointer ${
                        financeOption === 'rental_36'
                          ? 'border-primary bg-primary/10 text-white'
                          : 'border-chrome/20 bg-[#07090c] text-chrome/60 hover:border-chrome/40 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] font-bold uppercase tracking-wider">
                          36-Month Rental
                        </span>
                      </div>
                      <div className="font-mono text-xs text-primary font-bold mt-1">
                        {selectedPrinter
                          ? `R${(selectedPrinter.rental_36mo_0esc || Math.round(selectedPrinter.monthly_rental * 1.35)).toLocaleString('en-ZA')} /mo`
                          : 'Calculated from price'}
                      </div>
                      <div className="font-mono text-[9px] text-chrome/40 mt-0.5">
                        0% Escalation {selectedPrinter ? `· Factor ${selectedPrinter.kago_factor_36}` : ''}
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFinanceOption('cash')}
                      className={`p-3 border text-left transition-colors cursor-pointer ${
                        financeOption === 'cash'
                          ? 'border-primary bg-primary/10 text-white'
                          : 'border-chrome/20 bg-[#07090c] text-chrome/60 hover:border-chrome/40 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] font-bold uppercase tracking-wider">
                          Cash Purchase
                        </span>
                      </div>
                      <div className="font-mono text-xs text-white font-bold mt-1">
                        {selectedPrinter
                          ? `R${(selectedPrinter.final_hardware_price || selectedPrinter.monthly_rental * 36).toLocaleString('en-ZA')}`
                          : 'Wholesale + Markup'}
                      </div>
                      <div className="font-mono text-[9px] text-emerald-400/80 mt-0.5">
                        Includes TP-Link Wireless (R2,195) · ex VAT
                      </div>
                    </button>
                  </div>
                </div>

                {/* Message */}
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-chrome/55">
                    <MessageSquare className="h-3 w-3 text-primary/70" />
                    Workload details or requirements
                  </span>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="Approximate monthly print volume, number of users, staple finisher requirements, or suburb in Gauteng..."
                    className={inputClass}
                  />
                </label>
              </div>

              {/* Error state */}
              {errorMessage && (
                <div className="mt-4 border border-destructive/40 bg-destructive/10 px-4 py-3 font-mono text-xs text-destructive">
                  {errorMessage}
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={submitting}
                className="group mt-6 inline-flex w-full items-center justify-center gap-2 border border-primary bg-primary px-6 py-4 font-heading text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-primary/90 disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending request…
                  </>
                ) : (
                  <>
                    Send quote request
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};
