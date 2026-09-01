import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = usePortfolio();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none px-4">
      {toasts.map((toast) => {
        const getIcon = () => {
          switch (toast.type) {
            case 'success':
              return <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />;
            case 'error':
              return <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />;
            case 'warning':
              return <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />;
            default:
              return <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />;
          }
        };

        const getBorderColor = () => {
          switch (toast.type) {
            case 'success':
              return 'border-emerald-200 dark:border-emerald-500/30 bg-emerald-50/95 dark:bg-emerald-950/40 text-emerald-900 dark:text-white';
            case 'error':
              return 'border-rose-200 dark:border-rose-500/30 bg-rose-50/95 dark:bg-rose-950/40 text-rose-900 dark:text-white';
            case 'warning':
              return 'border-amber-200 dark:border-amber-500/30 bg-amber-50/95 dark:bg-amber-950/40 text-amber-900 dark:text-white';
            default:
              return 'border-blue-200 dark:border-blue-500/30 bg-blue-50/95 dark:bg-blue-950/40 text-blue-900 dark:text-white';
          }
        };

        return (
          <div
            key={toast.id}
            id={`toast-${toast.id}`}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl backdrop-blur-xl border shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-5 ${getBorderColor()}`}
          >
            {getIcon()}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold tracking-wide">{toast.title}</h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors p-1 -mr-1 -mt-1 rounded-md cursor-pointer"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
