import React, { useState, useEffect } from 'react';
import { QuoteLead, LeadStatus } from '../types';
import { getStoredLeads, updateLeadStatus, deleteLead, exportLeadsToCsv, fetchFirestoreLeads } from '../utils/leadsStorage';
import { 
  X, 
  Lock, 
  Trash2, 
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle, 
  Clock, 
  FileText,
  AlertCircle,
  RefreshCw,
  Search,
  Filter,
  Terminal,
  ShieldCheck
} from 'lucide-react';

interface AdminLeadsModalProps {
  onClose: () => void;
}

export const AdminLeadsModal: React.FC<AdminLeadsModalProps> = ({ onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pin, setPin] = useState<string>('');
  const [pinError, setPinError] = useState<boolean>(false);
  const [leads, setLeads] = useState<QuoteLead[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    if (isAuthenticated) {
      loadLeads();
    }
  }, [isAuthenticated]);

  const loadLeads = async () => {
    const loaded = getStoredLeads();
    setLeads(loaded);
    try {
      const cloudLeads = await fetchFirestoreLeads();
      if (cloudLeads && cloudLeads.length > 0) {
        setLeads(cloudLeads);
      }
    } catch {
      // Fallback to locally cached leads if offline
    }
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.trim() === '1234' || pin.trim() === '0000') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    await updateLeadStatus(leadId, newStatus);
    loadLeads();
  };

  const handleDelete = async (leadId: string) => {
    if (window.confirm('Delete this quote submission record?')) {
      await deleteLead(leadId);
      loadLeads();
    }
  };

  const handleExportCsv = () => {
    if (leads.length === 0) return;
    const headers = ['ID', 'Date', 'Name', 'Company', 'Email', 'Phone', 'Location', 'Model', 'Rental 36m', 'Rental 60m', 'Finance', 'Status', 'Message'];
    const rows = leads.map(l => [
      l.id,
      new Date(l.createdAt).toLocaleDateString(),
      `"${l.fullName.replace(/"/g, '""')}"`,
      `"${l.companyName.replace(/"/g, '""')}"`,
      l.email,
      `"${l.phone}"`,
      `"${l.location}"`,
      `"${l.modelName}"`,
      l.monthlyRental36ZAR || 0,
      l.monthlyRental60ZAR || 0,
      l.financeOption,
      l.status,
      `"${(l.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `toshiba_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLeads = leads.filter(l => {
    if (statusFilter !== 'all' && l.status !== statusFilter) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        l.fullName.toLowerCase().includes(q) ||
        l.companyName.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.modelName.toLowerCase().includes(q) ||
        l.phone.includes(q)
      );
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn font-mono">
      <div className="bg-[#090d16] border-2 border-slate-800 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative text-slate-200">
        
        {/* Modal Header with Giant Toshiba Watermark */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-[#090d16]/95 backdrop-blur z-20">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-950 text-red-400 border border-red-800 rounded-xl">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider block">
                [SYS.ADMIN_CONSOLE // PROTECTED GATEWAY]
              </span>
              <h2 className="text-xl sm:text-2xl font-black font-heading text-white uppercase tracking-tight">
                GAUTENG LEADS &amp; CRM DESK
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-900 rounded-xl border border-slate-700 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isAuthenticated ? (
          /* PIN LOCK SCREEN */
          <div className="p-10 max-w-md mx-auto text-center space-y-6">
            <div className="w-16 h-16 bg-slate-900 border border-slate-700 rounded-2xl flex items-center justify-center mx-auto text-red-500 shadow-md">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-black font-heading text-white uppercase">ENTER CRM ACCESS PIN</h3>
              <p className="text-xs text-slate-400 font-sans">
                Authorized access for Juan Le Roux &amp; Gauteng dispatch administrators. (Default demo PIN: <code className="text-red-400 font-bold">1234</code>)
              </p>
            </div>

            <form onSubmit={handlePinSubmit} className="space-y-4">
              <input
                type="password"
                maxLength={8}
                autoFocus
                placeholder="Enter PIN..."
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full py-3 px-4 text-center text-lg tracking-widest bg-[#04060a] border border-slate-800 rounded-xl focus:outline-none focus:border-red-600 text-white font-bold"
              />

              {pinError && (
                <p className="text-xs text-red-400 font-bold">[INVALID ACCESS PIN // TRY 1234]</p>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-black text-xs rounded-xl shadow-red-glow transition-all uppercase tracking-wider cursor-pointer"
              >
                UNLOCK CRM CONSOLE
              </button>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED LEADS VIEW */
          <div className="p-6 space-y-6">
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-[#04060a] border border-slate-800 p-4 rounded-2xl text-xs">
              <div className="flex flex-wrap items-center gap-3 flex-1">
                {/* Search */}
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="SEARCH LEADS // NAME, COMPANY, EMAIL..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder:text-slate-600 focus:outline-none focus:border-red-600 text-xs"
                  />
                </div>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="py-2 px-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-red-600 text-xs cursor-pointer uppercase font-bold"
                >
                  <option value="all">[STATUS: ALL]</option>
                  <option value="new">NEW INQUIRIES</option>
                  <option value="contacted">CONTACTED</option>
                  <option value="quote_sent">QUOTE SENT</option>
                  <option value="won">DEAL WON</option>
                  <option value="closed">CLOSED</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={loadLeads}
                  className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg border border-slate-700"
                  title="Refresh Leads"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={handleExportCsv}
                  disabled={leads.length === 0}
                  className="flex items-center space-x-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg border border-slate-700 font-bold disabled:opacity-50"
                >
                  <Download className="w-3.5 h-3.5 text-red-500" />
                  <span>EXPORT_CSV</span>
                </button>
              </div>
            </div>

            {/* Leads Table */}
            {filteredLeads.length === 0 ? (
              <div className="bg-[#04060a] border border-slate-800 rounded-2xl p-12 text-center space-y-3">
                <AlertCircle className="w-10 h-10 text-slate-600 mx-auto" />
                <h3 className="text-sm font-black font-heading text-white uppercase">[NO_QUOTE_LEADS_FOUND]</h3>
                <p className="text-xs text-slate-500 font-sans">
                  Submit a quote request using the website form to see live telemetry records populated here.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="bg-[#04060a] border border-slate-800 rounded-2xl p-5 space-y-4 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex flex-wrap justify-between items-start gap-2 border-b border-slate-800 pb-3">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-mono font-bold text-red-400 uppercase">
                            #{lead.id}
                          </span>
                          <span className="text-slate-600">//</span>
                          <strong className="text-base text-white font-bold">{lead.fullName}</strong>
                          <span className="text-xs text-slate-400 font-sans">({lead.companyName})</span>
                        </div>
                        <div className="flex items-center space-x-4 text-xs text-slate-400 mt-1">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3 text-red-500" />
                            <a href={`mailto:${lead.email}`} className="hover:text-white underline">{lead.email}</a>
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-emerald-400" />
                            <a href={`tel:${lead.phone}`} className="hover:text-white underline">{lead.phone}</a>
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-500" />
                            <span>{lead.location}</span>
                          </span>
                        </div>
                      </div>

                      {/* Status Selector */}
                      <div className="flex items-center space-x-2">
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                          className={`text-xs py-1 px-2.5 rounded-lg font-mono font-bold border ${
                            lead.status === 'new'
                              ? 'bg-red-950/90 text-red-400 border-red-800'
                              : lead.status === 'won'
                              ? 'bg-emerald-950/90 text-emerald-400 border-emerald-800'
                              : 'bg-slate-900 text-slate-300 border-slate-700'
                          }`}
                        >
                          <option value="new">STATUS: NEW</option>
                          <option value="contacted">CONTACTED</option>
                          <option value="quote_sent">QUOTE SENT</option>
                          <option value="won">DEAL WON</option>
                          <option value="closed">CLOSED</option>
                        </select>

                        <button
                          onClick={() => handleDelete(lead.id)}
                          className="p-1.5 text-slate-600 hover:text-red-400 transition-colors"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Hardware Selection Summary */}
                    <div className="grid sm:grid-cols-3 gap-3 text-xs bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                      <div>
                        <span className="text-slate-500 block">[REQUESTED_MODEL]:</span>
                        <strong className="text-white font-bold">{lead.modelName}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">[FINANCE_STRUCTURE]:</span>
                        <strong className="text-red-400 font-bold uppercase">{lead.financeOption.replace('_', ' ')}</strong>
                        {lead.monthlyRental60ZAR ? (
                          <span className="text-slate-400 block text-[10px] mt-0.5">
                            60m: R{lead.monthlyRental60ZAR.toLocaleString('en-ZA')}/mo {lead.monthlyRental36ZAR ? `· 36m: R${lead.monthlyRental36ZAR.toLocaleString('en-ZA')}/mo` : ''}
                          </span>
                        ) : null}
                      </div>
                      <div>
                        <span className="text-slate-500 block">[TIMESTAMP]:</span>
                        <span className="text-slate-400">{new Date(lead.createdAt).toLocaleString()}</span>
                      </div>
                    </div>

                    {lead.message && (
                      <p className="text-xs text-slate-300 font-sans italic bg-slate-900/40 p-2.5 rounded-lg border border-slate-800">
                        &ldquo;{lead.message}&rdquo;
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
