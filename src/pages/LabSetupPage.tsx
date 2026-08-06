import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  School, CheckCircle2, ShieldCheck, Sparkles, Send, Award, FileText, ChevronRight, Users, Cpu 
} from 'lucide-react';

export const LabSetupPage: React.FC = () => {
  const { setIsQuoteModalOpen, showToast } = useApp();

  const [formState, setFormState] = useState({
    schoolName: '',
    contactName: '',
    email: '',
    phone: '',
    city: '',
    labType: 'Standard Atal Tinkering Lab (ATL)',
    studentsCount: 100
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Quote request submitted! Our STEM Lab team will contact you within 24 hours.', 'success');
    setFormState({
      schoolName: '',
      contactName: '',
      email: '',
      phone: '',
      city: '',
      labType: 'Standard Atal Tinkering Lab (ATL)',
      studentsCount: 100
    });
  };

  const packages = [
    {
      name: 'Starter STEM Lab Package',
      target: 'Primary & Middle Schools (15-30 Students)',
      price: '₹99,999',
      badge: 'Popular for Primary Schools',
      color: 'border-blue-200 bg-blue-50/40',
      badgeColor: 'bg-blue-100 text-blue-700',
      items: [
        '5x NavoBot Pro V4 Autonomous Rovers',
        '5x NavoJunior Magnetic Snap Block Kits',
        '10x Arduino Uno Sensor Packs',
        'Printed Grade 5-8 Curriculum Manuals',
        '1-Day On-Site Teacher Workshop'
      ]
    },
    {
      name: 'Atal Tinkering Lab (ATL) Standard',
      target: 'High Schools (30-60 Students per batch)',
      price: '₹2,99,999',
      badge: 'NITI Aayog Compliant',
      color: 'border-orange-300 bg-orange-50/40',
      badgeColor: 'bg-orange-500 text-white',
      items: [
        '10x NavoBot Pro V4 AI Rovers',
        '5x NavoAI Vision & Machine Learning Labs',
        '5x NavoIoT Climate & Smart Home Packs',
        '1x NavoPrint Desktop 3D Printer',
        'Full 300+ Sensors & Component Chest',
        '2-Day Faculty Certification Workshop'
      ]
    },
    {
      name: 'Advanced AI & ROS Innovation Hub',
      target: 'Colleges & Senior Secondary Institutions',
      price: '₹4,99,999',
      badge: 'Engineering Grade',
      color: 'border-purple-300 bg-purple-50/40',
      badgeColor: 'bg-purple-600 text-white',
      items: [
        '15x NavoBot Pro V4 AI Rovers',
        '10x NavoPi AI Edge Vision Centers (Raspberry Pi 4/5)',
        '5x NavoArm 4-DOF Metal Gear Robotic Arms',
        '2x NavoPrint Desktop 3D Printers',
        'Dedicated WhatsApp & Telephonic Engineering Support',
        'Annual Science Exhibition Championship Assistance'
      ]
    }
  ];

  return (
    <div className="py-12 bg-[#F6F7F9] min-h-screen space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-orange-100 border border-orange-200 text-orange-700 text-xs font-bold">
            <School className="w-4 h-4" />
            <span>NITI AAYOG & CBSE ALIGNED STEM LABS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold font-heading text-slate-900 tracking-tight">
            Turnkey STEM & Atal Tinkering Lab Setup
          </h1>

          <p className="text-base text-slate-600 leading-relaxed">
            We provide end-to-end laboratory installation, CBSE-aligned K-12 robotics curriculum, certified teacher workshops, and 2-year institutional hardware warranties for schools across India.
          </p>

          <div className="pt-2 flex justify-center space-x-4">
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="px-6 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-lg flex items-center space-x-2 transition-transform hover:scale-105"
            >
              <span>Get Custom Quotation</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Packages Cards */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-8 border-2 ${pkg.color} bg-white shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden`}
            >
              <div className="space-y-4">
                <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide inline-block ${pkg.badgeColor}`}>
                  {pkg.badge}
                </span>

                <h3 className="text-2xl font-extrabold font-heading text-slate-900">
                  {pkg.name}
                </h3>
                <p className="text-xs font-semibold text-slate-500">{pkg.target}</p>

                <div className="pt-2">
                  <span className="text-3xl font-extrabold text-blue-600 font-heading">{pkg.price}</span>
                  <span className="text-xs text-slate-400 block font-medium">All-inclusive GST turnkey package</span>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">Included Equipment & Services:</span>
                  <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
                    {pkg.items.map((item, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs shadow-md transition-colors text-center"
              >
                Request Quotation For This Package
              </button>
            </div>
          ))}
        </div>

        {/* Instant Quote Form */}
        <div className="mt-20 rounded-3xl bg-slate-900 text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>DIRECT INSTITUTIONAL INQUIRY</span>
              </div>
              <h2 className="text-3xl font-bold font-heading">
                Ready to transform your school's STEM & Robotics room?
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Fill out the quick inquiry form to receive our official lab equipment prospectus, CBSE curriculum matrix, and custom price estimate within 24 hours.
              </p>
              <div className="pt-2 text-xs text-slate-400 space-y-1">
                <p>📞 Telephonic Consultation: +91 (080) 4567-8900</p>
                <p>✉ B2B Email: labsetup@navoyantra.com</p>
              </div>
            </div>

            <div className="lg:col-span-7 bg-slate-800/90 p-6 sm:p-8 rounded-2xl border border-slate-700">
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">School / College Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. DPS Bengaluru"
                      value={formState.schoolName}
                      onChange={e => setFormState({ ...formState, schoolName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Contact Person Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Principal / Coordinator"
                      value={formState.contactName}
                      onChange={e => setFormState({ ...formState, contactName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Official Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="principal@school.edu.in"
                      value={formState.email}
                      onChange={e => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formState.phone}
                      onChange={e => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-lg transition-transform hover:scale-[1.02] flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Lab Quotation Request</span>
                </button>
              </form>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
