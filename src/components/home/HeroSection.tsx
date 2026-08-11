import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { motion } from 'framer-motion';
import { 
  Sparkles, ArrowRight, CheckCircle2, Users, School, 
  Cloud, Hexagon, Circle, Triangle
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setIsQuoteModalOpen, setQuickViewProduct, storeProducts } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);
  const newArrivals = storeProducts.slice(0, 4);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % newArrivals.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [newArrivals.length]);

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 bg-slate-50">
      
      {/* Background Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 150, repeat: Infinity, ease: "linear" }} className="absolute -top-[20%] -right-[10%] opacity-5 text-blue-600">
           <Hexagon size={800} strokeWidth={0.5} />
        </motion.div>
        <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[10%] left-[5%] opacity-10 text-orange-500">
           <Circle size={150} fill="currentColor" strokeWidth={0} />
        </motion.div>
        <motion.div animate={{ x: [0, 30, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[20%] left-[20%] opacity-10 text-emerald-500">
           <Triangle size={120} fill="currentColor" strokeWidth={0} className="rotate-45" />
        </motion.div>
        <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[10%] right-[30%] opacity-10 text-blue-400">
           <Cloud size={200} fill="currentColor" strokeWidth={0} />
        </motion.div>
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4wNSkiLz48L3N2Zz4=')] opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Main Hero Card (Span 8) */}
          <div className="lg:col-span-8 bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden group">
            
            {/* Decorative inner shape */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-50 rounded-full mix-blend-multiply opacity-70 group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-orange-50 rounded-full mix-blend-multiply opacity-70 group-hover:scale-110 transition-transform duration-700" />

            <div className="relative z-10 space-y-8">
              {/* Top Pill Badge */}
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold shadow-sm">
                <span className="flex h-2.5 w-2.5 rounded-full bg-blue-500 animate-pulse" />
                <Sparkles className="w-4 h-4 text-orange-500" />
                <span>India's #1 EdTech & Robotics Platform</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-slate-900 tracking-tight leading-[1.15]">
                Build, Code & Innovate the <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">Future of STEM</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed font-medium">
                Empowering <strong>Kids (8-14 yrs)</strong>, <strong>School Students</strong>, <strong>College Engineers</strong>, and <strong>Atal Tinkering Labs</strong> with pre-soldered, safe, and curriculum-aligned STEM kits.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <a
                  href="#featured-kits"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-orange hover:opacity-90 text-white font-bold text-base shadow-xl shadow-orange-500/25 transition-all hover:-translate-y-1 flex items-center justify-center space-x-3"
                >
                  <span>Explore Kits</span>
                  <ArrowRight className="w-5 h-5" />
                </a>

                <button
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-slate-700 font-bold text-base border-2 border-slate-200 hover:border-blue-600 hover:text-blue-700 transition-all shadow-sm flex items-center justify-center space-x-2"
                >
                  <School className="w-5 h-5" />
                  <span>Request Institutional Quote</span>
                </button>
              </div>
            </div>
          </div>

          {/* Slider Box (Span 4) */}
          <div className="lg:col-span-4 bg-slate-900 rounded-[2.5rem] p-4 shadow-2xl shadow-blue-900/20 relative flex flex-col h-[400px] lg:h-auto overflow-hidden">
             
            {/* Top Header */}
            <div className="flex items-center justify-between mb-4 px-4 pt-2 z-10 relative">
              <h3 className="text-white font-bold flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-orange-500" />
                <span className="text-white font-black text-lg tracking-tight">Top Selling</span>
              </h3>
              <div className="flex space-x-2">
                {newArrivals.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentSlide === idx ? 'bg-orange-500 w-6' : 'bg-slate-600 w-2 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Slider Content */}
            <div className="relative flex-1 rounded-2xl overflow-hidden group cursor-pointer" onClick={() => setQuickViewProduct(newArrivals[currentSlide])}>
              <div 
                className="flex w-full h-full transition-transform duration-700 ease-in-out" 
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {newArrivals.map((product) => (
                  <div 
                    key={product.id} 
                    className="w-full h-full flex-shrink-0 relative"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                    
                    <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/20 px-2.5 py-1 rounded-full border border-emerald-500/30 backdrop-blur-md">
                        {product.category}
                      </span>
                      <h3 className="text-lg font-bold font-heading line-clamp-1">
                        {product.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-extrabold text-orange-400">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        {product.originalPrice > product.price && (
                           <span className="line-through text-slate-400 text-xs font-medium">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Mini Stats Bento Boxes (Span 4 each -> 12 total) */}
          <div className="lg:col-span-4 bg-blue-600 rounded-[2rem] p-6 shadow-xl shadow-blue-600/20 text-white relative overflow-hidden flex items-center space-x-4 transition-transform hover:-translate-y-1">
             <div className="absolute -right-4 -top-4 text-blue-500 opacity-50">
                <Circle size={100} fill="currentColor" strokeWidth={0} />
             </div>
             <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm relative z-10">
                <Users className="w-8 h-8 text-blue-100" />
             </div>
             <div className="relative z-10">
                <div className="text-3xl font-black font-heading tracking-tight">50,000+</div>
                <div className="text-blue-100 text-sm font-medium">Student Makers</div>
             </div>
          </div>

          <div className="lg:col-span-4 bg-emerald-500 rounded-[2rem] p-6 shadow-xl shadow-emerald-500/20 text-white relative overflow-hidden flex items-center space-x-4 transition-transform hover:-translate-y-1">
             <div className="absolute -right-4 -bottom-4 text-emerald-400 opacity-50">
                <Triangle size={100} fill="currentColor" strokeWidth={0} className="rotate-12" />
             </div>
             <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm relative z-10">
                <CheckCircle2 className="w-8 h-8 text-emerald-100" />
             </div>
             <div className="relative z-10">
                <div className="text-3xl font-black font-heading tracking-tight">100% ATL</div>
                <div className="text-emerald-100 text-sm font-medium">CBSE & ATL Aligned</div>
             </div>
          </div>

          <div className="lg:col-span-4 bg-orange-500 rounded-[2rem] p-6 shadow-xl shadow-orange-500/20 text-white relative overflow-hidden flex items-center space-x-4 transition-transform hover:-translate-y-1">
             <div className="absolute -left-4 -top-4 text-orange-400 opacity-50">
                <Hexagon size={100} fill="currentColor" strokeWidth={0} />
             </div>
             <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm relative z-10">
                <School className="w-8 h-8 text-orange-100" />
             </div>
             <div className="relative z-10">
                <div className="text-3xl font-black font-heading tracking-tight">500+</div>
                <div className="text-orange-100 text-sm font-medium">Partner Schools</div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};
