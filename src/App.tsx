import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProvider, useApp } from './context/AppContext';
import { ArrowUp } from 'lucide-react';
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error }: { error: any }) {
  return (
    <div role="alert" className="p-8 text-red-500 bg-red-50 min-h-screen">
      <h2 className="text-2xl font-bold">Something went wrong:</h2>
      <pre className="mt-4 whitespace-pre-wrap">{error.message}</pre>
      <pre className="mt-4 text-xs opacity-70 whitespace-pre-wrap">{error.stack}</pre>
    </div>
  )
}

// Layout Components
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { BackgroundShapes } from './components/layout/BackgroundShapes';

import { Suspense, lazy } from 'react';
import { LoadingSpinner } from './components/common/LoadingSpinner';
import { AnimatePresence } from 'framer-motion';
import { PageTransition } from './components/animations/PageTransition';

// Pages (Lazy Loaded)
const HomePage = lazy(() => import('./pages/HomePage').then(module => ({ default: module.HomePage })));
const ShopPage = lazy(() => import('./pages/ShopPage').then(module => ({ default: module.ShopPage })));
const LabSetupPage = lazy(() => import('./pages/LabSetupPage').then(module => ({ default: module.LabSetupPage })));

const TutorialsPage = lazy(() => import('./pages/TutorialsPage').then(module => ({ default: module.TutorialsPage })));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage').then(module => ({ default: module.ProductDetailPage })));

const TutorialDetailPage = lazy(() => import('./pages/TutorialDetailPage').then(module => ({ default: module.TutorialDetailPage })));
const CustomerDashboard = lazy(() => import('./pages/CustomerDashboard').then(module => ({ default: module.CustomerDashboard })));
const AdminApp = lazy(() => import('./AdminApp').then(module => ({ default: module.AdminApp })));

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
    <div className="min-h-screen flex flex-col bg-[#F6F7F9] text-slate-900 transition-colors duration-200 relative overflow-hidden">
      <BackgroundShapes />
      <Header />

      <main className="flex-1">
        <Suspense fallback={<LoadingSpinner />}>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/tutorial/:id" element={<PageTransition><TutorialDetailPage /></PageTransition>} />
              <Route path="/product/:slug" element={<PageTransition><ProductDetailPage /></PageTransition>} />

              <Route path="*" element={
                <PageTransition>
                  {currentPage === 'home' && <HomePage />}
                  {currentPage === 'shop' && <ShopPage />}
                  {currentPage === 'lab-setup' && <LabSetupPage />}

                  {currentPage === 'tutorials' && <TutorialsPage />}
                  {currentPage === 'account' && <CustomerDashboard />}
                </PageTransition>
              } />
            </Routes>
          </AnimatePresence>
        </Suspense>
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

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <BrowserRouter>
          <AppProvider>
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#F6F7F9]"><LoadingSpinner /></div>}>
              <Routes>
                <Route path="/admin/*" element={<AdminApp />} />
                <Route path="*" element={<AppContent />} />
              </Routes>
            </Suspense>
          </AppProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}
