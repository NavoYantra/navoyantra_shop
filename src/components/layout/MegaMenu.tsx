import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CategoryType, AgeGroupType } from '../../types';
import { 
  Layers, GraduationCap, Cpu, Star, ChevronRight, 
  Bot, BrainCircuit, Wifi, Zap, Sparkles, ShoppingBag, ArrowRight, Plane
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getCategories, getBrands } from '../../lib/api';

interface MegaMenuProps {
  onClose: () => void;
}

type TabType = 'categories' | 'age' | 'brands';

export const MegaMenu: React.FC<MegaMenuProps> = ({ onClose }) => {
  const { setFilters, setCurrentPage, storeProducts } = useApp();
  const [activeTab, setActiveTab] = useState<TabType>('categories');

  const { data: dbCategories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  });

  const { data: dbBrands = [] } = useQuery({
    queryKey: ['brands'],
    queryFn: getBrands
  });

  const categories = dbCategories.length > 0
    ? dbCategories.map((cat: any, index: number) => {
        const icons = [<Bot className="w-5 h-5" key={1}/>, <BrainCircuit className="w-5 h-5" key={2}/>, <Wifi className="w-5 h-5" key={3}/>, <Cpu className="w-5 h-5" key={4}/>, <Zap className="w-5 h-5" key={5}/>, <Plane className="w-5 h-5" key={6}/>];
        const subtitles = ['Build Autonomous Bots', 'Machine Learning for Kids & Students', 'Cloud Connected Sensors', 'Arduino & ESP32 Labs', 'Safe Hands-On Kits for Ages 8+', 'Quadcopter & Flight Dynamics'];
        
        return {
          label: cat.name,
          icon: icons[index % icons.length],
          desc: cat.description ? cat.description.replace(/\[SKU:.*?\]/g, '').substring(0, 40) + '...' : subtitles[index % subtitles.length]
        };
      })
    : [
        { label: 'Robotics', icon: <Bot className="w-5 h-5" />, desc: 'AI Rovers, Robotic Arms' },
        { label: 'AI & Machine Learning', icon: <BrainCircuit className="w-5 h-5" />, desc: 'Vision sensors, TensorFlow' },
        { label: 'IoT & Smart Home', icon: <Wifi className="w-5 h-5" />, desc: 'Blynk cloud, Climate logging' },
        { label: 'Embedded Systems', icon: <Cpu className="w-5 h-5" />, desc: 'Arduino Uno, ESP32 boards' },
        { label: 'STEM Starter', icon: <Zap className="w-5 h-5" />, desc: 'Magnetic blocks, circuits' },
      ];

  const dynamicAgeGroups = React.useMemo(() => {
    const uniqueAges = Array.from(new Set(storeProducts.map(p => p.ageText).filter(Boolean)));
    
    if (uniqueAges.length > 0) {
      return uniqueAges.map(age => ({
        label: age,
        title: `${age}`,
        desc: `Explore STEM kits for ${age}`
      }));
    }
    
    return [
      { label: '8-10', title: 'Kids 8-10 Yrs', desc: 'Magnetic snap blocks & basic circuits' },
      { label: '11-13', title: 'Pre-Teens 11-13 Yrs', desc: 'Scratch block coding & beginner rovers' },
      { label: '14-16', title: 'Teens 14-16 Yrs', desc: 'Arduino C++, IoT, & Drone kits' },
      { label: '17+', title: 'College & Pro (17+)', desc: 'Raspberry Pi, ROS, Python AI frameworks' },
    ];
  }, [storeProducts]);



  const handleCategorySelect = (cat: CategoryType) => {
    setFilters(prev => ({ ...prev, selectedCategories: [cat], selectedAgeGroups: [], selectedTechStacks: [] }));
    setCurrentPage('shop');
    onClose();
  };

  const handleAgeSelect = (age: AgeGroupType) => {
    setFilters(prev => ({ ...prev, selectedCategories: [], selectedAgeGroups: [age], selectedTechStacks: [] }));
    setCurrentPage('shop');
    onClose();
  };



  return (
    <div 
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[800px] bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-4"
      onMouseLeave={onClose}
    >
      <div className="flex h-[400px]">
        
        {/* 1st Sidebar: Main Filter Tabs */}
        <div className="w-1/3 bg-slate-50 border-r border-slate-100 p-4 space-y-1">
          <button
            onMouseEnter={() => setActiveTab('categories')}
            className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
              activeTab === 'categories' ? 'bg-white shadow-sm border border-slate-200 text-blue-600 font-bold' : 'text-slate-600 hover:bg-slate-100 font-semibold'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Layers className={`w-4 h-4 ${activeTab === 'categories' ? 'text-blue-600' : 'text-slate-400'}`} />
              <span className="text-sm">Categories</span>
            </div>
            <ChevronRight className={`w-4 h-4 ${activeTab === 'categories' ? 'text-blue-600 opacity-100' : 'opacity-0'}`} />
          </button>

          <button
            onMouseEnter={() => setActiveTab('age')}
            className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
              activeTab === 'age' ? 'bg-white shadow-sm border border-slate-200 text-orange-600 font-bold' : 'text-slate-600 hover:bg-slate-100 font-semibold'
            }`}
          >
            <div className="flex items-center space-x-3">
              <GraduationCap className={`w-4 h-4 ${activeTab === 'age' ? 'text-orange-600' : 'text-slate-400'}`} />
              <span className="text-sm">Shop by Age</span>
            </div>
            <ChevronRight className={`w-4 h-4 ${activeTab === 'age' ? 'text-orange-600 opacity-100' : 'opacity-0'}`} />
          </button>

          <button
            onMouseEnter={() => setActiveTab('brands')}
            className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
              activeTab === 'brands' ? 'bg-white shadow-sm border border-slate-200 text-slate-900 font-bold' : 'text-slate-600 hover:bg-slate-100 font-semibold'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Star className={`w-4 h-4 ${activeTab === 'brands' ? 'text-slate-900' : 'text-slate-400'}`} />
              <span className="text-sm">Brands</span>
            </div>
            <ChevronRight className={`w-4 h-4 ${activeTab === 'brands' ? 'text-slate-900 opacity-100' : 'opacity-0'}`} />
          </button>
        </div>

        {/* 2nd Sidebar: Dynamic Sub-options */}
        <div className="w-1/3 bg-white p-4 overflow-y-auto custom-scrollbar">
          
          {activeTab === 'categories' && (
            <div className="space-y-1 animate-in fade-in slide-in-from-left-2">
              <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3 px-2">Select Category</h4>
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => handleCategorySelect(cat.label)}
                  className="w-full flex items-start space-x-3 p-2.5 rounded-xl hover:bg-blue-50 text-left transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100">
                    {cat.icon}
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-800 group-hover:text-blue-600">{cat.label}</h5>
                    <p className="text-[10px] text-slate-500 mt-0.5">{cat.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {activeTab === 'age' && (
            <div className="space-y-2 animate-in fade-in slide-in-from-left-2">
              <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3 px-2">Select Age Group</h4>
              {dynamicAgeGroups.map((age, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAgeSelect(age.label)}
                  className="w-full text-left p-3 rounded-xl border border-slate-100 hover:border-orange-200 hover:bg-orange-50 transition-all group"
                >
                  <span className="inline-block px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 text-[10px] font-extrabold uppercase mb-1">
                    {age.label} YRS
                  </span>
                  <h5 className="text-sm font-bold text-slate-800 group-hover:text-orange-600">{age.title}</h5>
                  <p className="text-[10px] text-slate-500 mt-1">{age.desc}</p>
                </button>
              ))}
            </div>
          )}

          {activeTab === 'brands' && (
            <div className="space-y-1.5 animate-in fade-in slide-in-from-left-2">
              <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3 px-2">Select Brand</h4>
              {dbBrands.length > 0 ? dbBrands.map((brand: any, idx: number) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentPage('shop');
                    onClose();
                  }}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 text-sm font-bold text-slate-800 transition-colors flex items-center space-x-2"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                  <span>{brand.name}</span>
                </button>
              )) : (
                <p className="text-xs text-slate-500 px-2">No brands available yet.</p>
              )}
            </div>
          )}

        </div>

        {/* 3rd Sidebar: Promotional/Featured Card */}
        <div className="w-1/3 bg-slate-900 text-white p-6 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -bottom-10 -right-10 opacity-20 pointer-events-none">
            <ShoppingBag className="w-48 h-48" />
          </div>

          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[10px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              <span>Trending Now</span>
            </div>

            <h3 className="text-2xl font-extrabold font-heading leading-tight">
              NavoBot Pro V4
              <br/>
              <span className="text-blue-400">AI Vision Rover</span>
            </h3>

            <p className="text-xs text-slate-400 leading-relaxed">
              Equipped with ESP32-CAM and ROS support. The ultimate robotics kit for students 14+ to learn autonomous navigation.
            </p>
          </div>

          <div className="relative z-10 pt-6 mt-auto">
            <button
              onClick={() => {
                setCurrentPage('shop');
                onClose();
              }}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg transition-colors flex items-center justify-center space-x-2"
            >
              <span>Explore Kit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
