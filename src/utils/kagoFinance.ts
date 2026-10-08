/**
 * KAGO Finance (Pty) Ltd Lease Rate Factor Sheets
 * Registration number: 2002/013147/07 | Tel: 011 7964800
 * Effective Date: 05-Oct-26
 * 
 * Includes:
 * 1. Copy Type Electronics (Pty) Ltd - Excl. Insurance (05-Oct-26) [Standard Commercial]
 * 2. CPA Factor Sheet - Excluding Insurance (05-Oct-26) [Business and Sole Proprietors - Turnover < 2M]
 * 
 * Notes from KAGO Finance:
 * 1) Above factors are linked to prime with rentals due monthly in advance, excluding VAT and Insurance.
 * 2) All deals require a Debit Order, unless prior written approval is obtained.
 * 3) Special Rates are negotiable as factor is facility based.
 * 4) Payout on any transaction can only be effected once all the terms and conditions of the approval have been met in full.
 * 5) Settlements / upgrades / trade-ins / refurbished goods require upfront disclosure.
 * 6) Subject to the facility approving the deal, the documentation fee may vary.
 * 
 * Calculation formula: Monthly Rental (ex VAT) = Final Hardware Price * Factor
 */

export type LeaseTermMonths = 36 | 48 | 60;
export type EscalationRate = 0 | 5 | 8 | 10 | 12 | 15;
export type CustomerFinanceProfile = 'corporate' | 'sole_proprietor';

export interface KagoFactorBand {
  min: number;
  max: number; // Infinity for top tier
  label: string;
  factors: Record<EscalationRate, Record<LeaseTermMonths, number>>;
}

/**
 * Copy Type Electronics (Pty) Ltd - Excl. Insurance (05-Oct-26)
 * Official corporate commercial lease factors
 */
export const KAGO_COPY_TYPE_TABLE: KagoFactorBand[] = [
  {
    min: 0,
    max: 10000,
    label: 'Under R 10,000',
    factors: {
      15: { 60: 0.02251, 48: 0.02685, 36: 0.03413 },
      12: { 60: 0.02359, 48: 0.02783, 36: 0.03497 },
      10: { 60: 0.02433, 48: 0.02850, 36: 0.03555 },
      8:  { 60: 0.02510, 48: 0.02920, 36: 0.03614 },
      5:  { 60: 0.02629, 48: 0.03027, 36: 0.03705 },
      0:  { 60: 0.02840, 48: 0.03214, 36: 0.03863 },
    },
  },
  {
    min: 10001,
    max: 20000,
    label: 'R 10,001 to R 20,000',
    factors: {
      15: { 60: 0.02207, 48: 0.02642, 36: 0.03372 },
      12: { 60: 0.02313, 48: 0.02739, 36: 0.03456 },
      10: { 60: 0.02387, 48: 0.02806, 36: 0.03513 },
      8:  { 60: 0.02464, 48: 0.02875, 36: 0.03572 },
      5:  { 60: 0.02582, 48: 0.02981, 36: 0.03662 },
      0:  { 60: 0.02790, 48: 0.03168, 36: 0.03820 },
    },
  },
  {
    min: 20001,
    max: 50000,
    label: 'R 20,001 to R 50,000',
    factors: {
      15: { 60: 0.02141, 48: 0.02579, 36: 0.03311 },
      12: { 60: 0.02247, 48: 0.02675, 36: 0.03394 },
      10: { 60: 0.02319, 48: 0.02741, 36: 0.03451 },
      8:  { 60: 0.02395, 48: 0.02809, 36: 0.03509 },
      5:  { 60: 0.02511, 48: 0.02914, 36: 0.03599 },
      0:  { 60: 0.02718, 48: 0.03099, 36: 0.03755 },
    },
  },
  {
    min: 50001,
    max: 100000,
    label: 'R 50,001 to R 100,000',
    factors: {
      15: { 60: 0.02047, 48: 0.02486, 36: 0.03221 },
      12: { 60: 0.02149, 48: 0.02581, 36: 0.03303 },
      10: { 60: 0.02221, 48: 0.02646, 36: 0.03359 },
      8:  { 60: 0.02294, 48: 0.02713, 36: 0.03417 },
      5:  { 60: 0.02409, 48: 0.02816, 36: 0.03506 },
      0:  { 60: 0.02611, 48: 0.02998, 36: 0.03660 },
    },
  },
  {
    min: 100001,
    max: Infinity,
    label: 'Over R 100,000',
    factors: {
      15: { 60: 0.01989, 48: 0.02430, 36: 0.03166 },
      12: { 60: 0.02090, 48: 0.02523, 36: 0.03247 },
      10: { 60: 0.02160, 48: 0.02587, 36: 0.03303 },
      8:  { 60: 0.02233, 48: 0.02653, 36: 0.03360 },
      5:  { 60: 0.02346, 48: 0.02756, 36: 0.03448 },
      0:  { 60: 0.02546, 48: 0.02936, 36: 0.03601 },
    },
  },
];

