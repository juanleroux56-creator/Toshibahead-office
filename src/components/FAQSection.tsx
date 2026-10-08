import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does printer rental work?',
      a: 'You pay a fixed monthly amount over a 36-month or 60-month term. This covers the machine, delivery, installation and warranty. With our Service & Toner Plan, toner, parts and servicing are billed on what you actually print — so there are no surprise costs.',
    },
    {
      q: 'Can we buy a printer outright instead of renting?',
      a: 'Yes. All our Toshiba and Duplo machines are available for outright purchase. We deliver, install and train your staff, and you can still take up the Service & Toner Plan for ongoing maintenance and consumables.',
    },
    {
      q: 'What is the Service & Toner Plan?',
      a: "It's our pay-per-print agreement. We monitor your toner levels automatically and courier cartridges before you run out. Certified technicians handle all servicing, repairs and parts. You only pay for the pages you print, with no minimums and no hidden fees.",
    },
    {
      q: 'How quickly can you deliver and install?',
      a: 'Most standard installations in Gauteng happen within 48 business hours. We deliver, connect to your network, install drivers on all staff computers and provide hands-on training before leaving.',
    },
    {
      q: 'What happens if the printer breaks down?',
      a: 'Our Gauteng-based certified technicians respond onsite within 4–8 business hours. If a machine cannot be repaired on the day, we arrange a loan unit so your office never stops printing.',
    },
    {
      q: 'What areas do you cover?',
      a: 'We cover the whole of Gauteng — Johannesburg, Pretoria, Midrand, Centurion, East Rand and West Rand — with direct technician dispatch. We also support clients nationwide through partner networks.',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 md:py-24 max-w-4xl mx-auto px-4 md:px-8 w-full border-t border-slate-800">
      <div className="text-center mb-12">
        <p className="text-xs font-bold text-rose-500 uppercase tracking-widest mb-2.5">
          Frequently Asked Questions
        </p>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Everything You Need to Know
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-2">
          Clear answers about renting, purchasing, toner plans, and Gauteng delivery.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={faq.q}
              className="border border-slate-800 rounded-2xl bg-slate-900/60 overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between p-5 text-left text-white font-bold text-base cursor-pointer hover:text-rose-400 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 ml-4 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-rose-500' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
