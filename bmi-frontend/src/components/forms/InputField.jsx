import { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const InputField = forwardRef(({ label, error, type = 'text', icon: Icon, required, optional, helperText, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const currentType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-bmi-navy mb-1.5">
          {label} {required && <span className="text-red-500">*</span>}
          {optional && <span className="ml-2 text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium">Opsional</span>}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <Icon size={20} />
          </div>
        )}
        
        <input
          ref={ref}
          type={currentType}
          className={`
            w-full bg-slate-50 border px-4 py-3 rounded-xl outline-none transition-all duration-200
            ${Icon ? 'pl-12' : ''}
            ${error 
              ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 bg-red-50/30' 
              : 'border-slate-200 focus:border-bmi-blue focus:ring-4 focus:ring-bmi-blue/10 focus:bg-white hover:border-slate-300'
            }
          `}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-bmi-navy transition-colors focus:outline-none"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>

      {helperText && !error && (
        <p className="mt-1.5 text-xs text-slate-500">{helperText}</p>
      )}

      {error && (
        <p className="mt-1.5 text-sm text-red-500 font-medium animate-pulse">{error}</p>
      )}
    </div>
  );
});

InputField.displayName = 'InputField';
export default InputField;
