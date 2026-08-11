import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, Star, ShoppingBag, Heart, CheckCircle2, Box, Sparkles, School, ArrowRight
} from 'lucide-react';

export const QuickViewContent: React.FC<{ product: any; isPreview?: boolean }> = ({ product, isPreview }) => {
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist,
    setIsQuoteModalOpen,
    setCurrentPage,
    setActiveProductId,
    setQuickViewProduct
  } = useApp();

  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const isWishlisted = isInWishlist(product.id);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 max-h-[80vh] overflow-y-auto">
      {/* Left Column: Image Gallery */}
      <div className="space-y-4">
        <div className="aspect-4/3 rounded-2xl overflow-hidden bg-slate-100  border border-slate-200  relative">
          <img
            src={product.images?.[activeImgIdx] || product.images?.[0] || 'https://via.placeholder.com/400'}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.discountPercent > 0 && (
            <span className="absolute top-3 right-3 px-2.5 py-1 rounded-xl bg-rose-500 text-white font-extrabold text-xs shadow-md">
              -{product.discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Thumbnail selector */}
        {product.images?.length > 0 && (
          <div className="flex space-x-3">
            {product.images.map((img: string, i: number) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveImgIdx(i)}
                className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                  activeImgIdx === i ? 'border-blue-600 scale-105 shadow-md' : 'border-transparent opacity-70'
                }`}
              >
                <img src={img} alt="Thumb" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

      </div>

      {/* Right Column: Title, Description, Included Box, & CTAs */}
      <div className="space-y-6">
        <div>
          {product.reviewCount > 0 ? (
            <div className="flex items-center space-x-2 text-xs text-amber-400 mb-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="font-bold text-slate-900 ">{product.rating || 5}</span>
              <span className="text-slate-400">({product.reviewCount || 0} customer reviews)</span>
            </div>
          ) : (
            <div className="text-xs text-slate-400 italic mb-1">No reviews yet</div>
          )}

          <h2 className="text-2xl font-extrabold font-heading text-slate-900 ">
            {product.name || 'Product Name'}
          </h2>
          <p className="text-xs text-blue-600 font-semibold mt-0.5 line-clamp-2">
            {product.tagline || 'Tagline'}
          </p>
          <p className="text-sm font-semibold text-slate-500 font-mono mt-1">
            SKU: {product.sku || ((product.id && product.id.length > 20) ? `NY-${product.id.slice(0, 8).toUpperCase()}` : product.id)}
          </p>
          
          <button 
            type="button"
            onClick={() => {
              if (isPreview) return;
              setActiveProductId(product.id);
              setCurrentPage('product-detail');
              setQuickViewProduct(null);
            }}
            className="mt-2 text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center space-x-1 group"
          >
            <span>View Full Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Pricing Box */}
        <div className="p-4 rounded-2xl bg-blue-50/60  border border-blue-100  flex items-center justify-between">
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-extrabold text-slate-900  font-heading">
                ₹{(product.price || 0).toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-slate-400 line-through">
                  ₹{(product.originalPrice || 0).toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span className="text-[11px] text-emerald-600  font-bold block">
              Free Express Shipping Across India
            </span>
          </div>

          <span className="px-3 py-1 rounded-full bg-emerald-100  text-emerald-700  text-xs font-bold">
            In Stock ({product.stockCount || 0} left)
          </span>
        </div>

        <p className="text-xs text-slate-600  leading-relaxed">
          {product.shortDescription || product.tileDescription || product.description || 'Description'}
        </p>

        {/* Whats Inside Box */}
        {product.whatsInside?.length > 0 && (
          <div>
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2 flex items-center space-x-1">
              <Box className="w-3.5 h-3.5" />
              <span>What's Inside The Kit</span>
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-700 ">
              {product.whatsInside.map((item: string, i: number) => (
                <li key={i} className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span className="truncate">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Sample Projects */}
        {product.sampleProjects?.length > 0 && (
          <div>
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2 flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              <span>Projects You Can Build</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {product.sampleProjects.map((proj: string, i: number) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-100  text-slate-800  text-xs font-medium">
                  {proj}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col space-y-3 pt-2">
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => {
                if (isPreview) return;
                addToCart(product);
                setQuickViewProduct(null);
              }}
              className="flex-1 py-4 rounded-2xl bg-gradient-orange hover:opacity-95 text-white font-bold text-sm shadow-xl shadow-orange-500/25 flex items-center justify-center space-x-2 transition-transform hover:scale-105"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Shopping Bag</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (!isPreview) toggleWishlist(product);
              }}
              className={`p-4 rounded-2xl border border-slate-200 transition-colors ${
                isWishlisted ? 'bg-rose-500 text-white' : 'bg-slate-100 text-slate-700 hover:bg-rose-500 hover:text-white'
              }`}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-white' : ''}`} />
            </button>
          </div>
          
          <button
            type="button"
            onClick={() => {
              if (isPreview) return;
              setQuickViewProduct(null);
              setIsQuoteModalOpen(true);
            }}
            className="w-full py-3.5 rounded-2xl bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white font-bold text-sm border-2 border-blue-100 hover:border-blue-600 transition-colors shadow-sm flex items-center justify-center space-x-2"
          >
            <School className="w-4 h-4" />
            <span>Bulk Enquiry for Institutions</span>
          </button>
        </div>

      </div>

    </div>
  );
}

export const ProductQuickViewModal: React.FC = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct
  } = useApp();

  if (!quickViewProduct) return null;
  const product = quickViewProduct;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white  rounded-3xl shadow-2xl border border-slate-200  overflow-hidden animate-in zoom-in-95 duration-200 my-8">
        
        {/* Top Header */}
        <div className="p-4 sm:p-6 border-b border-slate-100  flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100  text-blue-600  text-xs font-bold uppercase">
              {product.category}
            </span>
            <span className="text-xs font-semibold text-slate-400">• {product.ageText}</span>
          </div>
          <button
            onClick={() => setQuickViewProduct(null)}
            className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 :bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <QuickViewContent product={product} />

      </div>
    </div>
  );
};
