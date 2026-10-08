import { calculateHardwarePricing } from '../utils/kagoFinance';

export interface Base44Printer {
  id: string;
  model: string;
  colour: 'colour' | 'mono';
  format: 'A4' | 'A3';
  speed_ppm: number;
  duty_cycle: number;
  base_hardware_price: number;
  tp_link_addon: number;
  markup_category: number;
  markup_tier: number;
  final_hardware_price: number;
  rental_60mo_0esc: number; // 60-month rental @ 0% escalation (default)
  rental_36mo_0esc: number; // 36-month rental @ 0% escalation
  monthly_rental: number;   // Alias to starting 60m 0% rental
  kago_factor_60: number;
  kago_factor_36: number;
  kago_band: string;
  volume_tier: 'small_office' | 'medium_volume' | 'enterprise';
  featured: boolean;
  image_url: string;
  description: string;
  brand?: string;
  wifi?: boolean;
  wifi_detail?: string;
}

export const VOLUME_TIER_ORDER: Record<string, number> = {
  small_office: 1,
  medium_volume: 2,
  enterprise: 3,
};

export const VOLUME_TIER_LABELS: Record<string, string> = {
  small_office: 'Small office',
  medium_volume: 'Medium volume',
  enterprise: 'Enterprise',
};

export const VOLUME_TIER_BADGES: Record<string, string> = {
  small_office: 'Small office',
  medium_volume: 'Mid volume',
  enterprise: 'Enterprise',
};

export const TICKER_ITEMS: string[] = [
  'Latest match · 35ppm Colour MFP · e-STUDIO 3320AC',
  'Sandton office · 20ppm Colour A4 · e-STUDIO 2020AC',
  'Pretoria campus · 65ppm Mono A3 · e-STUDIO 6518A',
  'Centurion firm · 50ppm Mono A4 · e-STUDIO 5018A',
  'Midrand depot · 25ppm Colour A4 · e-STUDIO 2520AC',
  'Toshiba Head Office · 85ppm Mono A3 · e-STUDIO 8518A',
  'Rosebank financial · 75ppm Colour A3 · e-STUDIO 7527AC',
  'Bedfordview logistics · 42ppm Mono A4 · e-STUDIO 409S',
];

export const FORMAT_CURRENCY = (amount: number): string => {
  return 'R' + Number(amount).toLocaleString('en-ZA');
};

export const MACRO_HERO_IMAGE =
  'https://media.base44.com/images/public/6a83f7bb40908e6fb16fa338/7d3394e00_generated_image.png';

export const QUOTE_BG_IMAGE =
  'https://media.base44.com/images/public/6a83f7bb40908e6fb16fa338/9187e6f15_generated_dba07814.png';

interface RawPrinterDef {
  id: string;
  model: string;
  colour: 'colour' | 'mono';
  format: 'A4' | 'A3';
  speed_ppm: number;
  duty_cycle: number;
  base_hardware_price: number;
  volume_tier: 'small_office' | 'medium_volume' | 'enterprise';
  featured: boolean;
  image_url: string;
  description: string;
  brand?: string;
  wifi?: boolean;
  wifi_detail?: string;
}

