import React from 'react';
import { PrinterModel } from '../types';
import { generateSingleModelPdf } from '../utils/pdfGenerator';
import { PrinterImage } from './PrinterImage';
import { 
  X, 
  Download, 
  ArrowRight, 
  Check, 
  Printer, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  Activity,
  Terminal,
  Clock
} from 'lucide-react';

interface ProductDetailsModalProps {
  model: PrinterModel;
  onClose: () => void;
  onSelectForQuote: (model: PrinterModel) => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  model,
  onClose,
  onSelectForQuote,
}) => {
  if (!model) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn font-mono">
      <div className="bg-[#090d16] border-2 border-slate-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative text-slate-200">
        
        {/* Header with Giant Toshiba Watermark */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-[#090d16]/95 backdrop-blur z-20">
          <div className="flex items-center space-x-3">
            <span className="p-2 bg-red-950 text-red-400 border border-red-800 rounded-xl font-bold">
              <Terminal className="w-4 h-4" />
            </span>
            <div>
              <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider block">
                [SYS.SPEC_INSPECTION // {model.id.toUpperCase()}]
              </span>
              <h2 className="text-xl sm:text-2xl font-black font-heading text-white uppercase tracking-tight">
                {model.name}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-900 rounded-xl border border-slate-700 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Top Hardware Overview Grid */}
          <div className="grid md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-5 bg-[#04060a] border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center min-h-[220px]">
              <PrinterImage printer={model} maxHeightClass="max-h-[180px]" />
              <span className="text-xs font-black text-red-400 mt-2 font-mono">
                {model.modelNumber}
              </span>
            </div>

            <div className="md:col-span-7 space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded border ${
                  model.category === 'color' 
                    ? 'bg-red-950/80 text-red-400 border-red-800/80' 
                    : 'bg-slate-900 text-slate-300 border-slate-700'
                }`}>
                  [{model.format} // {model.category === 'color' ? 'CMYK COLOUR' : 'MONO BLACK'}]
                </span>

                <span className="bg-slate-900 text-slate-300 text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded border border-slate-800">
                  [TIER: {model.volumeTier.toUpperCase()}]
                </span>
              </div>

              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                {model.description}
              </p>

              {/* Pricing Box */}
              <div className="bg-[#04060a] border border-red-950/80 p-4 rounded-xl space-y-1.5 shadow-inner">
                <div className="flex justify-between items-baseline">
                  <span className="text-[11px] text-slate-400 uppercase font-bold">[36-MO RENTAL]:</span>
                  <span className="text-lg font-black text-red-500 font-heading">
                    {model.rental36moZAR ? `R${model.rental36moZAR.toLocaleString()} / MO` : 'CONTACT FOR QUOTE'}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>[60-MO RENTAL]:</span>
                  <span className="text-slate-200 font-bold">
                    {model.rental60moZAR ? `R${model.rental60moZAR.toLocaleString()} / MO` : 'CONTACT FOR QUOTE'}
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-800">
                  <span>[OUTRIGHT PURCHASE]:</span>
                  <span className="text-slate-400">
                    {model.outrightPriceZAR ? `R${model.outrightPriceZAR.toLocaleString()} EX VAT` : 'CUSTOM QUOTE'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Engineering Specifications */}
          <div className="space-y-3">
            <h3 className="text-sm font-black font-heading text-white uppercase tracking-wide border-b border-slate-800 pb-1">
              [KEY_SYSTEM_FEATURES &amp; CAPABILITIES]
            </h3>
            <ul className="grid sm:grid-cols-2 gap-2 text-xs font-sans text-slate-300">
              {model.keyNotes.map((note, index) => (
                <li key={index} className="flex items-start space-x-2 bg-[#04060a] border border-slate-800 p-2.5 rounded-xl">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-6 border-t border-slate-800 bg-[#04060a] flex flex-wrap items-center justify-between gap-3 sticky bottom-0 z-20">
          <button
            onClick={() => generateSingleModelPdf(model)}
            className="py-3 px-4 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4 text-red-500" />
            <span>EXPORT_SPEC_PDF</span>
          </button>

          <button
            onClick={() => {
              onSelectForQuote(model);
              onClose();
            }}
            className="py-3 px-6 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black shadow-red-glow transition-all flex items-center gap-2 cursor-pointer uppercase tracking-wider"
          >
            <span>REQUEST OFFICIAL QUOTE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
