import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, CheckCircle2, ShieldCheck, MapPin, CreditCard, QrCode, Truck, ArrowRight 
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutModalOpen, 
    setIsCheckoutModalOpen, 
        cartTotal, 
    clearCart,
    showToast 
  } = useApp();

  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');

  const [shippingData, setShippingData] = useState({
    fullName: 'Aarav Sharma',
    email: 'aarav@example.com',
    phone: '9876543210',
    companyName: '',
    gstNumber: '',
    address: 'Flat 402, Green View Apartments, Indiranagar',
    landmark: 'Opposite Metro Station',
    pincode: '560038',
    city: 'Bengaluru',
    state: 'Karnataka'
  });

  const [orderId, setOrderId] = useState('');

  if (!isCheckoutModalOpen) return null;

  const handlePlaceOrder = () => {
    const randomOrder = 'NY-2026-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(randomOrder);
    setStep('confirmation');
    clearCart();
    showToast(`Order #${randomOrder} placed successfully! Tracking sent to SMS`, 'success');
  };

  const handleClose = () => {
    setIsCheckoutModalOpen(false);
    setStep('shipping');
  };

  const freeShippingThreshold = 999;
  const shippingCost = cartTotal >= freeShippingThreshold || cartTotal === 0 ? 0 : 99;
  const gstAmount = Math.round(cartTotal * 0.18);
  const finalTotal = cartTotal + shippingCost + gstAmount;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white  rounded-3xl shadow-2xl border border-slate-200  overflow-hidden animate-in zoom-in-95 duration-200 my-8">
        
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <div>
              <h3 className="text-xl font-bold font-heading">
                Secure Express Checkout
              </h3>
              <p className="text-xs text-slate-400">
                256-bit SSL Encrypted • GST Invoice Provided
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-xl text-slate-400 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        {step !== 'confirmation' && (
          <div className="flex border-b border-slate-100  text-xs font-bold bg-slate-50 ">
            <div className={`flex-1 py-3 text-center border-b-2 ${step === 'shipping' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400'}`}>
              1. Delivery Address
            </div>
            <div className={`flex-1 py-3 text-center border-b-2 ${step === 'payment' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400'}`}>
              2. Payment Method
            </div>
          </div>
        )}

        {/* Body Content */}
        <div className="p-6">
          
          {/* STEP 1: Shipping */}
          {step === 'shipping' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900  flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>Shipping Address in India</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-600  block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={shippingData.fullName}
                    onChange={e => setShippingData({ ...shippingData, fullName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50  border border-slate-200  text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600  block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={shippingData.email}
                    onChange={e => setShippingData({ ...shippingData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50  border border-slate-200  text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600  block mb-1">Mobile Phone Number</label>
                  <input
                    type="tel"
                    value={shippingData.phone}
                    onChange={e => setShippingData({ ...shippingData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50  border border-slate-200  text-xs font-medium"
                  />
                </div>
              </div>

              <div className="p-4 bg-slate-50/50 border border-slate-200 rounded-xl space-y-3">
                <h5 className="text-xs font-bold text-slate-800">Business Details (Optional)</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-600  block mb-1">Company Name</label>
                    <input
                      type="text"
                      value={shippingData.companyName}
                      onChange={e => setShippingData({ ...shippingData, companyName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white  border border-slate-200  text-xs font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-600  block mb-1">GST Number</label>
                    <input
                      type="text"
                      value={shippingData.gstNumber}
                      onChange={e => setShippingData({ ...shippingData, gstNumber: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white  border border-slate-200  text-xs font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-600  block mb-1">Flat, House No., Street Address</label>
                  <input
                    type="text"
                    value={shippingData.address}
                    onChange={e => setShippingData({ ...shippingData, address: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50  border border-slate-200  text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600  block mb-1">Landmark</label>
                  <input
                    type="text"
                    value={shippingData.landmark}
                    onChange={e => setShippingData({ ...shippingData, landmark: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50  border border-slate-200  text-xs font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-600  block mb-1">Pincode</label>
                  <input
                    type="text"
                    value={shippingData.pincode}
                    onChange={e => setShippingData({ ...shippingData, pincode: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50  border border-slate-200  text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600  block mb-1">City</label>
                  <input
                    type="text"
                    value={shippingData.city}
                    onChange={e => setShippingData({ ...shippingData, city: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50  border border-slate-200  text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600  block mb-1">State</label>
                  <input
                    type="text"
                    value={shippingData.state}
                    onChange={e => setShippingData({ ...shippingData, state: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50  border border-slate-200  text-xs font-medium"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep('payment')}
                  className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg flex items-center space-x-2"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Payment */}
          {step === 'payment' && (
            <div className="space-y-6">
              <h4 className="text-sm font-bold text-slate-900  flex items-center space-x-2">
                <CreditCard className="w-4 h-4 text-blue-600" />
                <span>Select Payment Method</span>
              </h4>

              <div className="space-y-3">
                
                {/* UPI Option */}
                <label 
                  onClick={() => setPaymentMethod('upi')}
                  className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'upi' ? 'border-blue-600 bg-blue-50/50 ' : 'border-slate-200 '
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <QrCode className="w-5 h-5 text-blue-600" />
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 ">UPI QR & Apps (GPay, PhonePe, Paytm)</h5>
                      <p className="text-[10px] text-slate-500">Instant verification • Zero extra fees</p>
                    </div>
                  </div>
                  <input type="radio" checked={paymentMethod === 'upi'} readOnly className="accent-blue-600" />
                </label>

                {/* Credit / Debit Card Option */}
                <label 
                  onClick={() => setPaymentMethod('card')}
                  className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'card' ? 'border-blue-600 bg-blue-50/50 ' : 'border-slate-200 '
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <CreditCard className="w-5 h-5 text-purple-600" />
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 ">Credit / Debit Card & NetBanking</h5>
                      <p className="text-[10px] text-slate-500">RuPay, Visa, Mastercard, SBI, HDFC</p>
                    </div>
                  </div>
                  <input type="radio" checked={paymentMethod === 'card'} readOnly className="accent-blue-600" />
                </label>

                {/* Cash On Delivery Option */}
                <label 
                  onClick={() => setPaymentMethod('cod')}
                  className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'cod' ? 'border-blue-600 bg-blue-50/50 ' : 'border-slate-200 '
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Truck className="w-5 h-5 text-emerald-600" />
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 ">Cash on Delivery (COD)</h5>
                      <p className="text-[10px] text-slate-500">Pay cash upon parcel delivery</p>
                    </div>
                  </div>
                  <input type="radio" checked={paymentMethod === 'cod'} readOnly className="accent-blue-600" />
                </label>

              </div>

              {/* Order total summary */}
              <div className="p-4 rounded-2xl bg-slate-50  text-xs flex justify-between font-bold">
                <span>Total Amount Payable (incl. GST):</span>
                <span className="text-blue-600  font-heading text-sm">
                  ₹{finalTotal.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setStep('shipping')}
                  className="px-4 py-2.5 rounded-xl border border-slate-200  text-xs font-bold text-slate-600 "
                >
                  Back to Address
                </button>

                <button
                  onClick={handlePlaceOrder}
                  className="px-8 py-3.5 rounded-2xl bg-gradient-orange hover:opacity-95 text-white font-bold text-xs shadow-xl shadow-orange-500/25 transition-transform hover:scale-105"
                >
                  Confirm & Place Order
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Order Confirmation */}
          {step === 'confirmation' && (
            <div className="py-8 text-center space-y-4">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
              <h3 className="text-2xl font-bold font-heading text-slate-900 ">
                Order Confirmed!
              </h3>
              <p className="text-xs text-slate-600  max-w-sm mx-auto">
                Your order ID is <strong className="text-blue-600 font-mono font-bold">{orderId}</strong>. We have dispatched a confirmation SMS & GST invoice to your registered mobile.
              </p>
              <div className="p-4 rounded-2xl bg-slate-50  text-xs space-y-1 text-left max-w-md mx-auto">
                <p className="font-bold text-slate-800 ">Delivery Address:</p>
                <p className="text-slate-500">{shippingData.fullName}, {shippingData.address}, {shippingData.city} - {shippingData.pincode}</p>
                <p className="text-emerald-600 font-semibold pt-1">Estimated Delivery: Within 2-3 Business Days</p>
              </div>
              <button
                onClick={handleClose}
                className="px-8 py-3 rounded-2xl bg-blue-600 text-white font-bold text-xs shadow-md"
              >
                Back to Home Page
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
