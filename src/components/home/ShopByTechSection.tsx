import React from 'react';
import { useApp } from '../../context/AppContext';
import { TechStackType } from '../../types';
import { Cpu, ArrowRight } from 'lucide-react';

export const ShopByTechSection: React.FC = () => {
  const { setFilters, setCurrentPage } = useApp();

  const techStacks: { id: TechStackType; name: string; desc: string; count: string; bg: string; image: string }[] = [
    {
      id: 'Arduino',
      name: 'Arduino Uno & Mega',
      desc: 'The worldwide gold standard micro-controller board for electronics & basic C++ coding.',
      count: '8 Kits Available',
      bg: 'from-teal-500 to-emerald-600',
      image: '/arduino-uno-in-the-night.webp'
    },
    {
      id: 'ESP32',
      name: 'ESP32 Wi-Fi & Bluetooth',
      desc: 'Dual-core 240MHz processor with integrated Wi-Fi, BLE, and camera support.',
      count: '6 Kits Available',
      bg: 'from-blue-600 to-indigo-700',
      image: '/how-to-use-esp32-gpios.webp'
    },
    {
      id: 'Raspberry Pi',
      name: 'Raspberry Pi 4 / 5',
      desc: 'Full Linux single-board computer for OpenCV, TensorFlow Lite AI, and web servers.',
      count: '4 Kits Available',
      bg: 'from-rose-500 to-red-700',
      image: '/rpi5.webp'
    },
    {
      id: 'AI & Computer Vision',
      name: 'AI & Vision Sensors',
      desc: 'Smart camera sensors for real-time face tracking, gesture control, and color sorting.',
      count: '5 Kits Available',
      bg: 'from-purple-600 to-violet-800',
      image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'IoT Sensors',
      name: 'IoT & Climate Sensors',
      desc: 'Environmental sensors for soil moisture, gas leaks, temperature, and cloud dashboards.',
      count: '7 Kits Available',
      bg: 'from-amber-500 to-orange-600',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'Micro:bit',
      name: 'BBC Micro:bit V2.2',
      desc: 'Pocket-sized computer with LED display, speaker, microphone, and MakeCode blocks.',
      count: '3 Kits Available',
      bg: 'from-sky-500 to-blue-600',
      image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const handleTechClick = (tech: TechStackType) => {
    setFilters(prev => ({
      ...prev,
      selectedCategories: [],
      selectedAgeGroups: [],
      selectedTechStacks: [tech]
    }));
    setCurrentPage('shop');
  };

  return (
    <section className="py-16 bg-white  border-t border-slate-100 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-extrabold text-blue-600  uppercase tracking-widest">
              MICROCONTROLLERS & PLATFORMS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900  mt-1">
              Shop By Technology Stack
            </h2>
          </div>
          <p className="text-sm text-slate-600  mt-2 md:mt-0 max-w-md">
            Filter kits by your preferred microcontroller board or software language (Block, C++, MicroPython, Python).
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {techStacks.map(t => (
            <div
              key={t.id}
              onClick={() => handleTechClick(t.id)}
              className="relative p-6 rounded-2xl bg-slate-900 border border-slate-200/20 hover:border-blue-500 hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between overflow-hidden min-h-[220px]"
            >
              {/* Background Image Setup */}
              <div className="absolute inset-0 z-0">
                <img src={t.image} alt={t.name} className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700 group-hover:opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/80 to-slate-950/95" />
              </div>

              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`px-3 py-1.5 rounded-xl bg-gradient-to-r ${t.bg} text-white font-bold text-xs flex items-center space-x-1.5 shadow-md`}>
                      <Cpu className="w-3.5 h-3.5" />
                      <span>{t.id}</span>
                    </div>
                    <span className="text-[11px] font-semibold text-slate-300">
                      {t.count}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold font-heading text-white group-hover:text-blue-400 transition-colors shadow-sm">
                    {t.name}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {t.desc}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-end text-xs font-bold text-blue-400 group-hover:translate-x-1 group-hover:text-blue-300 transition-all">
                  <span>View {t.id} Kits</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
