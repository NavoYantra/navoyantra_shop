import React from 'react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  Star, ShoppingBag, Heart, ArrowRightLeft, Eye 
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    toggleCompare, 
    isInCompare, 
    setQuickViewProduct,
    setCurrentPage,
    setActiveProductId
  } = useApp();

  const handleProductClick = () => {
    setActiveProductId(product.id);
    setCurrentPage('product-detail');
  };

  const isWishlisted = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  return (
    <div className="group rounded-3xl bg-white  border border-slate-200/80  shadow-lg hover:shadow-2xl hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden relative">
      
      {/* Top Image Container */}
      <div className="relative aspect-4/3 overflow-hidden bg-slate-100 group">
        {/* Clickable Overlay for Navigation */}
        <div 
          className="absolute inset-0 z-10 cursor-pointer"
          onClick={handleProductClick}
        />

        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Overlay gradient (Visual only) */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-20 max-w-[80%] pointer-events-none">
          {product.badges.map((badge, idx) => (
            <span
              key={idx}
              className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-md backdrop-blur-md ${
                badge === 'Bestseller'
                  ? 'bg-orange-500 text-white'
                  : badge === 'School Approved' || badge === 'CBSE Aligned'
                  ? 'bg-blue-600 text-white'
                  : 'bg-emerald-500 text-white'
              }`}
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Discount Tag Top Right */}
        {product.discountPercent > 0 && (
          <div className="absolute top-3 right-3 z-20 pointer-events-none">
            <span className="px-2 py-1 rounded-xl bg-rose-500 text-white text-[11px] font-extrabold shadow-md">
              -{product.discountPercent}%
            </span>
          </div>
        )}

        {/* Quick Action Floating Bar (On Hover) */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
          <button
            onClick={(e) => { 
              e.preventDefault(); 
              e.stopPropagation(); 
              setQuickViewProduct(product); 
            }}
            className="p-2.5 rounded-2xl bg-white/90 text-slate-800 hover:bg-blue-600 hover:text-white transition-colors shadow-lg backdrop-blur-md flex items-center space-x-1 text-xs font-bold px-3 relative z-30"
            title="Quick Specs & Details"
          >
            <Eye className="w-4 h-4" />
            <span>Quick View</span>
          </button>

          <button
            onClick={(e) => { 
              e.preventDefault(); 
              e.stopPropagation(); 
              toggleCompare(product); 
            }}
            className={`p-2.5 rounded-2xl transition-colors shadow-lg backdrop-blur-md relative z-30 ${
              isCompared 
                ? 'bg-indigo-600 text-white' 
                : 'bg-white/90  text-slate-800  hover:bg-indigo-600 hover:text-white'
            }`}
            title={isCompared ? 'Remove from Compare' : 'Add to Compare'}
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>

          <button
            onClick={(e) => { 
              e.preventDefault(); 
              e.stopPropagation(); 
              toggleWishlist(product); 
            }}
            className={`p-2.5 rounded-2xl transition-colors shadow-lg backdrop-blur-md relative z-30 ${
              isWishlisted 
                ? 'bg-rose-500 text-white' 
                : 'bg-white/90  text-slate-800  hover:bg-rose-500 hover:text-white'
            }`}
            title={isWishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
          </button>
        </div>
      </div>

      {/* Product Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        
        <div className="space-y-2">
          {/* Metadata Row: Age & Rating */}
          <div className="flex items-center justify-between text-xs">
            <span className="px-2.5 py-0.5 rounded-md bg-slate-100  font-bold text-slate-700 ">
              {product.ageText}
            </span>
            <div className="flex items-center space-x-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="font-bold text-slate-900 ">{product.rating}</span>
              <span className="text-slate-400">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 
            onClick={handleProductClick}
            className="text-base font-bold font-heading text-slate-900 hover:text-blue-600 transition-colors line-clamp-1 cursor-pointer"
          >
            {product.name}
          </h3>

          {/* Tagline */}
          <p className="text-xs text-slate-500  line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1 pt-1">
            {product.techStack.map((tech, i) => (
              <span key={i} className="px-2 py-0.5 rounded bg-blue-50  text-blue-600  text-[10px] font-medium border border-blue-100 ">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing & Add to Cart Footer */}
        <div className="pt-3 border-t border-slate-100  flex items-center justify-between">
          <div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-lg font-extrabold text-slate-900  font-heading">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-slate-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-600  font-semibold block">
              Inclusive of all taxes & GST invoice
            </span>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="py-2.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/20 transition-all hover:scale-105 active:scale-95 flex items-center space-x-1.5"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>

      </div>

    </div>
  );
};
