import { QuoteLead, LeadStatus } from '../types';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy 
} from 'firebase/firestore';

const LOCAL_STORAGE_KEY = 'toshiba_gauteng_quote_leads_v2';
const EMAIL_LOGS_KEY = 'toshiba_gauteng_email_notifications_v2';

export interface EmailNotificationLog {
  id: string;
  leadId: string;
  to: string;
  subject: string;
  timestamp: string;
  body: string;
  status: 'dispatched' | 'pending';
}

// Initial Sample Leads for preview
const INITIAL_SAMPLE_LEADS: QuoteLead[] = [
  {
    id: 'TSA-2026-8491',
    fullName: 'David Van Der Merwe',
    companyName: 'Sandton Financial Advisory',
    email: 'david@sandtonfa.co.za',
    phone: '082 555 3829',
    location: 'Sandton & Bryanston',
    modelId: 'toshiba-estudio-2525ac',
    modelName: 'Toshiba e-STUDIO 2525AC (A3 Colour)',
    monthlyRental36ZAR: 1390,
    monthlyRental60ZAR: 1150,
    outrightPriceZAR: 36900,
    financeOption: 'rental_36',
    estimatedVolume: '8,000–45,000 pages/mo',
    message: 'We need 2 paper cassettes, scan to OneDrive integration for 18 staff members, and delivery to Katherine Street by next Friday.',
    status: 'new',
    source: 'matcher_quiz',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'TSA-2026-7210',
    fullName: 'Nompumelelo Khumalo',
    companyName: 'Apex Logistics & Freight',
    email: 'n.khumalo@apexfreight.co.za',
    phone: '011 884 9200',
    location: 'Kempton Park & O.R. Tambo',
    modelId: 'toshiba-estudio-4528a',
    modelName: 'Toshiba e-STUDIO 4528A (A3 Mono)',
    monthlyRental36ZAR: 1590,
    monthlyRental60ZAR: 1290,
    outrightPriceZAR: 43200,
    financeOption: 'rental_60',
    estimatedVolume: 'Above 45,000 pages/mo',
    message: 'High volume waybill and dispatch printing required. Please include extra toner cartridge stock on-site.',
    status: 'contacted',
    source: 'catalog_direct',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  }
];

export function getStoredLeads(): QuoteLead[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_LEADS));
      return INITIAL_SAMPLE_LEADS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_SAMPLE_LEADS;
  }
}

// Fetch live leads from Firestore (and sync with local cache)
export async function fetchFirestoreLeads(): Promise<QuoteLead[]> {
  try {
    const quotesRef = collection(db, 'quotes');
    const q = query(quotesRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      return getStoredLeads();
    }

    const firestoreLeads: QuoteLead[] = [];
    snapshot.forEach(docSnap => {
      firestoreLeads.push(docSnap.data() as QuoteLead);
    });

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(firestoreLeads));
    return firestoreLeads;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'quotes');
    return getStoredLeads();
  }
}

