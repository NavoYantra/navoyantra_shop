import React, { createContext, useContext, useState } from 'react';
import { Product, CartItem, WishlistItem, FilterState, PageType } from '../types';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../lib/api';

interface ToastInfo {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface AppContextType {
  // Page Navigation State
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  activeProductId: string | null;
  setActiveProductId: (id: string | null) => void;

  // Theme (Light theme enforced)
  theme: 'light';
  toggleTheme: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Wishlist
  wishlist: WishlistItem[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;

  // Compare
  compareList: Product[];
  toggleCompare: (product: Product) => void;
  isInCompare: (productId: string) => boolean;
  isCompareOpen: boolean;
  setIsCompareOpen: (open: boolean) => void;

  // Quick View Modal
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Other Modals
  isQuoteModalOpen: boolean;
  setIsQuoteModalOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isCheckoutModalOpen: boolean;
  setIsCheckoutModalOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Filters & Product search
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  filteredProducts: Product[];

  // Toasts
  toasts: ToastInfo[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;

  // Auth User state mock
  user: { name: string; email: string; isLoggedIn: boolean } | null;
  setUser: React.Dispatch<React.SetStateAction<{ name: string; email: string; isLoggedIn: boolean } | null>>;
}

const initialFilters: FilterState = {
  searchQuery: '',
  selectedCategories: [],
  selectedAgeGroups: [],
  selectedTechStacks: [],
  minPrice: 0,
  maxPrice: 50000,
  inStockOnly: false,
  sortBy: 'featured',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Page navigation state
  const [currentPage, setCurrentPageState] = useState<PageType>('home');
  const [activeProductId, setActiveProductId] = useState<string | null>(null);

  const setCurrentPage = (page: PageType) => {
    setCurrentPageState(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Enforce light theme
  const theme = 'light';
  const toggleTheme = () => {};

  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Wishlist state
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Compare state
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Quick view & Modals
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // User auth state mock
  const [user, setUser] = useState<{ name: string; email: string; isLoggedIn: boolean } | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Cart Handlers
  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added "${product.name}" to cart!`, 'success');
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Wishlist Handlers
  const toggleWishlist = (product: Product) => {
    const exists = wishlist.some(item => item.product.id === product.id);
    if (exists) {
      setWishlist(prev => prev.filter(item => item.product.id !== product.id));
      showToast(`Removed "${product.name}" from wishlist`, 'info');
    } else {
      setWishlist(prev => [...prev, { product, addedAt: new Date().toISOString() }]);
      showToast(`Saved "${product.name}" to wishlist!`, 'success');
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.product.id === productId);
  };

  // Compare Handlers
  const toggleCompare = (product: Product) => {
    const exists = compareList.some(item => item.id === product.id);
    if (exists) {
      setCompareList(prev => prev.filter(item => item.id !== product.id));
      showToast(`Removed "${product.name}" from comparison`, 'info');
    } else {
      if (compareList.length >= 3) {
        showToast('You can compare a maximum of 3 products at a time', 'warning');
        return;
      }
      setCompareList(prev => [...prev, product]);
      showToast(`Added "${product.name}" to compare list`, 'success');
    }
  };

  const isInCompare = (productId: string) => {
    return compareList.some(item => item.id === productId);
  };

  // Filters state & logic
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const { data: rawProducts = [] } = useQuery({
    queryKey: ['store-products'],
    queryFn: getProducts
  });

  // Map Supabase products to Frontend Product interface
  const products: Product[] = React.useMemo(() => {
    return rawProducts.map((p: any) => ({
      id: p.id,
      name: p.name,
      tagline: p.short_description || '',
      description: p.description || '',
      price: p.sale_price || p.price,
      originalPrice: p.price,
      rating: 5, // mock for now
      reviewCount: 0,
      badges: p.featured ? ['Featured'] : [],
      category: p.categories?.name || 'Uncategorized',
      ageGroup: '8-10', // mock for now
      ageText: 'Yrs',
      skillLevel: 'Beginner',
      techStack: p.tags?.map((t: any) => t.name) || [],
      images: p.images || [],
      specs: {},
      whatsInside: [],
      sampleProjects: [],
      inStock: p.stock > 0,
      stockCount: p.stock || 0,
      discountPercent: p.sale_price && p.price ? Math.round(((p.price - p.sale_price) / p.price) * 100) : 0,
    }));
  }, [rawProducts]);

  const filteredProducts = products.filter(product => {
    if (filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase();
      const matchesName = product.name.toLowerCase().includes(q);
      const matchesCategory = product.category.toLowerCase().includes(q);
      const matchesTech = product.techStack.some(t => t.toLowerCase().includes(q));
      const matchesDesc = product.description.toLowerCase().includes(q);
      if (!matchesName && !matchesCategory && !matchesTech && !matchesDesc) {
        return false;
      }
    }

    if (filters.selectedCategories.length > 0) {
      if (!filters.selectedCategories.includes(product.category)) {
        return false;
      }
    }

    if (filters.selectedAgeGroups.length > 0) {
      if (!filters.selectedAgeGroups.includes(product.ageGroup)) {
        return false;
      }
    }

    if (filters.selectedTechStacks.length > 0) {
      const hasTech = product.techStack.some(tech => filters.selectedTechStacks.includes(tech));
      if (!hasTech) {
        return false;
      }
    }

    if (product.price < filters.minPrice || product.price > filters.maxPrice) {
      return false;
    }

    if (filters.inStockOnly && !product.inStock) {
      return false;
    }

    return true;
  }).sort((a, b) => {
    if (filters.sortBy === 'price-low-high') return a.price - b.price;
    if (filters.sortBy === 'price-high-low') return b.price - a.price;
    if (filters.sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        activeProductId,
        setActiveProductId,
        theme,
        toggleTheme,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        compareList,
        toggleCompare,
        isInCompare,
        isCompareOpen,
        setIsCompareOpen,
        quickViewProduct,
        setQuickViewProduct,
        isQuoteModalOpen,
        setIsQuoteModalOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        isSearchOpen,
        setIsSearchOpen,
        filters,
        setFilters,
        resetFilters,
        filteredProducts,
        toasts,
        showToast,
        removeToast,
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
