import React from 'react';
import { Printer, Phone } from 'lucide-react';

interface Base44HeaderProps {
  onRequestQuote: () => void;
}

export const Base44Header: React.FC<Base44HeaderProps> = ({ onRequestQuote }) => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-chrome/15 bg-[#0a0c0e]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        {/* Brand */}
        <a
          href="#top"
          onClick={(e) => scrollToSection(e, 'top')}
          className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
        >
          <Printer className="h-5 w-5 text-primary" />
          <span className="font-heading text-sm font-bold uppercase tracking-[0.22em] text-white">
            Toshiba<span className="px-1 text-primary">·</span>Head Office
          </span>
        </a>

        {/* Center Nav Links */}
        <nav className="hidden items-center gap-7 lg:gap-9 font-mono text-[11px] uppercase tracking-widest text-chrome/60 md:flex">
          <a
            href="#matcher"
            onClick={(e) => scrollToSection(e, 'matcher')}
            className="transition-colors hover:text-white"
          >
            Matcher
          </a>
          <a
            href="#fleet"
            onClick={(e) => scrollToSection(e, 'fleet')}
            className="transition-colors hover:text-white"
          >
            Fleet
          </a>
          <a
            href="#about"
            onClick={(e) => scrollToSection(e, 'about')}
            className="transition-colors hover:text-white"
          >
            About Us
          </a>
          <a
            href="#testimonials"
            onClick={(e) => scrollToSection(e, 'testimonials')}
            className="transition-colors hover:text-white"
          >
            Stories
          </a>
          <a
            href="#quote"
            onClick={(e) => scrollToSection(e, 'quote')}
            className="transition-colors hover:text-white"
          >
            Quote
          </a>
        </nav>

        {/* Right side contact & quote action */}
        <div className="flex items-center gap-4">
          <a
            href="tel:0783076569"
            className="hidden items-center gap-2 font-mono text-xs text-chrome/80 transition-colors hover:text-white sm:flex"
          >
            <Phone className="h-3.5 w-3.5 text-primary" />
            <span>078 307 6569</span>
          </a>
          <button
            type="button"
            onClick={onRequestQuote}
            className="border border-primary bg-primary px-4 py-2 font-heading text-[11px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-primary/90"
          >
            Get a quote
          </button>
        </div>
      </div>
    </header>
  );
};
