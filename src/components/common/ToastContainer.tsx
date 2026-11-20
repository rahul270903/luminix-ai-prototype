import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none">
      {toasts.map(toast => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-teal shrink-0" />,
          warning: <AlertTriangle className="w-5 h-5 text-amber shrink-0" />,
          error: <AlertCircle className="w-5 h-5 text-rose shrink-0" />,
          info: <Info className="w-5 h-5 text-primary shrink-0" />
        };

        const bg = {
          success: 'bg-white border-teal/40',
          warning: 'bg-white border-amber/40',
          error: 'bg-white border-rose/40',
          info: 'bg-white border-primary/40'
        }[toast.type];

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start justify-between gap-3 p-3.5 rounded-lg shadow-lg border text-sm text-navy-900 transition-all transform translate-y-0 ${bg}`}
          >
            <div className="flex items-start gap-2.5">
              {icons[toast.type]}
              <div className="leading-snug">{toast.message}</div>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-slate-400 hover:text-navy-900 p-0.5 rounded transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
