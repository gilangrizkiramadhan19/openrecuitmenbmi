import { clsx } from 'clsx';
import { AlertCircle, CheckCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useState } from 'react';

/**
 * Alert Component - Display important messages and notifications
 */
export default function Alert({
  type = 'info', // 'info' | 'success' | 'warning' | 'error'
  title,
  message,
  dismissible = true,
  className = '',
  onDismiss,
}) {
  const [visible, setVisible] = useState(true);

  const handleDismiss = () => {
    setVisible(false);
    onDismiss?.();
  };

  if (!visible) return null;

  const typeConfig = {
    info: {
      bg: 'bg-info bg-opacity-10',
      border: 'border-info',
      icon: Info,
      textColor: 'text-info',
      title: 'text-info',
    },
    success: {
      bg: 'bg-success bg-opacity-10',
      border: 'border-success',
      icon: CheckCircle,
      textColor: 'text-success',
      title: 'text-success',
    },
    warning: {
      bg: 'bg-warning bg-opacity-10',
      border: 'border-warning',
      icon: AlertTriangle,
      textColor: 'text-warning',
      title: 'text-warning',
    },
    error: {
      bg: 'bg-error bg-opacity-10',
      border: 'border-error',
      icon: AlertCircle,
      textColor: 'text-error',
      title: 'text-error',
    },
  };

  const config = typeConfig[type];
  const IconComponent = config.icon;

  return (
    <div
      className={clsx(
        'flex gap-3 p-4 rounded-lg border-l-4',
        config.bg,
        config.border,
        className
      )}
      role="alert"
    >
      <IconComponent className={clsx('h-5 w-5 flex-shrink-0 mt-0.5', config.textColor)} />

      <div className="flex-1">
        {title && <h3 className={clsx('font-semibold mb-1', config.title)}>{title}</h3>}
        {message && <p className="text-sm text-neutral-700">{message}</p>}
      </div>

      {dismissible && (
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 text-neutral-400 hover:text-neutral-600 transition-colors"
          aria-label="Dismiss alert"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
