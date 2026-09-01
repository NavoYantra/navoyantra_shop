import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  School, CheckCircle2, FileText, ChevronRight, Hexagon, Circle
} from 'lucide-react';

const INSTITUTIONAL_PACKAGES = [
  {
    id: 'atl-complete',
    badge: 'Featured School Lab Package',
    title: 'NavoLab Complete School Bundle',
    description: 'Includes 15x Student Kits, Teacher Training, & 2-Year Warranty.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    capacity: 'Up to 30 Students per Batch',
    warranty: '2 Years Institutional Support',
    setupTime: 'Within 5 Business Days'
  },
  {
    id: 'robotics-starter',
    badge: 'Beginner Robotics Package',
    title: 'STEM Robotics Starter Kit',
    description: 'Perfect for primary schools. Includes 10x Snap Blocks & Arduino Kits.',
    image: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&w=800&q=80',
    capacity: 'Up to 20 Students per Batch',
    warranty: '1-Week Warranty on Premium Products',
    setupTime: 'Within 3 Business Days'
  },
  {
    id: 'ai-vision',
    badge: 'Advanced AI Labs',
    title: 'AI & Computer Vision Pro Setup',
    description: 'Advanced Python, OpenCV, and Raspberry Pi clusters for high schools.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    capacity: 'Up to 15 Students per Batch',
    warranty: '3 Years Premium Support',
    setupTime: 'Within 7 Business Days'
  }
];

export const InstitutionalSection: React.FC = () => {
  const { setIsQuoteModalOpen } = useApp();
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % INSTITUTIONAL_PACKAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const currentPackage = INSTITUTIONAL_PACKAGES[currentIdx];

  return (
    <section id="institutional" className="py-20 bg-white text-slate-900 relative overflow-hidden">
      
      {/* Background Graphic Accents */}
      <div className="absolute top-0 right-0 opacity-5 text-blue-600 pointer-events-none translate-x-1/2 -translate-y-1/2">
        <Hexagon size={600} strokeWidth={1} />
      </div>
      <div className="absolute bottom-0 left-0 opacity-5 text-orange-500 pointer-events-none -translate-x-1/2 translate-y-1/4">
        <Circle size={400} strokeWidth={2} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-50 text-orange-600 border border-orange-200 text-xs font-bold">
              <School className="w-3.5 h-3.5" />
              <span>INSTITUTIONAL B2B SOLUTIONS</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 tracking-tight leading-tight">
              Turnkey STEM & Atal Tinkering Labs (ATL) Setup for Schools
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              We empower CBSE, ICSE, IB, and State Board schools across India to set up state-of-the-art STEM Robotics laboratories. From hardware equipment to accredited teacher training and annual exhibition support.
            </p>

            {/* Checklist Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start space-x-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:shadow-md transition-shadow">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">NITI Aayog Compliant</h4>
                  <p className="text-xs text-slate-500 mt-1">100% aligned with Atal Tinkering Lab equipment lists.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:shadow-md transition-shadow">
                <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Certified Faculty Workshops</h4>
                  <p className="text-xs text-slate-500 mt-1">On-site & virtual teacher training with certifications.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:shadow-md transition-shadow">
                <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Grade K-12 Curriculum</h4>
                  <p className="text-xs text-slate-500 mt-1">Printed student manuals & digital LMS portal access.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:shadow-md transition-shadow">
                <CheckCircle2 className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Bulk Discount Pricing</h4>
                  <p className="text-xs text-slate-500 mt-1">GST invoices & official institutional purchase orders.</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-orange-600 hover:opacity-95 text-white font-bold text-sm shadow-xl shadow-orange-500/20 flex items-center justify-center space-x-2 transition-transform hover:-translate-y-1"
              >
                <span>Request Custom Lab Quote</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white text-slate-700 font-bold text-sm border-2 border-slate-200 hover:border-blue-600 hover:text-blue-700 flex items-center justify-center space-x-2 transition-all shadow-sm"
              >
                <FileText className="w-4 h-4 text-blue-500" />
                <span>Download School Prospectus PDF</span>
              </button>
            </div>

          </div>

          {/* Right Visual Card (5 Cols) */}
          <div className="lg:col-span-5 relative group">
            <div className="rounded-[2.5rem] bg-white border border-slate-100 p-6 space-y-6 shadow-xl shadow-slate-200/50 relative overflow-hidden">
              
              {/* Carousel Indicators */}
              <div className="absolute top-4 right-4 flex space-x-1.5 z-20">
                {INSTITUTIONAL_PACKAGES.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentIdx(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${idx === currentIdx ? 'bg-orange-500 w-4' : 'bg-white/60 hover:bg-white'}`}
                  />
                ))}
              </div>

              <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-sm bg-slate-100">
                <img
                  key={currentPackage.image}
                  src={currentPackage.image}
                  alt={currentPackage.title}
                  className="w-full h-full object-cover transition-transform duration-700 animate-fade-in group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="px-2.5 py-1 rounded-full bg-blue-600 text-[10px] font-extrabold uppercase inline-block mb-2 shadow-sm">
                    {currentPackage.badge}
                  </span>
                  <h4 key={`title-${currentPackage.id}`} className="text-lg font-bold font-heading animate-slide-up drop-shadow-md">
                    {currentPackage.title}
                  </h4>
                  <p key={`desc-${currentPackage.id}`} className="text-xs text-slate-200 animate-slide-up drop-shadow-md mt-1" style={{ animationDelay: '50ms' }}>
                    {currentPackage.description}
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-3 overflow-hidden">
                  <span className="text-slate-500 font-medium">Target Capacity:</span>
                  <span key={`cap-${currentPackage.id}`} className="font-bold text-slate-800 animate-fade-in">{currentPackage.capacity}</span>
                </div>
                <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-3 overflow-hidden">
                  <span className="text-slate-500 font-medium">Warranty:</span>
                  <span key={`war-${currentPackage.id}`} className="font-bold text-emerald-600 animate-fade-in">{currentPackage.warranty}</span>
                </div>
                <div className="flex items-center justify-between text-xs pb-1 overflow-hidden">
                  <span className="text-slate-500 font-medium">Estimated Setup Time:</span>
                  <span key={`time-${currentPackage.id}`} className="font-bold text-orange-600 animate-fade-in">{currentPackage.setupTime}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
