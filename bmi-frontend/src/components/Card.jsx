import { clsx } from 'clsx';

/**
 * Card Component - Generic container with consistent styling
 * Base component for all card layouts
 */
export default function Card({
  children,
  className = '',
  hoverable = false,
  noBorder = false,
  variant = 'default', // 'default' | 'glass' | 'outlined'
  padding = 'md',
  ...props
}) {
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const variantClasses = {
    default: 'bg-white border border-neutral-200 shadow-base',
    glass: 'glass',
    outlined: 'bg-transparent border-2 border-neutral-200',
  };

  return (
    <div
      className={clsx(
        'rounded-lg transition-all duration-300',
        paddingClasses[padding],
        !noBorder && variantClasses[variant],
        hoverable && 'hover:shadow-lg hover:-translate-y-1 cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
