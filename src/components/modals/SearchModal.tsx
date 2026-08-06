import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, X, Bot, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, setQuickViewProduct, addToCart } = useApp();
  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const results = query.trim() === '' ? [] : PRODUCTS.filter(p => {
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.techStack.some(t => t.toLowerCase().includes(q)) ||
      p.description.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-start justify-center p-4 pt-16">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in slide-in-from-top-4 duration-200">
        
        {/* Top Search Input Bar */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center space-x-3">
          <Search className="w-5 h-5 text-blue-600 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search robotics, AI, ESP32, drones, Arduino..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full bg-transparent text-slate-900 dark:text-white text-base font-semibold focus:outline-none placeholder-slate-400"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-3">
          {query.trim() === '' ? (
            <div className="space-y-4 py-4">
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block">
                Popular Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {['NavoBot Pro V4', 'ESP32 AI Vision', 'Arduino Super Kit', 'Quadcopter Drone', 'Kids Snap Blocks'].map((term, i) => (
                  <button
                    key={i}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            results.map(prod => (
              <div
                key={prod.id}
                onClick={() => {
                  setQuickViewProduct(prod);
                  setIsSearchOpen(false);
                }}
                className="flex items-center justify-between p-3 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                  <div>
                    <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase">
                      {prod.category} • {prod.ageText}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                      {prod.name}
                    </h4>
                    <p className="text-xs font-extrabold text-slate-900 dark:text-white font-heading">
                      ₹{prod.price.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>

                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </div>
            ))
          ) : (
            <div className="py-12 text-center space-y-2">
              <Bot className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto" />
              <p className="text-sm font-bold text-slate-900 dark:text-white">No products found for "{query}"</p>
              <p className="text-xs text-slate-500">Try searching for keywords like "Arduino", "ESP32", or "Drone"</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
