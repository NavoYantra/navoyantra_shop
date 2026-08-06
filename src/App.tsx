import React from 'react';
import { AppProvider, useApp } from './context/AppContext';

// Layout Components
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { LabSetupPage } from './pages/LabSetupPage';
import { BlogsPage } from './pages/BlogsPage';

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

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F7F9] text-slate-900 transition-colors duration-200">
      <Header />
      
      <main className="flex-1">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'shop' && <ShopPage />}
        {currentPage === 'lab-setup' && <LabSetupPage />}
        {currentPage === 'blogs' && <BlogsPage />}
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
