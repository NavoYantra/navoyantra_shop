import React from 'react';
import { TESTIMONIALS } from '../../data/testimonials';
import { Star, ShieldCheck, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
            REAL IMPACT & REVIEWS
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
            Loved By Parents, Principals & Makers
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400">
            Hear from schools, teachers, parents, and students who have built awards-winning robotics projects using NavoYantra hardware.
          </p>
        </div>

        {/* Testimonials 4 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map(rev => (
            <div
              key={rev.id}
              className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 shadow-xl flex flex-col justify-between space-y-6 relative"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  {rev.verifiedPurchase && (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-extrabold flex items-center space-x-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Verified Order</span>
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                  "{rev.title}"
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
                  "{rev.content}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800 flex items-center space-x-4">
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  className="w-12 h-12 rounded-2xl object-cover border-2 border-blue-600/30"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {rev.author}
                  </h4>
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
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
    </section>
  );
};