const RAW_PRINTERS: RawPrinterDef[] = [
  {
    id: '6a844bf1c837e8c122e4fbaf',
    model: 'e-STUDIO 339CS',
    colour: 'colour',
    format: 'A4',
    speed_ppm: 33,
    duty_cycle: 50000,
    base_hardware_price: 17100, // PDF Page 13: R16,300 machine + R800 INLINE = R17,100
    volume_tier: 'small_office',
    featured: true,
    image_url: 'https://media.base44.com/images/public/6a83f7bb40908e6fb16fa338/5c015f93f_generated_image.png',
    description: 'All-in-one A4 colour multifunctional device covering daily business requirements with print, copy, scan and fax. Streamlines document workflow at up to 33 ppm with impeccable print quality.'
  },
  {
    id: '6a844bf1c837e8c122e4fbb0',
    model: 'e-STUDIO 331AC',
    colour: 'colour',
    format: 'A4',
    speed_ppm: 33,
    duty_cycle: 60000,
    base_hardware_price: 29250, // PDF Page 12: R28,450 machine + R800 INLINE = R29,250
    volume_tier: 'small_office',
    featured: false,
    image_url: 'https://media.base44.com/images/public/6a83f7bb40908e6fb16fa338/5c015f93f_generated_image.png',
    description: 'Delivers impressive colour documents at up to 33 ppm with advanced e-BRIDGE Next controller technology. 10.1-inch colour touchscreen, Intel Apollo Lake processor, and secure encrypted SSD.'
  },
  {
    id: '6a844bf1c837e8c122e4fbb2',
    model: 'e-STUDIO 409S',
    colour: 'mono',
    format: 'A4',
    speed_ppm: 42,
    duty_cycle: 80000,
    base_hardware_price: 9550, // PDF Page 1: R8,750 machine + R800 INLINE = R9,550
    volume_tier: 'small_office',
    featured: true,
    image_url: 'https://media.base44.com/images/public/6a83f7bb40908e6fb16fa338/4fcb52bda_generated_image.png',
    description: 'Compact yet powerful A4 monochrome all-in-one printer for small offices. Network print, copy, scan, fax with colour touch display and lightning protection inline.'
  },
  {
    id: '6a844bf1c837e8c122e4fbb3',
    model: 'e-STUDIO 449S',
    colour: 'mono',
    format: 'A4',
    speed_ppm: 44,
    duty_cycle: 150000,
    base_hardware_price: 14550, // PDF Page 1: R13,750 machine + R800 INLINE = R14,550
    volume_tier: 'medium_volume',
    featured: false,
    image_url: 'https://media.base44.com/images/public/6a83f7bb40908e6fb16fa338/4fcb52bda_generated_image.png',
    description: 'Versatile monochrome desktop MFP with 44 ppm output, 100-page single-pass DSDF color scan, 550-sheet cassette, and Wi-Fi capability.'
  },
  {
    id: '6a844bf1c837e8c122e4fbbb',
    model: 'e-STUDIO 2822AF',
    colour: 'mono',
    format: 'A3',
    speed_ppm: 28,
    duty_cycle: 100000,
    base_hardware_price: 15300, // PDF Page 3: R14,500 machine + R800 INLINE = R15,300
    volume_tier: 'small_office',
    featured: false,
    image_url: 'https://media.base44.com/images/public/6a83f7bb40908e6fb16fa338/9fcd40538_generated_image.png',
    description: 'Compact MFP with an A4 footprint that provides full A3 printing, scanning and copying, including fax and RADF feeder as standard.'
  },
  {
    id: '6a844bf1c837e8c122e4fbb9',
    model: 'e-STUDIO 2329A',
    colour: 'mono',
    format: 'A3',
    speed_ppm: 23,
    duty_cycle: 100000,
    base_hardware_price: 18850, // PDF Page 3-4: R12,750 machine + R800 INLINE + R5,300 MR3032 RADF = R18,850
    volume_tier: 'medium_volume',
    featured: false,
    image_url: 'https://media.base44.com/images/public/6a83f7bb40908e6fb16fa338/9fcd40538_generated_image.png',
    description: 'Robust A3 monochrome MFP with 23 ppm output, 100-page reversing automatic document feeder (RADF), 250-sheet cassette, and digital display.'
  },
  {
    id: '6a844bf1c837e8c122e4fbb5',
    model: 'e-STUDIO 2021AC',
    colour: 'colour',
    format: 'A3',
    speed_ppm: 20,
    duty_cycle: 50000,
    base_hardware_price: 56000, // PDF Page 14: R27,454 machine + R14,000 RADF + R5,250 2nd tray + R1,200 stand + R7,296 full toners + R800 INLINE = R56,000
    volume_tier: 'small_office',
    featured: false,
    image_url: 'https://media.base44.com/images/public/6a83f7bb40908e6fb16fa338/829adce10_generated_image.png',
    description: 'Entry A3 colour complete bundle with 10.1-inch pivoting touch display, RADF feeder, dual paper cassettes, stand, and full starter toners.'
  },
  {
    id: '6a844bf1c837e8c122e4fbb6',
    model: 'e-STUDIO 2521AC',
    colour: 'colour',
    format: 'A3',
    speed_ppm: 25,
    duty_cycle: 67200,
    base_hardware_price: 59550, // PDF Page 14-15: R31,004 machine + R14,000 RADF + R5,250 2nd tray + R1,200 stand + R7,296 full toners + R800 INLINE = R59,550
    volume_tier: 'small_office',
    featured: true,
    image_url: 'https://media.base44.com/images/public/6a83f7bb40908e6fb16fa338/829adce10_generated_image.png',
    description: 'High-demand 25ppm A3 colour system with cloud and mobile printing capabilities, dual paper cassettes, RADF, stand, and complete toner co-pack.'
  },
  {
    id: '6a844bf1c837e8c122e4fbba',
    model: 'e-STUDIO 2528A',
    colour: 'mono',
    format: 'A3',
    speed_ppm: 25,
    duty_cycle: 100000,
    base_hardware_price: 46250, // PDF Page 5: R29,050 machine + R15,200 MR4010 DSDF + R1,200 MH5000 stand + R800 INLINE = R46,250
    volume_tier: 'medium_volume',
    featured: false,
    image_url: 'https://media.base44.com/images/public/6a83f7bb40908e6fb16fa338/9fcd40538_generated_image.png',
    description: 'Efficient 25ppm monochrome A3 MFP bundle featuring 300-sheet DSDF single-pass dual scanner (up to 240 spm), dual 550-sheet cassettes, and stand.'
  },
  {
    id: '6a844bf1c837e8c122e4fbbc',
    model: 'e-STUDIO 3028A',
    colour: 'mono',
    format: 'A3',
    speed_ppm: 30,
    duty_cycle: 120000,
    base_hardware_price: 49200, // PDF Page 5: R32,000 machine + R15,200 MR4010 DSDF + R1,200 MH5000 stand + R800 INLINE = R49,200
    volume_tier: 'medium_volume',
    featured: false,
    image_url: 'https://media.base44.com/images/public/6a83f7bb40908e6fb16fa338/9fcd40538_generated_image.png',
    description: 'Workhorse 30ppm monochrome A3 MFP bundle featuring 300-sheet DSDF dual scanner (240 spm), dual cassettes, secure SSD, and stand.'
  },
  {
    id: '6a844bf1c837e8c122e4fbbe',
    model: 'e-STUDIO 4528A',
    colour: 'mono',
    format: 'A3',
    speed_ppm: 45,
    duty_cycle: 150000,
    base_hardware_price: 59150, // PDF Page 5-6: R41,950 machine + R15,200 MR4010 DSDF + R1,200 MH5000 stand + R800 INLINE = R59,150
    volume_tier: 'medium_volume',
    featured: false,
    image_url: 'https://media.base44.com/images/public/6a83f7bb40908e6fb16fa338/9fcd40538_generated_image.png',
    description: 'High-speed 45ppm monochrome MFP bundle designed for demanding office output. 300-sheet DSDF dual scanner, 6GB RAM, and 43,900-page toner co-packed.'
  },
  {
    id: '6a844bf1c837e8c122e4fbbf',
    model: 'e-STUDIO 5528A',
    colour: 'mono',
    format: 'A3',
    speed_ppm: 55,
    duty_cycle: 520000,
    base_hardware_price: 64400, // PDF Page 6: R47,200 machine + R15,200 MR4010 + R1,200 MH5000 + R800 INLINE = R64,400
    volume_tier: 'enterprise',
    featured: false,
    image_url: 'https://media.base44.com/images/public/6a83f7bb40908e6fb16fa338/9fcd40538_generated_image.png',
    description: 'Heavy-duty 55ppm departmental mono MFP with 300-sheet DSDF dual scanner (240spm), robust dual cassettes, and high-capacity toner.'
  },
  {
    id: '6a844bf1c837e8c122e4fbc0',
    model: 'e-STUDIO 6528A',
    colour: 'mono',
    format: 'A3',
    speed_ppm: 65,
    duty_cycle: 590000,
    base_hardware_price: 74100, // PDF Page 6: R56,900 machine + R15,200 MR4010 + R1,200 MH5000 + R800 INLINE = R74,100
    volume_tier: 'enterprise',
    featured: false,
    image_url: 'https://media.base44.com/images/public/6a83f7bb40908e6fb16fa338/9fcd40538_generated_image.png',
    description: 'High-speed 65ppm mono MFP for mission-critical administrative workgroups. DSDF 240spm scanner, secure SSD, and extensive finisher support.'
  },
  {
    id: '6a844bf1c837e8c122e4fbc4',
    model: 'e-STUDIO 3025AC',
    colour: 'colour',
    format: 'A3',
    speed_ppm: 30,
    duty_cycle: 120000,
    base_hardware_price: 68000, // PDF Page 17: R43,504 machine + R15,200 DSDF + R1,200 stand + R7,296 toners + R800 INLINE = R68,000
    volume_tier: 'medium_volume',
    featured: false,
    image_url: 'https://media.base44.com/images/public/6a83f7bb40908e6fb16fa338/829adce10_generated_image.png',
    description: 'Premium 30ppm A3 colour MFP bundle featuring 300-sheet DSDF dual scanner (240spm), 10.1-inch pivoting display, stand, and full toner set.'
  },
  {
    id: '6a844bf1c837e8c122e4fbc5',
    model: 'e-STUDIO 3525AC',
    colour: 'colour',
    format: 'A3',
    speed_ppm: 35,
    duty_cycle: 150000,
    base_hardware_price: 71000, // PDF Page 17: R46,504 machine + R15,200 DSDF + R1,200 stand + R7,296 toners + R800 INLINE = R71,000
    volume_tier: 'medium_volume',
    featured: false,
    image_url: 'https://media.base44.com/images/public/6a83f7bb40908e6fb16fa338/829adce10_generated_image.png',
    description: 'Fast 35ppm A3 colour powerhouse with dual DSDF scanner (240spm), 1200x1200dpi mono/colour clarity, voice guidance, and full toner kit.'
  },
  {
    id: '6a844bf1c837e8c122e4fbc6',
    model: 'e-STUDIO 4525AC',
    colour: 'colour',
    format: 'A3',
    speed_ppm: 45,
    duty_cycle: 200000,
    base_hardware_price: 79500, // PDF Page 17-18: R55,004 machine + R15,200 DSDF + R1,200 stand + R7,296 toners + R800 INLINE = R79,500
    volume_tier: 'medium_volume',
    featured: false,
    image_url: 'https://media.base44.com/images/public/6a83f7bb40908e6fb16fa338/829adce10_generated_image.png',
    description: 'High-speed 45ppm A3 colour MFP bundle with 300-sheet DSDF dual scanner (240spm), 2x550 cassettes, stand, and complete toner co-pack.'
  },
  {
    id: '6a844bf1c837e8c122e4fbc7',
    model: 'e-STUDIO 5525AC',
    colour: 'colour',
    format: 'A3',
    speed_ppm: 55,
    duty_cycle: 250000,
    base_hardware_price: 83000, // PDF Page 18: R58,504 machine + R15,200 DSDF + R1,200 stand + R7,296 toners + R800 INLINE = R83,000
    volume_tier: 'enterprise',
    featured: false,
    image_url: 'https://media.base44.com/images/public/6a83f7bb40908e6fb16fa338/829adce10_generated_image.png',
    description: '55ppm high-volume A3 colour workhorse featuring 300-sheet DSDF dual scanner (240spm), 6GB RAM, advanced security, and full toner set.'
  },
  {
    id: '6a844bf1c837e8c122e4fbc8',
    model: 'e-STUDIO 6525AC',
    colour: 'colour',
    format: 'A3',
    speed_ppm: 65,
    duty_cycle: 300000,
    base_hardware_price: 89500, // PDF Page 18-19: R65,004 machine + R15,200 DSDF + R1,200 stand + R7,296 toners + R800 INLINE = R89,500
    volume_tier: 'enterprise',
    featured: false,
    image_url: 'https://media.base44.com/images/public/6a83f7bb40908e6fb16fa338/829adce10_generated_image.png',
    description: '65ppm high-speed A3 colour MFP with 300-sheet DSDF dual scanner, enterprise security, cloud integration, and complete toner kit.'
  },
  {
    id: '6a844bf1c837e8c122e4fbc1',
    model: 'e-STUDIO 6529A',
    colour: 'mono',
    format: 'A3',
    speed_ppm: 65,
    duty_cycle: 500000,
    base_hardware_price: 103000, // PDF Page 9: R99,813 machine + R2,387 T9029 toner + R800 INLINE = R103,000
    volume_tier: 'enterprise',
    featured: false,
    image_url: 'https://media.base44.com/images/public/6a83f7bb40908e6fb16fa338/9fcd40538_generated_image.png',
    description: 'Monochrome A3 production MFP offering 65 ppm with 3,520-sheet tandem drawer, 240spm DSDF dual scanner, OCR, and 106,600-print toner co-pack.'
  },
  {
    id: '6a844bf1c837e8c122e4fbc3',
    model: 'e-STUDIO 9029A',
    colour: 'mono',
    format: 'A3',
    speed_ppm: 90,
    duty_cycle: 750000,
    base_hardware_price: 118650, // PDF Page 9: R115,463 machine + R2,387 T9029 toner + R800 INLINE = R118,650
    volume_tier: 'enterprise',
    featured: true,
    image_url: 'https://media.base44.com/images/public/6a83f7bb40908e6fb16fa338/9fcd40538_generated_image.png',
    description: 'Ultra-high-speed 90ppm monochrome production flagship. 3,520-sheet tandem drawer, 240spm DSDF scanner, integrated OCR, and heavy-duty reliability.'
  },
  {
    id: '6a844bf1c837e8c122e4fbb7',
    model: 'e-STUDIO 6526AC',
    colour: 'colour',
    format: 'A3',
    speed_ppm: 65,
    duty_cycle: 540000,
    base_hardware_price: 122800, // PDF Page 21: R109,156 machine + R12,844 TFC727 toners + R800 INLINE = R122,800
    volume_tier: 'enterprise',
    featured: false,
    image_url: 'https://media.base44.com/images/public/6a83f7bb40908e6fb16fa338/829adce10_generated_image.png',
    description: '65ppm high-volume colour/mono enterprise engine with 3,400-sheet capacity, 240spm DSDF scanner, auto skew correction, and complete high-yield toners.'
  },
  {
    id: '6a844bf1c837e8c122e4fbb8',
    model: 'e-STUDIO 7527AC',
    colour: 'colour',
    format: 'A3',
    speed_ppm: 75,
    duty_cycle: 600000,
    base_hardware_price: 126000, // PDF Page 21: R112,356 machine + R12,844 TFC727 toners + R800 INLINE = R126,000
    volume_tier: 'enterprise',
    featured: true,
    image_url: 'https://media.base44.com/images/public/6a83f7bb40908e6fb16fa338/829adce10_generated_image.png',
    description: 'The King! 75ppm colour / 85ppm mono enterprise flagship. 3,400-sheet capacity, motion sensor, 240spm DSDF scanner, and maximum durability.'
  }
];

