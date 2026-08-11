import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { motion } from 'framer-motion';
import { 
  Sparkles, ArrowRight, School, 
  Cloud, Hexagon, Circle, Triangle
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setQuickViewProduct, storeProducts } = useApp();
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
                <span>Build. Learn. Innovate.</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-slate-900 tracking-tight leading-[1.15]">
                Robotics Kits, STEM Products & <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">Complete Lab Setup Solutions</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed font-medium">
                Explore robotics kits, STEM learning products, electronics components, IoT modules, AI kits, and complete technology lab setup solutions for students, makers, educators, schools, colleges, and institutions.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <a
                  href="#featured-kits"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-orange hover:opacity-90 text-white font-bold text-base shadow-xl shadow-orange-500/25 transition-all hover:-translate-y-1 flex items-center justify-center space-x-3"
                >
                  <span>Shop Products</span>
                  <ArrowRight className="w-5 h-5" />
                </a>

                <a
                  href="#institutional"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-slate-700 font-bold text-base border-2 border-slate-200 hover:border-blue-600 hover:text-blue-700 transition-all shadow-sm flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <School className="w-5 h-5" />
                  <span>Explore Lab Solutions</span>
                </a>
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

          {/* Trust Strip (Span 12) */}
          <div className="lg:col-span-12 bg-white rounded-2xl p-4 sm:p-6 shadow-lg shadow-slate-200/50 border border-slate-100 flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8 text-xs sm:text-sm font-bold text-slate-700">
             <div className="flex items-center space-x-2">
               <span className="text-lg">🚚</span>
               <span>Pan-India Delivery</span>
             </div>
             <div className="hidden sm:block text-slate-300">|</div>
             <div className="flex items-center space-x-2">
               <span className="text-lg">🛠️</span>
               <span>Practical Learning Solutions</span>
             </div>
             <div className="hidden lg:block text-slate-300">|</div>
             <div className="flex items-center space-x-2">
               <span className="text-lg">🏫</span>
               <span>Institutional Solutions</span>
             </div>
             <div className="hidden sm:block text-slate-300">|</div>
             <div className="flex items-center space-x-2">
               <span className="text-lg">🇮🇳</span>
               <span>Indian Technology Brand</span>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};
