import { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { ArrowUp } from 'lucide-react';

// Layout Components
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { LabSetupPage } from './pages/LabSetupPage';
import { BlogsPage } from './pages/BlogsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';

// Modals & Drawers
import { CartDrawer } from './components/modals/CartDrawer';
import { ProductCompareModal } from './components/modals/ProductCompareModal';
import { ProductQuickViewModal } from './components/modals/ProductQuickViewModal';
import { InstitutionQuoteModal } from './components/modals/InstitutionQuoteModal';
import { AuthModal } from './components/modals/AuthModal';
import { CheckoutModal } from './components/modals/CheckoutModal';
import { SearchModal } from './components/modals/SearchModal';
import { ToastContainer } from './components/common/ToastContainer';

export function AppContent() {
  const { currentPage } = useApp();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F7F9] text-slate-900 transition-colors duration-200">
      <Header />
      
      <main className="flex-1">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'shop' && <ShopPage />}
        {currentPage === 'lab-setup' && <LabSetupPage />}
        {currentPage === 'blogs' && <BlogsPage />}
        {currentPage === 'product-detail' && <ProductDetailPage />}
      </main>

      <Footer />

      {/* Modals & Overlays */}
      <CartDrawer />
      <ProductCompareModal />
      <ProductQuickViewModal />
      <InstitutionQuoteModal />
      <AuthModal />
      <CheckoutModal />
      <SearchModal />
      <ToastContainer />

      {/* Global Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-900/20 transition-all hover:scale-110 z-50 flex items-center justify-center group"
          title="Back to Top"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
        </button>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
