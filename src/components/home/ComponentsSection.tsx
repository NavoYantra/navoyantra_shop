import React from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../product/ProductCard';
import { Cpu, ArrowRight } from 'lucide-react';

export const ComponentsSection: React.FC = () => {
  const { storeProducts, setCurrentPage, setFilters } = useApp();

  // Only get products in the "Electronics & Components" category
  const components = storeProducts.filter(p => p.category === 'Electronics & Components');

  if (components.length === 0) return null;

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-widest flex items-center space-x-1 mb-2">
              <Cpu className="w-3.5 h-3.5" />
              <span>SPARE PARTS & COMPONENTS</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Electronics & Components
            </h2>
          </div>
          <p className="text-sm text-slate-600 mt-4 md:mt-0 max-w-md">
            Need raw parts? Stock up on motors, wires, wheels, sensors, and basic electronics for your own DIY builds without buying full kits.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {components.slice(0, 8).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {components.length > 8 && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => {
                setFilters(prev => ({ ...prev, selectedCategories: ['Electronics & Components'] }));
                setCurrentPage('shop');
                window.scrollTo(0, 0);
              }}
              className="px-8 py-3.5 rounded-2xl bg-indigo-600 text-white font-bold text-sm shadow-xl hover:bg-indigo-700 transition-all hover:scale-105 flex items-center space-x-2 group"
            >
              <span>View All Components</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
