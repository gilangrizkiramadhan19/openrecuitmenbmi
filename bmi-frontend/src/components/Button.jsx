export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  ...props
}) {
  const baseClass = 'font-medium rounded-lg transition duration-200 flex items-center justify-center gap-2';

  const variantClasses = {
    primary: 'bg-bmi-navy text-white hover:bg-bmi-blue disabled:bg-slate-400',
    secondary: 'bg-slate-200 text-slate-900 hover:bg-slate-300 disabled:bg-slate-300',
    outline: 'border-2 border-bmi-navy text-bmi-navy hover:bg-bmi-soft disabled:border-slate-400 disabled:text-slate-400',
    ghost: 'text-bmi-navy hover:bg-bmi-soft disabled:text-slate-400',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseClass} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
