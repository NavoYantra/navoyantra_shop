import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { PageType } from '../../types';
import {
  Search, ShoppingBag, Heart, ArrowRightLeft,
  User, Sparkles, Menu, X, Phone, ShieldCheck, ChevronDown
} from 'lucide-react';
import { MegaMenu } from './MegaMenu';
import { SocialLinks } from '../common/SocialLinks';

export const Header: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    cartCount,
    setIsCartOpen,
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    compareList,
    setIsCompareOpen,
    setIsAuthModalOpen,
    setIsSearchOpen,
    setIsQuoteModalOpen,
    user
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const megaMenuRef = useRef<HTMLDivElement>(null);
  const wishlistRef = useRef<HTMLDivElement>(null);

  // Close mega menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setIsMegaMenuOpen(false);
      }
      if (wishlistRef.current && !wishlistRef.current.contains(event.target as Node)) {
        setIsWishlistOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: PageType) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">

      {/* Top Announcement Bar */}
      <div className="bg-slate-900 text-white py-2 px-4 sm:px-6 lg:px-8 text-xs font-medium border-b border-slate-800">
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Social Media Links (Extreme Left) */}
          <div className="hidden lg:flex items-center text-slate-400 shrink-0">
            <SocialLinks iconClassName="w-3.5 h-3.5" />
          </div>

          <div className="flex items-center justify-center space-x-2 text-center lg:text-left flex-1 min-w-0">
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-orange-500 text-white font-extrabold text-[10px] uppercase tracking-wider animate-pulse shrink-0">
              <Sparkles className="w-3 h-3" />
              <span>STEM FEST 2026</span>
            </span>
            <span className="text-slate-300 truncate hidden sm:block">
              Get <strong className="text-orange-400 font-bold">10% OFF</strong> on all Robotics & AI Kits with code <code className="bg-slate-800 px-1.5 py-0.5 rounded text-orange-300 font-mono">STEM10</code> | Free Shipping above ₹999 across India!
            </span>
            <span className="text-slate-300 sm:hidden">
              <strong className="text-orange-400">10% OFF</strong> with code <code className="bg-slate-800 px-1.5 py-0.5 rounded text-orange-300 font-mono">STEM10</code>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-6 text-slate-300 text-xs whitespace-nowrap">
            <a href="#why-choose" onClick={() => handleNavClick('home')} className="hover:text-white transition-colors flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>1-Week Warranty on Premium Products</span>
            </a>
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="hover:text-orange-400 transition-colors font-semibold text-orange-300"
            >
              Institutional Pricing & Bulk Quotes
            </button>
            <a href="tel:+919582528010" className="hover:text-white transition-colors flex items-center space-x-1">
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>Helpline: +91 9582528010</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 ${isScrolled
            ? 'glass-nav shadow-lg border-b border-slate-200/60'
            : 'bg-white/95 backdrop-blur-md border-b border-slate-100'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">

            {/* Complete Left: Brand Logo */}
            <div className="flex items-center space-x-3 shrink-0">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              <button
                onClick={() => handleNavClick('home')}
                className="flex items-center space-x-3 group text-left shrink-0"
              >
                <img
                  src="/logo.png"
                  alt="NavoYantra Technology"
                  className="h-20 sm:h-24 object-contain group-hover:scale-105 transition-transform"
                />
              </button>
            </div>

            {/* Center: Desktop Nav Links (ONLY Home, Shop, Lab Setup, Blogs on single line) */}
            <div className="hidden lg:flex items-center justify-center space-x-2 flex-1 px-4">
              <div className="flex items-center space-x-2 whitespace-nowrap">
                <button
                  onClick={() => handleNavClick('home')}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${currentPage === 'home'
                      ? 'bg-blue-50 text-blue-600 shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100'
                    }`}
                >
                  Home
                </button>

                {/* Shop Menu Wrapper with Hover trigger */}
                <div
                  ref={megaMenuRef}
                  className="relative group"
                  onMouseEnter={() => setIsMegaMenuOpen(true)}
                >
                  <button
                    onClick={() => {
                      handleNavClick('shop');
                      setIsMegaMenuOpen(false);
                    }}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center space-x-1 ${currentPage === 'shop' || isMegaMenuOpen
                        ? 'bg-blue-50 text-blue-600 shadow-xs'
                        : 'text-slate-700 hover:bg-slate-100'
                      }`}
                  >
                    <span>Shop</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMegaMenuOpen ? 'rotate-180 text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                  </button>

                  {/* Mega Menu Dropdown */}
                  {isMegaMenuOpen && (
                    <MegaMenu onClose={() => setIsMegaMenuOpen(false)} />
                  )}
                </div>

                <button
                  onClick={() => handleNavClick('lab-setup')}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${currentPage === 'lab-setup'
                      ? 'bg-orange-50 text-orange-600 shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100'
                    }`}
                >
                  Lab Setup
                </button>

                <button
                  onClick={() => handleNavClick('blogs')}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${currentPage === 'blogs'
                      ? 'bg-blue-50 text-blue-600 shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100'
                    }`}
                >
                  Blog/Tutorial
                </button>
              </div>
            </div>

            {/* Complete Right: Action Buttons */}
            <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">

              {/* Search Bar Input / Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="hidden sm:flex items-center space-x-2 px-3.5 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 border border-slate-200/60 text-slate-400 text-xs w-44 xl:w-56 transition-all text-left shadow-inner group whitespace-nowrap"
              >
                <Search className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors shrink-0" />
                <span className="flex-1 truncate">Search robotics, AI...</span>
                <kbd className="hidden xl:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white border border-slate-200 rounded text-slate-400">⌘K</kbd>
              </button>

              <button
                onClick={() => setIsSearchOpen(true)}
                className="sm:hidden p-2.5 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Compare Button */}
              <button
                onClick={() => setIsCompareOpen(true)}
                className="relative p-2.5 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
                title="Product Comparison"
              >
                <ArrowRightLeft className="w-5 h-5" />
                {compareList.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center animate-pulse shadow-md">
                    {compareList.length}
                  </span>
                )}
              </button>

              {/* Wishlist Dropdown */}
              <div className="relative" ref={wishlistRef}>
                <button
                  onClick={() => setIsWishlistOpen(!isWishlistOpen)}
                  className="relative p-2.5 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
                  title="Wishlist"
                >
                  <Heart className="w-5 h-5" />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-md">
                      {wishlist.length}
                    </span>
                  )}
                </button>

                {isWishlistOpen && (
                  <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-bold text-slate-900">Your Wishlist</h4>
                      <span className="text-xs text-slate-500">{wishlist.length} items</span>
                    </div>
                    {wishlist.length === 0 ? (
                      <p className="text-xs text-slate-500 text-center py-4">Your wishlist is empty.</p>
                    ) : (
                      <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
                        {wishlist.map(item => (
                          <div key={item.product.id} className="flex items-center space-x-3 group cursor-pointer" onClick={() => { setCurrentPage('shop'); setIsWishlistOpen(false); }}>
                            <img src={item.product.images[0]} alt={item.product.name} className="w-12 h-12 rounded-lg object-cover bg-slate-100" />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">{item.product.name}</p>
                              <p className="text-[10px] text-blue-600 font-bold">₹{item.product.price.toLocaleString('en-IN')}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Cart Button (Icon Only) */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
                title="Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center shadow-md">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User Account / Auth */}
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="hidden sm:flex items-center space-x-2 p-1.5 pr-3 rounded-2xl border border-slate-200 hover:bg-slate-50 transition-colors whitespace-nowrap"
              >
                <div className="w-7 h-7 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-slate-700 truncate max-w-[90px]">
                  {user ? user.name : 'Sign In'}
                </span>
              </button>

            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[115px] bg-white border-b border-slate-200 shadow-2xl p-6 space-y-3 z-40 animate-in slide-in-from-top-4">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full text-left font-semibold py-2.5 px-3 rounded-xl ${currentPage === 'home' ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50'
              }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('shop')}
            className={`w-full text-left font-semibold py-2.5 px-3 rounded-xl ${currentPage === 'shop' ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50'
              }`}
          >
            Shop
          </button>
          <button
            onClick={() => handleNavClick('lab-setup')}
            className={`w-full text-left font-semibold py-2.5 px-3 rounded-xl ${currentPage === 'lab-setup' ? 'bg-orange-50 text-orange-600' : 'text-slate-700 hover:bg-slate-50'
              }`}
          >
            Lab Setup
          </button>
          <button
            onClick={() => handleNavClick('blogs')}
            className={`w-full text-left font-semibold py-2.5 px-3 rounded-xl ${currentPage === 'blogs' ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50'
              }`}
          >
            Blog/Tutorial
          </button>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsAuthModalOpen(true);
              }}
              className="flex items-center space-x-2 text-sm font-semibold text-slate-700"
            >
              <User className="w-5 h-5 text-blue-600" />
              <span>{user ? user.name : 'Account Login'}</span>
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsQuoteModalOpen(true);
              }}
              className="px-3 py-1.5 rounded-lg bg-orange-500 text-white text-xs font-semibold"
            >
              B2B Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
