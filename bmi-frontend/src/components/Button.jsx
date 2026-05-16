import { clsx } from 'clsx';

/**
 * Button Component - Premium, reusable button with multiple variants and sizes
 * 
 * Variants:
 * - primary: Navy blue, full color background
 * - secondary: Light gray background
 * - outline: Navy border with transparent background
 * - ghost: Transparent with text color
 * - danger: Red for destructive actions
 * - success: Green for positive actions
 * 
 * Sizes:
 * - sm: Small, compact buttons
 * - md: Medium, default size
 * - lg: Large, prominent buttons
 * - xl: Extra large, for CTAs
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  isLoading = false,
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  ...props
}) {
  const baseClass = clsx(
    'font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2',
    'focus-visible:outline-2 focus-visible:outline-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'btn-ripple',
    fullWidth && 'w-full'
  );

  const variantClasses = {
    primary: clsx(
      'bg-primary hover:bg-primary-600 text-white focus-visible:outline-primary',
      'shadow-base hover:shadow-lg active:shadow-md active:scale-95'
    ),
    secondary: clsx(
      'bg-neutral-100 hover:bg-neutral-200 text-neutral-900 focus-visible:outline-primary',
      'shadow-sm hover:shadow-base active:scale-95'
    ),
    outline: clsx(
      'border-2 border-primary text-primary hover:bg-primary hover:text-white focus-visible:outline-primary',
      'transition-colors active:scale-95'
    ),
    ghost: clsx(
      'text-primary hover:bg-primary hover:bg-opacity-10 focus-visible:outline-primary',
      'active:scale-95'
    ),
    danger: clsx(
      'bg-error hover:bg-red-600 text-white focus-visible:outline-error',
      'shadow-base hover:shadow-lg active:shadow-md active:scale-95'
    ),
    success: clsx(
      'bg-success hover:bg-green-600 text-white focus-visible:outline-success',
      'shadow-base hover:shadow-lg active:shadow-md active:scale-95'
    ),
    warning: clsx(
      'bg-warning hover:bg-amber-500 text-white focus-visible:outline-warning',
      'shadow-base hover:shadow-lg active:shadow-md active:scale-95'
    ),
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={clsx(
        baseClass,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="h-5 w-5" />}
          {children}
          {Icon && iconPosition === 'right' && <Icon className="h-5 w-5" />}
        </>
      )}
    </button>
  );
}
