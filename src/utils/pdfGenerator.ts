import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { PrinterModel } from '../types';
import { Base44Printer } from '../data/base44Printers';
import { TOSHIBA_PRINTERS } from '../data/toshibaPrinters';

export function generateBase44PrinterBrochurePdf(printer: Base44Printer, customerName?: string) {
  const doc = new jsPDF();
  const matchedOfficial = TOSHIBA_PRINTERS.find(
    (tp) => tp.model.toLowerCase().replace(/\s+/g, '') === printer.model.toLowerCase().replace(/\s+/g, '')
  );

  // 1. Primary Red Header
  doc.setFillColor(220, 38, 38); // Toshiba Red
  doc.rect(0, 0, 210, 30, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('TOSHIBA HEAD OFFICE', 14, 13);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('OFFICIAL EQUIPMENT BROCHURE & TECHNICAL SPECIFICATIONS', 14, 21);

  // Business Contact details on Top Right
  doc.setFontSize(8);
  doc.text('Direct Specialist: Juan (078 307 6569)', 196, 10, { align: 'right' });
  doc.text('Landline: 011 796 4828', 196, 15, { align: 'right' });
  doc.text('Email: juanlr@toshiba-sa.co.za', 196, 20, { align: 'right' });
  doc.text('Web: toshiba-sa.co.za', 196, 25, { align: 'right' });

  // 2. Document Title & Model Header
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(`Equipment Brochure: ${printer.model}`, 14, 42);

  // Date and Meta
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  const today = new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' });
  doc.text(`Official Catalog Specification Sheet · Issued: ${today}${customerName ? ` · Prepared for: ${customerName}` : ''}`, 14, 48);

  // 3. Highlighted Specs Banner Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, 53, 182, 34, 3, 3, 'FD');

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(220, 38, 38);
  doc.text(`${printer.model} · ${printer.colour === 'colour' ? 'Colour MFP' : 'Mono Workhorse'} · ${printer.format} Format`, 18, 62);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  const descLines = doc.splitTextToSize(printer.description || matchedOfficial?.description || 'High performance Toshiba e-STUDIO multifunction printer.', 174);
  doc.text(descLines, 18, 70);

  // 4. Key Performance Highlights Table
  const rental60 = `R${(printer.rental_60mo_0esc || printer.monthly_rental).toLocaleString('en-ZA')} / month (ex VAT) · 60m @ 0% escalation`;
  const rental36 = `R${(printer.rental_36mo_0esc || Math.round(printer.monthly_rental * 1.35)).toLocaleString('en-ZA')} / month (ex VAT) · 36m @ 0% escalation`;
  const cashPurchase = `R${(printer.final_hardware_price || printer.monthly_rental * 36).toLocaleString('en-ZA')} (ex VAT)`;

  autoTable(doc, {
    startY: 92,
    head: [['Performance Metric', 'Specification', 'Commercial Advantage']],
    body: [
      ['Print & Copy Speed', `${printer.speed_ppm} pages per minute (PPM)`, 'Rapid first-page output with instant warm-up'],
      ['Monthly Duty Cycle', `${(printer.duty_cycle / 1000).toFixed(0)},000 pages / month`, 'Heavy-duty commercial engine built for uninterrupted office workflows'],
      ['Paper Format Support', `${printer.format} Standard (${printer.format === 'A3' ? 'A3, A4, Envelopes & Bypass' : 'A4 Desktop & Mobile'})`, 'Flexible cassette options supporting up to 220 g/m² stock'],
      ['Included Networking Add-on', 'TP-Link Wireless Access Point (R2,195 included)', 'Pre-configured secure wireless network connectivity for mobile and cloud printing'],
      ['60-Month Rental (0% Esc)', rental60, 'Lowest monthly capital expenditure with KAGO lease factor'],
      ['36-Month Rental (0% Esc)', rental36, 'Accelerated technology refresh cycle with 0% annual escalation'],
      ['Outright Cash Purchase', cashPurchase, 'Direct capital acquisition with standard manufacturer warranty']
    ],
    headStyles: { fillColor: [15, 23, 42], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 8.5 },
    bodyStyles: { fontSize: 8, textColor: [51, 65, 85] },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    theme: 'grid'
  });

  // 5. In-Depth Technical Specification Table
  const specs = matchedOfficial?.specs;
  const tableFinalY = (doc as any).lastAutoTable?.finalY || 140;

  autoTable(doc, {
    startY: tableFinalY + 6,
    head: [['Technical Hardware Detail', 'Specification Value']],
    body: [
      ['Imaging Technology', specs?.imaging || 'Indirect Electrostatic Photographic Method / Laser / Heat Roller Fusing'],
      ['Processor & Memory', `${specs?.processor || 'Multi-Core High Speed Processor'} / ${specs?.memory || '2 GB RAM'}`],
      ['Standard Paper Capacity', specs?.paperCapacity || `${printer.format === 'A3' ? '1,200 sheets (2x 550 cassette + 100 bypass)' : '350 sheets (250 drawer + 100 bypass)'}`],
      ['Supported Paper Sizes', specs?.paperSize || `${printer.format} (A6 to ${printer.format})`],
      ['Touch Control Display', specs?.display || `${printer.format === 'A3' ? '10.1" Tablet-Style Full Colour Touch Panel' : '4.3" Tiltable Colour Touch Panel'}`],
      ['Warm-Up Time', specs?.warmUpTime || 'Approx. 12–15 seconds from energy save mode'],
      ['Dimensions & Weight', `${specs?.dimensions || 'Standard ergonomic footprint'} · ${specs?.weight || 'Commercial reinforced chassis'}`],
      ['Connectivity & Protocols', 'Gigabit Ethernet, High-Speed USB 2.0, Apple AirPrint, Mopria, e-BRIDGE Cloud']
    ],
    headStyles: { fillColor: [220, 38, 38], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 8.5 },
    bodyStyles: { fontSize: 7.5, textColor: [51, 65, 85] },
    theme: 'striped'
  });

  // 6. Service Level Agreement (SLA) & Guarantee Box
  const finalSpecsY = (doc as any).lastAutoTable?.finalY || 205;

  doc.setFillColor(241, 245, 249);
  doc.roundedRect(14, finalSpecsY + 6, 182, 34, 3, 3, 'FD');

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('TOSHIBA HEAD OFFICE SERVICE LEVEL GUARANTEE (SLA):', 18, finalSpecsY + 13);

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('• Guaranteed 2–4 hour on-site technician arrival across all business districts.', 18, finalSpecsY + 19);
  doc.text('• Zero unexpected consumable bills: Genuine Black & CMYK toners are automatically dispatched.', 18, finalSpecsY + 24);
  doc.text('• Complimentary delivery, unboxing, network integration across Windows/Mac, and staff training.', 18, finalSpecsY + 29);
  doc.text('• 100% Tax Deductible OPEX structure under South African SARS business operating lease guidelines.', 18, finalSpecsY + 34);

  // 7. Document Footer
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('Toshiba Head Office | Tel: 011 796 4828 | Mobile: 078 307 6569 | Email: juanlr@toshiba-sa.co.za', 105, 287, { align: 'center' });

  // Save PDF
  const cleanModel = printer.model.replace(/\s+/g, '_');
  const filename = `Toshiba_Head_Office_${cleanModel}_Brochure.pdf`;
  doc.save(filename);
}

export function generateSingleModelPdf(model?: PrinterModel | null, customerName?: string, companyName?: string) {
  if (!model) return;
  const doc = new jsPDF();

  // Primary Red Header
  doc.setFillColor(220, 38, 38); // Toshiba Red
  doc.rect(0, 0, 210, 28, 'F');

  // Header Typography
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('TOSHIBA HEAD OFFICE', 14, 13);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('OFFICE PRINTER RENTALS & SALES | SOUTH AFRICA', 14, 20);

  // Business Contact on Top Right
  doc.setFontSize(8);
  doc.text('Direct Phone: 011 796 4828', 196, 11, { align: 'right' });
  doc.text('Email: juanlr@toshiba-sa.co.za', 196, 16, { align: 'right' });
  doc.text('WhatsApp: +27 11 796 4828', 196, 21, { align: 'right' });

  // Document Title
  doc.setTextColor(15, 23, 42); // Slate 900
  doc.setFontSize(15);
  doc.setFont('helvetica', 'bold');
  doc.text(`Official Equipment Proposal: ${model.name}`, 14, 40);

  // Date and Recipient Meta
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  const today = new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' });
  doc.text(`Date Prepared: ${today}`, 14, 46);
  if (customerName || companyName) {
    doc.text(`Prepared for: ${customerName || ''} ${companyName ? `(${companyName})` : ''}`, 14, 51);
  }

  // Model Overview Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, 56, 182, 30, 3, 3, 'FD');

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(`${model.modelNumber} - ${model.category === 'color' ? 'Full Colour & Mono' : 'Monochrome Only'} (${model.format})`, 18, 64);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  const splitDesc = doc.splitTextToSize(model.description, 174);
  doc.text(splitDesc, 18, 71);

  // Pricing Table
  const rental36Text = model.rental36moZAR ? `R${model.rental36moZAR.toLocaleString()} / mo (ex VAT)` : 'Contact for quote';
  const rental60Text = model.rental60moZAR ? `R${model.rental60moZAR.toLocaleString()} / mo (ex VAT)` : 'Contact for quote';
  const outrightText = model.outrightPriceZAR ? `R${model.outrightPriceZAR.toLocaleString()} (ex VAT)` : 'Contact for quote';

  autoTable(doc, {
    startY: 92,
    head: [['Finance / Purchase Option', 'Monthly Rate / Price', 'Contract SLA Inclusions']],
    body: [
      ['36-Month Rental (Standard SLA)', rental36Text, 'All genuine toners, drums, parts, labor, 2-4 hr on-site Gauteng SLA'],
      ['60-Month Rental (Lowest Monthly Rate)', rental60Text, 'All genuine toners, drums, parts, labor, 2-4 hr on-site Gauteng SLA'],
      ['Outright Purchase', outrightText, 'Full machine hardware ownership + standard manufacturer warranty']
    ],
    headStyles: { fillColor: [15, 23, 42], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 9 },
    bodyStyles: { fontSize: 8.5, textColor: [51, 65, 85] },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    theme: 'grid'
  });

  // Hardware Specifications Table
  const finalY = (doc as any).lastAutoTable?.finalY || 135;

  autoTable(doc, {
    startY: finalY + 6,
    head: [['Technical Specification', 'Details']],
    body: [
      ['Print & Copy Speed', model.speedText],
      ['Monthly Duty Cycle', model.dutyCycleText],
      ['Paper Format', `${model.format} Standard (${model.format === 'A3' ? 'A3 & A4 Dual Cassette' : 'A4 Desktop'})`],
      ['Target Workgroup', model.popularFor],
      ['Standard Capabilities', model.keyNotes.join(' • ')]
    ],
    headStyles: { fillColor: [220, 38, 38], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 9 },
    bodyStyles: { fontSize: 8.5, textColor: [51, 65, 85] },
    theme: 'striped'
  });

  // Gauteng Service & Rental Guarantee
  const specsFinalY = (doc as any).lastAutoTable?.finalY || 200;

  doc.setFillColor(241, 245, 249);
  doc.roundedRect(14, specsFinalY + 6, 182, 38, 3, 3, 'FD');

  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('GAUTENG ON-SITE SERVICE LEVEL AGREEMENT (SLA):', 18, specsFinalY + 14);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('• 2–4 Hour technician response time across Johannesburg, Pretoria, Midrand, and Sandton.', 18, specsFinalY + 20);
  doc.text('• Zero unexpected toner bills: Black and CMYK high-yield cartridges automatically replenished.', 18, specsFinalY + 25);
  doc.text('• Free delivery, physical unpacking, and network printer/scanner setup across all staff PCs and Macs.', 18, specsFinalY + 30);
  doc.text('• 100% Tax Deductible OPEX for South African registered businesses.', 18, specsFinalY + 35);

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('Toshiba Head Office | Tel: 011 796 4828 | Email: juanlr@toshiba-sa.co.za | WhatsApp: https://wa.me/27117964828', 105, 287, { align: 'center' });

  // Save PDF
  const filename = `Toshiba_Head_Office_${model.modelNumber.replace(/\s+/g, '_')}_Proposal.pdf`;
  doc.save(filename);
}

export function generateCatalogPdf(models: PrinterModel[], filterTitle = 'Full Product Catalog') {
  const doc = new jsPDF({ orientation: 'landscape' });

  // Header
  doc.setFillColor(220, 38, 38);
  doc.rect(0, 0, 297, 24, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('TOSHIBA HEAD OFFICE - PRINTER & COPIER CATALOG', 14, 12);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`${filterTitle} | Phone: 011 796 4828 | Email: juanlr@toshiba-sa.co.za`, 14, 18);

  const tableData = models.map(m => [
    m.name,
    m.category === 'color' ? 'Colour' : 'Mono',
    m.format,
    m.speedText,
    m.dutyCycleText,
    m.rental36moZAR ? `R${m.rental36moZAR.toLocaleString()}` : 'Quote',
    m.rental60moZAR ? `R${m.rental60moZAR.toLocaleString()}` : 'Quote',
    m.outrightPriceZAR ? `R${m.outrightPriceZAR.toLocaleString()}` : 'Quote',
    m.popularFor
  ]);

  autoTable(doc, {
    startY: 28,
    head: [['Model Name', 'Type', 'Format', 'Speed', 'Duty Cycle', '36mo Rental', '60mo Rental', 'Outright', 'Recommended For']],
    body: tableData,
    headStyles: { fillColor: [15, 23, 42], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 8 },
    bodyStyles: { fontSize: 7.5, textColor: [51, 65, 85] },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    theme: 'grid',
    styles: { overflow: 'linebreak' },
    columnStyles: {
      0: { cellWidth: 45 },
      8: { cellWidth: 55 }
    }
  });

  // Footer
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text('All prices in ZAR ex VAT. Rentals include toner, parts, and SLA. Toshiba Head Office: 011 796 4828', 148, 202, { align: 'center' });

  doc.save('Toshiba_Head_Office_Printer_Catalog.pdf');
}
