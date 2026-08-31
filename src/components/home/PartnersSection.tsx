import React from 'react';
import { Award, ShieldCheck, CheckCircle2, Factory, GraduationCap } from 'lucide-react';

export const PartnersSection: React.FC = () => {
  const partners = [
    { name: 'NITI Aayog STEM Network', badge: 'Atal Innovation Mission', icon: <Award className="w-5 h-5" /> },
    { name: 'IEEE Robotics & Automation', badge: 'Technical Member', icon: <ShieldCheck className="w-5 h-5" /> },
    { name: 'CBSE K-12 Aligned', badge: 'Curriculum Standards', icon: <CheckCircle2 className="w-5 h-5" /> },
    { name: 'Make In India', badge: '100% Manufactured', icon: <Factory className="w-5 h-5" /> },
    { name: '500+ Top Institutions', badge: 'DPS, KV, Amity', icon: <GraduationCap className="w-5 h-5" /> }
  ];

  // Duplicate for infinite scroll
  const marqueeItems = [...partners, ...partners, ...partners];

  return (
    <section className="py-16 bg-white overflow-hidden relative border-t border-slate-100">
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333333%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
          width: max-content;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-blue-50 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 opacity-60"></div>
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-cyan-50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 opacity-60"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 relative z-10">
        <p className="text-center text-xs font-extrabold text-blue-600 uppercase tracking-widest">
          Accreditations & Institutional Partners Across India
        </p>
      </div>

      <div className="relative flex overflow-hidden z-10">
        {/* Left Fade */}
        <div className="absolute top-0 left-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none"></div>
        
        {/* Marquee Track */}
        <div className="flex space-x-6 animate-scroll px-3 py-4">
          {marqueeItems.map((p, idx) => (
            <div
              key={idx}
              className="flex items-center space-x-4 p-4 md:p-5 rounded-2xl bg-white border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 w-72 shrink-0 group cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center shrink-0 transition-colors duration-300">
                {p.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-slate-900 truncate">
                  {p.name}
                </h4>
                <span className="text-[11px] text-slate-500 block truncate font-medium">
                  {p.badge}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Fade */}
        <div className="absolute top-0 right-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none"></div>
      </div>
    </section>
  );
};
