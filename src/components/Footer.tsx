import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Lock, 
  Sparkles, 
  Grid, 
  FileText, 
  MessageSquare,
  Terminal,
  Activity
} from 'lucide-react';
import { AppView } from '../App';

interface FooterProps {
  setActiveView: (view: AppView) => void;
  onOpenAdminModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveView,
  onOpenAdminModal,
}) => {
  return (
    <footer className="bg-[#030508] border-t border-red-950/80 text-white pt-12 pb-8 relative overflow-hidden font-mono">
      {/* Giant Toshiba Logo Background Watermark */}
      <div className="absolute right-0 bottom-0 select-none pointer-events-none opacity-[0.02] text-[180px] font-black text-white font-heading leading-none">
        TOSHIBA
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        <div className="grid md:grid-cols-12 gap-8">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-red-600 text-white font-black text-2xl tracking-tighter px-3.5 py-1 rounded shadow-red-glow font-heading">
                TOSHIBA
              </div>
              <span className="text-xl font-black font-heading tracking-tight text-white uppercase">
                COMMAND // GAUTENG
              </span>
            </div>
            
            <p className="text-xs text-slate-400 font-sans leading-relaxed max-w-sm">
              Authorized enterprise office multifunction printer rentals, managed print services, and rapid 2–4 hour on-site technician dispatch across Gauteng.
            </p>

            <div className="pt-2 flex items-center space-x-3 text-xs">
              <span className="flex items-center gap-1.5 text-red-500 font-bold">
                <ShieldCheck className="w-4 h-4 text-red-500" />
                <span>[SLA: 2–4H ON-SITE RESPONSE]</span>
              </span>
            </div>
          </div>

          {/* Quick Command Links */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-black uppercase text-red-500 tracking-wider">
              [COMMAND_SYSTEMS]
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => setActiveView('matcher')}
                  className="hover:text-red-400 transition-colors cursor-pointer"
                >
                  &gt; 01. Precision Printer Matcher
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('catalog')}
                  className="hover:text-red-400 transition-colors cursor-pointer"
                >
                  &gt; 02. Full e-STUDIO Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('quote')}
                  className="hover:text-red-400 transition-colors cursor-pointer"
                >
                  &gt; 03. Formal Proposal Desk
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('service')}
                  className="hover:text-red-400 transition-colors cursor-pointer"
                >
                  &gt; 04. Gauteng Rental SLA Matrix
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('faq')}
                  className="hover:text-red-400 transition-colors cursor-pointer"
                >
                  &gt; 05. Technical Knowledge FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Technical Contacts */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-xs font-black uppercase text-red-500 tracking-wider">
              [DISPATCH_CONTACTS]
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <a href="tel:0117964828" className="font-bold hover:text-white">
                  011 796 4828 // Office Hotline
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a 
                  href="https://wa.me/27117964828" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-bold text-emerald-400 hover:underline"
                >
                  WhatsApp Direct Inquiry (011 796 4828)
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <a href="mailto:juanlr@toshiba-sa.co.za" className="hover:text-white">
                  juanlr@toshiba-sa.co.za (Juan Le Roux)
                </a>
              </li>
              <li className="flex items-start space-x-2 text-slate-400 text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                <span>Johannesburg • Pretoria • Sandton • Midrand • East &amp; West Rand</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-900 flex flex-wrap justify-between items-center text-[10px] text-slate-500 gap-4">
          <div>
            &copy; {new Date().getFullYear()} TOSHIBA HEAD OFFICE // ALL HARDWARE SPECIFICATIONS RESERVED.
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={onOpenAdminModal}
              className="flex items-center space-x-1 text-slate-600 hover:text-red-400 transition-colors cursor-pointer"
            >
              <Lock className="w-3 h-3" />
              <span>ADMIN_PORTAL</span>
            </button>
            <span>POPIA &amp; GDPR COMPLIANT</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
