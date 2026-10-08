import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  Sparkles, 
  Grid, 
  FileText, 
  MapPin, 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
  Menu, 
  X, 
  MessageSquare,
  HelpCircle,
  Activity,
  Terminal
} from 'lucide-react';
import { AppView } from '../App';

interface HeaderProps {
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  onOpenAdminModal: () => void;
  leadCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  setActiveView,
  onOpenAdminModal,
  leadCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: AppView) => {
    setActiveView(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-[#05070c] border-b border-red-950/80 sticky top-0 z-40 text-white shadow-2xl backdrop-blur-md">
      {/* Top Technical Command Telemetry Bar */}
      <div className="bg-[#030407] border-b border-slate-900/90 px-4 sm:px-6 lg:px-8 py-1.5 text-xs text-slate-400 font-mono">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          {/* Service Area & Status Indicator */}
          <div className="flex items-center space-x-3 text-[10px] sm:text-[11px]">
            <span className="flex items-center gap-1.5 text-red-500 font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping inline-block" />
              <MapPin className="w-3 h-3 text-red-500 shrink-0" />
              <span>GAUTENG DISPATCH // JHB • PRETORIA • SANDTON • MIDRAND • EAST/WEST RAND</span>
            </span>
            <span className="hidden lg:inline text-slate-700">|</span>
            <span className="hidden lg:inline text-emerald-400 font-bold">
              [SLA: 2–4H ON-SITE RESPONSE GUARANTEE]
            </span>
          </div>

          {/* Direct Technical Contacts & Admin */}
          <div className="flex items-center space-x-3 sm:space-x-4 text-[11px]">
            {/* WhatsApp Link */}
            <a 
              href="https://wa.me/27117964828?text=Hi%20Toshiba%20Head%20Office,%20I%20would%20like%20to%20inquire%20about%20copier%20rentals" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 text-emerald-400 hover:text-emerald-300 transition-colors bg-emerald-950/50 border border-emerald-800/80 px-2 py-0.5 rounded font-bold"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-3 h-3 text-emerald-400" />
              <span>WHATSAPP // 011 796 4828</span>
            </a>

            {/* Direct Phone */}
            <a 
              href="tel:0117964828" 
              className="flex items-center space-x-1.5 text-slate-200 hover:text-white transition-colors bg-slate-900/80 border border-slate-800 px-2 py-0.5 rounded font-bold"
              title="Call Office Hotline"
            >
              <Phone className="w-3 h-3 text-red-500" />
              <span className="tracking-tight">HOTLINE: 011 796 4828</span>
            </a>

            <span className="text-slate-800 hidden sm:inline">|</span>
            
            {/* Email Contact */}
            <a 
              href="mailto:juanlr@toshiba-sa.co.za" 
              className="hidden sm:flex items-center space-x-1.5 text-slate-400 hover:text-red-400 transition-colors"
              title="Email Juan Le Roux"
            >
              <Mail className="w-3 h-3 text-slate-500" />
              <span>juanlr@toshiba-sa.co.za</span>
            </a>

            <span className="text-slate-800">|</span>

            {/* Admin Desk Access */}
            <button
              onClick={onOpenAdminModal}
              className="flex items-center space-x-1 text-slate-500 hover:text-red-400 text-[10px] cursor-pointer transition-colors"
              title="Admin Leads Portal"
            >
              <Lock className="w-3 h-3" />
              <span>ADMIN_DESK</span>
              {leadCount > 0 && (
                <span className="bg-red-600 text-white text-[8px] px-1 rounded-full font-bold">
                  {leadCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Command Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4 relative overflow-hidden">
        {/* Subtle Watermark Toshiba Wordmark in the background */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.03] text-8xl font-black tracking-tighter text-white font-heading">
          TOSHIBA
        </div>

        {/* Brand Identity & Wordmark */}
        <div 
          className="flex items-center space-x-3.5 cursor-pointer group z-10"
          onClick={() => handleNavClick('all')}
        >
          <div className="bg-red-600 text-white font-black text-2xl tracking-tighter px-3.5 py-1 rounded shadow-red-glow group-hover:bg-red-700 transition-all font-heading">
            TOSHIBA
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase font-heading">
                COMMAND // GAUTENG
              </span>
              <span className="text-[9px] bg-red-950/90 text-red-400 border border-red-800/90 px-1.5 py-0.5 rounded font-mono font-bold uppercase tracking-wider">
                COPIER FLEET
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono tracking-wide uppercase">
              Multifunction Rentals • Managed Print Services • 0% Deposit
            </p>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden lg:flex items-center space-x-1.5 bg-[#030508] p-1.5 rounded-xl border border-slate-800/80 z-10 font-mono text-xs">
          <button
            onClick={() => handleNavClick('matcher')}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg font-bold transition-all cursor-pointer ${
              activeView === 'matcher'
                ? 'bg-red-600 text-white shadow-red-glow'
                : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="uppercase">[01. MATCHER]</span>
          </button>

          <button
            onClick={() => handleNavClick('catalog')}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg font-bold transition-all cursor-pointer ${
              activeView === 'catalog'
                ? 'bg-red-600 text-white shadow-red-glow'
                : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
            }`}
          >
            <Grid className="w-3.5 h-3.5 text-slate-400" />
            <span className="uppercase">[02. CATALOG]</span>
          </button>

          <button
            onClick={() => handleNavClick('quote')}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg font-bold transition-all cursor-pointer ${
              activeView === 'quote'
                ? 'bg-red-600 text-white shadow-red-glow'
                : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            <span className="uppercase">[03. QUOTE_DESK]</span>
          </button>

          <button
            onClick={() => handleNavClick('service')}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg font-bold transition-all cursor-pointer ${
              activeView === 'service'
                ? 'bg-red-600 text-white shadow-red-glow'
                : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="uppercase">[04. SLA_GRID]</span>
          </button>

          <button
            onClick={() => handleNavClick('faq')}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg font-bold transition-all cursor-pointer ${
              activeView === 'faq'
                ? 'bg-red-600 text-white shadow-red-glow'
                : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-sky-400" />
            <span className="uppercase">[05. FAQ]</span>
          </button>
        </nav>

        {/* Right Call To Action & WhatsApp */}
        <div className="hidden sm:flex items-center space-x-2.5 z-10 font-mono">
          <a
            href="https://wa.me/27117964828?text=Hi%20Toshiba%20Head%20Office,%20I'd%20like%20a%20quote%20for%20an%20office%20printer"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 px-3 py-2 bg-emerald-950/80 hover:bg-emerald-900 text-emerald-400 border border-emerald-700/80 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span>WHATSAPP</span>
          </a>

          <button
            onClick={() => handleNavClick('quote')}
            className="flex items-center space-x-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs rounded-xl shadow-red-glow transition-all cursor-pointer uppercase tracking-wider"
          >
            <span>GET QUOTE</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center z-10">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-900 text-slate-200 hover:text-white hover:bg-slate-800 border border-slate-700"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#04060a] border-b border-red-950/80 px-4 py-4 space-y-2 font-mono text-xs">
          <button
            onClick={() => { setActiveView('matcher'); setMobileMenuOpen(false); }}
            className={`w-full text-left flex items-center space-x-3 px-3.5 py-2.5 rounded-lg font-bold ${
              activeView === 'matcher' ? 'bg-red-600 text-white' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>[01. PRINTER MATCHER QUIZ]</span>
          </button>

          <button
            onClick={() => { setActiveView('catalog'); setMobileMenuOpen(false); }}
            className={`w-full text-left flex items-center space-x-3 px-3.5 py-2.5 rounded-lg font-bold ${
              activeView === 'catalog' ? 'bg-red-600 text-white' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <Grid className="w-4 h-4 text-slate-400" />
            <span>[02. TOSHIBA COPIER CATALOG]</span>
          </button>

          <button
            onClick={() => { setActiveView('quote'); setMobileMenuOpen(false); }}
            className={`w-full text-left flex items-center space-x-3 px-3.5 py-2.5 rounded-lg font-bold ${
              activeView === 'quote' ? 'bg-red-600 text-white' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <FileText className="w-4 h-4 text-slate-400" />
            <span>[03. DIRECT QUOTATION DESK]</span>
          </button>

          <button
            onClick={() => { setActiveView('service'); setMobileMenuOpen(false); }}
            className={`w-full text-left flex items-center space-x-3 px-3.5 py-2.5 rounded-lg font-bold ${
              activeView === 'service' ? 'bg-red-600 text-white' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>[04. GAUTENG 2-4H SLA GRID]</span>
          </button>

          <button
            onClick={() => { setActiveView('faq'); setMobileMenuOpen(false); }}
            className={`w-full text-left flex items-center space-x-3 px-3.5 py-2.5 rounded-lg font-bold ${
              activeView === 'faq' ? 'bg-red-600 text-white' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-sky-400" />
            <span>[05. TECHNICAL FAQS]</span>
          </button>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs gap-2">
            <a 
              href="https://wa.me/27117964828" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-emerald-400 font-bold flex items-center gap-1 bg-emerald-950/70 border border-emerald-800 px-3 py-1.5 rounded-lg"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              WhatsApp
            </a>
            <a href="tel:0117964828" className="text-slate-200 font-bold flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-red-500" />
              011 796 4828
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
