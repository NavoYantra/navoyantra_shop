import React from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../product/ProductCard';
import { Sparkles } from 'lucide-react';

export const FeaturedProductsSection: React.FC = () => {
  const { storeProducts } = useApp();
  
  // Use featured products, or if none exist, we just show empty or a fallback
  let displayProducts = storeProducts.filter(p => p.featured || p.isFeatured).slice(0, 8);
  
  // If absolutely zero featured products exist in DB, fallback to top 8 just so the section isn't completely empty initially
  if (displayProducts.length === 0) {
    displayProducts = [...storeProducts].slice(0, 8);
  }

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:items-center justify-center mb-12 text-center">
          <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest flex items-center justify-center space-x-1 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TOP SELLING KITS</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
            Featured Products
          </h2>
          <p className="text-sm text-slate-600 mt-4 max-w-2xl mx-auto">
            Our most popular and highly rated STEM kits, carefully selected for maximum learning impact.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.slice(0, 8).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
