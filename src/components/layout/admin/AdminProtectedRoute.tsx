import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAdminAuthStore } from '../../../store/adminAuthStore';
import { LoadingSpinner } from '../../common/LoadingSpinner';

export const AdminProtectedRoute: React.FC = () => {
  const { user, isLoading, initialize } = useAdminAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

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

  return <Outlet />;
};
