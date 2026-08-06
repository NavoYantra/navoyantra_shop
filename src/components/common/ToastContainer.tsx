import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 space-y-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`pointer-events-auto p-4 rounded-2xl shadow-2xl border flex items-center justify-between space-x-3 transition-all duration-300 animate-in slide-in-from-bottom-2 backdrop-blur-md ${
            toast.type === 'success'
              ? 'bg-slate-900/95 text-white border-emerald-500/50'
              : toast.type === 'warning'
              ? 'bg-amber-900/95 text-white border-amber-500/50'
              : 'bg-slate-900/95 text-white border-blue-500/50'
          }`}
        >
          <div className="flex items-center space-x-3">
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
            {toast.type === 'warning' && <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-blue-400 shrink-0" />}
            <span className="text-xs font-semibold leading-snug">{toast.message}</span>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="p-1 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
