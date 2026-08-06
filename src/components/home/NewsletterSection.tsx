import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Mail, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const { showToast } = useApp();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'Parent' | 'Student' | 'Teacher'>('Student');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'warning');
      return;
    }
    setSubscribed(true);
    showToast('Subscribed successfully! Check your inbox for your 10% coupon code: STEM10', 'success');
  };

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 via-blue-700 to-slate-900 text-white relative overflow-hidden">
      
      {/* Background Graphic Blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-orange-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>JOIN THE MAKER COMMUNITY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            Get 10% Off Your First STEM Kit + Free Robotics Ebook
          </h2>

          <p className="text-sm sm:text-base text-blue-100 leading-relaxed max-w-xl mx-auto">
            Subscribe to our weekly STEM newsletter for free video tutorials, Arduino & Python code updates, and exclusive school discount coupons.
          </p>

          {!subscribed ? (
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
              {/* Role selector chips */}
              <div className="flex justify-center space-x-2">
                {(['Student', 'Parent', 'Teacher'] as const).map(r => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                      role === r
                        ? 'bg-orange-500 text-white shadow-md'
                        : 'bg-white/10 text-blue-200 hover:bg-white/20'
                    }`}
                  >
                    I am a {r}
                  </button>
                ))}
              </div>

              {/* Form Input */}
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className="relative flex-1 w-full">
                  <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white text-slate-900 placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-xl"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-xl transition-transform hover:scale-105 flex items-center justify-center space-x-2 shrink-0"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[11px] text-blue-200">
                🔒 We respect your privacy. Unsubscribe anytime with 1 click.
              </p>
            </form>
          ) : (
            <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 text-center space-y-2 max-w-md mx-auto">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h4 className="text-xl font-bold font-heading">You are subscribed!</h4>
              <p className="text-xs text-blue-100">
                Use code <code className="bg-orange-500 text-white px-2 py-0.5 rounded font-mono font-bold">STEM10</code> at checkout for 10% discount. Check your email for your free ebook download link!
              </p>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
