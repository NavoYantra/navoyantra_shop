import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS } from '../../data/products';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { 
  Sparkles, ArrowRight,   CheckCircle2, Star, Users, School
} from 'lucide-react';

const PARTICLES = Array.from({ length: 30 }).map((_, i) => ({
  id: i,
  color: i % 3 === 0 ? 'bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.8)]' 
       : i % 3 === 1 ? 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]'
       : 'bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]',
  size: Math.random() * 12 + 4,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  isFast: Math.random() > 0.5,
  duration: 4 + Math.random() * 6,
  xOffset: (Math.random() - 0.5) * 80,
  yOffset: (Math.random() - 0.5) * 80,
}));

export const HeroSection: React.FC = () => {
  const { setIsQuoteModalOpen, setQuickViewProduct } = useApp();
  
  // Slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  const newArrivals = PRODUCTS.slice(0, 4);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % newArrivals.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [newArrivals.length]);

  // Framer Motion mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the cursor follow effect
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  
  // Slower springs for background particles
  const slowSpringX = useSpring(mouseX, { stiffness: 20, damping: 30 });
  const slowSpringY = useSpring(mouseY, { stiffness: 20, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const xOffset = (clientX / window.innerWidth - 0.5) * 100;
    const yOffset = (clientY / window.innerHeight - 0.5) * 100;
    
    mouseX.set(xOffset);
    mouseY.set(yOffset);
  };

  return (
    <section 
      className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
      onMouseMove={handleMouseMove}
    >
      
      {/* Interactive Background Particles */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute z-0 pointer-events-none"
          style={{ 
            top: p.top, 
            left: p.left,
            x: p.isFast ? springX : slowSpringX, 
            y: p.isFast ? springY : slowSpringY 
          }}
        >
          <motion.div
            className={`rounded-full ${p.color}`}
            style={{ width: p.size, height: p.size }}
            animate={{
              x: [0, p.xOffset, 0],
              y: [0, p.yOffset, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      ))}
      
      {/* Background Decorative Glow Blobs */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" 
        style={{ x: slowSpringX, y: slowSpringY }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" 
        style={{ x: springX, y: slowSpringY }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content (7 Columns) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-900/50 border border-blue-500/30 text-blue-300 text-xs font-bold shadow-lg backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-ping" />
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>India's #1 EdTech & Robotics Innovation Platform</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight leading-[1.1]">
              Build, Code & Innovate the <br className="hidden sm:inline" />
              <span className="text-blue-500">Future of Robotics & AI</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Empowering <strong>Kids (8-14 yrs)</strong>, <strong>School Students</strong>, <strong>College Engineers</strong>, and <strong>Atal Tinkering Labs</strong> with pre-soldered, safe, and curriculum-aligned STEM innovation kits.
            </p>

            {/* Quick Pill Highlights */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2 text-xs font-semibold text-slate-200">
              <span className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 backdrop-blur-md shadow-md">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>100% CBSE & ATL Aligned</span>
              </span>
              <span className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 backdrop-blur-md shadow-md">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span>Block & Python Coding</span>
              </span>
              <span className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 backdrop-blur-md shadow-md">
                <CheckCircle2 className="w-4 h-4 text-orange-400" />
                <span>1-Year Hardware Warranty</span>
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href="#featured-kits"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-orange hover:opacity-90 text-white font-bold text-base shadow-xl shadow-orange-500/25 transition-all hover:-translate-y-1 flex items-center justify-center space-x-3"
              >
                <span>Explore STEM Kits</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-slate-800 text-white font-bold text-base border-2 border-slate-700 hover:border-blue-500 hover:bg-slate-800 transition-all shadow-md flex items-center justify-center space-x-2"
              >
                <School className="w-5 h-5 text-blue-400" />
                <span>Request School Lab Quote</span>
              </button>
            </div>

            {/* Trust Badges Bar */}
            <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
              <div className="flex items-center space-x-1.5">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-white">4.9/5</span>
                <span>(1,200+ Reviews)</span>
              </div>
              <div className="h-4 w-px bg-slate-700 hidden sm:block" />
              <div className="flex items-center space-x-1.5">
                <Users className="w-4 h-4 text-blue-400" />
                <span className="font-bold text-white">50,000+</span>
                <span>Student Makers</span>
              </div>
              <div className="h-4 w-px bg-slate-700 hidden sm:block" />
              <div className="flex items-center space-x-1.5">
                <School className="w-4 h-4 text-orange-400" />
                <span className="font-bold text-white">500+</span>
                <span>Partner Schools</span>
              </div>
            </div>

          </div>

          {/* Right Hero Visual Feature Highlight (5 Columns) */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            
            {/* New Arrivals Header */}
            <div className="flex items-center justify-between mb-4 px-2">
              <h3 className="text-white font-bold flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-orange-400" />
                <span className="text-lg">New Arrivals</span>
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

            {/* Main Interactive Slider Glass Card */}
            <div className="relative rounded-3xl overflow-hidden bg-slate-800/40 border border-slate-700 backdrop-blur-xl shadow-2xl p-3 group h-[380px] sm:h-[450px]">
              
              <div 
                className="flex w-full h-full transition-transform duration-700 ease-in-out" 
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {newArrivals.map((product) => (
                  <div 
                    key={product.id} 
                    className="w-full h-full flex-shrink-0 relative rounded-2xl overflow-hidden cursor-pointer"
                    onClick={() => setQuickViewProduct(product)}
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent opacity-90" />
                    
                    {/* Live Telemetry Floating Badges */}
                    <div className="absolute top-4 left-4 flex items-center space-x-2">
                      <span className="px-3 py-1.5 rounded-full bg-emerald-500/90 text-white text-[11px] font-bold shadow-md flex items-center space-x-1.5 backdrop-blur-md border border-emerald-400/30">
                        <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                        <span>JUST DROPPED</span>
                      </span>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 text-white space-y-2.5">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider bg-orange-500/20 px-3 py-1 rounded-full border border-orange-500/30 backdrop-blur-md">
                          {product.category}
                        </span>
                        <span className="text-base sm:text-xl font-extrabold text-emerald-400">
                          ₹{product.price.toLocaleString('en-IN')} <span className="line-through text-slate-400 text-[11px] sm:text-xs ml-1 font-medium">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold font-heading text-white line-clamp-1 drop-shadow-lg">
                        {product.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 drop-shadow-md pr-2">
                        {product.tagline}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
