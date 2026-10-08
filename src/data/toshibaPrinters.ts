// Official Toshiba e-STUDIO Product Catalog from Toshiba Head Office

export interface ToshibaPrinterSpec {
  imaging?: string;
  processor?: string;
  memory?: string;
  paperCapacity?: string;
  paperSize?: string;
  display?: string;
  warmUpTime?: string;
  powerConsumption?: string;
  dimensions?: string;
  weight?: string;
  [key: string]: string | undefined;
}

export interface ToshibaPrinter {
  id: string;
  model: string;
  tagline: string;
  description: string;
  category: "mono" | "colour";
  format: "A4" | "A3";
  speed: number;
  rentalFrom?: string;
  dutyCycle?: string;
  inStock?: boolean;
  featured?: boolean;
  image: string;
  brochureUrl?: string;
  youtubeId?: string;
  specs: ToshibaPrinterSpec;
}

export const TOSHIBA_PRINTERS: ToshibaPrinter[] = [
  {
    "id": "2822af",
    "model": "e-STUDIO 2822AF",
    "tagline": "Compact A4 footprint with full A3 scanning & fax",
    "description": "Brings all the applications smaller workgroups need in one place. Print, scan, copy, and fax \u2014 with a compact A4 footprint that handles A3 via the ADF and bypass tray. One of the lowest Total Cost of Ownership in this category with a long-life design.",
    "category": "mono",
    "format": "A3",
    "speed": 28,
    "inStock": true,
    "featured": true,
    "image": "https://hercules-cdn.com/file_wW4tj6Z6ShT5kg4pJF9Ic6YK",
    "brochureUrl": "https://hercules-cdn.com/file_f7PilYbNFKUXlCy5qPriAbER",
    "specs": {
      "imaging": "Indirect electrostatic photographic method",
      "processor": "ARM Cortex-A8 500 MHz",
      "memory": "512 MB RAM",
      "paperCapacity": "300 sheets standard (250-sheet cassette + 50-sheet bypass); inner output tray 100 sheets",
      "paperSize": "A4/A3 via ADF and bypass tray",
      "dimensions": "W390 \u00d7 D540 \u00d7 H505 mm",
      "weight": "~28.5 kg",
      "warmUpTime": "Approx. 18 seconds from power-on"
    },
    "youtubeId": "F-qJOgrwmCU"
  },
  {
    "id": "409s",
    "model": "e-STUDIO 409S",
    "tagline": "Fast compact A4 mono workhorse \u2014 desktop friendly",
    "description": "Everything you need to get the job done in less space than the average office chair. Copy, print, scan and fax at 42 PPM with AirPrint and Mopria support. Fits nicely on most desktops. Our most accessible rental option, ideal for small teams and high-volume document printing.",
    "category": "mono",
    "format": "A4",
    "speed": 42,
    "rentalFrom": "R450/month",
    "featured": true,
    "image": "https://hercules-cdn.com/file_5veLrOqhsQFFc51Rot0GQfVs",
    "brochureUrl": "https://hercules-cdn.com/file_3GF8g1qN3InZSSR5PC3sOvY3",
    "specs": {
      "imaging": "Indirect Electrostatic Photographic Method / OPC / Laser / Heat Roller Fusing",
      "processor": "1.0 GHz Dual-Core",
      "memory": "512 MB",
      "paperCapacity": "350 sheets standard (250-sheet drawer + 100-sheet bypass); max 900 sheets",
      "paperSize": "A6 to A4/Legal (drawer); A6 to Legal (bypass)",
      "display": "2.8\" Colour LCD Touch Panel",
      "warmUpTime": "Less than 90 seconds",
      "powerConsumption": "Maximum 1.5 kW (120V)",
      "dimensions": "W412 \u00d7 D366 \u00d7 H338 mm",
      "weight": "~12.8 kg"
    },
    "youtubeId": "Jj1xcHPoP4w"
  },
  {
    "id": "449s",
    "model": "e-STUDIO 449S",
    "tagline": "Next-gen A4 mono MFP with TPM security at 44 PPM",
    "description": "High-performance A4 monochrome MFP delivering 44 PPM with state-of-the-art Trusted Platform Module (TPM) security, low energy consumption, and a 4.3\" colour touch panel. Engineered for medium-sized workgroups requiring reliable, secure, and cost-effective mono printing.",
    "category": "mono",
    "format": "A4",
    "speed": 44,
    "featured": false,
    "image": "https://hercules-cdn.com/file_j2criDVtrxO3U7Ser9w1JZjq",
    "brochureUrl": "https://hercules-cdn.com/file_fC30MqHKxCus0VpL6GgMv5bM",
    "specs": {
      "memory": "2 GB RAM (incl. 128 GB Intelligent Storage Device)",
      "paperCapacity": "650 sheets standard (1\u00d7 550-sheet cassette + 100-sheet bypass); max 2,300 sheets",
      "paperSize": "A6\u2013A4, 60\u2013120 g/m\u00b2; Bypass: 76\u00d7148 mm \u2013 215\u00d7359 mm, 60\u2013216 g/m\u00b2",
      "display": "10.9 cm (4.3\") colour touch panel (tiltable)",
      "warmUpTime": "~9 seconds from sleep mode",
      "dimensions": "W479 \u00d7 D450 \u00d7 H514 mm",
      "weight": "~21.2 kg"
    }
  },
  {
    "id": "2329a",
    "model": "e-STUDIO 2329A",
    "tagline": "Compact A3 mono MFP for small teams",
    "description": "Perfect compact A3 mono MFP for smaller teams who occasionally need A3 output without committing to a full-size machine. 23 PPM with standard duplex, scan and optional fax.",
    "category": "mono",
    "format": "A3",
    "speed": 23,
    "image": "https://hercules-cdn.com/file_3y7B7y2zMFEMCX5wtTplJ3Lr",
    "brochureUrl": "https://hercules-cdn.com/file_jcSaInQ8ztMi9ZlQ5sjG2TOG",
    "specs": {
      "processor": "ARM Cortex-A8 500 MHz",
      "memory": "512 MB RAM",
      "paperCapacity": "350 sheets standard (250-sheet cassette + 100-sheet bypass); max 1,700 sheets",
      "warmUpTime": "~15 seconds"
    }
  },
  {
    "id": "2528a",
    "model": "e-STUDIO 2528A",
    "tagline": "Reliable A3 mono MFP for high-volume document handling",
    "description": "Reliable A3 mono MFP for high-volume document handling and duplex scanning. An outstanding workhorse for legal, accounting and engineering firms. Advanced security features and cloud connectivity.",
    "category": "mono",
    "format": "A3",
    "speed": 25,
    "featured": true,
    "image": "https://hercules-cdn.com/file_3y7B7y2zMFEMCX5wtTplJ3Lr",
    "specs": {
      "memory": "4 GB RAM; 128 GB SSD standard",
      "paperCapacity": "350 sheets standard; max 2,900 sheets with optional LCF",
      "paperSize": "A3\u2013A6",
      "dimensions": "585 \u00d7 586 \u00d7 662 mm (W \u00d7 D \u00d7 H)",
      "weight": "< 58.9 kg",
      "warmUpTime": "~21 seconds (power-on); < 13.1 seconds (sleep/low power)"
    },
    "youtubeId": "F-qJOgrwmCU"
  },
  {
    "id": "3028a",
    "model": "e-STUDIO 3028A",
    "tagline": "Dependable A3 mono MFP at 30 PPM",
    "description": "Dependable A3 mono output at 30 PPM with advanced finishing and security features for mid-size to large business needs. AirPrint, Mopria, and cloud-ready.",
    "category": "mono",
    "format": "A3",
    "speed": 30,
    "image": "https://hercules-cdn.com/file_3y7B7y2zMFEMCX5wtTplJ3Lr",
    "specs": {
      "memory": "4 GB RAM; 128 GB SSD standard",
      "paperCapacity": "350 sheets standard; max 2,900 sheets",
      "paperSize": "A3\u2013A6"
    }
  },
  {
    "id": "3528a",
    "model": "e-STUDIO 3528A",
    "tagline": "High-speed A3 mono MFP at 35 PPM",
    "description": "High-speed A3 mono at 35 PPM \u2014 ideal for offices with demanding print volumes that require fast, reliable output every day. Fully duplex with advanced scan workflows.",
    "category": "mono",
    "format": "A3",
    "speed": 35,
    "image": "https://hercules-cdn.com/file_3y7B7y2zMFEMCX5wtTplJ3Lr",
    "specs": {
      "memory": "4 GB RAM; 128 GB SSD standard",
      "paperCapacity": "350 sheets standard; max 2,900 sheets",
      "paperSize": "A3\u2013A6"
    }
  },
  {
    "id": "4528a",
    "model": "e-STUDIO 4528A",
    "tagline": "Power A3 mono MFP at 45 PPM",
    "description": "Power-level A3 mono output at 45 PPM for large offices and document centres with high monthly volumes. Built-in security, cloud apps, and optional finishing.",
    "category": "mono",
    "format": "A3",
    "speed": 45,
    "image": "https://hercules-cdn.com/file_Sk11YuVLQwlhXygTGcEisVQi",
    "specs": {
      "memory": "6 GB RAM; 128 GB SSD",
      "paperCapacity": "Up to 3,550 sheets",
      "paperSize": "A3\u2013A6"
    }
  },
  {
    "id": "5528a",
    "model": "e-STUDIO 5528A",
    "tagline": "Enterprise A3 mono MFP at 55 PPM",
    "description": "Enterprise-class A3 mono MFP delivering 55 PPM with full finishing options and advanced security for large print environments.",
    "category": "mono",
    "format": "A3",
    "speed": 55,
    "image": "https://hercules-cdn.com/file_Sk11YuVLQwlhXygTGcEisVQi",
    "specs": {
      "memory": "6 GB RAM; 128 GB SSD",
      "paperCapacity": "Up to 3,550 sheets",
      "paperSize": "A3\u2013A6"
    }
  },
  {
    "id": "6528a",
    "model": "e-STUDIO 6528A",
    "tagline": "Top-tier A3 mono MFP at 65 PPM",
    "description": "Top-tier A3 mono MFP at 65 PPM. Designed for the most demanding environments that require maximum uptime and print capacity.",
    "category": "mono",
    "format": "A3",
    "speed": 65,
    "image": "https://hercules-cdn.com/file_Sk11YuVLQwlhXygTGcEisVQi",
    "specs": {
      "memory": "6 GB RAM; 128 GB SSD",
      "paperCapacity": "Up to 3,550 sheets",
      "paperSize": "A3\u2013A6"
    }
  },
  {
    "id": "6529a",
    "model": "e-STUDIO 6529A",
    "tagline": "High-speed A3 mono production MFP at 65 PPM",
    "description": "Production-grade A3 mono MFP delivering 65 PPM with a 10.1\" multi-touch panel, 300-sheet dual-scan document feeder, and enterprise-class security including TPM 2.0 and anti-malware.",
    "category": "mono",
    "format": "A3",
    "speed": 65,
    "featured": false,
    "image": "https://hercules-cdn.com/file_Sk11YuVLQwlhXygTGcEisVQi",
    "brochureUrl": "https://hercules-cdn.com/file_sM6jbC91iGAQtYnfN36pEP5m",
    "specs": {
      "memory": "6 GB RAM; 128 GB Security SSD (standard)",
      "paperCapacity": "Up to 8,020 sheets (with tandem LCF); standard 3,520 sheets",
      "paperSize": "A3\u2013A6, banner up to 313.4\u00d71,200 mm, 60\u2013300 g/m\u00b2",
      "display": "26 cm (10.1\") Multi-Touch Colour Panel",
      "warmUpTime": "~15 seconds from low-power mode",
      "dimensions": "W955 \u00d7 D698 \u00d7 H1,227 mm",
      "weight": "~193 kg"
    }
  },
  {
    "id": "331ac",
    "model": "e-STUDIO 331AC",
    "tagline": "Compact A4 colour MFP \u2014 35 PPM with 10.1\" touch screen",
    "description": "Compact A4 colour MFP built for every workplace. 35 PPM colour and mono, 10.1\" customisable touch panel, dual-scan document feeder at 82 PPM colour / 120 PPM mono, AirPrint, Mopria, and extensive cloud app support. Advanced security with ISO/IEC 15408 CC certification.",
    "category": "colour",
    "format": "A4",
    "speed": 35,
    "featured": true,
    "image": "https://toshibagauteng.co.za/product-images/E-Studio-330CS-Front.webp",
    "brochureUrl": "https://hercules-cdn.com/file_GuGK1IS1xPBDrTuj0s0BImIK",
    "specs": {
      "imaging": "Indirect Electrostatic Photographic Method / OPC / LED. Heat Roller Fusing",
      "processor": "Intel E3930 1.3 GHz Dual-Core",
      "memory": "4 GB RAM; 256 GB SSD Self-Encrypting Drive",
      "paperCapacity": "650 sheets standard (550-sheet cassette + 100-sheet bypass); max 3,200 sheets",
      "paperSize": "A4 to 3.9\"\u00d75.8\"; bypass up to 8.5\"\u00d752\" banner",
      "display": "10.1\" Colour WSVGA Touch Screen (tilting)",
      "warmUpTime": "Approx. 20 seconds",
      "powerConsumption": "Maximum 1.5 kW (120V)",
      "dimensions": "W520 \u00d7 D540 \u00d7 H634 mm",
      "weight": "~45 kg"
    },
    "youtubeId": "Jj1xcHPoP4w"
  },
  {
    "id": "2021ac",
    "model": "e-STUDIO 2021AC",
    "tagline": "Versatile A3 colour MFP \u2014 20 PPM for growing offices",
    "description": "A spectacular A3 colour multifunction printer that every growing office needs. 20 PPM colour and mono, 128 GB SSD, TPM 2.0 anti-malware security, AirPrint, Mopria and extensive cloud app support. Standard duplex and optional 100-sheet RADF.",
    "category": "colour",
    "format": "A3",
    "speed": 20,
    "featured": true,
    "image": "https://toshibagauteng.co.za/product-images/E-Studio-2020AC-Front.webp",
    "brochureUrl": "https://hercules-cdn.com/file_nsKfWq4gOEDbWJ1ohTVkMd7R",
    "specs": {
      "memory": "4 GB RAM; 128 GB SSD (standard)",
      "paperCapacity": "350 sheets standard; max 2,900 sheets (with optional LCF)",
      "paperSize": "A3\u2013A6",
      "dimensions": "W585 \u00d7 D586 \u00d7 H662 mm",
      "weight": "< 58.9 kg",
      "warmUpTime": "~21 seconds (power-on); < 13.1 seconds (sleep/low power)"
    }
  },
  {
    "id": "2521ac",
    "model": "e-STUDIO 2521AC",
    "tagline": "High-speed A3 colour MFP \u2014 25 PPM for busy offices",
    "description": "Spectacularly versatile A3 colour multifunction at 25 PPM \u2014 the step-up model from the 2021AC for busier offices. Same enterprise-class security, cloud connectivity, and paper capacity on the identical e-BRIDGE Next platform.",
    "category": "colour",
    "format": "A3",
    "speed": 25,
    "featured": false,
    "image": "https://toshibagauteng.co.za/product-images/E-Studio-2020AC-Front.webp",
    "brochureUrl": "https://hercules-cdn.com/file_nsKfWq4gOEDbWJ1ohTVkMd7R",
    "specs": {
      "memory": "4 GB RAM; 128 GB SSD (standard)",
      "paperCapacity": "350 sheets standard; max 2,900 sheets (with optional LCF)",
      "paperSize": "A3\u2013A6",
      "dimensions": "W585 \u00d7 D586 \u00d7 H662 mm",
      "weight": "< 58.9 kg",
      "warmUpTime": "~21 seconds (power-on); < 13.1 seconds (sleep/low power)"
    }
  },
  {
    "id": "6526ac",
    "model": "e-STUDIO 6526AC",
    "tagline": "High-volume A3 colour production MFP at 65 PPM",
    "description": "A cutting-edge A3 colour production MFP with 65 PPM output, 10.1\" multi-touch panel, 300-sheet dual-scan document feeder at 240 IPM, and enterprise security including TPM 2.0. Cloud-ready with Box, Google Drive, OneDrive and SharePoint support.",
    "category": "colour",
    "format": "A3",
    "speed": 65,
    "image": "https://hercules-cdn.com/file_iFDFkyEZg07ZjZDdF0JdBMEk",
    "brochureUrl": "https://hercules-cdn.com/file_1nzWvno6QunhdAShgRln1B9Z",
    "specs": {
      "memory": "6 GB RAM; 128 GB SSD (standard)",
      "paperCapacity": "3,520 sheets standard (LCF model); max 8,020 sheets",
      "paperSize": "A3\u2013A6; banner paper",
      "display": "26 cm (10.1\") Multi-Touch Colour Panel",
      "warmUpTime": "~20 seconds (power-on); < 15.4 seconds (sleep/low power)",
      "dimensions": "W955 \u00d7 D698 \u00d7 H1,227 mm",
      "weight": "~209 kg"
    }
  },
  {
    "id": "7527ac",
    "model": "e-STUDIO 7527AC",
    "tagline": "Enterprise A3 colour production MFP at 75 PPM",
    "description": "Enterprise-grade A3 colour production MFP at 75 PPM. Features Toner Change On-The-Fly, Multi Station Print Solution (up to 50 MFPs), embedded OCR, PDF/A-2 archival scanning, and full security suite with TPM 2.0.",
    "category": "colour",
    "format": "A3",
    "speed": 75,
    "image": "https://hercules-cdn.com/file_iFDFkyEZg07ZjZDdF0JdBMEk",
    "brochureUrl": "https://hercules-cdn.com/file_1nzWvno6QunhdAShgRln1B9Z",
    "specs": {
      "memory": "6 GB RAM; 128 GB SSD (standard)",
      "paperCapacity": "3,520 sheets standard (LCF model); max 8,020 sheets",
      "paperSize": "A3\u2013A6; banner paper",
      "display": "26 cm (10.1\") Multi-Touch Colour Panel",
      "warmUpTime": "~20 seconds (power-on); < 15.4 seconds (sleep/low power)",
      "dimensions": "W955 \u00d7 D698 \u00d7 H1,227 mm",
      "weight": "~209 kg"
    }
  }
];

export const FEATURED_PRINTERS = TOSHIBA_PRINTERS.filter(p => p.featured);
export const MONO_PRINTERS = TOSHIBA_PRINTERS.filter(p => p.category === "mono");
export const COLOUR_PRINTERS = TOSHIBA_PRINTERS.filter(p => p.category === "colour");
