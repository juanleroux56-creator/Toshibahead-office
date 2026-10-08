import { PrinterModel, QuestionnaireAnswers } from '../types';
import { TOSHIBA_CATALOG } from '../data/printerCatalog';

export interface MatchResult {
  primaryMatch: PrinterModel;
  bestMatch: PrinterModel;
  upgradeOption?: PrinterModel;
  alternativeMatch?: PrinterModel;
  reasoning: string;
  matchReasons: string[];
  volumeNote: string;
}

export function matchPrinter(answers: QuestionnaireAnswers): MatchResult {
  const { colorPreference, formatPreference, volumeRange } = answers;

  // Filter candidates matching color
  let candidates = TOSHIBA_CATALOG.filter(printer => {
    if (colorPreference === 'mono' && printer.category !== 'mono') {
      return false;
    }
    return true;
  });

  // Filter candidates matching format if possible
  if (formatPreference === 'A4') {
    // If volume is under 35k, prefer true A4 compact
    if (volumeRange === 'under_8k' || volumeRange === '8k_to_45k') {
      const a4Models = candidates.filter(p => p.format === 'A4');
      if (a4Models.length > 0) {
        candidates = a4Models;
      }
    }
  } else if (formatPreference === 'A3') {
    candidates = candidates.filter(p => p.format === 'A3');
  }

  // Volume range filter & smallest/cheapest match selection
  let volumeTarget = 8000;
  if (volumeRange === '8k_to_45k') volumeTarget = 45000;
  if (volumeRange === 'above_45k') volumeTarget = 100000;

  // Find models with sufficient duty cycle
  const viable = candidates.filter(p => p.maxMonthlyVolume >= volumeTarget);
  const pool = viable.length > 0 ? viable : candidates;

  // Sort by lowest rental price (to find the SMALLEST / CHEAPEST capable machine)
  pool.sort((a, b) => {
    const priceA = a.rental36moZAR ?? 999999;
    const priceB = b.rental36moZAR ?? 999999;
    return priceA - priceB;
  });

  const bestMatch = pool[0] || TOSHIBA_CATALOG[0];
  const alternativeMatch = pool.length > 1 
    ? pool[1] 
    : TOSHIBA_CATALOG.find(p => p.id !== bestMatch.id) || undefined;

  // Build rationale bullets
  const matchReasons: string[] = [];

  if (colorPreference === 'mono') {
    matchReasons.push('Optimised for monochrome speed & lowest cost per page (zero colour toner overhead).');
  } else {
    matchReasons.push('Includes full CMYK colour printing for crisp proposals and marketing collaterals.');
  }

  if (bestMatch.format === 'A4') {
    matchReasons.push('Compact A4 desktop footprint fits easily into office counters or satellite workstations.');
  } else {
    matchReasons.push('Supports full A3 ledger sheets and A4 standard paper with dual cassettes.');
  }

  if (volumeRange === 'under_8k') {
    matchReasons.push(`Sized for small workgroups (<8k/mo) with a rated duty cycle of ${bestMatch.dutyCycleText}, avoiding over-speccing.`);
  } else if (volumeRange === '8k_to_45k') {
    matchReasons.push(`Handles mid-volume loads (${bestMatch.dutyCycleText}) with heavy-duty paper feeds and fast ${bestMatch.speedText}.`);
  } else {
    matchReasons.push(`High-capacity production engine engineered for nonstop continuous document production.`);
  }

  const volumeNote = `Selected as the most cost-effective Toshiba model meeting your ${bestMatch.format} ${colorPreference === 'color' ? 'Colour' : 'Mono'} requirements in Gauteng.`;

  return {
    primaryMatch: bestMatch,
    bestMatch,
    upgradeOption: alternativeMatch,
    alternativeMatch,
    reasoning: volumeNote,
    matchReasons,
    volumeNote,
  };
}
