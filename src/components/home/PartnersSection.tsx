import React from 'react';
import { Award } from 'lucide-react';

export const PartnersSection: React.FC = () => {
  const partners = [
    { name: 'NITI Aayog STEM Network', badge: 'Atal Innovation Mission' },
    { name: 'IEEE Robotics & Automation', badge: 'Technical Member' },
    { name: 'CBSE K-12 Aligned', badge: 'Curriculum Standards' },
    { name: 'Make In India', badge: '100% Manufactured in India' },
    { name: '500+ Top Institutions', badge: 'DPS, Kendriya Vidyalaya, Amity' }
  ];

  return (
    <section className="py-12 bg-[#F6F7F9] border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-8">
          ACCREDITATIONS & INSTITUTIONAL PARTNERS ACROSS INDIA
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center justify-center">
          {partners.map((p, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white  border border-slate-200/80  text-center shadow-xs hover:border-blue-500/40 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-blue-50  text-blue-600  flex items-center justify-center mx-auto mb-2">
                <Award className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900 ">
                {p.name}
              </h4>
              <span className="text-[10px] text-slate-500  block mt-0.5">
                {p.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
