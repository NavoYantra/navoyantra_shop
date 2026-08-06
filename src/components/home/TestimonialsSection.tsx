import React from 'react';
import { TESTIMONIALS } from '../../data/testimonials';
import { Star, ShieldCheck } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-extrabold text-blue-500 uppercase tracking-widest">
            REAL IMPACT & REVIEWS
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            Loved By Parents, Principals & Makers
          </h2>
          <p className="text-base text-slate-400">
            Hear from schools, teachers, parents, and students who have built awards-winning robotics projects using NavoYantra hardware.
          </p>
        </div>

        {/* Infinite Scrolling Testimonials */}
        <div className="relative overflow-hidden w-full -mx-4 px-4 sm:mx-0 sm:px-0">
          {/* Gradient Masks for smooth fade on edges */}
          <div className="absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />

          <div className="flex w-max animate-marquee hover:pause-animation space-x-6 py-4">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((rev, idx) => (
              <div
                key={`${rev.id}-${idx}`}
                className="w-[320px] sm:w-[380px] p-6 rounded-3xl bg-slate-800 border border-slate-700 shadow-xl flex flex-col justify-between space-y-4 relative flex-shrink-0"
              >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  {rev.verifiedPurchase && (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-900/40 text-emerald-400 border border-emerald-800/60 text-[10px] font-extrabold flex items-center space-x-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Verified Order</span>
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold font-heading text-white">
                  "{rev.title}"
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed italic">
                  "{rev.content}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-700 flex items-center space-x-4">
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  className="w-12 h-12 rounded-2xl object-cover border-2 border-blue-600/30"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {rev.author}
                  </h4>
                  <p className="text-xs text-blue-400 font-semibold">
                    {rev.role} {rev.institution ? `• ${rev.institution}` : ''}
                  </p>
                  {rev.productName && (
                    <p className="text-[10px] text-slate-400 truncate max-w-[250px] mt-0.5">
                      Kit: {rev.productName}
                    </p>
                  )}
                </div>
              </div>
            </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
