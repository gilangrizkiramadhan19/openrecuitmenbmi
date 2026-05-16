import { clsx } from 'clsx';

/**
 * Badge Component - Small label for status and categories
 */
export default function Badge({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
  size = 'md', // 'sm' | 'md' | 'lg'
  outlined = false,
  className = '',
  ...props
}) {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const variantClasses = {
    primary: outlined
      ? 'bg-transparent border border-primary text-primary'
      : 'bg-primary bg-opacity-10 text-primary',
    secondary: outlined
      ? 'bg-transparent border border-neutral-300 text-neutral-700'
      : 'bg-neutral-100 text-neutral-700',
    success: outlined
      ? 'bg-transparent border border-success text-success'
      : 'bg-success bg-opacity-10 text-success',
    warning: outlined
      ? 'bg-transparent border border-warning text-warning'
      : 'bg-warning bg-opacity-10 text-warning',
    error: outlined
      ? 'bg-transparent border border-error text-error'
      : 'bg-error bg-opacity-10 text-error',
    info: outlined
      ? 'bg-transparent border border-info text-info'
      : 'bg-info bg-opacity-10 text-info',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center justify-center font-semibold rounded-full',
        'transition-colors duration-200',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
