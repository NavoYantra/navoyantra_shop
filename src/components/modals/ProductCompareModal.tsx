import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRightLeft, X, Trash2, ShoppingBag, CheckCircle2, ShieldCheck } from 'lucide-react';

export const ProductCompareModal: React.FC = () => {
  const { 
    isCompareOpen, 
    setIsCompareOpen, 
    compareList, 
    toggleCompare, 
    addToCart 
  } = useApp();

  if (!isCompareOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in zoom-in-95 duration-200 my-8">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ArrowRightLeft className="w-5 h-5 text-indigo-600" />
            <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
              STEM Hardware Spec Comparison ({compareList.length}/3)
            </h3>
          </div>
          <button
            onClick={() => setIsCompareOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Matrix Table */}
        {compareList.length > 0 ? (
          <div className="p-6 overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr>
                  <th className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-tl-2xl text-slate-400 font-bold uppercase tracking-wider w-1/4">
                    Features / Specs
                  </th>
                  {compareList.map(prod => (
                    <th key={prod.id} className="p-4 border-l border-slate-100 dark:border-slate-800 space-y-2 align-top">
                      <div className="relative">
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          className="w-full h-32 object-cover rounded-xl border border-slate-200 dark:border-slate-800 mb-2"
                        />
                        <button
                          onClick={() => toggleCompare(prod)}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/80 text-white hover:bg-rose-500 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2">
                        {prod.name}
                      </h4>
                      <p className="text-sm font-extrabold text-blue-600 dark:text-blue-400 font-heading">
                        ₹{prod.price.toLocaleString('en-IN')}
                      </p>
                      <button
                        onClick={() => addToCart(prod)}
                        className="w-full py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center space-x-1"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                
                {/* Age Group */}
                <tr>
                  <td className="p-3 font-bold text-slate-500 dark:text-slate-400">Target Age Group</td>
                  {compareList.map(prod => (
                    <td key={prod.id} className="p-3 border-l border-slate-100 dark:border-slate-800 font-semibold text-slate-800 dark:text-slate-200">
                      {prod.ageText}
                    </td>
                  ))}
                </tr>

                {/* Microcontroller */}
                <tr>
                  <td className="p-3 font-bold text-slate-500 dark:text-slate-400">Microcontroller</td>
                  {compareList.map(prod => (
                    <td key={prod.id} className="p-3 border-l border-slate-100 dark:border-slate-800 font-semibold text-slate-800 dark:text-slate-200">
                      {prod.specs.microcontroller || 'Standard Development Board'}
                    </td>
                  ))}
                </tr>

                {/* Sensors Included */}
                <tr>
                  <td className="p-3 font-bold text-slate-500 dark:text-slate-400">Included Sensors</td>
                  {compareList.map(prod => (
                    <td key={prod.id} className="p-3 border-l border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                      <ul className="space-y-1">
                        {prod.specs.sensors?.map((s, i) => (
                          <li key={i} className="flex items-center space-x-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* Coding Languages */}
                <tr>
                  <td className="p-3 font-bold text-slate-500 dark:text-slate-400">Coding Languages</td>
                  {compareList.map(prod => (
                    <td key={prod.id} className="p-3 border-l border-slate-100 dark:border-slate-800">
                      <div className="flex flex-wrap gap-1">
                        {prod.specs.codingLanguages?.map((lang, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-bold text-[10px]">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Included Projects */}
                <tr>
                  <td className="p-3 font-bold text-slate-500 dark:text-slate-400">Projects Count</td>
                  {compareList.map(prod => (
                    <td key={prod.id} className="p-3 border-l border-slate-100 dark:border-slate-800 font-extrabold text-orange-500">
                      {prod.specs.includedProjectsCount}+ Step-by-Step Projects
                    </td>
                  ))}
                </tr>

                {/* Warranty */}
                <tr>
                  <td className="p-3 font-bold text-slate-500 dark:text-slate-400">Warranty</td>
                  {compareList.map(prod => (
                    <td key={prod.id} className="p-3 border-l border-slate-100 dark:border-slate-800 font-semibold text-emerald-600 dark:text-emerald-400">
                      {prod.specs.warranty}
                    </td>
                  ))}
                </tr>

              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center space-y-3">
            <ArrowRightLeft className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto" />
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">No products selected for comparison</h4>
            <p className="text-xs text-slate-500">Click the comparison icon on any product card to compare specs side-by-side!</p>
          </div>
        )}

      </div>
    </div>
  );
};
