import React, { useState, useRef } from 'react';
import { Base44TopTicker } from './components/Base44TopTicker';
import { Base44Header } from './components/Base44Header';
import { Base44HeroMatcher } from './components/Base44HeroMatcher';
import { Base44FleetGallery } from './components/Base44FleetGallery';
import { Base44AboutSection } from './components/Base44AboutSection';
import { Base44QuoteSection } from './components/Base44QuoteSection';
import { Base44Footer } from './components/Base44Footer';
import { PrinterSpecsModal } from './components/PrinterSpecsModal';
import { AdminLeadsModal } from './components/AdminLeadsModal';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';
import { FloatingScrollArrow } from './components/FloatingScrollArrow';
import { BASE44_PRINTERS, Base44Printer } from './data/base44Printers';
import { AppView } from './types';

export type { AppView };

export default function App() {
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [specsPrinter, setSpecsPrinter] = useState<Base44Printer | null>(null);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const quoteSectionRef = useRef<HTMLDivElement | null>(null);

  const handleRequestQuote = (modelName?: string) => {
    setSelectedModel(modelName || '');
    requestAnimationFrame(() => {
      const quoteEl = document.getElementById('quote');
      if (quoteEl) {
        quoteEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  const handleLeadSubmission = (leadData: any) => {
    console.log('[Lead Received]', leadData);
  };

  return (
    <div id="top" className="relative min-h-screen bg-[#0a0c0e] text-[#f5f5f7] selection:bg-[#f30d22] selection:text-white">
      {/* Giant 26vw Background Watermark matching Base44 */}
      <div className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center overflow-hidden">
        <span className="select-none font-heading text-[26vw] font-bold uppercase leading-none tracking-tighter text-white/[0.025]">
          Toshiba
        </span>
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Top Ticker GN */}
        <Base44TopTicker />

        {/* Precision Sticky Header XN */}
        <Base44Header onRequestQuote={() => handleRequestQuote('')} />

        <main className="flex-1">
          {/* Hero Section & Diagnostic Engine $M + BM */}
          <Base44HeroMatcher
            printers={BASE44_PRINTERS}
            onRequestQuote={handleRequestQuote}
          />

          {/* Full Fleet Gallery HM + WM */}
          <Base44FleetGallery
            printers={BASE44_PRINTERS}
            onRequestQuote={handleRequestQuote}
            onViewSpecs={(printer) => setSpecsPrinter(printer)}
          />

          {/* About Us & Gauteng Success Stories Testimonial Slider */}
          <Base44AboutSection onRequestQuote={handleRequestQuote} />

          {/* Transaction Terminal / Quote Section QM */}
          <div ref={quoteSectionRef}>
            <Base44QuoteSection
              model={selectedModel}
              printers={BASE44_PRINTERS}
              onSubmitLead={handleLeadSubmission}
            />
          </div>
        </main>

        {/* Technical Footer */}
        <Base44Footer onOpenAdmin={() => setIsAdminModalOpen(true)} />

        {/* Direct WhatsApp Quick Chat with Juan */}
        <FloatingWhatsAppButton phoneNumber="27783076569" />

        {/* Light-Up Floating Scroll Arrow Indicator */}
        <FloatingScrollArrow />

        {/* Technical Specs Modal */}
        <PrinterSpecsModal
          printer={specsPrinter}
          onClose={() => setSpecsPrinter(null)}
          onRequestQuote={handleRequestQuote}
        />

        {/* CRM Leads Desk Modal (PIN: 1234) */}
        {isAdminModalOpen && (
          <AdminLeadsModal onClose={() => setIsAdminModalOpen(false)} />
        )}
      </div>
    </div>
  );
}

