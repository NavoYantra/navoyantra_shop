import { create } from 'zustand';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

interface AdminState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Product) => void;
  deleteProduct: (id: string) => void;
  deleteProducts: (ids: string[]) => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  
  // Using dummy PRODUCTS initially
  products: PRODUCTS,
  
  addProduct: (product) => set((state) => ({ 
    products: [product, ...state.products] 
  })),
  
  updateProduct: (id, product) => set((state) => ({
    products: state.products.map(p => p.id === id ? product : p)
  })),
  
  deleteProduct: (id) => set((state) => ({
    products: state.products.filter(p => p.id !== id)
  })),
  
  deleteProducts: (ids) => set((state) => ({
    products: state.products.filter(p => !ids.includes(p.id))
  })),
}));
