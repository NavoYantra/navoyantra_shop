import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAdminStore } from '../../../store/adminStore';
import { useAdminAuthStore } from '../../../store/adminAuthStore';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getNotifications, markNotificationRead } from '../../../lib/api';
import { 
  LayoutDashboard, Package, Boxes, 
  Settings, Image as ImageIcon, Bell, Search,
  ChevronDown, ChevronRight, LogOut, ShoppingCart, FileText
} from 'lucide-react';
import { cn } from '../../../lib/utils';

export const AdminLayout: React.FC = () => {
  const { isSidebarOpen } = useAdminStore();
  const { user, adminUser, signOut } = useAdminAuthStore();
  const location = useLocation();

  const [expandedMenus, setExpandedMenus] = React.useState<Record<string, boolean>>({
    'Products': true,
    'Orders': true
  });

  const toggleMenu = (name: string) => {
    setExpandedMenus(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { 
      name: 'Orders', 
      icon: ShoppingCart,
      children: [
        { name: 'All Orders', path: '/admin/orders' },
        { name: 'Pending', path: '/admin/orders?status=pending' },
        { name: 'Processing', path: '/admin/orders?status=processing' },
        { name: 'Shipped', path: '/admin/orders?status=shipped' },
        { name: 'Delivered', path: '/admin/orders?status=delivered' },
        { name: 'Cancelled', path: '/admin/orders?status=cancelled' },
      ]
    },
    { 
      name: 'Products', 
      icon: Package, 
      children: [
        { name: 'All Products', path: '/admin/products' },
        { name: 'Add New', path: '/admin/products/new' },
        { name: 'Categories', path: '/admin/categories' },
        { name: 'Brands', path: '/admin/brands' },
        { name: 'Tags', path: '/admin/tags' },
        { name: 'Reviews', path: '/admin/reviews' },
        { name: 'Coupons & Offers', path: '/admin/coupons' },
      ]
    },
    { name: 'Inventory', path: '/admin/inventory', icon: Boxes },
    { 
      name: 'Blogs', 
      icon: FileText,
      children: [
        { name: 'All Blogs', path: '/admin/blogs' },
        { name: 'Reviews', path: '/admin/blogs/reviews' },
        { name: 'Categories', path: '/admin/blogs/categories' },
        { name: 'Tags', path: '/admin/blogs/tags' },
      ]
    },
    { name: 'Media Library', path: '/admin/media', icon: ImageIcon },
  ];

  if (adminUser?.role === 'Super Admin') {
    navItems.push({ name: 'Settings', path: '/admin/settings', icon: Settings });
  }

  // Fetch notifications
  const queryClient = useQueryClient();
  const { data: notifications = [] } = useQuery({ queryKey: ['notifications'], queryFn: getNotifications });
  
  const markAsReadMutation = useMutation({
    mutationFn: (id: string) => markNotificationRead(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] })
  });

  const unreadCount = notifications.filter((n: any) => !n.is_read).length;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className={cn(
        "bg-white border-r border-slate-200 flex flex-col transition-all duration-300",
        isSidebarOpen ? "w-64" : "w-20"
      )}>
        <div className="h-16 flex items-center justify-center border-b border-slate-200">
          {isSidebarOpen ? (
            <span className="text-xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">N</div>
              <span>NavoAdmin</span>
            </span>
          ) : (
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">N</div>
          )}
        </div>
        
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            if (item.children) {
              const isChildActive = item.children.some(child => location.pathname === child.path);
              const isExpanded = expandedMenus[item.name];

              return (
                <div key={item.name} className="space-y-1">
                  <button
                    onClick={() => {
                      if (!isSidebarOpen) {
                        // If sidebar is closed, maybe we open it or navigate to the first child
                      }
                      toggleMenu(item.name);
                    }}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      isChildActive && !isExpanded
                        ? "bg-blue-50 text-blue-700"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    )}
                    title={!isSidebarOpen ? item.name : undefined}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className={cn("flex-shrink-0", isChildActive ? "text-blue-700" : "text-slate-400")} size={20} />
                      {isSidebarOpen && <span>{item.name}</span>}
                    </div>
                    {isSidebarOpen && (
                      isExpanded ? <ChevronDown size={16} className="text-slate-400" /> : <ChevronRight size={16} className="text-slate-400" />
                    )}
                  </button>
                  
                  {isSidebarOpen && isExpanded && (
                    <div className="pl-9 space-y-1 mt-1">
                      {item.children.map(child => {
                        const childPath = child.path.split('?')[0];
                        const childSearch = child.path.includes('?') ? child.path.substring(child.path.indexOf('?')) : '';
                        const isActive = location.pathname === childPath && location.search === childSearch;
                        return (
                          <Link
                            key={child.name}
                            to={child.path}
                            className={cn(
                              "block px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                              isActive
                                ? "bg-blue-50 text-blue-700"
                                : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                            )}
                          >
                            {child.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            // Regular items without children
            const isActive = location.pathname === item.path || 
                             (item.path !== '/admin' && location.pathname.startsWith(item.path));
            
            return (
              <Link
                key={item.name}
                to={item.path!}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-blue-50 text-blue-700" 
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                )}
                title={!isSidebarOpen ? item.name : undefined}
              >
                <item.icon className={cn("flex-shrink-0", isActive ? "text-blue-700" : "text-slate-400")} size={20} />
                {isSidebarOpen && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative max-w-md w-full hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent rounded-lg text-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Notifications Dropdown */}
            <div className="relative group/notif">
              <button className="relative p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
                )}
              </button>
              
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-200 py-2 opacity-0 group-hover/notif:opacity-100 pointer-events-none group-hover/notif:pointer-events-auto transition-all z-50">
                <div className="px-4 pb-2 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="text-sm font-semibold text-slate-900">Notifications</h3>
                  {unreadCount > 0 && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{unreadCount} New</span>}
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="px-4 py-6 text-center text-sm text-slate-500">No notifications yet</div>
                  ) : (
                    notifications.map((notif: any) => (
                      <Link 
                        key={notif.id}
                        to={notif.action_link || '#'}
                        onClick={() => !notif.is_read && markAsReadMutation.mutate(notif.id)}
                        className={cn(
                          "block px-4 py-3 hover:bg-slate-50 border-b border-slate-50 last:border-0 transition-colors",
                          !notif.is_read ? "bg-blue-50/30" : ""
                        )}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <p className={cn("text-sm font-medium", !notif.is_read ? "text-slate-900" : "text-slate-600")}>{notif.title}</p>
                          {!notif.is_read && <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0"></span>}
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-2">{notif.message}</p>
                        <p className="text-[10px] text-slate-400 mt-1">{new Date(notif.created_at).toLocaleString()}</p>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center cursor-pointer border border-blue-200 overflow-hidden">
                {adminUser?.avatar_url ? (
                  <img src={adminUser.avatar_url} alt={adminUser.name} className="w-full h-full object-cover" />
                ) : (
                  user?.email?.[0].toUpperCase() || 'AD'
                )}
              </div>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all z-50">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-sm font-medium text-slate-900 truncate">{adminUser?.name || user?.email}</p>
                  <p className="text-xs text-slate-500">{adminUser?.role || 'Administrator'}</p>
                </div>
                <button
                  onClick={() => signOut()}
                  className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 flex items-center space-x-2"
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
