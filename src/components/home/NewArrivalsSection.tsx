import React from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../product/ProductCard';
import { Sparkles } from 'lucide-react';

export const NewArrivalsSection: React.FC = () => {
  const { storeProducts } = useApp();
  
  // Sort by date or just take the first 8 for "New Arrivals"
  const newArrivals = [...storeProducts].slice(0, 8);

  if (newArrivals.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:items-center justify-center mb-12 text-center">
          <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest flex items-center justify-center space-x-1 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FRESH DROPS</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
            New Arrivals
          </h2>
          <p className="text-sm text-slate-600 mt-4 max-w-2xl mx-auto">
            Discover our latest STEM kits and innovation tools just added to the store.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
