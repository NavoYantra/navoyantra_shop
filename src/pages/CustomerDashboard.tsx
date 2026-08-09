import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, Package, Heart, MapPin, Settings, LogOut, 
  ChevronRight, Search, Filter, ShieldCheck, Truck, Star, Loader2
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { getOrdersByEmail } from '../lib/api';
import { PRODUCTS } from '../data/products';

export const CustomerDashboard: React.FC = () => {
  const { user, showToast, setCurrentPage } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'wishlist' | 'addresses' | 'settings'>('overview');
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (user?.email) {
      getOrdersByEmail(user.email).then(data => {
        const formatted = data.map(o => ({
          id: o.tracking_id,
          date: new Date(o.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
          total: o.total_amount,
          status: o.status === 'pending' ? 'Processing' : (o.status.charAt(0).toUpperCase() + o.status.slice(1)),
          trackingId: o.shipping_tracking_id,
          invoiceUrl: o.invoice_url,
          items: o.order_items.map((item: any) => {
            const product = PRODUCTS.find(p => p.id === item.product_id);
            return {
              name: product ? product.name : 'Unknown Product',
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
    }
  }, [user]);

  // Dummy Data for Addresses
  const dummyAddresses = [
    {
      id: 1,
      type: 'Home',
      name: user?.name || 'Customer Name',
      street: '123 Maker Street, Tech Park',
      city: 'New Delhi',
      state: 'Delhi',
      zip: '110001',
      phone: '+91 9876543210',
      isDefault: true
    }
  ];

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
                        orders[0].status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        <Truck className="w-3 h-3 mr-1.5" /> {orders[0].status}
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
                orders.map(order => (
                  <div key={order.id} className="p-6 hover:bg-slate-50 transition-colors">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-bold text-slate-900">Order {order.id}</h4>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mb-4">Placed on {order.date}</p>
                        
                        <div className="space-y-2">
                          {order.items.map((item: any, idx: number) => (
                            <div key={idx} className="flex items-center justify-between text-sm">
                              <div className="flex items-center space-x-2">
                                <span className="w-6 text-slate-400">{item.qty}x</span>
                                <span className="font-medium text-slate-700">{item.name}</span>
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
                        <div className="flex flex-col space-y-2 w-full">
                          {order.trackingId && (
                            <p className="text-[11px] text-slate-500 font-medium mb-1 text-right w-full block">
                              Tracking ID:<br/><span className="text-slate-900 font-bold">{order.trackingId}</span>
                            </p>
                          )}
                          {order.invoiceUrl && (
                            <a href={order.invoiceUrl} target="_blank" rel="noreferrer" className="w-full px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors text-center">
                              Download Invoice
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
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
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center">
            <Heart className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">Your wishlist is syncing</h3>
            <p className="text-slate-500 max-w-sm mx-auto mb-6">We are currently integrating your local wishlist with your account. Check back soon!</p>
            <button 
              onClick={() => setCurrentPage('shop')}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        );

      case 'addresses':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Saved Addresses</h3>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm">
                + Add New Address
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dummyAddresses.map(addr => (
                <div key={addr.id} className="bg-white p-6 rounded-2xl border-2 border-blue-100 shadow-sm relative">
                  {addr.isDefault && (
                    <span className="absolute top-4 right-4 px-2 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold uppercase rounded-md">
                      Default
                    </span>
                  )}
                  <div className="flex items-center space-x-2 mb-3">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <h4 className="font-bold text-slate-900">{addr.type}</h4>
                  </div>
                  <div className="space-y-1 text-sm text-slate-600 mb-4">
                    <p className="font-bold text-slate-900">{addr.name}</p>
                    <p>{addr.street}</p>
                    <p>{addr.city}, {addr.state} - {addr.zip}</p>
                    <p className="pt-2 font-medium">Phone: {addr.phone}</p>
                  </div>
                  <div className="flex items-center space-x-3 pt-4 border-t border-slate-100">
                    <button className="text-sm font-semibold text-blue-600 hover:underline">Edit</button>
                    <button className="text-sm font-semibold text-rose-600 hover:underline">Delete</button>
                  </div>
                </div>
              ))}
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
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-4 text-center relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
              <div className="w-20 h-20 mx-auto rounded-full bg-white border-4 border-white shadow-md flex items-center justify-center text-3xl font-bold text-blue-600 relative z-10">
                {user.name.charAt(0)}
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
