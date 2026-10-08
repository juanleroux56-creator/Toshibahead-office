import { PrinterModel } from '../types';

export const TOSHIBA_CATALOG: PrinterModel[] = [
  // 1. A4 MONO DESKTOP - e-STUDIO 409S
  {
    id: 'toshiba-estudio-409s',
    modelNumber: 'e-STUDIO 409S',
    name: 'Toshiba e-STUDIO 409S',
    category: 'mono',
    format: 'A4',
    volumeTier: 'small',
    speed: 42,
    speedText: '42 ppm (A4 Mono)',
    dutyCycleText: 'Up to 20,000 pages/mo (80k max)',
    maxMonthlyVolume: 20000,
    rental36moZAR: 690,
    rental60moZAR: 550,
    outrightPriceZAR: 13950,
    badge: 'Compact Desktop Mono',
    popularFor: 'Medical practices, boutique legal offices, satellite workstations',
    image: '/images/toshiba_a4_desktop.jpg',
    imageUrl: '/images/toshiba_a4_desktop.jpg',
    description: 'Compact, high-speed tabletop A4 monochrome multifunction system with built-in duplex copying/printing, colour scanning, and high-speed network connectivity.',
    keyNotes: [
      '42 pages per minute print & copy speed',
      'Standard 350 sheets (expandable to 900 sheets)',
      '2.8" Colour LCD Touch Screen',
      'Single-pass duplex document feeder (50 sheets)',
      'AirPrint, Mopria & e-BRIDGE Print & Capture support'
    ]
  },

  // 3. A4 ADVANCED COLOUR MFP - e-STUDIO 330AC / 400AC
  {
    id: 'toshiba-estudio-330ac',
    modelNumber: 'e-STUDIO 330AC',
    name: 'Toshiba e-STUDIO 330AC',
    category: 'color',
    format: 'A4',
    volumeTier: 'small',
    speed: 33,
    speedText: '33 ppm (A4 Colour & Mono)',
    dutyCycleText: 'Up to 45,000 pages/mo',
    maxMonthlyVolume: 45000,
    rental36moZAR: 1090,
    rental60moZAR: 890,
    outrightPriceZAR: 26900,
    badge: 'Full e-BRIDGE A4 Colour',
    popularFor: 'Real estate agencies, executive suites, marketing & design teams',
    image: '/images/toshiba_a4_desktop.jpg',
    imageUrl: '/images/toshiba_a4_desktop.jpg',
    description: 'Enterprise-grade A4 colour MFP featuring the full 10.1" e-BRIDGE Next touchscreen controller, cloud connector apps, and 320GB Secure HDD encryption.',
    keyNotes: [
      '33 ppm colour/mono with 1,200 x 1,200 dpi resolution',
      'Large 10.1" tablet-style customizable touch screen',
      'Dual-Scan Document Feeder holding 100 originals (116 ipm)',
      'Direct Microsoft 365, OneDrive & Google Drive integration',
      '320 GB Toshiba Self-Encrypting Secure HDD'
    ]
  },

  // 4. COMPACT A4 FOOTPRINT WITH A3 PRINTING - e-STUDIO 2822AF
  {
    id: 'toshiba-estudio-2822af',
    modelNumber: 'e-STUDIO 2822AF',
    name: 'Toshiba e-STUDIO 2822AF (Hybrid A4/A3)',
    category: 'mono',
    format: 'A3',
    volumeTier: 'small',
    speed: 28,
    speedText: '28 ppm (A4) / 14 ppm (A3)',
    dutyCycleText: 'Up to 25,000 pages/mo',
    maxMonthlyVolume: 25000,
    rental36moZAR: 790,
    rental60moZAR: 650,
    outrightPriceZAR: 17500,
    badge: 'Space-Saving A3 Hybrid',
    popularFor: 'Warehouses, small architectural practices, site offices',
    image: '/images/toshiba_compact_hybrid.jpg',
    imageUrl: '/images/toshiba_compact_hybrid.jpg',
    description: 'Ingenious space-saving MFP with a compact A4 desktop footprint that can effortlessly print, scan, and copy full A3 format documents via bypass and feeder.',
    keyNotes: [
      'Print, scan, fax, and copy in A3 on an A4 desktop footprint',
      '28 pages per minute output speed',
      'Built-in automatic document feeder & automatic duplex',
      'Internal toner recycling system & energy-save modes',
      'Direct USB print and mobile scan integration'
    ]
  },

  // 5. A3 COLOUR WORKHORSE - e-STUDIO 2021AC / 2521AC / 2525AC
  {
    id: 'toshiba-estudio-2521ac',
    modelNumber: 'e-STUDIO 2521AC',
    name: 'Toshiba e-STUDIO 2521AC',
    category: 'color',
    format: 'A3',
    volumeTier: 'medium',
    speed: 25,
    speedText: '25 ppm (A3 & A4 Colour/Mono)',
    dutyCycleText: 'Up to 75,000 pages/mo',
    maxMonthlyVolume: 75000,
    rental36moZAR: 1390,
    rental60moZAR: 1150,
    outrightPriceZAR: 36900,
    badge: 'Top Seller Gauteng',
    popularFor: 'Corporate offices (10–35 users), schools, engineering consultancies',
    image: '/images/toshiba_a3_colour.jpg',
    imageUrl: '/images/toshiba_a3_colour.jpg',
    description: 'The standard-bearer for South African corporate offices. Dual A3/A4 paper drawers, high-capacity toner cartridges, tablet touchscreen, and cloud-ready security.',
    keyNotes: [
      '25 ppm A4 / 12 ppm A3 full colour and monochrome',
      'Standard 26 cm (10.1") multi-touch tablet colour display',
      'Reversing or Dual-Scan document feeder options up to 73 ipm',
      'Security SSD with 128GB encryption & POPIA/GDPR compliance',
      'e-BRIDGE Plus cloud apps for OneDrive, Google Drive & SharePoint'
    ]
  },

  // 6. A3 COLOUR HIGH-SPEED - e-STUDIO 3525AC / 4525AC
  {
    id: 'toshiba-estudio-3525ac',
    modelNumber: 'e-STUDIO 3525AC',
    name: 'Toshiba e-STUDIO 3525AC',
    category: 'color',
    format: 'A3',
    volumeTier: 'medium',
    speed: 35,
    speedText: '35 ppm (A3 & A4 Colour/Mono)',
    dutyCycleText: 'Up to 105,000 pages/mo',
    maxMonthlyVolume: 105000,
    rental36moZAR: 1790,
    rental60moZAR: 1450,
    outrightPriceZAR: 46800,
    badge: 'Fast Workgroup Choice',
    popularFor: 'Busy accounting departments, law firms, financial institutions',
    image: '/images/toshiba_a3_colour.jpg',
    imageUrl: '/images/toshiba_a3_colour.jpg',
    description: 'High-throughput A3 colour MFP engineered for fast document turnaround, multi-page batch scanning, and high monthly print volumes.',
    keyNotes: [
      '35 ppm A4 / 18 ppm A3 colour & mono',
      'Dual Scan Document Feeder (DSDF) up to 240 images per minute',
      'Up to 5,200-sheet maximum paper capacity',
      'Embedded OCR for searchable PDF, Word & Excel document creation',
      'Modular staple finisher, hole punch, and saddle-stitch options'
    ]
  },

  // 7. A3 MONO WORKHORSE - e-STUDIO 2528A / 3028A
  {
    id: 'toshiba-estudio-2528a',
    modelNumber: 'e-STUDIO 2528A',
    name: 'Toshiba e-STUDIO 2528A',
    category: 'mono',
    format: 'A3',
    volumeTier: 'medium',
    speed: 25,
    speedText: '25 ppm (A3 & A4 Mono)',
    dutyCycleText: 'Up to 80,000 pages/mo',
    maxMonthlyVolume: 80000,
    rental36moZAR: 990,
    rental60moZAR: 820,
    outrightPriceZAR: 29500,
    badge: 'Most Cost-Effective A3',
    popularFor: 'Logistics hubs, manufacturing floors, legal archives, invoicing',
    image: '/images/toshiba_a3_mono.jpg',
    imageUrl: '/images/toshiba_a3_mono.jpg',
    description: 'Heavy-duty monochrome workgroup system delivering lowest cost per page, maximum cartridge yield, and full A3 ledger handling.',
    keyNotes: [
      '25 ppm A4 mono with 2,400 x 600 dpi equivalent resolution',
      'Dual 550-sheet cassettes + 100-sheet bypass (expandable to 5,200 sheets)',
      '10.1" Tilting tablet interface with gesture swipe navigation',
      'Ultra-high-yield 43,900-page toner cartridge',
      'Proactive service diagnostics via e-BRIDGE CloudConnect'
    ]
  },

  // 8. A3 MONO HIGH SPEED - e-STUDIO 4528A / 5528A
  {
    id: 'toshiba-estudio-4528a',
    modelNumber: 'e-STUDIO 4528A',
    name: 'Toshiba e-STUDIO 4528A',
    category: 'mono',
    format: 'A3',
    volumeTier: 'enterprise',
    speed: 45,
    speedText: '45 ppm (A3 & A4 Mono)',
    dutyCycleText: 'Up to 150,000 pages/mo',
    maxMonthlyVolume: 150000,
    rental36moZAR: 1590,
    rental60moZAR: 1290,
    outrightPriceZAR: 43200,
    badge: 'High Speed Mono',
    popularFor: 'Educational exam centres, distribution centres, high-volume billing',
    image: '/images/toshiba_a3_mono.jpg',
    imageUrl: '/images/toshiba_a3_mono.jpg',
    description: 'High-speed monochrome powerhouse built for nonstop document production, heavy duty cycles, and automated document capture.',
    keyNotes: [
      '45 ppm fast monochrome output',
      '5,200-sheet maximum paper capacity (with tandem LCF)',
      'Dual-Scan Document Feeder holding 300 originals (240 ipm)',
      'Self-Encrypting SSD with automatic data overwrite security',
      'Heavy stock support up to 300 gsm'
    ]
  },

  // 9. A3 COLOUR PRODUCTION ENTERPRISE - e-STUDIO 6526AC / 7527AC
  {
    id: 'toshiba-estudio-7527ac',
    modelNumber: 'e-STUDIO 7527AC',
    name: 'Toshiba e-STUDIO 7527AC (High-Speed Colour)',
    category: 'color',
    format: 'A3',
    volumeTier: 'enterprise',
    speed: 75,
    speedText: '75 ppm Colour / 85 ppm Mono',
    dutyCycleText: 'Up to 480,000 pages/mo',
    maxMonthlyVolume: 480000,
    rental36moZAR: 2890,
    rental60moZAR: 2350,
    outrightPriceZAR: 78500,
    badge: 'Production Colour Press',
    popularFor: 'Headquarters copy rooms, advertising agencies, large colleges',
    image: '/images/toshiba_high_speed.jpg',
    imageUrl: '/images/toshiba_high_speed.jpg',
    description: 'Flagship enterprise colour multifunction press delivering blazing 75 ppm colour / 85 ppm mono speeds, on-the-fly toner replacement, and multi-staple finishing.',
    keyNotes: [
      '75 ppm colour & 85 ppm monochrome high-volume output',
      '8,020-sheet maximum paper capacity with external Large Capacity Feeder',
      'Toner Change On-The-Fly (replace toner while printer is running)',
      'Dual-Scan Document Feeder (300 originals, 240 ipm with double feed detection)',
      'Saddle-stitch booklet maker, hole punch & tri-folding modular options'
    ]
  },

  // 10. A3 MONO PRODUCTION PRESS - e-STUDIO 6529A / 9029A
  {
    id: 'toshiba-estudio-9029a',
    modelNumber: 'e-STUDIO 9029A',
    name: 'Toshiba e-STUDIO 9029A (High-Speed Mono)',
    category: 'mono',
    format: 'A3',
    volumeTier: 'enterprise',
    speed: 90,
    speedText: '90 ppm (Heavy Production Mono)',
    dutyCycleText: 'Up to 600,000 pages/mo',
    maxMonthlyVolume: 600000,
    rental36moZAR: null, // "Contact for quote"
    rental60moZAR: null, // "Contact for quote"
    outrightPriceZAR: null, // "Contact for quote"
    badge: 'Commercial Production Mono',
    popularFor: 'Commercial print shops, government departments, university print rooms',
    image: '/images/toshiba_high_speed.jpg',
    imageUrl: '/images/toshiba_high_speed.jpg',
    description: 'Ultra-high-volume monochrome printing press engineered for continuous 24/7 heavy document cycles with up to 90 pages per minute and 8,020 sheet capacity.',
    keyNotes: [
      '90 ppm continuous heavy production speed',
      '8,020-sheet maximum paper input capacity',
      'Toner replacement on-the-fly without stopping active print jobs',
      'Fast 4.1-second first-copy output time',
      'Heavy-duty commercial booklet finisher & trimmer units'
    ]
  }
];

export const GAUTENG_LOCATIONS = [
  'Sandton & Bryanston',
  'Rosebank & Melrose',
  'Johannesburg CBD',
  'Midrand & Waterfall',
  'Pretoria East & Hatfield',
  'Centurion',
  'Pretoria CBD & Silverton',
  'Bedfordview & Edenvale',
  'Kempton Park & O.R. Tambo',
  'Boksburg, Benoni & East Rand',
  'Randburg & Northcliff',
  'Roodepoort & West Rand',
  'Fourways & Sunninghill',
  'Other Gauteng Location'
];