/**
 * CPA Factor Sheet - Excluding Insurance (05-Oct-26)
 * Business and Sole Proprietors - Turnover less than 2M
 */
export const KAGO_CPA_TABLE: KagoFactorBand[] = [
  {
    min: 0,
    max: 10000,
    label: 'Under R 10,000',
    factors: {
      15: { 60: 0.02592, 48: 0.03012, 36: 0.03725 },
      12: { 60: 0.02707, 48: 0.03115, 36: 0.03813 },
      10: { 60: 0.02786, 48: 0.03186, 36: 0.03873 },
      8:  { 60: 0.02868, 48: 0.03259, 36: 0.03934 },
      5:  { 60: 0.02994, 48: 0.03371, 36: 0.04028 },
      0:  { 60: 0.03214, 48: 0.03567, 36: 0.04192 },
    },
  },
  {
    min: 10001,
    max: 20000,
    label: 'R 10,001 to R 20,000',
    factors: {
      15: { 60: 0.02539, 48: 0.02962, 36: 0.03677 },
      12: { 60: 0.02653, 48: 0.03064, 36: 0.03765 },
      10: { 60: 0.02732, 48: 0.03135, 36: 0.03824 },
      8:  { 60: 0.02813, 48: 0.03207, 36: 0.03885 },
      5:  { 60: 0.02938, 48: 0.03318, 36: 0.03979 },
      0:  { 60: 0.03156, 48: 0.03513, 36: 0.04142 },
    },
  },
  {
    min: 20001,
    max: 50000,
    label: 'R 20,001 to R 50,000',
    factors: {
      15: { 60: 0.02461, 48: 0.02887, 36: 0.03606 },
      12: { 60: 0.02573, 48: 0.02988, 36: 0.03693 },
      10: { 60: 0.02651, 48: 0.03058, 36: 0.03752 },
      8:  { 60: 0.02731, 48: 0.03129, 36: 0.03812 },
      5:  { 60: 0.02854, 48: 0.03240, 36: 0.03905 },
      0:  { 60: 0.03071, 48: 0.03432, 36: 0.04067 },
    },
  },
  {
    min: 50001,
    max: 100000,
    label: 'R 50,001 to R 100,000',
    factors: {
      15: { 60: 0.02435, 48: 0.02862, 36: 0.03583 },
      12: { 60: 0.02547, 48: 0.02963, 36: 0.03669 },
      10: { 60: 0.02624, 48: 0.03032, 36: 0.03728 },
      8:  { 60: 0.02704, 48: 0.03104, 36: 0.03788 },
      5:  { 60: 0.02827, 48: 0.03214, 36: 0.03881 },
      0:  { 60: 0.03043, 48: 0.03406, 36: 0.04042 },
    },
  },
  {
    min: 100001,
    max: Infinity,
    label: 'Over R 100,000',
    factors: {
      15: { 60: 0.02185, 48: 0.02621, 36: 0.03351 },
      12: { 60: 0.02291, 48: 0.02718, 36: 0.03435 },
      10: { 60: 0.02365, 48: 0.02784, 36: 0.03492 },
      8:  { 60: 0.02440, 48: 0.02853, 36: 0.03551 },
      5:  { 60: 0.02558, 48: 0.02959, 36: 0.03641 },
      0:  { 60: 0.02766, 48: 0.03145, 36: 0.03798 },
    },
  },
];

