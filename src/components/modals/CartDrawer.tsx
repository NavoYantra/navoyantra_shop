import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShoppingBag, X, Trash2, Plus, Minus, ArrowRight, Tag, Sparkles 
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    removeFromCart, 
    updateQuantity, 
        cartTotal,
    setIsCheckoutModalOpen,
    showToast
  } = useApp();

  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  if (!isCartOpen) return null;

  const freeShippingThreshold = 999;
  const shippingCost = cartTotal >= freeShippingThreshold || cartTotal === 0 ? 0 : 99;
  const progressPercent = Math.min(100, (cartTotal / freeShippingThreshold) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'STEM10') {
      const discount = Math.round(cartTotal * 0.1);
      setAppliedDiscount(discount);
      showToast('Promo code STEM10 applied! You saved 10%', 'success');
    } else {
      showToast('Invalid coupon code. Use STEM10 for 10% OFF', 'warning');
    }
  };

  const finalTotal = Math.max(0, cartTotal - appliedDiscount + shippingCost);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-lg bg-white  h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100  flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold font-heading text-slate-900 ">
              Your STEM Shopping Bag ({cart.length})
            </h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 :bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Milestone Progress Bar */}
        <div className="bg-blue-50  p-4 border-b border-blue-100 ">
          <div className="flex items-center justify-between text-xs font-bold mb-1.5">
            {cartTotal >= freeShippingThreshold ? (
              <span className="text-emerald-600  flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>🎉 You unlocked FREE Express Shipping!</span>
              </span>
            ) : (
              <span className="text-slate-700 ">
                Add <strong className="text-blue-600 ">₹{(freeShippingThreshold - cartTotal).toLocaleString('en-IN')}</strong> more for Free Delivery
              </span>
            )}
            <span className="text-slate-400">{Math.round(progressPercent)}%</span>
          </div>
          <div className="w-full h-2 bg-slate-200  rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-orange-500 transition-all duration-300" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="p-6 flex-1 overflow-y-auto space-y-4">
          {cart.length > 0 ? (
            cart.map(item => (
              <div
                key={item.product.id}
                className="flex items-center space-x-4 p-3 rounded-2xl border border-slate-100  bg-slate-50/60 "
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-xl object-cover border border-slate-200 "
                />

                <div className="flex-1 min-w-0 space-y-1">
                  <h4 className="text-xs font-bold text-slate-900  truncate">
                    {item.product.name}
                  </h4>
                  <p className="text-[11px] font-semibold text-blue-600 ">
                    ₹{item.product.price.toLocaleString('en-IN')}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-2 pt-1">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-1 rounded-lg bg-white  border border-slate-200  text-slate-600  hover:bg-slate-100"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold px-2">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-1 rounded-lg bg-white  border border-slate-200  text-slate-600  hover:bg-slate-100"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <span className="text-xs font-bold text-slate-900  font-heading">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="block text-slate-400 hover:text-rose-500 ml-auto transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 space-y-3">
              <ShoppingBag className="w-12 h-12 text-slate-300  mx-auto" />
              <h4 className="text-lg font-bold text-slate-900 ">Your cart is empty</h4>
              <p className="text-xs text-slate-500">Explore our best selling STEM & AI robotics kits to add items!</p>
            </div>
          )}
        </div>

        {/* Promo Code & Order Summary Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-slate-100  bg-slate-50  space-y-4">
            
            {/* Promo Form */}
            <form onSubmit={handleApplyPromo} className="flex space-x-2">
              <div className="relative flex-1">
                <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Coupon code (e.g. STEM10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-white  border border-slate-200  text-xs uppercase font-mono font-bold focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-slate-900 text-white   font-bold text-xs hover:bg-blue-600 transition-colors"
              >
                Apply
              </button>
            </form>

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-slate-600 ">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900 ">₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-600  font-bold">
                  <span>Discount (STEM10)</span>
                  <span>-₹{appliedDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? <strong className="text-emerald-500">FREE</strong> : `₹${shippingCost}`}</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-slate-900  pt-2 border-t border-slate-200  font-heading">
                <span>Grand Total</span>
                <span className="text-blue-600 ">₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutModalOpen(true);
              }}
              className="w-full py-4 rounded-2xl bg-gradient-orange hover:opacity-95 text-white font-bold text-sm shadow-xl shadow-orange-500/25 flex items-center justify-center space-x-2 transition-transform hover:scale-[1.02]"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
