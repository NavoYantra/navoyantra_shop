import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from './components/layout/admin/AdminLayout';
import { Suspense, lazy } from 'react';
import { LoadingSpinner } from './components/common/LoadingSpinner';

import { AdminProtectedRoute } from './components/layout/admin/AdminProtectedRoute';

const AdminDashboardHome = lazy(() => import('./pages/admin/AdminDashboard').then(m => ({ default: m.AdminDashboardHome })));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin').then(m => ({ default: m.AdminLogin })));
const AdminProductList = lazy(() => import('./pages/admin/AdminProductList').then(m => ({ default: m.AdminProductList })));
const AdminProductForm = lazy(() => import('./pages/admin/AdminProductForm').then(m => ({ default: m.AdminProductForm })));
const AdminInventory = lazy(() => import('./pages/admin/AdminInventory').then(m => ({ default: m.AdminInventory })));
const AdminCategories = lazy(() => import('./pages/admin/AdminCategories').then(m => ({ default: m.AdminCategories })));
const AdminBrands = lazy(() => import('./pages/admin/AdminBrands').then(m => ({ default: m.AdminBrands })));
const AdminMediaLibrary = lazy(() => import('./pages/admin/AdminMediaLibrary').then(m => ({ default: m.AdminMediaLibrary })));
const AdminReviews = lazy(() => import('./pages/admin/AdminReviews').then(m => ({ default: m.AdminReviews })));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings').then(m => ({ default: m.AdminSettings })));
const AdminCoupons = lazy(() => import('./pages/admin/AdminCoupons').then(m => ({ default: m.AdminCoupons })));
const AdminTags = lazy(() => import('./pages/admin/AdminTags').then(m => ({ default: m.AdminTags })));
const AdminOrders = lazy(() => import('./pages/admin/AdminOrders').then(m => ({ default: m.AdminOrders })));
const AdminBlogs = lazy(() => import('./pages/admin/AdminBlogs').then(m => ({ default: m.AdminBlogs })));
const AdminBlogReviews = lazy(() => import('./pages/admin/AdminBlogReviews').then(m => ({ default: m.AdminBlogReviews })));

export const AdminApp: React.FC = () => {
  return (
    <Suspense fallback={<div className="h-full w-full flex items-center justify-center"><LoadingSpinner /></div>}>
      <Routes>
        <Route path="login" element={<AdminLogin />} />
        <Route element={<AdminProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboardHome />} />
            <Route path="products" element={<AdminProductList />} />
            <Route path="products/new" element={<AdminProductForm />} />
            <Route path="products/:id/edit" element={<AdminProductForm />} />
            <Route path="inventory" element={<AdminInventory />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="brands" element={<AdminBrands />} />
            <Route path="tags" element={<AdminTags />} />
            <Route path="media" element={<AdminMediaLibrary />} />
            <Route path="reviews" element={<AdminReviews />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="coupons" element={<AdminCoupons />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="blogs" element={<AdminBlogs />} />
            <Route path="blogs/reviews" element={<AdminBlogReviews />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </Suspense>
  );
};
