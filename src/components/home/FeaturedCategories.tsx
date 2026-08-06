import React from 'react';
import { CATEGORIES } from '../../data/categories';
import { useApp } from '../../context/AppContext';
import { CategoryType } from '../../types';
import { 
  Bot, BrainCircuit, Wifi, Cpu, Zap, Plane, ArrowRight 
} from 'lucide-react';

export const FeaturedCategories: React.FC = () => {
  const { setFilters } = useApp();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Bot': return <Bot className="w-6 h-6" />;
      case 'BrainCircuit': return <BrainCircuit className="w-6 h-6" />;
      case 'Wifi': return <Wifi className="w-6 h-6" />;
      case 'Cpu': return <Cpu className="w-6 h-6" />;
      case 'Zap': return <Zap className="w-6 h-6" />;
      case 'Plane': return <Plane className="w-6 h-6" />;
      default: return <Bot className="w-6 h-6" />;
    }
  };

  const handleCategoryClick = (category: CategoryType) => {
    setFilters(prev => ({
      ...prev,
      selectedCategories: [category],
      selectedAgeGroups: [],
      selectedTechStacks: []
    }));
    const section = document.getElementById('featured-kits');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
              INNOVATION CATEGORIES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white mt-1">
              Explore STEM Innovation Domains
            </h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 md:mt-0 max-w-md">
            From beginner magnetic circuits to advanced ROS robotics and AI machine learning labs, find the exact STEM domain for your learning journey.
          </p>
        </div>

        {/* Categories 6-Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="group relative rounded-3xl overflow-hidden border border-slate-200/70 dark:border-slate-800/70 bg-slate-50/60 dark:bg-slate-950/60 p-6 hover:shadow-2xl hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Background Glow on Hover */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                    {getIcon(category.iconName)}
                  </div>
                  {category.badge && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-300">
                      {category.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {category.title}
                </h3>
                <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-0.5">
                  {category.subtitle}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {category.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-500 dark:text-slate-400">
                  {category.itemCount}+ Hardware Kits
                </span>
                <span className="font-bold text-blue-600 dark:text-blue-400 flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
