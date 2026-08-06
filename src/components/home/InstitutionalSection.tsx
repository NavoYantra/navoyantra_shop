import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  School, CheckCircle2, FileText, Sparkles, ChevronRight, Users, Award, ShieldCheck 
} from 'lucide-react';

export const InstitutionalSection: React.FC = () => {
  const { setIsQuoteModalOpen } = useApp();

  return (
    <section id="institutional" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      
      {/* Background Graphic Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Content (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-bold">
              <School className="w-3.5 h-3.5" />
              <span>INSTITUTIONAL B2B SOLUTIONS</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight">
              Turnkey STEM & Atal Tinkering Labs (ATL) Setup for Schools
            </h2>

            <p className="text-base text-slate-300 leading-relaxed">
              We empower CBSE, ICSE, IB, and State Board schools across India to set up state-of-the-art STEM Robotics laboratories. From hardware equipment to accredited teacher training and annual exhibition support.
            </p>

            {/* Checklist Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start space-x-3 p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">NITI Aayog Compliant</h4>
                  <p className="text-xs text-slate-400">100% aligned with Atal Tinkering Lab equipment lists.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Certified Faculty Workshops</h4>
                  <p className="text-xs text-slate-400">On-site & virtual teacher training with certifications.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                <CheckCircle2 className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Grade K-12 Curriculum</h4>
                  <p className="text-xs text-slate-400">Printed student manuals & digital LMS portal access.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Bulk Discount Pricing</h4>
                  <p className="text-xs text-slate-400">GST invoices & official institutional purchase orders.</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-orange hover:opacity-95 text-white font-bold text-sm shadow-xl shadow-orange-500/20 flex items-center justify-center space-x-2 transition-transform hover:scale-105"
              >
                <span>Request Custom Lab Quote</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-slate-700 flex items-center justify-center space-x-2 transition-colors"
              >
                <FileText className="w-4 h-4 text-blue-400" />
                <span>Download School Prospectus PDF</span>
              </button>
            </div>

          </div>

          {/* Right Visual Card (5 Cols) */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl bg-slate-800/90 border border-slate-700 p-6 space-y-6 shadow-2xl backdrop-blur-md">
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80"
                  alt="School STEM Lab"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="px-2.5 py-1 rounded-full bg-blue-600 text-white text-[10px] font-extrabold uppercase">
                    Featured School Lab Package
                  </span>
                  <h4 className="text-lg font-bold font-heading text-white mt-1">
                    NavoLab Complete School Bundle
                  </h4>
                  <p className="text-xs text-slate-300">
                    Includes 15x Student Kits, Teacher Training, & 2-Year Warranty.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs border-b border-slate-700/80 pb-2">
                  <span className="text-slate-400">Target Capacity:</span>
                  <span className="font-bold text-white">Up to 30 Students per Batch</span>
                </div>
                <div className="flex items-center justify-between text-xs border-b border-slate-700/80 pb-2">
                  <span className="text-slate-400">Warranty:</span>
                  <span className="font-bold text-emerald-400">2 Years Institutional Support</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Estimated Setup Time:</span>
                  <span className="font-bold text-orange-400">Within 5 Business Days</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
