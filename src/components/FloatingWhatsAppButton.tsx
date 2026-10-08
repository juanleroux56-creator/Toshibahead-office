import React, { useState } from 'react';
import { MessageSquare, X, Send, Phone, Clock, ShieldCheck, Sparkles, ChevronRight } from 'lucide-react';

interface FloatingWhatsAppButtonProps {
  phoneNumber?: string; // e.g. "27786792279"
  salesContactName?: string;
  className?: string;
}

export const FloatingWhatsAppButton: React.FC<FloatingWhatsAppButtonProps> = ({
  phoneNumber = '27786792279',
  salesContactName = 'Toshiba Head Office Desk',
  className = 'bottom-6 right-4 sm:bottom-6 sm:right-6',
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState<number>(0);
  const [customMessage, setCustomMessage] = useState<string>('');

  const quickTemplates = [
    {
      title: 'Request Copier Rental Quote',
      message: 'Hi Juan & Toshiba Sales Team, I would like to request an official 36/60-month rental quote for an office copier in Gauteng.',
    },
    {
      title: 'Compare A4 vs A3 Models',
      message: 'Hi Toshiba Team, I need guidance choosing between A4 desktop and A3 floor-standing e-STUDIO multifunction printers for our workload.',
    },
    {
      title: 'Gauteng 2-4h SLA & Service Inquiry',
      message: 'Hi Juan, I would like to verify your 2-4 hour on-site service SLA and toner replenishment contract for our office location.',
    },
  ];

  const handleOpenWhatsApp = (textToUse?: string) => {
    const text = textToUse || customMessage || quickTemplates[selectedTemplateIndex].message;
    const encodedText = encodeURIComponent(text.trim());
    const url = `https://wa.me/${phoneNumber}?text=${encodedText}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`fixed z-50 font-mono select-none ${className}`}>
      {/* Pop-up Interactive Quick-Chat Card */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-[#090d16] border-2 border-emerald-500/80 rounded-3xl shadow-2xl shadow-emerald-950/60 overflow-hidden animate-fadeIn text-slate-100">
          {/* Header Bar */}
          <div className="bg-gradient-to-r from-emerald-950 via-[#071310] to-[#04060a] p-4 border-b border-emerald-900/80 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white shadow-md font-bold text-sm">
                  TSA
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#090d16] rounded-full animate-pulse" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-xs font-black text-white font-heading uppercase tracking-wide">
                    TOSHIBA DIRECT SALES
                  </span>
                  <span className="text-[9px] bg-emerald-950 text-emerald-300 border border-emerald-700/80 px-1.5 py-0.2 rounded font-bold">
                    ONLINE
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-sans truncate max-w-[190px]">
                  {salesContactName}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white bg-slate-900/80 hover:bg-slate-800 rounded-xl border border-slate-700 transition-colors cursor-pointer"
              title="Close chat card"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body with Info & Message Template Options */}
          <div className="p-4 space-y-3 bg-[#06080d]/90 max-h-[360px] overflow-y-auto">
            {/* Status Telemetry Banner */}
            <div className="bg-[#030508] border border-emerald-900/40 p-2.5 rounded-xl text-[11px] flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span>[TYPICAL RESPONSE: &lt;15 MINS]</span>
              </span>
              <span className="text-slate-500">[GAUTENG DESK]</span>
            </div>

            {/* Prompt */}
            <div className="text-xs text-slate-400 font-sans">
              Select a pre-filled inquiry template or type your message to open a direct WhatsApp session:
            </div>

            {/* Quick Templates List */}
            <div className="space-y-2">
              {quickTemplates.map((template, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedTemplateIndex(idx);
                    setCustomMessage('');
                  }}
                  className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all cursor-pointer flex items-start justify-between gap-2 ${
                    selectedTemplateIndex === idx && !customMessage
                      ? 'bg-emerald-950/70 border-emerald-500 text-white shadow-inner'
                      : 'bg-[#090d16] border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-[11px] block uppercase text-emerald-400">
                      &gt; {template.title}
                    </span>
                    <p className="text-[11px] text-slate-400 font-sans line-clamp-2 leading-relaxed">
                      &ldquo;{template.message}&rdquo;
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 shrink-0 mt-1" />
                </button>
              ))}
            </div>

            {/* Optional Custom Message Textarea */}
            <div className="space-y-1 pt-1">
              <label className="text-[10px] uppercase font-bold text-slate-400">
                Or Customize Your Message:
              </label>
              <textarea
                rows={2}
                placeholder="Type your message or model questions here..."
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="w-full p-2 text-xs bg-[#04060a] border border-slate-800 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 font-sans"
              />
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-3 bg-[#04060a] border-t border-slate-800 flex items-center justify-between gap-2">
            <a
              href="tel:0117964828"
              className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl text-xs font-bold border border-slate-700 flex items-center gap-1"
              title="Call Office Hotline"
            >
              <Phone className="w-3 h-3 text-red-500" />
              <span>011 796 4828</span>
            </a>

            <button
              onClick={() => handleOpenWhatsApp()}
              className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-900/50 flex items-center justify-center gap-1.5 transition-all cursor-pointer uppercase tracking-wider"
            >
              <Send className="w-3.5 h-3.5" />
              <span>START WHATSAPP CHAT</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Small WhatsApp Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat with Toshiba Sales on WhatsApp"
        title="Chat with Toshiba Sales on WhatsApp"
        className="group relative flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xl shadow-emerald-950/70 border border-emerald-400/60 hover:scale-110 active:scale-95 transition-all cursor-pointer"
      >
        {/* WhatsApp Brand SVG */}
        <svg
          className="h-6 w-6 sm:h-7 sm:w-7 fill-current text-white drop-shadow-sm transition-transform group-hover:scale-105"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.031 2C6.514 2 2.029 6.486 2.029 12.004c0 1.838.502 3.56 1.378 5.04L2 22l5.12-1.343a9.96 9.96 0 0 0 4.911 1.289c5.518 0 10.003-4.487 10.003-10.004 0-5.518-4.485-10.004-10.003-10.004zm5.845 14.167c-.244.686-1.42 1.314-1.956 1.365-.512.05-1.181.077-1.905-.152-.44-.14-1.008-.328-1.748-.65-3.088-1.34-5.1-4.46-5.254-4.667-.156-.207-1.258-1.674-1.258-3.193 0-1.518.795-2.266 1.077-2.576.283-.31.618-.388.824-.388.206 0 .412.002.593.01.19.01.446-.072.698.533.26.623.886 2.164.963 2.322.078.158.13.344.026.55-.104.207-.156.335-.31.515-.155.18-.327.403-.467.54-.155.153-.316.32-.136.63.18.31.8 1.32 1.716 2.136 1.178 1.05 2.17 1.375 2.48 1.528.31.154.49.13.673-.078.18-.207.774-.903.98-1.213.207-.31.413-.258.697-.155.284.103 1.804.85 2.113 1.005.31.155.516.232.593.361.077.13.077.749-.167 1.435z" />
        </svg>

        {/* Online Indicator Badge */}
        <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400 border-2 border-[#090d16]" />
        </span>
      </button>
    </div>
  );
};
