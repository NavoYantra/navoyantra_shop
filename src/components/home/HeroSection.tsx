import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, ArrowRight, School
} from 'lucide-react';
import { InteractiveBubbles } from './InteractiveBubbles';

export const HeroSection: React.FC = () => {
  const { setQuickViewProduct, storeProducts, setCurrentPage } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);
  const newArrivals = storeProducts.slice(0, 4);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % newArrivals.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [newArrivals.length]);

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 bg-slate-900">
      
      {/* Background Interactive Bubbles */}
      <InteractiveBubbles />
      
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Main Hero Text (Span 7) */}
          <div className="lg:col-span-7 p-4 sm:p-8 relative overflow-hidden group pointer-events-none">
            
            <div className="relative z-10 space-y-8 pointer-events-auto">
              {/* Top Pill Badge */}
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold shadow-sm backdrop-blur-md">
                <span className="flex h-2.5 w-2.5 rounded-full bg-blue-400 animate-pulse" />
                <Sparkles className="w-4 h-4 text-orange-400" />
                <span>Build. Learn. Innovate.</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight leading-[1.15]">
                Robotics Kits, STEM Products & <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Complete Lab Setup Solutions</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-medium drop-shadow-md">
                Explore robotics kits, STEM learning products, electronics components, IoT modules, AI kits, and complete technology lab setup solutions for students, makers, educators, schools, colleges, and institutions.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <button
                  onClick={() => {
                    setCurrentPage('shop');
                    window.scrollTo(0, 0);
                  }}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-orange hover:opacity-90 text-white font-bold text-base shadow-xl shadow-orange-500/25 transition-all hover:-translate-y-1 flex items-center justify-center space-x-3"
                >
                  <span>Shop Products</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => {
                    setCurrentPage('lab-setup');
                    window.scrollTo(0, 0);
                  }}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-800/80 text-white font-bold text-base border border-slate-700 hover:border-blue-500 hover:bg-slate-800 transition-all shadow-sm flex items-center justify-center space-x-2 cursor-pointer backdrop-blur-md"
                >
                  <School className="w-5 h-5" />
                  <span>Explore Lab Solutions</span>
                </button>
              </div>
            </div>
          </div>

          {/* Slider Box (Span 5) */}
          <div className="lg:col-span-5 bg-slate-800/60 rounded-[2.5rem] p-4 shadow-2xl shadow-blue-900/40 border border-slate-700/50 backdrop-blur-lg relative flex flex-col h-[400px] lg:h-auto overflow-hidden">
             
            {/* Top Header */}
            <div className="flex items-center justify-between mb-4 px-4 pt-2 z-10 relative">
              <h2 className="text-white font-bold flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-orange-500" />
                <span className="text-white font-black text-lg tracking-tight">Top Selling</span>
              </h2>
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
                      width={400}
                      height={400}
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
          <div className="lg:col-span-12 bg-slate-800/50 rounded-2xl p-4 sm:p-6 shadow-lg border border-slate-700/50 backdrop-blur-md flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8 text-xs sm:text-sm font-bold text-slate-300">
             <div className="flex items-center space-x-2">
               <span className="text-lg">🚚</span>
               <span className="text-white">Pan-India Delivery</span>
             </div>
             <div className="hidden sm:block text-slate-600">|</div>
             <div className="flex items-center space-x-2">
               <span className="text-lg">🛠️</span>
               <span className="text-white">Practical Learning Solutions</span>
             </div>
             <div className="hidden lg:block text-slate-600">|</div>
             <div className="flex items-center space-x-2">
               <span className="text-lg">🏫</span>
               <span className="text-white">Institutional Solutions</span>
             </div>
             <div className="hidden sm:block text-slate-600">|</div>
             <div className="flex items-center space-x-2">
               <span className="text-lg">🇮🇳</span>
               <span className="text-white">Indian Technology Brand</span>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};
