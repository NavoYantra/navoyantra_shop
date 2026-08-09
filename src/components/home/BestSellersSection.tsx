import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../product/ProductCard';
import { ProductFilterDrawer } from '../product/ProductFilterDrawer';
import { 
  Sparkles, Search, X, SlidersHorizontal, ArrowUpDown, Bot, ArrowRight 
} from 'lucide-react';

export const BestSellersSection: React.FC = () => {
  const { 
    filteredProducts, 
    filters, 
    setFilters, 
    resetFilters,
    setCurrentPage
  } = useApp();

  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'bestsellers' | 'ai' | 'robotics' | 'school'>('all');

  const handleTabChange = (tab: 'all' | 'bestsellers' | 'ai' | 'robotics' | 'school') => {
    setActiveTab(tab);
    if (tab === 'all') {
      resetFilters();
    } else if (tab === 'bestsellers') {
      setFilters(prev => ({ ...prev, sortBy: 'rating' }));
    } else if (tab === 'ai') {
      setFilters(prev => ({ ...prev, selectedCategories: ['AI & Machine Learning'] }));
    } else if (tab === 'robotics') {
      setFilters(prev => ({ ...prev, selectedCategories: ['Robotics'] }));
    } else if (tab === 'school') {
      setFilters(prev => ({ ...prev, selectedCategories: ['STEM Starter'] }));
    }
  };

  const hasActiveFilters = 
    filters.selectedCategories.length > 0 || 
    filters.selectedAgeGroups.length > 0 || 
    filters.selectedTechStacks.length > 0 || 
    filters.searchQuery !== '' || 
    filters.inStockOnly;

  return (
    <section id="featured-kits" className="py-20 bg-[#F6F7F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <span className="text-xs font-extrabold text-blue-600  uppercase tracking-widest flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PREMIUM STEM HARDWARE</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900  mt-1 tracking-tight">
              Explore All Products
            </h2>
          </div>
          <p className="text-sm text-slate-600  mt-2 md:mt-0 max-w-md">
            Hand-crafted, pre-tested, and CBSE/ATL aligned innovation kits shipped directly across India.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white  rounded-3xl p-4 border border-slate-200/80  shadow-xl mb-8 flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Quick Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto">
            <button
              onClick={() => handleTabChange('all')}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'all' && !hasActiveFilters
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100  text-slate-700  hover:bg-slate-200'
              }`}
            >
              All STEM Kits
            </button>
            <button
              onClick={() => handleTabChange('bestsellers')}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'bestsellers'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'bg-slate-100  text-slate-700  hover:bg-slate-200'
              }`}
            >
              🔥 Top Rated
            </button>
            <button
              onClick={() => handleTabChange('robotics')}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'robotics'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100  text-slate-700  hover:bg-slate-200'
              }`}
            >
              🤖 Autonomous Bots
            </button>
            <button
              onClick={() => handleTabChange('ai')}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'ai'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-slate-100  text-slate-700  hover:bg-slate-200'
              }`}
            >
              🧠 AI & Vision
            </button>
            <button
              onClick={() => handleTabChange('school')}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'school'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-100  text-slate-700  hover:bg-slate-200'
              }`}
            >
              🏫 School Starters
            </button>
          </div>

          {/* Right Search Input & Filter Drawer Trigger */}
          <div className="flex items-center space-x-3 w-full lg:w-auto">
            
            {/* Search Input */}
            <div className="relative flex-1 lg:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter by keyword..."
                value={filters.searchQuery}
                onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                className="w-full pl-9 pr-8 py-2 rounded-2xl bg-slate-100  border border-slate-200  text-slate-900  text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {filters.searchQuery && (
                <button
                  onClick={() => setFilters(prev => ({ ...prev, searchQuery: '' }))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="relative">
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                className="py-2 pl-3 pr-8 rounded-2xl bg-slate-100  border border-slate-200  text-slate-700  text-xs font-semibold focus:outline-none cursor-pointer appearance-none"
              >
                <option value="featured">Sort: Featured</option>
                <option value="rating">Sort: Highest Rated</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Filter Drawer Trigger Button */}
            <button
              onClick={() => setIsFilterDrawerOpen(true)}
              className="py-2 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md flex items-center space-x-2 transition-transform hover:scale-105"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
            </button>

          </div>

        </div>

        {/* Active Filter Tags Bar */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-6 text-xs">
            <span className="font-bold text-slate-500 ">Active Filters:</span>
            
            {filters.selectedCategories.map(cat => (
              <span key={cat} className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-blue-100  text-blue-700  font-semibold">
                <span>{cat}</span>
                <X 
                  className="w-3 h-3 cursor-pointer hover:text-blue-900" 
                  onClick={() => setFilters(prev => ({ ...prev, selectedCategories: prev.selectedCategories.filter(c => c !== cat) }))} 
                />
              </span>
            ))}

            {filters.selectedAgeGroups.map(age => (
              <span key={age} className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-orange-100  text-orange-700  font-semibold">
                <span>Age {age} Yrs</span>
                <X 
                  className="w-3 h-3 cursor-pointer hover:text-orange-900" 
                  onClick={() => setFilters(prev => ({ ...prev, selectedAgeGroups: prev.selectedAgeGroups.filter(a => a !== age) }))} 
                />
              </span>
            ))}

            {filters.selectedTechStacks.map(tech => (
              <span key={tech} className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-purple-100  text-purple-700  font-semibold">
                <span>{tech}</span>
                <X 
                  className="w-3 h-3 cursor-pointer hover:text-purple-900" 
                  onClick={() => setFilters(prev => ({ ...prev, selectedTechStacks: prev.selectedTechStacks.filter(t => t !== tech) }))} 
                />
              </span>
            ))}

            <button
              onClick={resetFilters}
              className="text-xs font-bold text-rose-500 hover:underline ml-2"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.slice(0, 12).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setCurrentPage('shop')}
                className="px-8 py-3.5 rounded-2xl bg-slate-900 text-white font-bold text-sm shadow-xl hover:bg-blue-600 transition-all hover:scale-105 flex items-center space-x-2 group"
              >
                <span>Explore More Kits</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 bg-white  rounded-3xl border border-slate-200  p-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-100  text-slate-400 flex items-center justify-center mx-auto">
              <Bot className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-heading text-slate-900 ">
              No matching STEM kits found
            </h3>
            <p className="text-sm text-slate-500  max-w-md mx-auto">
              Try adjusting your search query, age group, or category filters to find the right hardware.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-md hover:bg-blue-700 transition-colors inline-block"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Filter Drawer Component */}
      <ProductFilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
      />
    </section>
  );
};
