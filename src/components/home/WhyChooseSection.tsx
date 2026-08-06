import React from 'react';
import { 
  ShieldCheck, Award, Video, Headphones, Zap, CheckCircle2, Sparkles 
} from 'lucide-react';

export const WhyChooseSection: React.FC = () => {
  const pillars = [
    {
      icon: <Award className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      title: 'CBSE & ATL Aligned Curriculum',
      desc: 'Designed by IIT alumni and STEM educators to align perfectly with K-12 robotics guidelines and Atal Innovation Mission standards.',
      bg: 'bg-blue-50 dark:bg-blue-950/40'
    },
    {
      icon: <Zap className="w-8 h-8 text-orange-500" />,
      title: 'Safe Plug & Play Modular Electronics',
      desc: 'Pre-soldered boards, color-coded jumper pins, and short-circuit protection. 100% safe for kids without needing dangerous soldering irons.',
      bg: 'bg-orange-50 dark:bg-orange-950/40'
    },
    {
      icon: <Video className="w-8 h-8 text-purple-600 dark:text-purple-400" />,
      title: 'Free HD Video & Code Library',
      desc: 'Every kit includes lifetime access to 1080p assembly video tutorials, Scratch block guides, and downloadable C++/Python GitHub repos.',
      bg: 'bg-purple-50 dark:bg-purple-950/40'
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />,
      title: '1-Year Full Replacement Warranty',
      desc: 'No-questions-asked component replacement warranty. If a motor or sensor malfunctions during learning, we ship a free replacement instantly.',
      bg: 'bg-emerald-50 dark:bg-emerald-950/40'
    },
    {
      icon: <Headphones className="w-8 h-8 text-sky-600 dark:text-sky-400" />,
      title: 'Dedicated WhatsApp & Telephonic Support',
      desc: 'Got stuck on a code bug or wiring setup? Our dedicated STEM technical engineers assist via live WhatsApp chat and phone call.',
      bg: 'bg-sky-50 dark:bg-sky-950/40'
    }
  ];

  return (
    <section id="why-choose" className="py-20 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-widest flex items-center justify-center space-x-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE NAVOYANTRA DIFFERENCE</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
            Why Parents, Schools & Students Trust Us
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400">
            We don't just sell components—we deliver complete, end-to-end hands-on learning experiences that nurture real problem-solving skills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-xl transition-all duration-300 group space-y-4"
            >
              <div className={`w-16 h-16 rounded-2xl ${pillar.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                {pillar.icon}
              </div>
              <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                {pillar.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {pillar.desc}
              </p>
              <div className="pt-2 flex items-center space-x-1.5 text-xs font-bold text-blue-600 dark:text-blue-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Verified Quality Standard</span>
              </div>
            </div>
          ))}

          {/* Bonus Highlight Box */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900 text-white shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
                50,000+ Young Makers
              </span>
              <h3 className="text-2xl font-bold font-heading">
                Ready to kickstart your robotics adventure?
              </h3>
              <p className="text-xs text-blue-100 leading-relaxed">
                Join thousands of students across India creating autonomous AI rovers, smart home devices, and drone systems today.
              </p>
            </div>

            <a
              href="#featured-kits"
              className="w-full py-3 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-lg text-center transition-colors block"
            >
              Browse Innovation Kits Now
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
