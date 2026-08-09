import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAdminAuthStore } from '../../../store/adminAuthStore';
import { LoadingSpinner } from '../../common/LoadingSpinner';

export const AdminProtectedRoute: React.FC = () => {
  const { user, adminUser, isLoading, initialize, signOut } = useAdminAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    // If user is logged in via Supabase but doesn't exist in admin_users table
    if (user && !adminUser && !isLoading) {
      signOut();
    }
  }, [user, adminUser, isLoading, signOut]);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-50">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (user && !adminUser && !isLoading) {
    return <Navigate to="/admin/login?error=unauthorized" replace />;
  }

  return <Outlet />;
};
