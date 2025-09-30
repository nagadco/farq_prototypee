import { useEffect } from 'react';
import { X, CircleCheck as CheckCircle, CircleAlert as AlertCircle, Info } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  type = 'info',
  isVisible,
  onClose,
  duration = 3000
}: ToastProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-600" />,
    error: <AlertCircle className="w-5 h-5 text-red-600" />,
    info: <Info className="w-5 h-5 text-blue-600" />
  };

  const bgColors = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    info: 'bg-blue-50 border-blue-200'
  };

  return (
    <div className="fixed top-24 right-4 z-50 animate-slide-in-right">
      <div
        className={`${bgColors[type]} border rounded-lg shadow-lg p-4 flex items-center gap-3 max-w-md`}
        role="alert"
      >
        {icons[type]}
        <p className="flex-1 text-sm font-medium text-gray-900">{message}</p>
        <button
          onClick={onClose}
          className="p-1 hover:bg-white/50 rounded-full transition-colors"
          aria-label="Close notification"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>
    </div>
  );
}
