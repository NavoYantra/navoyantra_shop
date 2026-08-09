import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { TESTIMONIALS } from '../data/testimonials';
import { ProductCard } from '../components/product/ProductCard';
import { 
  Star, ShoppingBag, Heart, ShieldCheck, CheckCircle2, Cpu, Box, Sparkles, School, ChevronRight, Share2, Info
} from 'lucide-react';

export const ProductDetailHero: React.FC<{ product: any; isPreview?: boolean }> = ({ product, isPreview }) => {
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist,
    setIsQuoteModalOpen
  } = useApp();
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const isWishlisted = isInWishlist(product.id);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200">
      {/* Gallery (Left) */}
      <div className="lg:col-span-5 space-y-4">
        <div className="aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 relative group">
          <img
            src={product.images?.[activeImgIdx] || product.images?.[0] || 'https://via.placeholder.com/600'}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.discountPercent > 0 && (
            <span className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-rose-500 text-white font-extrabold text-sm shadow-md">
              -{product.discountPercent}% OFF
            </span>
          )}
        </div>
        
        {product.images?.length > 0 && (
          <div className="grid grid-cols-4 gap-3">
            {product.images.map((img: string, i: number) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveImgIdx(i)}
                className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                  activeImgIdx === i ? 'border-blue-600 scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100 bg-slate-50'
                }`}
              >
                <img src={img} alt="Thumb" className="w-full h-full object-cover mix-blend-multiply" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Details & Buy Box (Right) */}
      <div className="lg:col-span-7 space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
              {product.category || 'Category'}
            </span>
            <button type="button" className="p-2 text-slate-400 hover:text-blue-600 transition-colors bg-slate-50 hover:bg-blue-50 rounded-full">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            {product.name || 'Product Name'}
          </h1>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating || 5) ? 'fill-amber-400' : 'fill-slate-200 text-slate-200'}`} />
                ))}
              </div>
              <span className="font-bold text-slate-900 ml-1">{product.rating || 5}</span>
            </div>
            <span className="text-sm text-slate-500 hover:text-blue-600 cursor-pointer underline underline-offset-4 decoration-slate-300">
              {product.reviewCount || 0} Reviews
            </span>
            <span className="text-sm text-slate-300">|</span>
            <span className="text-sm font-semibold text-slate-600 flex items-center space-x-1">
              <Info className="w-4 h-4 text-slate-400" />
              <span>{product.ageText || 'Age Group'}</span>
            </span>
          </div>
          <div className="text-xs font-mono text-slate-500 mt-2">
            SKU: {product.sku || ((product.id && product.id.length > 20) ? `NY-${product.id.slice(0, 8).toUpperCase()}` : product.id)}
          </div>
        </div>

        <p className="text-base text-slate-600 leading-relaxed">
          {product.description || 'Product description will appear here.'}
        </p>

        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between space-y-4 sm:space-y-0">
            <div>
              <div className="flex items-baseline space-x-3">
                <span className="text-4xl font-extrabold text-slate-900 font-heading">
                  ₹{(product.price || 0).toLocaleString('en-IN')}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-lg text-slate-400 line-through font-medium">
                    ₹{(product.originalPrice || 0).toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              <span className="text-sm text-emerald-600 font-bold flex items-center space-x-1 mt-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Free Express Shipping Across India</span>
              </span>
            </div>
            
            <span className="px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold self-start sm:self-auto shadow-sm border border-emerald-200">
              In Stock ({product.stockCount || 0} left)
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                if (isPreview) return;
                addToCart(product);
              }}
              className="w-full sm:flex-1 py-4 rounded-xl bg-gradient-orange hover:opacity-95 text-white font-bold text-base shadow-xl shadow-orange-500/25 flex items-center justify-center space-x-2 transition-transform hover:-translate-y-0.5"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Add to Shopping Bag</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (!isPreview) toggleWishlist(product);
              }}
              className={`p-4 rounded-xl border-2 transition-all flex items-center justify-center ${
                isWishlisted ? 'border-rose-500 bg-rose-50 text-rose-500' : 'border-slate-200 bg-white text-slate-500 hover:border-rose-300 hover:text-rose-500'
              }`}
            >
              <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-rose-500' : ''}`} />
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              if (isPreview) return;
              setIsQuoteModalOpen(true);
            }}
            className="w-full py-3.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white font-bold text-sm border-2 border-blue-100 hover:border-blue-600 transition-colors flex items-center justify-center space-x-2"
          >
            <School className="w-4 h-4" />
            <span>Bulk Enquiry for Institutions & Labs</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex items-start space-x-3">
            <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-sm font-bold text-slate-900">Official Warranty</h5>
              <p className="text-xs text-slate-500 mt-1">{product.specs?.warranty || '1 Year Replacement'}</p>
            </div>
          </div>
          <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex items-start space-x-3">
            <Cpu className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-sm font-bold text-slate-900">Tech Stack</h5>
              <p className="text-xs text-slate-500 mt-1">{product.techStack?.join(', ') || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProductDetailPage: React.FC = () => {
  const { 
    activeProductId, 
    setCurrentPage, 
    storeProducts
  } = useApp();

  // Scroll to top when product changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeProductId]);

  const product = storeProducts.find(p => p.id === activeProductId);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Product not found.</h2>
        <button 
          onClick={() => setCurrentPage('shop')}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const relatedProducts = storeProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const productReviews = TESTIMONIALS.filter(t => t.productName?.includes(product.name) || Math.random() > 0.6).slice(0, 3);

  return (
    <div className="bg-[#F6F7F9] min-h-screen pb-20">
      
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center text-xs font-medium text-slate-500 space-x-2">
          <button onClick={() => setCurrentPage('home')} className="hover:text-blue-600 transition-colors">Home</button>
          <ChevronRight className="w-3 h-3" />
          <button onClick={() => setCurrentPage('shop')} className="hover:text-blue-600 transition-colors">Shop</button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-400">{product.category}</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-900 font-bold">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">
        
        {/* Main Hero & Buy Box */}
        <ProductDetailHero product={product} />

        {/* Detailed Sections Tabs/Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Description Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
              <h3 className="text-2xl font-extrabold font-heading text-slate-900">Product Overview</h3>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-600 leading-relaxed text-base">
                  The {product.name} is meticulously engineered to provide a comprehensive learning experience. 
                  Whether you are a beginner exploring the basics of {product.category.toLowerCase()} or an advanced 
                  maker building complex algorithms, this kit is designed to scale with your curiosity.
                </p>
                <p className="text-slate-600 leading-relaxed text-base mt-4">
                  Built with industrial-grade components and a focus on safety, it includes step-by-step 
                  instructional manuals, code libraries, and access to the NavoYantra digital learning platform.
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-orange-500" />
                  <span>Projects You Can Build</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.sampleProjects.map((proj, i) => (
                    <div key={i} className="flex items-center space-x-2 p-3 rounded-lg bg-orange-50/50 border border-orange-100/50">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                      <span className="text-sm font-medium text-slate-700">{proj}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-8">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-2xl font-extrabold font-heading text-slate-900">Customer Reviews</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-extrabold text-slate-900">{product.rating}</span>
                  <div className="flex text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                {productReviews.length > 0 ? productReviews.map((rev, i) => (
                  <div key={i} className="border-b border-slate-50 pb-6 last:border-0 last:pb-0">
                    <div className="flex items-center space-x-3 mb-3">
                      <img src={rev.avatar} alt={rev.author} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <h5 className="text-sm font-bold text-slate-900">{rev.author}</h5>
                        <p className="text-xs text-slate-500">{rev.role}</p>
                      </div>
                    </div>
                    <div className="flex text-amber-400 mb-2">
                      {[...Array(rev.rating)].map((_, j) => <Star key={j} className="w-3 h-3 fill-amber-400" />)}
                    </div>
                    <h6 className="text-sm font-bold text-slate-800 mb-1">"{rev.title}"</h6>
                    <p className="text-sm text-slate-600 leading-relaxed">"{rev.content}"</p>
                  </div>
                )) : (
                  <p className="text-sm text-slate-500 italic">No reviews yet for this product. Be the first to review!</p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar Column (Specs & In The Box) */}
          <div className="space-y-8">
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-extrabold font-heading text-slate-900 mb-6 flex items-center space-x-2">
                <Box className="w-5 h-5 text-blue-600" />
                <span>What's In The Box</span>
              </h3>
              <ul className="space-y-3">
                {product.whatsInside.map((item, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl shadow-lg border border-slate-800 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <Cpu className="w-32 h-32" />
              </div>
              <h3 className="text-lg font-extrabold font-heading mb-6">Technical Specs</h3>
              <div className="space-y-4 text-sm relative z-10">
                {Object.entries(product.specs).map(([key, value]) => {
                  if (!value) return null;
                  const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                  return (
                    <div key={key} className="flex justify-between items-center py-2 border-b border-slate-800 last:border-0">
                      <span className="text-slate-400 font-medium">{label}</span>
                      <span className="font-bold text-right ml-4">
                        {Array.isArray(value) ? value.length : value}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="pt-12 border-t border-slate-200">
            <h3 className="text-2xl font-extrabold font-heading text-slate-900 mb-8">Related Kits You Might Like</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(prod => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
