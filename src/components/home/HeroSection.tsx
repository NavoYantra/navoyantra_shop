import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowRight, School, TrendingUp, Truck, CheckCircle2, ShieldCheck, Award
} from 'lucide-react';
import { InteractiveMolecules } from './InteractiveMolecules';

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
    <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 bg-slate-900 border-b border-slate-800">
      
      <InteractiveMolecules />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main Hero Text (Span 7) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-sm font-semibold shadow-sm">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <span>India's Leading STEM Innovators</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight leading-[1.15]">
              Empowering Education with <br className="hidden sm:inline" />
              <span className="text-blue-400">Advanced STEM Solutions</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl leading-relaxed">
              Equip your institution with industry-grade robotics kits, AI modules, IoT smart devices, and complete ATL lab setups. Designed for future innovators.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <button
                onClick={() => {
                  setCurrentPage('shop');
                  window.scrollTo(0, 0);
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-base shadow-sm transition-all flex items-center justify-center space-x-2"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => {
                  setCurrentPage('lab-setup');
                  window.scrollTo(0, 0);
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-800 text-slate-200 font-semibold text-base border border-slate-700 hover:bg-slate-700 transition-all flex items-center justify-center space-x-2"
              >
                <School className="w-5 h-5 text-slate-400" />
                <span>Institutional Lab Setup</span>
              </button>
            </div>
          </div>

          {/* Slider Box (Span 5) */}
          <div className="lg:col-span-5 relative w-full h-[400px] lg:h-[480px] bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-lg flex flex-col">
             
            {/* Top Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-700 bg-slate-800/90 backdrop-blur-sm z-10">
              <h2 className="text-white font-bold flex items-center space-x-2">
                <span className="font-semibold text-sm tracking-tight">Featured Products</span>
              </h2>
              <div className="flex space-x-1.5">
                {newArrivals.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentSlide === idx ? 'bg-blue-500 w-6' : 'bg-slate-600 w-2 hover:bg-slate-500'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Slider Content */}
            <div className="relative flex-1 overflow-hidden cursor-pointer bg-white" onClick={() => setQuickViewProduct(newArrivals[currentSlide])}>
              <div 
                className="flex w-full h-full transition-transform duration-700 ease-in-out" 
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {newArrivals.map((product) => (
                  <div 
                    key={product.id} 
                    className="w-full h-full flex-shrink-0 flex flex-col"
                  >
                    <div className="flex-1 p-6 flex items-center justify-center bg-white">
                       <img
                         src={product.images[0]}
                         alt={product.name}
                         className="w-full h-full object-contain max-h-[240px] hover:scale-105 transition-transform duration-500"
                       />
                    </div>
                    
                    <div className="p-5 bg-slate-900 border-t border-slate-800">
                      <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-sm">
                        {product.category}
                      </span>
                      <h3 className="text-base font-bold text-white mt-2 line-clamp-1">
                        {product.name}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-lg font-bold text-white">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        {product.originalPrice > product.price && (
                           <span className="line-through text-slate-500 text-xs">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Trust Strip (Span 12) */}
          <div className="lg:col-span-12 mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-sm font-medium text-slate-400">
             <div className="flex items-center space-x-2">
               <Truck className="w-5 h-5 text-slate-500" />
               <span>Pan-India Delivery</span>
             </div>
             <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-700"></div>
             <div className="flex items-center space-x-2">
               <CheckCircle2 className="w-5 h-5 text-slate-500" />
               <span>Practical Learning Solutions</span>
             </div>
             <div className="hidden lg:block w-1 h-1 rounded-full bg-slate-700"></div>
             <div className="flex items-center space-x-2">
               <ShieldCheck className="w-5 h-5 text-slate-500" />
               <span>Institutional Quality</span>
             </div>
             <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-700"></div>
             <div className="flex items-center space-x-2">
               <Award className="w-5 h-5 text-slate-500" />
               <span>Indian Technology Brand</span>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};
