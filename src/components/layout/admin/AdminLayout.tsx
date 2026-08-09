import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAdminStore } from '../../../store/adminStore';
import { useAdminAuthStore } from '../../../store/adminAuthStore';
import { 
  LayoutDashboard, Package, Boxes, 
  Settings, Image as ImageIcon, Bell, Search,
  ChevronDown, ChevronRight, LogOut
} from 'lucide-react';
import { cn } from '../../../lib/utils';

export const AdminLayout: React.FC = () => {
  const { isSidebarOpen } = useAdminStore();
  const { user, adminUser, signOut } = useAdminAuthStore();
  const location = useLocation();

  const [expandedMenus, setExpandedMenus] = React.useState<Record<string, boolean>>({
    'Products': true
  });

  const toggleMenu = (name: string) => {
    setExpandedMenus(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
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
    { name: 'Media Library', path: '/admin/media', icon: ImageIcon },
  ];

  if (adminUser?.role === 'Super Admin') {
    navItems.push({ name: 'Settings', path: '/admin/settings', icon: Settings });
  }

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
                        const isActive = location.pathname === child.path;
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
            <button className="relative p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="relative group">
              <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center cursor-pointer border border-blue-200">
                {user?.email?.[0].toUpperCase() || 'AD'}
              </div>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all z-50">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-sm font-medium text-slate-900 truncate">{user?.email}</p>
                  <p className="text-xs text-slate-500">Administrator</p>
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
