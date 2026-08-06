import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bot, Sparkles, ArrowRight, ShieldCheck, Award, 
  Cpu, Zap, Play, CheckCircle2, Star, Users, School, BookOpen
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setIsQuoteModalOpen, setQuickViewProduct } = useApp();
  const [activeTab, setActiveTab] = useState<'ai' | 'robot' | 'iot'>('robot');

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 bg-gradient-to-b from-[#F6F7F9] via-blue-50/30 to-[#F6F7F9]">
      
      {/* Background Decorative Glow Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-orange-500/10 dark:bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content (7 Columns) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-ping" />
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>India's #1 EdTech & Robotics Innovation Platform</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight leading-[1.1]">
              Build, Code & Innovate the <br className="hidden sm:inline" />
              <span className="text-gradient-primary">Future of Robotics & AI</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Empowering <strong>Kids (8-14 yrs)</strong>, <strong>School Students</strong>, <strong>College Engineers</strong>, and <strong>Atal Tinkering Labs</strong> with pre-soldered, safe, and curriculum-aligned STEM innovation kits.
            </p>

            {/* Quick Pill Highlights */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span className="flex items-center space-x-1 px-3 py-1 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>100% CBSE & ATL Aligned</span>
              </span>
              <span className="flex items-center space-x-1 px-3 py-1 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-blue-500" />
                <span>Block & Python Coding</span>
              </span>
              <span className="flex items-center space-x-1 px-3 py-1 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-orange-500" />
                <span>1-Year Hardware Warranty</span>
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href="#featured-kits"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-orange hover:opacity-95 text-white font-bold text-base shadow-xl shadow-orange-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-3"
              >
                <span>Explore STEM Kits</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-base border-2 border-blue-600/30 hover:border-blue-600 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-all shadow-md flex items-center justify-center space-x-2"
              >
                <School className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>Request School Lab Quote</span>
              </button>
            </div>

            {/* Trust Badges Bar */}
            <div className="pt-6 border-t border-slate-200/60 dark:border-slate-800 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center space-x-1.5">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-slate-800 dark:text-slate-200">4.9/5</span>
                <span>(1,200+ Reviews)</span>
              </div>
              <div className="h-4 w-px bg-slate-300 dark:bg-slate-700 hidden sm:block" />
              <div className="flex items-center space-x-1.5">
                <Users className="w-4 h-4 text-blue-600" />
                <span className="font-bold text-slate-800 dark:text-slate-200">50,000+</span>
                <span>Student Makers</span>
              </div>
              <div className="h-4 w-px bg-slate-300 dark:bg-slate-700 hidden sm:block" />
              <div className="flex items-center space-x-1.5">
                <School className="w-4 h-4 text-orange-500" />
                <span className="font-bold text-slate-800 dark:text-slate-200">500+</span>
                <span>Partner Schools</span>
              </div>
            </div>

          </div>

          {/* Right Hero Visual Feature Highlight (5 Columns) */}
          <div className="lg:col-span-5 relative">
            
            {/* Interactive Showcase Switcher Tabs */}
            <div className="flex justify-center space-x-2 mb-3 bg-white/80 dark:bg-slate-900/80 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 backdrop-blur-md shadow-sm">
              <button
                onClick={() => setActiveTab('robot')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'robot' 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                NavoBot Pro V4
              </button>
              <button
                onClick={() => setActiveTab('ai')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'ai' 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                NavoAI Lab
              </button>
              <button
                onClick={() => setActiveTab('iot')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'iot' 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                NavoIoT Automation
              </button>
            </div>

            {/* Main Interactive Robot Glass Card */}
            <div className="relative rounded-3xl overflow-hidden glass-panel border border-slate-200/80 dark:border-slate-800/80 shadow-2xl p-4 sm:p-6 group">
              
              {/* Product Visual Container */}
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                {activeTab === 'robot' && (
                  <img
                    src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1000&q=80"
                    alt="NavoBot Pro V4"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                {activeTab === 'ai' && (
                  <img
                    src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1000&q=80"
                    alt="NavoAI Lab"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                {activeTab === 'iot' && (
                  <img
                    src="https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=1000&q=80"
                    alt="NavoIoT Kit"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                {/* Live Telemetry Floating Badges */}
                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/90 text-white text-[11px] font-bold shadow-md flex items-center space-x-1 backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                    <span>SYSTEM ONLINE</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-blue-600/90 text-white text-[11px] font-bold shadow-md backdrop-blur-md">
                    ESP32 Dual-Core
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider">
                      Flagship Kit 2026
                    </span>
                    <span className="text-xs font-bold text-emerald-400">
                      ₹4,999 <span className="line-through text-slate-400 text-[10px]">₹6,999</span>
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-heading">
                    {activeTab === 'robot' && 'NavoBot Pro V4 - AI Vision Rover'}
                    {activeTab === 'ai' && 'NavoAI Vision & Machine Learning Starter'}
                    {activeTab === 'iot' && 'NavoIoT Smart Automation & Green Earth'}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2">
                    {activeTab === 'robot' && 'Features ESP32-CAM AI vision camera, dual line sensors, ROS navigation, and Scratch/Python IDE.'}
                    {activeTab === 'ai' && 'Learn computer vision, neural network models, gesture control, and voice activated AI modules.'}
                    {activeTab === 'iot' && 'Build smart greenhouse automation, cloud climate dashboard, and smartphone controlled relay switches.'}
                  </p>
                </div>
              </div>

              {/* Floating Glass Specs Card 1 (Bottom Left) */}
              <div className="absolute -bottom-4 -left-4 sm:bottom-6 sm:-left-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-3 rounded-2xl shadow-xl flex items-center space-x-3 hidden sm:flex z-20">
                <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950 text-orange-600 flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">15+ Projects Included</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Full Video & Code Manual</p>
                </div>
              </div>

              {/* Floating Glass Specs Card 2 (Top Right) */}
              <div className="absolute -top-4 -right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-3 rounded-2xl shadow-xl flex items-center space-x-3 hidden sm:flex z-20">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">CBSE & ATL Approved</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Class 6-12 STEM Curriculum</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