export async function saveLead(leadData: Omit<QuoteLead, 'id' | 'createdAt' | 'status'> & Partial<Pick<QuoteLead, 'id' | 'createdAt' | 'status'>>): Promise<QuoteLead> {
  const newId = leadData.id || `TSA-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const newLead: QuoteLead = {
    ...leadData,
    id: newId,
    status: leadData.status || 'new',
    createdAt: leadData.createdAt || new Date().toISOString(),
    monthlyRental36ZAR: typeof leadData.monthlyRental36ZAR === 'number' && !isNaN(leadData.monthlyRental36ZAR) ? leadData.monthlyRental36ZAR : null,
    monthlyRental60ZAR: typeof leadData.monthlyRental60ZAR === 'number' && !isNaN(leadData.monthlyRental60ZAR) ? leadData.monthlyRental60ZAR : null,
    outrightPriceZAR: typeof leadData.outrightPriceZAR === 'number' && !isNaN(leadData.outrightPriceZAR) ? leadData.outrightPriceZAR : null,
  };

  // Build clean payload for Firestore: Firestore strictly rejects `undefined` values.
  const firestoreData: Record<string, any> = {
    id: newLead.id,
    fullName: newLead.fullName || 'Private Client',
    companyName: newLead.companyName || 'Private / Office Client',
    email: newLead.email || '',
    phone: newLead.phone || '',
    location: newLead.location || 'Gauteng',
    modelId: newLead.modelId || 'general-inquiry',
    modelName: newLead.modelName || 'Toshiba Head Office Fleet Recommendation',
    financeOption: newLead.financeOption || 'rental_60',
    estimatedVolume: newLead.estimatedVolume || 'Standard office volume',
    message: newLead.message || 'Direct website quote inquiry',
    status: newLead.status,
    source: newLead.source || 'website',
    createdAt: newLead.createdAt,
  };

  if (newLead.monthlyRental36ZAR !== null && newLead.monthlyRental36ZAR !== undefined) {
    firestoreData.monthlyRental36ZAR = newLead.monthlyRental36ZAR;
  }
  if (newLead.monthlyRental60ZAR !== null && newLead.monthlyRental60ZAR !== undefined) {
    firestoreData.monthlyRental60ZAR = newLead.monthlyRental60ZAR;
  }
  if (newLead.outrightPriceZAR !== null && newLead.outrightPriceZAR !== undefined) {
    firestoreData.outrightPriceZAR = newLead.outrightPriceZAR;
  }

  // 1. Save to Firestore
  try {
    await setDoc(doc(db, 'quotes', newId), firestoreData);
    console.log(`[Firestore] Quote ${newId} saved successfully to cloud.`);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `quotes/${newId}`);
  }

  // 2. Save to local storage cache
  const existing = getStoredLeads();
  const updated = [newLead, ...existing.filter(l => l.id !== newId)];
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to write to localStorage', e);
  }

  // 3. Dispatch & log email notification to juanlr@toshiba-sa.co.za
  dispatchEmailNotification(newLead);

  return newLead;
}

export async function updateLeadStatus(leadId: string, status: LeadStatus): Promise<void> {
  // Update Firestore
  try {
    await updateDoc(doc(db, 'quotes', leadId), { status });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `quotes/${leadId}`);
  }

  // Update local storage
  const existing = getStoredLeads();
  const updated = existing.map(l => l.id === leadId ? { ...l, status } : l);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
}

export async function deleteLead(leadId: string): Promise<void> {
  // Delete Firestore
  try {
    await deleteDoc(doc(db, 'quotes', leadId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `quotes/${leadId}`);
  }

  // Delete local storage
  const existing = getStoredLeads();
  const updated = existing.filter(l => l.id !== leadId);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
}

function dispatchEmailNotification(lead: QuoteLead) {
  const rentalRate = lead.monthlyRental36ZAR ? `R${lead.monthlyRental36ZAR.toLocaleString()} / mo (36mo)` : 'Custom quote';
  const outright = lead.outrightPriceZAR ? `R${lead.outrightPriceZAR.toLocaleString()}` : 'N/A';

  const body = `
NEW TOSHIBA HEAD OFFICE QUOTE SUBMISSION:
--------------------------------------------------
Reference ID: ${lead.id}
Timestamp: ${new Date(lead.createdAt).toLocaleString('en-ZA')}

CUSTOMER INFORMATION:
- Contact Name: ${lead.fullName}
- Company: ${lead.companyName}
- Phone Number: ${lead.phone}
- Email Address: ${lead.email}
- Office Location: ${lead.location}

EQUIPMENT & FINANCE SPECIFICATION:
- Requested Model: ${lead.modelName}
- Agreement Preference: ${lead.financeOption.replace('_', ' ').toUpperCase()}
- Monthly Rental Rate: ${rentalRate}
- Outright Price: ${outright}
- Estimated Volume: ${lead.estimatedVolume}

CUSTOMER MESSAGE / SPECIAL REQUIREMENTS:
"${lead.message || 'No additional message.'}"

--------------------------------------------------
Direct WhatsApp Contact: https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}
Action Required: Prepare formal SLA proposal for ${lead.companyName} within 2 business hours.
`.trim();

  const log: EmailNotificationLog = {
    id: `mail-${Date.now()}`,
    leadId: lead.id,
    to: 'juanlr@toshiba-sa.co.za',
    subject: `[NEW LEAD #${lead.id}] ${lead.companyName} - ${lead.modelName}`,
    timestamp: new Date().toISOString(),
    body,
    status: 'dispatched',
  };

  const logs = getEmailLogs();
  const updatedLogs = [log, ...logs];
  try {
    localStorage.setItem(EMAIL_LOGS_KEY, JSON.stringify(updatedLogs));
  } catch (e) {
    console.error('Failed to log email', e);
  }

  // Real email dispatch via FormSubmit AJAX endpoint directly to Juan
  try {
    const payload = {
      _subject: `[Toshiba Head Office Quote #${lead.id}] ${lead.companyName} - ${lead.modelName}`,
      _replyto: lead.email,
      Reference_ID: lead.id,
      Customer_Name: lead.fullName,
      Company: lead.companyName,
      Phone: lead.phone,
      Email: lead.email,
      Requested_Model: lead.modelName,
      Agreement_Preference: lead.financeOption,
      Estimated_Volume: lead.estimatedVolume,
      Customer_Message: lead.message || 'No additional notes provided',
      Date_Submitted: new Date(lead.createdAt).toLocaleString('en-ZA'),
    };

    Promise.allSettled([
      fetch('https://formsubmit.co/ajax/juanlr@toshiba-sa.co.za', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...payload, _cc: 'juanleroux56@gmail.com' }),
      }),
      fetch('https://formsubmit.co/ajax/juanleroux56@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      }),
    ])
      .then(() => {
        console.log(`[Email Dispatch] FormSubmit dual dispatch attempted for lead ${lead.id}`);
      })
      .catch((err) => {
        console.warn('[Email Dispatch] Background request failed:', err);
      });
  } catch (e) {
    console.warn('[Email Dispatch] FormSubmit initialization error:', e);
  }
}

export function getEmailLogs(): EmailNotificationLog[] {
  try {
    const raw = localStorage.getItem(EMAIL_LOGS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function exportLeadsToCsv(leads: QuoteLead[]) {
  const headers = [
    'Reference ID',
    'Date Submitted',
    'Customer Name',
    'Company Name',
    'Email Address',
    'Phone Number',
    'Gauteng Location',
    'Model Requested',
    'Rental 36mo (ZAR)',
    'Rental 60mo (ZAR)',
    'Outright Price (ZAR)',
    'Finance Type',
    'Estimated Volume',
    'Status',
    'Customer Message'
  ];

  const rows = leads.map(l => [
    `"${l.id}"`,
    `"${new Date(l.createdAt).toLocaleDateString('en-ZA')}"`,
    `"${l.fullName}"`,
    `"${l.companyName}"`,
    `"${l.email}"`,
    `"${l.phone}"`,
    `"${l.location}"`,
    `"${l.modelName}"`,
    l.monthlyRental36ZAR ?? 'Quote',
    l.monthlyRental60ZAR ?? 'Quote',
    l.outrightPriceZAR ?? 'Quote',
    `"${l.financeOption}"`,
    `"${l.estimatedVolume}"`,
    `"${l.status.toUpperCase()}"`,
    `"${(l.message || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `Toshiba_Head_Office_Quote_Leads_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
