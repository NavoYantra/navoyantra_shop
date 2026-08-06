import React from 'react';
import { useApp } from '../../context/AppContext';
import { CategoryType, AgeGroupType, TechStackType } from '../../types';
import { CATEGORIES } from '../../data/categories';
import { Filter, X, RefreshCw, Check } from 'lucide-react';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProductFilterDrawer: React.FC<FilterDrawerProps> = ({ isOpen, onClose }) => {
  const { filters, setFilters, resetFilters } = useApp();

  if (!isOpen) return null;

  const categories: CategoryType[] = [
    'Robotics',
    'AI & Machine Learning',
    'IoT & Smart Home',
    'Embedded Systems',
    'STEM Starter',
    'Drones & Automation',
    '3D Printing & Fabrication'
  ];

  const ageGroups: AgeGroupType[] = ['8-10', '11-13', '14-16', '17+'];

  const techStacks: TechStackType[] = [
    'Arduino',
    'ESP32',
    'Raspberry Pi',
    'AI & Computer Vision',
    'IoT Sensors',
    'Micro:bit',
    'ROS & Motors'
  ];

  const handleCategoryToggle = (cat: CategoryType) => {
    setFilters(prev => {
      const exists = prev.selectedCategories.includes(cat);
      const updated = exists
        ? prev.selectedCategories.filter(c => c !== cat)
        : [...prev.selectedCategories, cat];
      return { ...prev, selectedCategories: updated };
    });
  };

  const handleAgeToggle = (age: AgeGroupType) => {
    setFilters(prev => {
      const exists = prev.selectedAgeGroups.includes(age);
      const updated = exists
        ? prev.selectedAgeGroups.filter(a => a !== age)
        : [...prev.selectedAgeGroups, age];
      return { ...prev, selectedAgeGroups: updated };
    });
  };

  const handleTechToggle = (tech: TechStackType) => {
    setFilters(prev => {
      const exists = prev.selectedTechStacks.includes(tech);
      const updated = exists
        ? prev.selectedTechStacks.filter(t => t !== tech)
        : [...prev.selectedTechStacks, tech];
      return { ...prev, selectedTechStacks: updated };
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
              Filter STEM Products
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Options Scrollable Body */}
        <div className="p-6 flex-1 overflow-y-auto space-y-6">
          
          {/* Categories */}
          <div>
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3">
              Categories
            </h4>
            <div className="space-y-2">
              {categories.map(cat => {
                const isSelected = filters.selectedCategories.includes(cat);
                return (
                  <label
                    key={cat}
                    onClick={() => handleCategoryToggle(cat)}
                    className="flex items-center space-x-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-200 transition-colors"
                  >
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 dark:border-slate-700'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <span>{cat}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Age Brackets */}
          <div>
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3">
              Age Group
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {ageGroups.map(age => {
                const isSelected = filters.selectedAgeGroups.includes(age);
                return (
                  <button
                    key={age}
                    onClick={() => handleAgeToggle(age)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                      isSelected
                        ? 'bg-orange-500 text-white border-orange-500 shadow-md'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    Age {age} Yrs
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3">
              Microcontroller & Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {techStacks.map(tech => {
                const isSelected = filters.selectedTechStacks.includes(tech);
                return (
                  <button
                    key={tech}
                    onClick={() => handleTechToggle(tech)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {tech}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              <span>Max Price Limit:</span>
              <span className="text-blue-600 dark:text-blue-400 font-extrabold font-heading">
                ₹{filters.maxPrice.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min="1000"
              max="50000"
              step="1000"
              value={filters.maxPrice}
              onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>₹1,000</span>
              <span>₹50,000+</span>
            </div>
          </div>

          {/* In Stock Only Checkbox */}
          <div className="pt-2">
            <label
              onClick={() => setFilters(prev => ({ ...prev, inStockOnly: !prev.inStockOnly }))}
              className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 cursor-pointer text-sm font-semibold text-slate-700 dark:text-slate-200"
            >
              <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                filters.inStockOnly ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 dark:border-slate-700'
              }`}>
                {filters.inStockOnly && <Check className="w-3.5 h-3.5" />}
              </div>
              <span>Show In-Stock Kits Only</span>
            </label>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex items-center space-x-3">
          <button
            onClick={resetFilters}
            className="flex-1 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset All</span>
          </button>

          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center"
          >
            Apply Filters
          </button>
        </div>

      </div>
    </div>
  );
};
