import React, { useState } from 'react';
import { Printer, MessageSquare, Phone, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Printers', href: '/printers' },
    { label: 'Services', href: '/#services' },
    { label: 'Rent vs Buy', href: '/#rent-vs-buy' },
    { label: 'Gauteng SLA', href: '/#coverage' },
    { label: 'Contact', href: '/#contact' },
  ];

  const handleLinkClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (href.startsWith('/#')) {
      if (currentPath !== '/') {
        onNavigate('/');
        setTimeout(() => {
          const id = href.replace('/#', '');
          const element = document.getElementById(id);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const id = href.replace('/#', '');
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      onNavigate(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#080a0e]/95 backdrop-blur border-b border-slate-800 text-slate-100 shadow-sm transition-colors">
      {/* Top Technical Bar */}
      <div className="bg-[#050608] border-b border-slate-800/80 py-1.5 px-4 md:px-8 text-[11px] font-mono text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-1 gap-x-4">
          <div className="flex items-center gap-3">
            <span className="text-rose-500 font-bold uppercase tracking-widest text-[10px]">
              // GAUTENG FLEET DESK
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline text-slate-300">
              Direct: <strong className="text-white font-bold">Juan</strong>{' '}
              <a href="tel:0783076569" className="text-rose-400 hover:text-white transition-colors underline decoration-rose-500/50">
                078 307 6569
              </a>
            </span>
            <span className="hidden md:inline text-slate-600">·</span>
            <a
              href="mailto:juanlr@toshiba-sa.co.za"
              className="hidden md:inline text-slate-400 hover:text-rose-400 transition-colors"
            >
              juanlr@toshiba-sa.co.za
            </a>
          </div>

          <div className="flex items-center gap-3 text-[10px] uppercase tracking-wider ml-auto">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              4–8H On-Site SLA Across Gauteng
            </span>
            <span className="text-slate-600">|</span>
            <a href="tel:0117964828" className="text-slate-300 hover:text-white font-bold">
              Office: 011 796 4828
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16">
        {/* Brand Logo */}
        <a
          href="/"
          onClick={(e) => handleLinkClick('/', e)}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="bg-rose-600 group-hover:bg-rose-700 transition-colors rounded-lg p-2 flex items-center justify-center text-white shadow-md shadow-rose-900/20">
            <Printer className="w-5 h-5" />
          </div>
          <div className="leading-tight">
            <span className="font-extrabold text-white text-xl tracking-tight block font-heading">
              TOSHIBA
            </span>
            <span className="block text-[10px] text-slate-400 font-mono tracking-widest uppercase">
              Gauteng Fleet &amp; Rentals
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive =
              (link.href === '/' && currentPath === '/') ||
              (link.href === '/printers' && currentPath.startsWith('/printers'));

            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(link.href, e)}
                className={`text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer ${
                  isActive
                    ? 'text-rose-500'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:0783076569"
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition-colors mr-1 font-mono"
          >
            <Phone className="w-3.5 h-3.5 text-rose-500" />
            <span>078 307 6569</span>
          </a>

          <a
            href="https://wa.me/27786792279?text=Hi%20Juan%2C%20I%20would%20like%20to%20enquire%20about%20a%20Toshiba%20copier%20rental%20quote%20for%20my%20office."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1db954] text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-sm transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>WhatsApp Us</span>
          </a>

          <a
            href="/#contact"
            onClick={(e) => handleLinkClick('/#contact', e)}
            className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm transition-all cursor-pointer uppercase tracking-wider"
          >
            Get a Quote
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href="https://wa.me/27786792279"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white p-2 rounded-lg text-xs font-semibold"
            aria-label="WhatsApp"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white rounded-lg border border-slate-800"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0e1118] border-t border-slate-800 px-5 py-5 flex flex-col gap-4 shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(link.href, e)}
              className="text-base font-medium text-slate-200 hover:text-rose-500 py-1 border-b border-slate-800/60"
            >
              {link.label}
            </a>
          ))}

          <div className="flex flex-col gap-2.5 pt-2">
            <a
              href="https://wa.me/27786792279"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1db954] text-white py-2.5 rounded-xl font-semibold text-sm shadow-sm"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>WhatsApp Us (078 679 2279)</span>
            </a>

            <a
              href="/#contact"
              onClick={(e) => handleLinkClick('/#contact', e)}
              className="w-full text-center bg-rose-600 hover:bg-rose-700 text-white py-2.5 rounded-xl font-semibold text-sm"
            >
              Get a Free Quote
            </a>

            <a
              href="tel:0117964828"
              className="w-full flex items-center justify-center gap-2 text-slate-400 hover:text-white py-2 text-xs"
            >
              <Phone className="w-3.5 h-3.5 text-rose-500" />
              <span>Direct Office: 011 796 4828</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
