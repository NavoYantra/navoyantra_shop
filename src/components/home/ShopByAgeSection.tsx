import React from 'react';
import { useApp } from '../../context/AppContext';
import { AgeGroupType } from '../../types';
import { Sparkles, ArrowRight, ShieldCheck, Cpu, Brain, Rocket } from 'lucide-react';

export const ShopByAgeSection: React.FC = () => {
  const { setFilters } = useApp();

  const handleAgeClick = (age: AgeGroupType) => {
    setFilters(prev => ({
      ...prev,
      selectedCategories: [],
      selectedAgeGroups: [age],
      selectedTechStacks: []
    }));
    const section = document.getElementById('featured-kits');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const ageBrackets = [
    {
      id: '8-10' as AgeGroupType,
      title: 'Kids (Ages 8-10)',
      badge: 'Starter Explorers',
      subtitle: 'Zero Soldering • Magnetic Snap Circuits • Block Games',
      description: 'Introduce electricity, motors, buzzers, and logic safely without screens or soldering irons.',
      recommended: ['NavoJunior Explorer Kit', 'NavoBit Smart Badge'],
      color: 'border-orange-500/40 bg-orange-500/5',
      badgeColor: 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300',
      icon: <Sparkles className="w-6 h-6 text-orange-500" />
    },
    {
      id: '11-13' as AgeGroupType,
      title: 'Pre-Teens (Ages 11-13)',
      badge: 'Young Robotics Engineers',
      subtitle: 'Scratch Drag & Drop • ESP32 Autonomous Rovers',
      description: 'Program self-driving rovers, obstacle avoidance sensors, and AI computer vision cameras.',
      recommended: ['NavoBot Pro V4', 'NavoAI Vision Lab'],
      color: 'border-blue-500/40 bg-blue-500/5',
      badgeColor: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
      icon: <Rocket className="w-6 h-6 text-blue-500" />
    },
    {
      id: '14-16' as AgeGroupType,
      title: 'Teens (Ages 14-16)',
      badge: 'Future Tech Leaders',
      subtitle: 'Arduino C++ • IoT Cloud Sensors • STEM Drones',
      description: 'Learn real-world microcontrollers, cloud data logging, relay switches, and flight aerodynamics.',
      recommended: ['NavoIoT Smart Home', 'NavoFlyer Drone', 'NavoMaker Super Kit'],
      color: 'border-purple-500/40 bg-purple-500/5',
      badgeColor: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300',
      icon: <Cpu className="w-6 h-6 text-purple-500" />
    },
    {
      id: '17+' as AgeGroupType,
      title: 'College & Makers (17+)',
      badge: 'Advanced Engineers',
      subtitle: 'Raspberry Pi 4/5 • ROS Kinematics • Python Deep Learning',
      description: 'Build industrial 4-DOF robotic arms, edge computing vision turrets, and ROS rovers.',
      recommended: ['NavoPi AI Edge Hub', 'NavoArm 4-DOF Robot'],
      color: 'border-emerald-500/40 bg-emerald-500/5',
      badgeColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
      icon: <Brain className="w-6 h-6 text-emerald-500" />
    }
  ];

  return (
    <section id="age-groups" className="py-20 bg-[#F6F7F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-extrabold text-orange-500 uppercase tracking-widest">
            TAILORED AGE PROGRESSION
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
            Shop By Age & Skill Level
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400">
            From 8-year-old beginners to college engineering students, our kits scale effortlessly with age-appropriate hardware, safety standards, and progressive coding complexity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ageBrackets.map((bracket) => (
            <div
              key={bracket.id}
              onClick={() => handleAgeClick(bracket.id)}
              className={`rounded-3xl p-8 border-2 ${bracket.color} bg-white dark:bg-slate-900 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between group relative overflow-hidden`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 group-hover:scale-110 transition-transform">
                      {bracket.icon}
                    </div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${bracket.badgeColor}`}>
                        {bracket.badge}
                      </span>
                      <h3 className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white mt-1">
                        {bracket.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <p className="text-xs font-bold text-blue-600 dark:text-blue-400">
                  {bracket.subtitle}
                </p>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {bracket.description}
                </p>

                <div className="pt-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Popular Kits For This Age:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {bracket.recommended.map((kit, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium">
                        {kit}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Curriculum & Safety Certified
                </span>
                <button className="px-5 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-xs group-hover:bg-blue-600 dark:group-hover:bg-blue-500 dark:group-hover:text-white transition-colors flex items-center space-x-2 shadow-md">
                  <span>Explore Age {bracket.id} Kits</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