// Default to Copy Type Electronics table (Standard commercial pricing)
export const KAGO_FINANCE_TABLE = KAGO_COPY_TYPE_TABLE;

export function getKagoFactor(
  hardwarePriceZAR: number,
  termMonths: LeaseTermMonths = 60,
  escalation: EscalationRate = 0,
  profile: CustomerFinanceProfile = 'corporate'
): number {
  const table = profile === 'sole_proprietor' ? KAGO_CPA_TABLE : KAGO_COPY_TYPE_TABLE;
  const band = table.find(
    (b) => hardwarePriceZAR >= b.min && hardwarePriceZAR <= b.max
  ) || table[2]; // Default to R20k - R50k band if not found

  const factorForEscalation = band.factors[escalation] || band.factors[0];
  return factorForEscalation[termMonths] || factorForEscalation[60];
}

export function calculateMonthlyRental(
  hardwarePriceZAR: number,
  termMonths: LeaseTermMonths = 60,
  escalation: EscalationRate = 0,
  profile: CustomerFinanceProfile = 'corporate'
): {
  monthlyRentalExVat: number;
  monthlyRentalIncVat: number;
  factor: number;
  bandLabel: string;
} {
  const table = profile === 'sole_proprietor' ? KAGO_CPA_TABLE : KAGO_COPY_TYPE_TABLE;
  const band = table.find(
    (b) => hardwarePriceZAR >= b.min && hardwarePriceZAR <= b.max
  ) || table[2];

  const factor = getKagoFactor(hardwarePriceZAR, termMonths, escalation, profile);
  const monthlyRentalExVat = Math.round(hardwarePriceZAR * factor);
  const monthlyRentalIncVat = Math.round(monthlyRentalExVat * 1.15);

  return {
    monthlyRentalExVat,
    monthlyRentalIncVat,
    factor,
    bandLabel: band.label,
  };
}

export function calculateHardwarePricing(
  basePrice: number,
  colour: 'colour' | 'mono',
  profile: CustomerFinanceProfile = 'corporate'
): {
  basePrice: number;
  tpLinkAddon: number;
  markupCategory: number;
  markupTier: number;
  finalHardwarePrice: number;
  rental60mo: number;
  rental36mo: number;
  factor60: number;
  factor36: number;
  bandLabel: string;
} {
  // 1. TP-Link Wireless Access Point addon (R2,195 included on all printers)
  const tpLinkAddon = 2195;

  // 2. Base category markup: R5,000 for mono; R7,500 for colour
  const markupCategory = colour === 'colour' ? 7500 : 5000;

  // 3. Volume Tier markup based on official dealer base price:
  // - below R30,000: add R5,000
  // - above R60,000 (and <= R100,000): add R10,000
  // - above R100,000: add R20,000
  let markupTier = 0;
  if (basePrice < 30000) {
    markupTier = 5000;
  } else if (basePrice > 100000) {
    markupTier = 20000;
  } else if (basePrice > 60000) {
    markupTier = 10000;
  }

  const finalHardwarePrice = basePrice + tpLinkAddon + markupCategory + markupTier;

  // 4. Rental at 60 months (0% escalation) and 36 months (0% escalation) with KAGO Finance (05-Oct-26)
  const calc60 = calculateMonthlyRental(finalHardwarePrice, 60, 0, profile);
  const calc36 = calculateMonthlyRental(finalHardwarePrice, 36, 0, profile);

  return {
    basePrice,
    tpLinkAddon,
    markupCategory,
    markupTier,
    finalHardwarePrice,
    rental60mo: calc60.monthlyRentalExVat,
    rental36mo: calc36.monthlyRentalExVat,
    factor60: calc60.factor,
    factor36: calc36.factor,
    bandLabel: calc60.bandLabel,
  };
}
