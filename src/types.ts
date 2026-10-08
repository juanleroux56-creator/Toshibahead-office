import React from 'react';

export type PrinterCategory = 'color' | 'mono';
export type PrinterFormat = 'A4' | 'A3';
export type VolumeTier = 'small' | 'medium' | 'enterprise';

export interface PrinterSpecs {
  speedPPM: number;
  maxPaperCapacity: string;
  controlPanel: string;
  dutyCyclePages: number;
  dutyCycleText: string;
  resolution: string;
  scannerSpeed: string;
  dimensions: string;
  weight: string;
  firstPageOut: string;
  duplexStandard: boolean;
}

export interface PrinterModel {
  id: string;
  modelNumber: string;
  name: string;
  category: PrinterCategory;
  format: PrinterFormat;
  volumeTier: VolumeTier;
  speed: number;
  speedText: string;
  dutyCycleText: string;
  maxMonthlyVolume: number;
  outrightPriceZAR: number | null; // null => "Contact for quote"
  rental36moZAR: number | null;    // null => "Contact for quote"
  rental60moZAR: number | null;    // null => "Contact for quote"
  keyNotes: string[];
  description: string;
  popularFor: string;
  badge?: string;
  image: string;                   // Explicit image field for each model (local asset or placeholder URL)
  imageUrl?: string;               // Backwards compatibility alias
}

export type FinanceOption = 'rental_36' | 'rental_60' | 'purchase' | 'flex';

export interface QuestionnaireAnswers {
  colorPreference: PrinterCategory | null;
  formatPreference: PrinterFormat | null;
  volumeRange: 'under_8k' | '8k_to_45k' | 'above_45k' | null;
}

export type LeadStatus = 'new' | 'contacted' | 'quote_sent' | 'won' | 'closed';

export type AppView = 'all' | 'matcher' | 'catalog' | 'quote' | 'service' | 'faq';

export interface QuoteLead {
  id: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  location: string;
  modelId: string;
  modelName: string;
  monthlyRental36ZAR?: number | null;
  monthlyRental60ZAR?: number | null;
  outrightPriceZAR?: number | null;
  financeOption: FinanceOption;
  estimatedVolume: string;
  message: string;
  status: LeadStatus;
  source: string;
  createdAt: string;
}

export interface FilterState {
  category: 'all' | PrinterCategory;
  format: 'all' | PrinterFormat;
  volumeTier: 'all' | VolumeTier;
  searchQuery: string;
  sortBy: 'recommended' | 'price_low' | 'price_high' | 'speed_high';
}
