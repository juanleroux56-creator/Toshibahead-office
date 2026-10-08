import React from 'react';
import { Phone, MessageSquare, FileText } from 'lucide-react';

interface MobileActionBarProps {
  onQuoteClick: () => void;
  phoneNumber?: string;
  whatsappNumber?: string;
}

export const MobileActionBar: React.FC<MobileActionBarProps> = ({
  onQuoteClick,
  phoneNumber = '0117964828',
  whatsappNumber = '27786792279',
}) => {
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hello Toshiba Team, I am browsing your copier rentals on mobile and would like a quick quote.'
  )}`;

  return (
    <aside
      aria-label="Mobile quick actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#080a0e]/95 backdrop-blur-lg border-t border-slate-800/90 px-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-2xl flex items-center justify-between gap-2"
    >
      {/* Call Button */}
      <a
        href={`tel:${phoneNumber}`}
        className="flex-1 min-h-[44px] py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 active:bg-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
      >
        <Phone className="w-3.5 h-3.5 text-rose-500 shrink-0" />
        <span>011 796 4828</span>
      </a>

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 min-h-[44px] py-2 px-3 rounded-xl bg-[#25D366] hover:bg-[#1db954] text-white active:opacity-90 text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition-colors"
      >
        <MessageSquare className="w-3.5 h-3.5 fill-white shrink-0" />
        <span>WhatsApp</span>
      </a>

      {/* Quote Form Trigger */}
      <button
        onClick={onQuoteClick}
        className="flex-1 min-h-[44px] py-2 px-3 rounded-xl bg-rose-600 active:bg-rose-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition-colors cursor-pointer"
      >
        <FileText className="w-3.5 h-3.5 shrink-0" />
        <span>Get Quote</span>
      </button>
    </aside>
  );
};
