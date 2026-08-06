import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../../lib/api';
import { Package, ShoppingCart, Users } from 'lucide-react';

export const AdminDashboardHome: React.FC = () => {
  const { data: rawProducts = [] } = useQuery({ queryKey: ['products'], queryFn: getProducts });
  
  // Transform data to get stockCount and category easily
  const products = rawProducts.map((p: any) => ({
    stockCount: p.stock || 0,
    category: p.categories?.name || 'Uncategorized'
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center space-x-3 mb-2">
            <Package className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm font-medium text-slate-500">Total Products</h3>
          </div>
          <p className="text-3xl font-bold text-slate-900">{products.length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center space-x-3 mb-2">
            <ShoppingCart className="w-5 h-5 text-amber-500" />
            <h3 className="text-sm font-medium text-slate-500">Low Stock</h3>
          </div>
          <p className="text-3xl font-bold text-amber-500">{products.filter(p => p.stockCount < 10).length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center space-x-3 mb-2">
            <Users className="w-5 h-5 text-emerald-500" />
            <h3 className="text-sm font-medium text-slate-500">Active Categories</h3>
          </div>
          <p className="text-3xl font-bold text-slate-900">{new Set(products.map(p => p.category)).size}</p>
        </div>
      </div>
    </div>
  );
};
