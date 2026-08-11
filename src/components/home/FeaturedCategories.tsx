import React from 'react';
import { CATEGORIES } from '../../data/categories';
import { useApp } from '../../context/AppContext';
import { CategoryType } from '../../types';
import { motion } from 'framer-motion';
import { 
  Bot, BrainCircuit, Wifi, Cpu, Zap, Plane, ArrowRight 
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15 }
  }
};

export const FeaturedCategories: React.FC = () => {
  const { setFilters, setCurrentPage } = useApp();

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
    setCurrentPage('shop');
    window.scrollTo(0, 0);
  };

  const getBentoClasses = (index: number) => {
    switch (index) {
      case 0:
        return 'lg:col-span-2 lg:row-span-1';
      case 1:
        return 'lg:col-span-1 lg:row-span-1';
      case 2:
        return 'lg:col-span-1 lg:row-span-1';
      case 3:
        return 'lg:col-span-2 lg:row-span-1';
      case 4:
        return 'lg:col-span-2 lg:row-span-1';
      case 5:
        return 'lg:col-span-1 lg:row-span-1';
      default:
        return 'lg:col-span-1 lg:row-span-1';
    }
  };

  return (
    <section className="py-16 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest">
              INNOVATION CATEGORIES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 mt-1">
              Explore STEM Innovation Domains
            </h2>
          </div>
          <p className="text-sm text-slate-600 mt-2 md:mt-0 max-w-md">
            From beginner magnetic circuits to advanced ROS robotics and AI machine learning labs, find the exact STEM domain for your learning journey.
          </p>
        </div>

        {/* Categories Bento Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleCategoryClick(category.id)}
              className={`group relative rounded-3xl overflow-hidden border border-slate-200 bg-slate-50 p-6 hover:shadow-2xl hover:border-blue-500/50 transition-all duration-300 cursor-pointer flex flex-col justify-between ${getBentoClasses(index)}`}
            >
              {/* Background Glow on Hover */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                    {getIcon(category.iconName)}
                  </div>
                  {category.badge && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-orange-100 text-orange-600">
                      {category.badge}
                    </span>
                  )}
                </div>

                <h3 className={`font-bold font-heading text-slate-900 group-hover:text-blue-600 transition-colors ${index === 0 ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>
                  {category.title}
                </h3>
                <p className="text-xs font-semibold text-blue-600 mt-0.5">
                  {category.subtitle}
                </p>
                <p className={`text-slate-600 mt-2 leading-relaxed ${index === 0 ? 'text-sm line-clamp-3' : 'text-xs line-clamp-2'}`}>
                  {category.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-500">
                  {category.itemCount}+ Hardware Kits
                </span>
                <span className="font-bold text-blue-600 flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