export const BASE44_PRINTERS: Base44Printer[] = RAW_PRINTERS.map((p) => {
  const pricing = calculateHardwarePricing(p.base_hardware_price, p.colour);
  return {
    ...p,
    tp_link_addon: pricing.tpLinkAddon,
    markup_category: pricing.markupCategory,
    markup_tier: pricing.markupTier,
    final_hardware_price: pricing.finalHardwarePrice,
    rental_60mo_0esc: pricing.rental60mo,
    rental_36mo_0esc: pricing.rental36mo,
    monthly_rental: pricing.rental60mo, // Always start with 60m @ 0% escalation
    kago_factor_60: pricing.factor60,
    kago_factor_36: pricing.factor36,
    kago_band: pricing.bandLabel,
  };
});

export interface MatcherAnswers {
  colour: 'colour' | 'mono' | 'both' | null;
  format: 'A4' | 'A3' | 'both' | null;
  volume: 'under_5k' | '5k_15k' | '15k_45k' | '45k_plus' | string | null;
  wifi: 'yes' | 'no' | 'flexible' | null;
}

export function filterCandidatePrinters(
  printers: Base44Printer[],
  answers: MatcherAnswers
): Base44Printer[] {
  if (!printers || printers.length === 0) return [];
  let pool = printers.slice();

  // 1. Colour Requirement: 'colour' | 'mono' | 'both'
  if (answers.colour === 'colour') {
    pool = pool.filter((p) => p.colour === 'colour');
  } else if (answers.colour === 'mono') {
    pool = pool.filter((p) => p.colour === 'mono');
  } else if (answers.colour === 'both') {
    // Both requires colour + mono documents. All Toshiba colour MFPs print both.
    const colourMFPs = pool.filter((p) => p.colour === 'colour');
    if (colourMFPs.length > 0) {
      pool = colourMFPs;
    }
  }

  // 2. Format Requirement: 'A4' | 'A3' | 'both'
  if (answers.format === 'A4') {
    const a4Only = pool.filter((p) => p.format === 'A4');
    if (a4Only.length > 0 && answers.volume !== '45k_plus') {
      pool = a4Only;
    }
  } else if (answers.format === 'A3' || answers.format === 'both') {
    // Both A3 & A4 are accommodated by A3 floor systems with multi-cassette drawers
    const a3Floor = pool.filter((p) => p.format === 'A3');
    if (a3Floor.length > 0) {
      pool = a3Floor;
    }
  }

  // 3. Monthly Volume / Duty Cycle Requirement
  const volumeRequirements: Record<string, number> = {
    under_5k: 25000,
    '5k_15k': 50000,
    '15k_45k': 100000,
    '45k_plus': 200000,
    small_office: 25000,
    medium_volume: 60000,
    enterprise: 200000,
  };
  const minDuty = (answers.volume && volumeRequirements[answers.volume]) || 25000;
  const volumePool = pool.filter((p) => p.duty_cycle >= minDuty);
  if (volumePool.length > 0) {
    pool = volumePool;
  }

  // 4. Wi-Fi Preference
  if (answers.wifi === 'yes') {
    const wifiReady = pool.filter((p) => p.wifi !== false);
    if (wifiReady.length > 0) {
      pool = wifiReady;
    }
  }

  // Sort by lowest monthly rental price (honest recommendation, no overselling)
  return pool.slice().sort((a, b) => a.monthly_rental - b.monthly_rental);
}

export function matchBestFitPrinter(
  printers: Base44Printer[],
  answers: MatcherAnswers
): Base44Printer | null {
  if (!answers || !answers.colour || !answers.format || !answers.volume || !answers.wifi) {
    return null;
  }
  const ranked = filterCandidatePrinters(printers, answers);
  return ranked.length > 0 ? ranked[0] : printers[0] || null;
}

export function getAlternativePrinter(
  printers: Base44Printer[],
  answers: MatcherAnswers,
  excludeId?: string
): Base44Printer | null {
  const ranked = filterCandidatePrinters(printers, answers);
  const remaining = ranked.filter((p) => p.id !== excludeId);
  return remaining.length > 0 ? remaining[0] : null;
}
