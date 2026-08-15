import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, Package, Heart, MapPin, Settings, LogOut, 
  ChevronRight, Search, Filter, ShieldCheck, Truck, Star, Loader2,
  ChevronDown, ChevronUp, CheckCircle2, Circle, XCircle, Camera, Trash2
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { getOrdersByEmail, updateOrderStatus, uploadAvatar } from '../lib/api';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';

export const CustomerDashboard: React.FC = () => {
  const { user, setUser, showToast, setCurrentPage, wishlist, toggleWishlist, storeProducts } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'wishlist' | 'addresses' | 'settings'>('overview');
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [savedAddress, setSavedAddress] = useState<any>(null);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    
    try {
      setUploadingAvatar(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not logged in');
      
      const publicUrl = await uploadAvatar(file, session.user.id);
      
      // Update local context
      setUser({ ...user, avatar: publicUrl });
      showToast('Profile picture updated successfully', 'success');
      
    } catch (err: any) {
      showToast(err.message, 'warning');
    } finally {
      setUploadingAvatar(false);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('ny_shipping');
    const parsedAddress = saved ? JSON.parse(saved) : null;
    if (parsedAddress) setSavedAddress(parsedAddress);

    const emailToUse = parsedAddress?.email || user?.email;
    
    if (emailToUse) {
      getOrdersByEmail(emailToUse).then(data => {
        const formatted = data.map(o => ({
          dbId: o.id,
          id: o.tracking_id,
          date: new Date(o.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
          total: o.total_amount,
          status: o.status,
          displayStatus: o.status.charAt(0).toUpperCase() + o.status.slice(1),
          trackingId: o.shipping_tracking_id,
          invoiceUrl: o.invoice_url,
          items: o.order_items.map((item: any) => {
            const productStatic = PRODUCTS.find(p => p.id === item.product_id);
            const productDb = storeProducts.find(p => p.id === item.product_id);
            let productName = productDb ? productDb.name : (productStatic ? productStatic.name : (item.products?.name || 'Unknown Product'));
            
            let productSku = item.products?.sku || item.product_id;
            if (productDb) productSku = productDb.sku || productDb.id;
            else if (productStatic) productSku = productStatic.sku || productStatic.id;

            // Fallback for the deleted product (RoboLearn Kit)
            if (productName === 'Unknown Product' && item.product_id && item.product_id.startsWith('fe8f8c84')) {
              productName = 'NavoYantra RoboLearn Kit – DIY STEM Robotics & Electronics Learning Kit';
              productSku = 'NY-RLK-5870';
            }
            
            // Format UUIDs to look like proper SKUs (NY-XXXXXXXX)
            if (productSku && productSku.length > 20) {
              productSku = `NY-${productSku.slice(0, 8).toUpperCase()}`;
            }
            return {
              name: productName,
              sku: productSku,
              qty: item.quantity,
              price: item.price_at_time
            };
          })
        }));
        setOrders(formatted);
      }).catch(err => {
        console.error('Error fetching orders:', err);
      }).finally(() => {
        setLoadingOrders(false);
      });
    } else {
      setLoadingOrders(false);
    }
  }, [user, storeProducts]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      showToast('Logged out successfully', 'info');
      setCurrentPage('home');
    } catch (error: any) {
      showToast(error.message, 'warning');
    }
  };

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <User className="w-16 h-16 text-slate-300 mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Not Logged In</h2>
        <p className="text-slate-500 mb-6 text-center max-w-md">Please sign in to access your dashboard, track orders, and manage your wishlist.</p>
        <button 
          onClick={() => setCurrentPage('home')}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                  <Package className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">{orders.length}</h3>
                <p className="text-sm text-slate-500 font-medium">Total Orders</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">5</h3>
                <p className="text-sm text-slate-500 font-medium">Saved Items</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
                  <Star className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">120</h3>
                <p className="text-sm text-slate-500 font-medium">Reward Points</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Recent Order</h3>
                <button 
                  onClick={() => setActiveTab('orders')}
                  className="text-sm font-semibold text-blue-600 hover:underline flex items-center"
                >
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
              <div className="p-6 bg-slate-50">
                {loadingOrders ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
                  </div>
                ) : orders.length > 0 ? (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Order #{orders[0].id}</p>
                      <p className="text-sm text-slate-700 font-medium">Placed on {orders[0].date}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center ${
                        orders[0].status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        <Truck className="w-3 h-3 mr-1.5" /> {orders[0].displayStatus}
                      </span>
                      {orders[0].trackingId && (
                        <p className="text-xs font-medium text-slate-500">
                          Tracking: <span className="text-slate-900 font-bold">{orders[0].trackingId}</span>
                        </p>
                      )}
                      {orders[0].invoiceUrl && (
                        <a href={orders[0].invoiceUrl} target="_blank" rel="noreferrer" className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm">
                          Invoice
                        </a>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-500 text-sm">No recent orders found.</p>
                )}
              </div>
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="text-lg font-bold text-slate-900">Order History</h3>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="text" placeholder="Search orders..." className="pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm w-48 focus:outline-none focus:border-blue-500" />
                </div>
                <button className="p-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="divide-y divide-slate-100">
              {loadingOrders ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                </div>
              ) : orders.length > 0 ? (
                orders.map(order => {
                  const statuses = ['pending', 'processing', 'shipped', 'delivered'];
                  const currentStatusIndex = statuses.indexOf(order.status);
                  
                  return (
                    <div key={order.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                      <div 
                        className="p-6 cursor-pointer flex flex-col md:flex-row justify-between gap-4"
                        onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                      >
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-bold text-slate-900">Order {order.id}</h4>
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              order.status === 'delivered' ? 'bg-green-100 text-green-700' : 
                              order.status === 'cancelled' ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-700'
                            }`}>
                              {order.displayStatus}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mb-4">Placed on {order.date}</p>
                          
                          <div className="space-y-2">
                            {order.items.map((item: any, idx: number) => (
                              <div key={idx} className="flex items-center justify-between text-sm py-1 border-b border-slate-50 last:border-0">
                                <div className="flex items-start space-x-2">
                                  <span className="w-6 text-slate-400 mt-0.5">{item.qty}x</span>
                                  <div>
                                    <span className="font-medium text-slate-700 block">{item.name}</span>
                                    <span className="text-[10px] text-slate-400 font-mono block">SKU: {item.sku}</span>
                                  </div>
                                </div>
                                <span className="text-slate-600 font-medium">₹{(item.price * item.qty).toLocaleString()}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end justify-between border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 min-w-[150px]">
                          <div className="text-right w-full mb-4 md:mb-0">
                            <p className="text-xs text-slate-500 mb-1">Total Amount</p>
                            <p className="text-xl font-bold text-slate-900">₹{order.total.toLocaleString()}</p>
                          </div>
                          <div className="mt-auto flex items-center text-sm text-blue-600 font-semibold">
                            {expandedOrder === order.id ? 'View Less' : 'View Details'}
                            {expandedOrder === order.id ? <ChevronUp className="w-4 h-4 ml-1"/> : <ChevronDown className="w-4 h-4 ml-1"/>}
                          </div>
                        </div>
                      </div>
                      
                      {expandedOrder === order.id && (
                        <div className="px-6 pb-6 pt-2 bg-slate-50/50">
                          {/* Timeline */}
                          <div className="mb-6 p-4 bg-white rounded-xl border border-slate-200">
                            <h5 className="text-sm font-bold text-slate-900 mb-6">Order Status</h5>
                            {order.status === 'cancelled' ? (
                              <div className="flex items-center text-rose-600 font-bold bg-rose-50 p-4 rounded-xl border border-rose-100">
                                <XCircle className="w-5 h-5 mr-2" />
                                Order was Cancelled
                              </div>
                            ) : (
                              <div className="flex items-center w-full relative">
                                {statuses.map((step, index) => {
                                  const isCompleted = index <= currentStatusIndex;
                                  const isLast = index === statuses.length - 1;
                                  return (
                                    <React.Fragment key={step}>
                                      <div className="flex flex-col items-center relative w-10">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${isCompleted ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-300'}`}>
                                          {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-3 h-3" />}
                                        </div>
                                        <span className={`absolute top-10 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap ${isCompleted ? 'text-blue-700' : 'text-slate-400'}`}>
                                          {step}
                                        </span>
                                      </div>
                                      {!isLast && (
                                        <div className={`flex-1 h-1 mx-2 rounded ${index < currentStatusIndex ? 'bg-blue-600' : 'bg-slate-100'}`}></div>
                                      )}
                                    </React.Fragment>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                          
                          {/* Details like Tracking and Invoice */}
                          {(order.trackingId || order.invoiceUrl) && (
                            <div className="flex flex-wrap gap-4 mb-4">
                                {order.trackingId && (
                                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex-1 min-w-[200px]">
                                    <p className="text-[11px] text-slate-500 font-bold mb-1 uppercase tracking-wider">Tracking ID</p>
                                    <p className="text-base text-slate-900 font-bold">{order.trackingId}</p>
                                  </div>
                                )}
                                {order.invoiceUrl && (
                                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex-1 min-w-[200px] flex items-center justify-center">
                                    <a href={order.invoiceUrl} target="_blank" rel="noreferrer" className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors w-full text-center">
                                      Download Invoice
                                    </a>
                                  </div>
                                )}
                            </div>
                          )}

                          {/* Cancel Button */}
                          {(order.status === 'pending' || order.status === 'processing') && (
                            <div className="flex justify-end mt-4">
                                <button 
                                  onClick={async (e) => {
                                    e.stopPropagation();
                                    if (window.confirm("Are you sure you want to cancel this order?")) {
                                      try {
                                        await updateOrderStatus(order.dbId, 'cancelled');
                                        setOrders(orders.map(o => o.dbId === order.dbId ? { ...o, status: 'cancelled', displayStatus: 'Cancelled' } : o));
                                        showToast('Order cancelled successfully', 'success');
                                      } catch(err) {
                                        showToast('Error cancelling order', 'warning');
                                      }
                                    }
                                  }}
                                  className="px-4 py-2 bg-white border border-rose-200 text-rose-600 text-sm font-bold rounded-lg hover:bg-rose-50 transition-colors"
                                >
                                  Cancel Order
                                </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="p-12 text-center text-slate-500">
                  <Package className="w-12 h-12 mx-auto text-slate-300 mb-4" />
                  <p>You haven't placed any orders yet.</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'wishlist':
        return (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Your Wishlist</h3>
            {wishlist.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.map((wishlistItem: any) => {
                  const product = wishlistItem.product || wishlistItem;
                  return (
                    <div key={product.id} className="relative group">
                      <ProductCard product={product} />
                      <button 
                        onClick={() => toggleWishlist(product)}
                        className="absolute -top-3 -right-3 w-10 h-10 bg-white border border-rose-200 text-rose-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-rose-500 hover:text-white hover:border-rose-500 shadow-xl z-40 transform hover:scale-110"
                        title="Remove from Wishlist"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-12 text-center text-slate-500 border border-dashed border-slate-300 rounded-xl">
                <Heart className="w-12 h-12 mx-auto text-slate-300 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">Your wishlist is empty</h3>
                <p className="mb-6 max-w-md mx-auto">Explore our products and save your favorites here.</p>
                <button onClick={() => setCurrentPage('shop')} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                  Explore Products
                </button>
              </div>
            )}
          </div>
        );

      case 'addresses':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Saved Addresses</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedAddress ? (
                <div className="border-2 border-blue-600 rounded-xl p-5 relative bg-white">
                  <div className="absolute top-4 right-4"><span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">CHECKOUT ADDRESS</span></div>
                  <div className="flex items-center space-x-2 mb-3">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <h4 className="font-bold text-slate-900">Primary</h4>
                  </div>
                  <p className="text-sm font-bold text-slate-900 mb-1">{savedAddress.fullName}</p>
                  <p className="text-sm text-slate-600 mb-1">{savedAddress.address}</p>
                  {savedAddress.landmark && <p className="text-sm text-slate-600 mb-1">{savedAddress.landmark}</p>}
                  <p className="text-sm text-slate-600 mb-3">{savedAddress.city}, {savedAddress.state} - {savedAddress.pincode}</p>
                  <p className="text-sm text-slate-600 mb-4">Phone: {savedAddress.phone}</p>
                  <p className="text-sm text-slate-600 mb-4">Email: {savedAddress.email}</p>
                </div>
              ) : (
                <div className="col-span-full text-center py-12 border border-dashed border-slate-300 rounded-xl">
                  <MapPin className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">No checkout address saved yet.</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Account Settings</h3>
              <p className="text-sm text-slate-500">Manage your personal information and security.</p>
            </div>
            <div className="p-6 max-w-2xl space-y-6">
              <div className="space-y-4">
                <h4 className="font-bold text-slate-900 flex items-center">
                  <User className="w-4 h-4 mr-2 text-slate-400" /> Personal Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Full Name</label>
                    <input type="text" defaultValue={user.name} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email Address</label>
                    <input type="email" defaultValue={user.email} disabled className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm font-medium text-slate-500 cursor-not-allowed" />
                  </div>
                </div>
                <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition-colors">
                  Save Changes
                </button>
              </div>

              <hr className="border-slate-100" />

              <div className="space-y-4">
                <h4 className="font-bold text-slate-900 flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-2 text-slate-400" /> Security
                </h4>
                <div>
                  <button className="px-4 py-2 border border-slate-200 text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors">
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-4 text-center relative overflow-hidden group">
              <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
              
              <div className="relative w-24 h-24 mx-auto mt-2">
                <div className="w-full h-full rounded-full bg-white border-4 border-white shadow-md flex items-center justify-center text-4xl font-bold text-blue-600 overflow-hidden z-10 relative">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    user.name.charAt(0)
                  )}
                </div>
                
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingAvatar}
                  className="absolute bottom-0 right-0 z-20 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-50"
                >
                  {uploadingAvatar ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleAvatarUpload} 
                  accept="image/*" 
                  className="hidden" 
                />
              </div>
              
              <h2 className="mt-4 text-lg font-bold text-slate-900 truncate">{user.name}</h2>
              <p className="text-xs text-slate-500 truncate">{user.email}</p>
            </div>

            <nav className="bg-white rounded-2xl border border-slate-200 shadow-sm p-2 space-y-1">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  activeTab === 'overview' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Overview</span>
              </button>
              <button 
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  activeTab === 'orders' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>My Orders</span>
              </button>
              <button 
                onClick={() => setActiveTab('wishlist')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  activeTab === 'wishlist' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Heart className="w-4 h-4" />
                <span>Wishlist</span>
              </button>
              <button 
                onClick={() => setActiveTab('addresses')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  activeTab === 'addresses' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>Saved Addresses</span>
              </button>
              <button 
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  activeTab === 'settings' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Account Settings</span>
              </button>
              
              <div className="pt-4 mt-2 border-t border-slate-100">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {renderTabContent()}
          </div>

        </div>
      </div>
    </div>
  );
};
