import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Calendar, Gift, GraduationCap } from 'lucide-react';

export const OffersSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const offers = [
    {
      id: 1,
      type: 'mega',
      badge: 'WELCOME OFFER',
      title: 'Flat 25% OFF on Your First Purchase!',
      description: 'Kickstart your robotics journey today. Use code WELCOME25 at checkout to claim your flat 25% discount on all kits.',
      date: 'Valid till 31st August 2026',
      icon: <Sparkles className="w-8 h-8 text-orange-400" />,
      bgImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      gradient: 'from-[#0B2545] via-[#13315C] to-transparent',
      textAccent: 'text-orange-400'
    },
    {
      id: 2,
      type: 'premium',
      badge: 'PREMIUM BUNDLE',
      title: 'Free Gift + Premium LMS Course',
      description: 'Go big! Shop for ₹5,000 or more and we will send you an exclusive hardware gift PLUS 100% free access to our premium LMS course.',
      date: 'Valid on orders above ₹5,000',
      icon: <Gift className="w-8 h-8 text-purple-400" />,
      bgImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      gradient: 'from-[#2E1065] via-[#4C1D95] to-transparent',
      textAccent: 'text-purple-400'
    },
    {
      id: 3,
      type: 'monthly',
      badge: 'MONTHLY SPECIAL',
      title: 'Unlock Premium Learning for Free',
      description: 'Shop for ₹3,000 or more this month and get a 100% free enrollment into our premium Learning Management System (LMS) Robotics Course.',
      date: 'Valid: 1st August - 31st August 2026',
      icon: <GraduationCap className="w-8 h-8 text-blue-400" />,
      bgImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      gradient: 'from-[#0F172A] via-[#1E293B] to-transparent',
      textAccent: 'text-blue-400'
    },
    {
      id: 4,
      type: 'limited',
      badge: 'LIMITED TIME',
      title: 'Claim Your Free Maker\'s Gift',
      description: 'Upgrade your DIY lab instantly! Make a purchase of ₹2,500 and receive a surprise hardware prototyping gift box absolutely free with your order.',
      date: 'Valid while stocks last!',
      icon: <Gift className="w-8 h-8 text-emerald-400" />,
      bgImage: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      gradient: 'from-[#064E3B] via-[#065F46] to-transparent',
      textAccent: 'text-emerald-400'
    }
  ];

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % offers.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [offers.length]);

  return (
    <section className="py-12 bg-slate-950 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
          Exclusive Offers & Promotions
        </h2>
        <p className="text-base text-slate-400 mt-2 max-w-2xl mx-auto">
          Take advantage of our ongoing deals to build your dream robotics lab today.
        </p>
      </div>

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-slate-900 h-[450px] sm:h-[500px]">
          
          {/* Slides Container */}
          <div 
            className="flex w-full h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {offers.map((offer) => (
              <div 
                key={offer.id} 
                className="w-full h-full flex-shrink-0 relative flex"
              >
                {/* Background Image (Right side visual focus) */}
                <div 
                  className="absolute inset-0 bg-cover bg-center sm:bg-right"
                  style={{ backgroundImage: `url(${offer.bgImage})` }}
                />
                
                {/* Gradient Overlay for Text Readability (Left Side heavy) */}
                <div className={`absolute inset-0 bg-gradient-to-r sm:bg-gradient-to-r ${offer.gradient} opacity-95`} />
                <div className="absolute inset-0 bg-slate-900/40 sm:bg-transparent" /> {/* Extra darkening for mobile */}
                
                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center h-full w-full max-w-3xl px-8 sm:px-16 space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 shadow-xl">
                      {offer.icon}
                    </div>
                    <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-extrabold tracking-widest uppercase shadow-lg">
                      {offer.badge}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white leading-[1.1] drop-shadow-lg">
                      {offer.title.split(' ').map((word, i) => (
                        <span key={i} className={word.includes('OFF') || word.includes('Free') ? offer.textAccent : 'text-white'}>
                          {word}{' '}
                        </span>
                      ))}
                    </h3>
                    
                    <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl font-medium drop-shadow-md">
                      {offer.description}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4">
                    <button className={`px-8 py-3.5 rounded-xl bg-white text-slate-900 font-bold text-sm sm:text-base hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 w-full sm:w-auto shadow-xl`}>
                      <span>Claim Offer Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    
                    <div className="flex items-center space-x-2 text-white/80 bg-black/20 px-4 py-2.5 rounded-xl border border-white/10 w-fit backdrop-blur-sm">
                      <Calendar className={`w-4 h-4 ${offer.textAccent}`} />
                      <span className="text-xs sm:text-sm font-bold">{offer.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-3 z-20">
            {offers.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all duration-300 rounded-full ${
                  currentSlide === idx 
                    ? 'w-8 h-2.5 bg-white shadow-lg' 
                    : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
