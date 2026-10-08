import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Volume2,
  Sun,
} from 'lucide-react';

interface FloatingScrollArrowProps {
  onWelcomeTriggered?: () => void;
}

export const FloatingScrollArrow: React.FC<FloatingScrollArrowProps> = ({
  onWelcomeTriggered,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [alwaysLit, setAlwaysLit] = useState(false);
  const [voiceEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasPlayedVoice, setHasPlayedVoice] = useState(false);

  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isSpeechSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  // Speak the requested welcome message
  const playVoiceWelcome = useCallback(() => {
    if (!isSpeechSupported || !voiceEnabled) return;

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(
        'Welcome to Toshiba, your leading experts in the printing and copy industry.'
      );
      utterance.rate = 0.95;
      utterance.pitch = 1.0;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
      setHasPlayedVoice(true);
      if (onWelcomeTriggered) {
        onWelcomeTriggered();
      }
    } catch (e) {
      console.log('Speech synthesis unavailable:', e);
      setIsSpeaking(false);
    }
  }, [isSpeechSupported, voiceEnabled, onWelcomeTriggered]);

  const stopVoice = useCallback(() => {
    if (isSpeechSupported) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [isSpeechSupported]);

  // Track window scrolling
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? Math.min(100, Math.max(0, (currentScrollY / totalHeight) * 100)) : 0;

      setScrollProgress(progress);
      setIsScrolling(true);

      // Auto-play welcome voice on first downward scroll
      if (!hasPlayedVoice && voiceEnabled && currentScrollY > 150) {
        playVoiceWelcome();
      }

      // Clear previous timeout and set lit state timeout (dims after scrolling pauses)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 1300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [hasPlayedVoice, voiceEnabled, playVoiceWelcome]);

  // Determine if arrow is lit
  const isLit = isScrolling || isHovered || alwaysLit;

  // Handle clicking the arrow
  const handleArrowClick = () => {
    if (scrollProgress > 45) {
      // Scroll to top
      const topEl = document.getElementById('top') || document.body;
      topEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // Scroll down to the fleet gallery or next major section
      const targetEl = document.getElementById('fleet') || document.getElementById('about');
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
      }
    }
  };

  const isPointingUp = scrollProgress > 45;

  return (
    <aside
      aria-label="Scroll navigation"
      className="fixed z-40 right-4 bottom-20 sm:right-6 sm:bottom-21 flex flex-col items-end select-none pointer-events-auto"
    >
      {/* Main Floating Scroll Arrow Component (Pure Arrow, No Percentage Text) */}
      <div className="relative flex items-center justify-center">
        {/* Ambient Neon Glow Aura behind the button when lit */}
        <div
          className={`absolute inset-0 -m-1.5 rounded-full transition-all duration-400 blur-lg ${
            isLit
              ? 'bg-primary/70 opacity-100 scale-125'
              : 'bg-primary/0 opacity-0 scale-90'
          }`}
        />

        {/* Secondary Pulsing Halo ring when actively scrolling */}
        {isScrolling && (
          <div className="absolute inset-0 -m-2 rounded-full border border-primary/60 animate-ping opacity-60" />
        )}

        {/* The Clean Interactive Scroll Button */}
        <button
          type="button"
          onClick={handleArrowClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label={
            isPointingUp
              ? 'Scroll arrow lit: Click to scroll to top'
              : 'Scroll arrow lit: Click to scroll down to fleet'
          }
          title={isPointingUp ? 'Scroll to Top' : 'Scroll Down to Fleet'}
          className={`relative group flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-full transition-all duration-300 cursor-pointer shadow-xl ${
            isLit
              ? 'bg-[#180a0d] border-2 border-primary text-white scale-105'
              : 'bg-[#0e1218]/90 border border-white/20 text-chrome/75 hover:border-primary/60 hover:text-white'
          }`}
          style={{
            boxShadow: isLit
              ? '0 0 20px rgba(243, 13, 34, 0.8), 0 0 35px rgba(243, 13, 34, 0.4), inset 0 0 10px rgba(243, 13, 34, 0.45)'
              : '0 6px 18px rgba(0, 0, 0, 0.5)',
          }}
        >
          {/* Central Animated Arrow that Lights Up */}
          <div className="relative flex flex-col items-center justify-center">
            {isPointingUp ? (
              <ChevronUp
                className={`transition-all duration-200 ${
                  isLit
                    ? 'h-6 w-6 sm:h-7 sm:w-7 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.95)] animate-pulse'
                    : 'h-5 w-5 sm:h-6 sm:w-6 text-chrome/80'
                }`}
              />
            ) : (
              <ChevronDown
                className={`transition-all duration-200 ${
                  isLit
                    ? 'h-6 w-6 sm:h-7 sm:w-7 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.95)] animate-bounce'
                    : 'h-5 w-5 sm:h-6 sm:w-6 text-chrome/80'
                }`}
              />
            )}

            {/* Glowing Laser Core dot inside arrow */}
            <span
              className={`absolute h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                isLit
                  ? 'bg-white shadow-[0_0_8px_#ffffff] opacity-100 scale-125'
                  : 'bg-primary/50 opacity-40 scale-75'
              }`}
            />
          </div>
        </button>

        {/* Small Tooltip Controls on Hover or active scroll */}
        <div
          className={`absolute right-full mr-2.5 flex items-center gap-1.5 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-2 pointer-events-none'
          }`}
        >
          {/* Toggle Always Lit Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setAlwaysLit(!alwaysLit);
            }}
            title={alwaysLit ? 'Turn off continuous light' : 'Keep arrow lit continuously'}
            className={`flex h-7 w-7 items-center justify-center rounded-full border transition-all cursor-pointer shadow-md backdrop-blur-md ${
              alwaysLit
                ? 'border-primary bg-primary text-white shadow-primary/50 scale-105'
                : 'border-white/15 bg-[#0e1218]/90 text-chrome/70 hover:border-primary/50 hover:text-white'
            }`}
          >
            <Sun className={`h-3 w-3 ${alwaysLit ? 'animate-spin' : ''}`} />
          </button>

          {/* Voice Welcome Trigger Button */}
          {isSpeechSupported && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (isSpeaking) {
                  stopVoice();
                } else {
                  playVoiceWelcome();
                }
              }}
              title={
                isSpeaking
                  ? 'Stop voice message'
                  : 'Play Toshiba voice message'
              }
              className={`flex h-7 w-7 items-center justify-center rounded-full border transition-all cursor-pointer shadow-md backdrop-blur-md ${
                isSpeaking
                  ? 'border-emerald-500 bg-emerald-600 text-white animate-pulse'
                  : 'border-white/15 bg-[#0e1218]/90 text-chrome/70 hover:border-emerald-500/50 hover:text-white'
              }`}
            >
              <Volume2 className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
