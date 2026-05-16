import { clsx } from 'clsx';

/**
 * LoadingSpinner Component - Smooth loading indicator
 */
export default function LoadingSpinner({
  size = 'md', // 'sm' | 'md' | 'lg'
  color = 'primary',
  fullScreen = false,
  text = null,
  className = '',
}) {
  const sizeClasses = {
    sm: 'h-6 w-6 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-3',
  };

  const colorClasses = {
    primary: 'border-primary border-t-primary/30',
    white: 'border-white border-t-white/30',
    navy: 'border-navy border-t-navy/30',
  };

  const spinnerContent = (
    <div className="flex flex-col items-center gap-3">
      <div
        className={clsx(
          'rounded-full animate-spin',
          sizeClasses[size],
          colorClasses[color],
          'border-t-transparent'
        )}
      />
      {text && <p className="text-sm font-medium text-neutral-600">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
        {spinnerContent}
      </div>
    );
  }

  return (
    <div className={clsx('flex justify-center items-center', className)}>
      {spinnerContent}
    </div>
  );
}
