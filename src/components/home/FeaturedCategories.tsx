import React from 'react';

import { useApp } from '../../context/AppContext';
import { CategoryType } from '../../types';
import { animate, useInView, motion } from 'framer-motion';
import { 
  Bot, BrainCircuit, Wifi, Cpu, Zap, Plane, ArrowRight 
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../../lib/api';

const AnimatedCounter = ({ value }: { value: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });
  const [prevValue, setPrevValue] = useState(0);

  useEffect(() => {
    if (isInView && value >= 0) {
      const controls = animate(prevValue, value, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate(v) {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.floor(v).toString();
          }
        },
      });
      setPrevValue(value);
      return () => controls.stop();
    }
  }, [isInView, value, prevValue]);

  return <span ref={nodeRef}>0</span>;
};

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
  const { setFilters, setCurrentPage, storeProducts } = useApp();

  const { data: dbCategories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  });

  const categoriesToDisplay = React.useMemo(() => {
    if (!dbCategories || dbCategories.length === 0) return [];

    return dbCategories.slice(0, 6).map((cat: any, index: number) => {
      const icons = ['Bot', 'BrainCircuit', 'Wifi', 'Cpu', 'Zap', 'Plane'];
      const subtitles = ['Build Autonomous Bots', 'Machine Learning for Kids & Students', 'Cloud Connected Sensors', 'Arduino & ESP32 Labs', 'Safe Hands-On Kits for Ages 8+', 'Quadcopter & Flight Dynamics'];
      const badges = ['Popular', 'Hot', null, null, 'Kids Favorite', null];
      
      return {
        id: cat.name,
        title: cat.name,
        subtitle: subtitles[index % subtitles.length],
        description: cat.description ? cat.description.replace(/\[SKU:.*?\]/g, '') : `Explore our premium selection of ${cat.name} kits and products.`,
        iconName: icons[index % icons.length],
        itemCount: 10,
        badge: badges[index % badges.length]
      };
    });
  }, [dbCategories]);

  const getProductCount = (categoryId: string, fallbackCount: number) => {
    if (storeProducts && storeProducts.length > 0) {
      const count = storeProducts.filter(p => p.category === categoryId).length;
      return count > 0 ? count : fallbackCount;
    }
    return fallbackCount;
  };

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
          {categoriesToDisplay.map((category, index) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleCategoryClick(category.id)}
              className={`group relative rounded-3xl overflow-hidden border border-slate-200 bg-slate-100 p-6 hover:shadow-2xl hover:border-blue-500/50 transition-all duration-300 cursor-pointer flex flex-col justify-between ${getBentoClasses(index)}`}
            >
              {/* Corner Blue & Orange Gradient Accent */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-500/30 to-orange-500/30 rounded-full blur-xl group-hover:scale-[2] group-hover:opacity-70 transition-all duration-500 pointer-events-none" />

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
                  <AnimatedCounter value={getProductCount(category.id, category.itemCount)} />+ Hardware Kits
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

