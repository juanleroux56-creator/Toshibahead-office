import React, { useState } from 'react';
import { PrinterModel } from '../types';
import { generateSingleModelPdf } from '../utils/pdfGenerator';
import { PrinterImage } from './PrinterImage';
import { 
  Eye, 
  ArrowRight, 
  Download, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  Activity 
} from 'lucide-react';

interface ProductCardProps {
  printer: PrinterModel;
  onSelectModelForQuote: (model: PrinterModel) => void;
  onViewModelDetails: (model: PrinterModel) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  printer,
  onSelectModelForQuote,
  onViewModelDetails,
}) => {
  if (!printer) return null;

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-[#090c13] border border-slate-800/90 rounded-3xl p-5 sm:p-6 flex flex-col justify-between hover:border-red-600 hover:shadow-hud-glow transition-all duration-300 group relative overflow-hidden text-slate-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background subtle Toshiba watermark pattern */}
      <div className="absolute right-0 bottom-0 select-none pointer-events-none opacity-[0.02] text-7xl font-black text-white font-heading">
        TOSHIBA
      </div>

      {/* Top Monospace Metadata Bar */}
      <div className="flex justify-between items-start gap-2 mb-3">
        <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded border tracking-wider ${
          printer.category === 'color' 
            ? 'bg-red-950/80 text-red-400 border-red-800/80' 
            : 'bg-slate-900 text-slate-300 border-slate-700'
        }`}>
          [{printer.format} // {printer.category === 'color' ? 'CMYK COLOUR' : 'MONO BLACK'}]
        </span>

        {printer.badge && (
          <span className="bg-red-600 text-white text-[9px] font-mono font-extrabold uppercase px-2 py-0.5 rounded shadow-sm tracking-wide">
            {printer.badge}
          </span>
        )}
      </div>

      {/* Dynamic Product Image Showcase in Dark Tactical Frame */}
      <div className="bg-[#04060a] border border-slate-800/90 rounded-2xl p-4 flex flex-col items-center justify-center text-center my-2 relative min-h-[190px] group-hover:border-red-900/60 transition-colors overflow-hidden">
        {/* Subtle grid lines background */}
        <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none" />
        
        <PrinterImage 
          printer={printer} 
          maxHeightClass="max-h-[160px]" 
        />
        <span className="text-[11px] font-mono font-black text-red-400 mt-2 bg-slate-950/90 px-3 py-0.5 rounded-md border border-slate-800 shadow-inner z-10">
          SYS.MODEL // {printer.modelNumber}
        </span>
      </div>

      {/* Model Title in Condensed Uppercase Headlines */}
      <div className="space-y-1.5 mt-2">
        <h3 className="font-heading text-xl font-black text-white group-hover:text-red-500 transition-colors uppercase tracking-tight leading-snug">
          {printer.name}
        </h3>
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {printer.description}
        </p>
      </div>

      {/* Technical Telemetry Specs Grid */}
      <div className="my-4 pt-3 border-t border-slate-800/80 space-y-1.5 text-xs font-mono text-slate-400">
        <div className="flex justify-between items-center">
          <span className="text-slate-500">[SPEED_RATING]:</span>
          <strong className="text-white font-bold">{printer.speedText}</strong>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-500">[DUTY_CYCLE]:</span>
          <strong className="text-white font-bold">{printer.dutyCycleText}</strong>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-500">[PAPER_FORMAT]:</span>
          <strong className="text-slate-300 font-bold">{printer.format} STANDARD</strong>
        </div>
      </div>

      {/* Dark Tactical Pricing Console */}
      <div className="bg-[#04060a] border border-red-950/80 text-white p-3.5 rounded-2xl space-y-1.5 mt-auto shadow-inner">
        <div className="flex justify-between items-baseline">
          <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">[36-MO RENTAL]:</span>
          <span className="text-lg font-black text-red-500 font-heading tracking-tight">
            {printer.rental36moZAR ? `R${printer.rental36moZAR.toLocaleString()} / MO` : 'CONTACT FOR QUOTE'}
          </span>
        </div>
        <div className="flex justify-between items-baseline text-[11px] font-mono text-slate-400">
          <span>[60-MO RENTAL]:</span>
          <span className="text-slate-300 font-bold">
            {printer.rental60moZAR ? `R${printer.rental60moZAR.toLocaleString()} / MO` : 'CONTACT FOR QUOTE'}
          </span>
        </div>
        <div className="flex justify-between items-baseline text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-800">
          <span>[OUTRIGHT PURCHASE]:</span>
          <span className="text-slate-400 font-medium">
            {printer.outrightPriceZAR ? `R${printer.outrightPriceZAR.toLocaleString()} EX VAT` : 'QUOTE ONLY'}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 mt-3 pt-2 font-mono">
        <button
          onClick={() => onViewModelDetails(printer)}
          className="py-2.5 px-2 bg-slate-900 hover:bg-slate-800 text-slate-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer border border-slate-700 hover:border-slate-500"
        >
          <Eye className="w-3.5 h-3.5 text-slate-400" />
          <span>SPECS</span>
        </button>

        <button
          onClick={() => onSelectModelForQuote(printer)}
          className="py-2.5 px-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black flex items-center justify-center gap-1 transition-all shadow-red-glow cursor-pointer uppercase tracking-wider"
        >
          <span>GET QUOTE</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Quick Spec Sheet PDF Download */}
      <button
        onClick={() => generateSingleModelPdf(printer)}
        className="w-full text-center mt-2.5 text-[11px] font-mono font-bold text-slate-500 hover:text-red-400 flex items-center justify-center gap-1 cursor-pointer transition-colors"
      >
        <Download className="w-3 h-3 text-red-500" />
        <span>DOWNLOAD SPEC_SHEET.PDF</span>
      </button>
    </div>
  );
};
