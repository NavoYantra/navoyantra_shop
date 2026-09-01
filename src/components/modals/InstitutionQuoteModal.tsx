import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { School, X, Send, CheckCircle2, Building, Phone, Mail, User } from 'lucide-react';

export const InstitutionQuoteModal: React.FC = () => {
  const { isQuoteModalOpen, setIsQuoteModalOpen, showToast } = useApp();

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    institutionName: '',
    contactPerson: '',
    email: '',
    phone: '',
    cityState: '',
    institutionType: 'School (K-12)',
    targetStudents: 50,
    labBudgetRange: '₹1 Lakh - ₹3 Lakhs',
    message: ''
  });

  if (!isQuoteModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Quote request submitted! Our B2B STEM team will contact you within 24 hours.', 'success');
  };

  const handleClose = () => {
    setIsQuoteModalOpen(false);
    setSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white  rounded-2xl shadow-2xl border border-slate-200  overflow-hidden animate-in zoom-in-95 duration-200 my-8">
        
        {/* Modal Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <School className="w-6 h-6 text-orange-500" />
            <div>
              <h3 className="text-xl font-bold font-heading">
                Request B2B STEM & Atal Lab Quotation
              </h3>
              <p className="text-xs text-slate-400">
                Tailored hardware bundles, teacher training & GST invoices for Educational Institutions.
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-xl text-slate-400 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700  block mb-1">
                  School / Institution Name *
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Delhi Public School"
                    value={formData.institutionName}
                    onChange={e => setFormData({ ...formData, institutionName: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50  border border-slate-200  text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700  block mb-1">
                  Contact Person & Title *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Rajesh (Principal)"
                    value={formData.contactPerson}
                    onChange={e => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50  border border-slate-200  text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700  block mb-1">
                  Official Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="principal@school.edu.in"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50  border border-slate-200  text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700  block mb-1">
                  Phone / WhatsApp Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50  border border-slate-200  text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700  block mb-1">
                  Institution Type
                </label>
                <select
                  value={formData.institutionType}
                  onChange={e => setFormData({ ...formData, institutionType: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50  border border-slate-200  text-xs font-medium focus:outline-none"
                >
                  <option value="School (K-12)">School (CBSE / ICSE / IB)</option>
                  <option value="College / University">College / Engineering Institute</option>
                  <option value="Atal Tinkering Lab">Atal Tinkering Lab (ATL)</option>
                  <option value="Coaching Center">Robotics Academy / Coaching</option>
                  <option value="NGO">Educational NGO</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700  block mb-1">
                  Estimated Budget Range
                </label>
                <select
                  value={formData.labBudgetRange}
                  onChange={e => setFormData({ ...formData, labBudgetRange: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50  border border-slate-200  text-xs font-medium focus:outline-none"
                >
                  <option value="Under ₹1 Lakh">Under ₹1 Lakh</option>
                  <option value="₹1 Lakh - ₹3 Lakhs">₹1 Lakh - ₹3 Lakhs</option>
                  <option value="₹3 Lakhs - ₹5 Lakhs">₹3 Lakhs - ₹5 Lakhs (Full ATL Setup)</option>
                  <option value="Above ₹5 Lakhs">Above ₹5 Lakhs</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700  block mb-1">
                Additional Requirements / Specific Hardware Kits
              </label>
              <textarea
                rows={3}
                placeholder="Tell us about student strength, lab room space, or specific robotics kits needed..."
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50  border border-slate-200  text-xs font-medium focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-orange-600 text-white font-bold text-sm shadow-xl flex items-center justify-center space-x-2 transition-transform hover:scale-105"
            >
              <Send className="w-4 h-4" />
              <span>Submit B2B Quotation Request</span>
            </button>
          </form>
        ) : (
          <div className="p-12 text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
            <h3 className="text-2xl font-bold font-heading text-slate-900 ">
              Quotation Request Received!
            </h3>
            <p className="text-sm text-slate-600  max-w-md mx-auto">
              Thank you for contacting NavoYantra. Our institutional STEM lab manager will prepare a custom prospectus and reach out to <strong>{formData.email}</strong> within 24 hours.
            </p>
            <button
              onClick={handleClose}
              className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs"
            >
              Close Window
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
