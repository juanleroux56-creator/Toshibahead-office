import React, { useState } from 'react';
import { PrinterModel } from '../types';
import { Printer } from 'lucide-react';

interface PrinterImageProps {
  printer: PrinterModel;
  className?: string;
  maxHeightClass?: string;
}

export const PrinterImage: React.FC<PrinterImageProps> = ({
  printer,
  className = '',
  maxHeightClass = 'max-h-[170px]',
}) => {
  const [imgError, setImgError] = useState(false);
  const [useUnsplashFallback, setUseUnsplashFallback] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Dynamic image resolution: prefers printer.image, then printer.imageUrl, then local format-specific asset
  const primarySrc = printer.image || printer.imageUrl || `/images/${
    printer.volumeTier === 'enterprise' 
      ? 'toshiba_high_speed.jpg' 
      : printer.format === 'A4'
        ? 'toshiba_a4_desktop.jpg'
        : printer.category === 'color'
          ? 'toshiba_a3_colour.jpg'
          : 'toshiba_a3_mono.jpg'
  }`;

  // Curated Unsplash office printer / copier placeholder fallback if local image is unavailable
  const unsplashFallbackSrc = 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=600&q=80';

  const currentSrc = useUnsplashFallback ? unsplashFallbackSrc : primarySrc;

  const handleImageError = () => {
    if (!useUnsplashFallback) {
      // Try Unsplash placeholder first
      setUseUnsplashFallback(true);
    } else {
      // If Unsplash also fails or offline, show styled vector fallback
      setImgError(true);
    }
  };

  return (
    <div className={`relative flex items-center justify-center w-full h-full ${className}`}>
      {!imgError ? (
        <img
          src={currentSrc}
          alt={printer.name}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={handleImageError}
          className={`${maxHeightClass} w-auto object-contain transition-all duration-300 ${
            loaded ? 'opacity-100 scale-100' : 'opacity-80 scale-95'
          }`}
        />
      ) : (
        /* Fallback Toshiba stylized hardware diagram if image cannot load */
        <div className="w-24 h-28 bg-slate-900 border-2 border-slate-700 rounded-xl flex flex-col items-center justify-between p-2 text-white shadow-lg my-1">
          <div className="w-full flex justify-between items-center border-b border-slate-700 pb-1">
            <span className="text-[7px] font-black text-red-500 tracking-tighter">TOSHIBA</span>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </div>
          <div className="w-12 h-6 bg-slate-800 border border-slate-600 rounded text-[7px] font-mono text-cyan-400 flex items-center justify-center">
            {printer.category === 'color' ? 'CMYK' : 'MONO'}
          </div>
          <div className="w-full space-y-1">
            <div className="h-1.5 bg-slate-700 rounded" />
            <div className="h-1.5 bg-slate-700 rounded" />
          </div>
        </div>
      )}
    </div>
  );
};
