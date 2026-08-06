import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/product/ProductCard';
import { ProductFilterDrawer } from '../components/product/ProductFilterDrawer';
import { CategoryType, AgeGroupType, TechStackType } from '../types';
import { 
  ShoppingBag, Search, Filter, ArrowUpDown, X, Sparkles, SlidersHorizontal, Check 
} from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { 
    filteredProducts, 
    filters, 
    setFilters, 
    resetFilters 
  } = useApp();

  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const categories: CategoryType[] = [
    'Robotics',
    'AI & Machine Learning',
    'IoT & Smart Home',
    'Embedded Systems',
    'STEM Starter',
    'Drones & Automation'
  ];

  const ageGroups: AgeGroupType[] = ['8-10', '11-13', '14-16', '17+'];

  const techStacks: TechStackType[] = [
    'Arduino',
    'ESP32',
    'Raspberry Pi',
    'AI & Computer Vision',
    'IoT Sensors',
    'Micro:bit'
  ];

  const hasActiveFilters = 
    filters.selectedCategories.length > 0 || 
    filters.selectedAgeGroups.length > 0 || 
    filters.selectedTechStacks.length > 0 || 
    filters.searchQuery !== '' || 
    filters.inStockOnly;

  return (
    <div className="py-12 bg-[#F6F7F9] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Shop Page Banner Header */}
        <div className="mb-10 text-center sm:text-left space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OFFICIAL STEM & ROBOTICS CATALOG 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
            NavoYantra Hardware Store
          </h1>

          <p className="text-sm text-slate-600 max-w-2xl">
            Explore 100% CBSE & ATL aligned robotics rovers, AI computer vision labs, IoT sensors, and magnetic electronics kits shipped directly across India.
          </p>
        </div>

        {/* Main Grid: Sidebar Filters (3 Cols) + Product Grid (9 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Desktop Left Sidebar Filters (3 Cols) */}
          <div className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-md space-y-6 sticky top-28">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-blue-600" />
                  <h3 className="text-base font-bold font-heading text-slate-900">Filters</h3>
                </div>
                {hasActiveFilters && (
                  <button onClick={resetFilters} className="text-xs font-bold text-rose-500 hover:underline">
                    Reset
                  </button>
                )}
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3">
                  Categories
                </h4>
                <div className="space-y-1.5">
                  {categories.map(cat => {
                    const isSelected = filters.selectedCategories.includes(cat);
                    return (
                      <label
                        key={cat}
                        onClick={() => {
                          setFilters(prev => {
                            const exists = prev.selectedCategories.includes(cat);
                            return {
                              ...prev,
                              selectedCategories: exists ? prev.selectedCategories.filter(c => c !== cat) : [...prev.selectedCategories, cat]
                            };
                          });
                        }}
                        className={`flex items-center justify-between p-2 rounded-xl text-xs font-medium cursor-pointer transition-colors ${
                          isSelected ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span>{cat}</span>
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300'}`}>
                          {isSelected && <Check className="w-3 h-3" />}
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Age Group */}
              <div>
                <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3">
                  Shop By Age
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {ageGroups.map(age => {
                    const isSelected = filters.selectedAgeGroups.includes(age);
                    return (
                      <button
                        key={age}
                        onClick={() => {
                          setFilters(prev => {
                            const exists = prev.selectedAgeGroups.includes(age);
                            return {
                              ...prev,
                              selectedAgeGroups: exists ? prev.selectedAgeGroups.filter(a => a !== age) : [...prev.selectedAgeGroups, age]
                            };
                          });
                        }}
                        className={`py-1.5 px-2 rounded-xl text-xs font-bold border transition-all ${
                          isSelected ? 'bg-orange-500 text-white border-orange-500 shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {age} Yrs
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3">
                  Tech Platform
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {techStacks.map(tech => {
                    const isSelected = filters.selectedTechStacks.includes(tech);
                    return (
                      <button
                        key={tech}
                        onClick={() => {
                          setFilters(prev => {
                            const exists = prev.selectedTechStacks.includes(tech);
                            return {
                              ...prev,
                              selectedTechStacks: exists ? prev.selectedTechStacks.filter(t => t !== tech) : [...prev.selectedTechStacks, tech]
                            };
                          });
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                          isSelected ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {tech}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Limit Slider */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                  <span>Max Price:</span>
                  <span className="text-blue-600 font-heading">₹{filters.maxPrice.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="50000"
                  step="1000"
                  value={filters.maxPrice}
                  onChange={e => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

            </div>
          </div>

          {/* Right Product Grid Area (9 Cols) */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Top Toolbar */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
              
              {/* Search input */}
              <div className="relative flex-1 w-full sm:w-auto">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search STEM kits, rovers, sensors..."
                  value={filters.searchQuery}
                  onChange={e => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                  className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                {filters.searchQuery && (
                  <button onClick={() => setFilters(prev => ({ ...prev, searchQuery: '' }))} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Sort Selector & Mobile Filter Button */}
              <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
                <button
                  onClick={() => setIsFilterDrawerOpen(true)}
                  className="lg:hidden px-3.5 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center space-x-1.5"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Filters</span>
                </button>

                <div className="relative">
                  <select
                    value={filters.sortBy}
                    onChange={e => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                    className="py-2 pl-3 pr-8 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 cursor-pointer appearance-none"
                  >
                    <option value="featured">Sort: Featured</option>
                    <option value="rating">Sort: Highest Rated</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                  </select>
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

            </div>

            {/* Active Filter Tags */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-bold text-slate-400">Active Filters:</span>
                {filters.selectedCategories.map(c => (
                  <span key={c} className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold flex items-center space-x-1">
                    <span>{c}</span>
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setFilters(prev => ({ ...prev, selectedCategories: prev.selectedCategories.filter(item => item !== c) }))} />
                  </span>
                ))}
                {filters.selectedAgeGroups.map(a => (
                  <span key={a} className="px-2.5 py-1 rounded-full bg-orange-100 text-orange-700 font-semibold flex items-center space-x-1">
                    <span>Age {a} Yrs</span>
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setFilters(prev => ({ ...prev, selectedAgeGroups: prev.selectedAgeGroups.filter(item => item !== a) }))} />
                  </span>
                ))}
                <button onClick={resetFilters} className="text-rose-500 font-bold hover:underline ml-2">
                  Clear All
                </button>
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map(prod => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
                <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-xl font-bold text-slate-900 font-heading">No STEM kits match your filter criteria</h3>
                <p className="text-xs text-slate-500">Try clearing selected age brackets or price limits.</p>
                <button onClick={resetFilters} className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs">
                  Reset Filters
                </button>
              </div>
            )}

          </div>

        </div>

      </div>

      <ProductFilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
      />
    </div>
  );
};
