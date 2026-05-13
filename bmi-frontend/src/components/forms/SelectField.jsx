import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

const SelectField = forwardRef(({ label, error, options, icon: Icon, required, optional, helperText, disabled, placeholder = 'Pilih...', ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className={`block text-sm font-semibold mb-1.5 ${disabled ? 'text-slate-400' : 'text-bmi-navy'}`}>
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
        
        <select
          ref={ref}
          disabled={disabled}
          className={`
            w-full appearance-none border px-4 py-3 rounded-xl outline-none transition-all duration-200
            ${Icon ? 'pl-12' : ''}
            ${disabled ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed' : 'bg-slate-50 cursor-pointer'}
            ${error 
              ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 bg-red-50/30' 
              : disabled ? '' : 'border-slate-200 focus:border-bmi-blue focus:ring-4 focus:ring-bmi-blue/10 focus:bg-white hover:border-slate-300'
            }
          `}
          {...props}
        >
          <option value="" disabled className="text-slate-400">{placeholder}</option>
          {options.map((opt, idx) => (
            <option key={idx} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
          <ChevronDown size={20} />
        </div>
      </div>

      {helperText && !error && (
        <p className="mt-1.5 text-xs text-slate-500">{helperText}</p>
      )}

      {error && (
        <p className="mt-1.5 text-sm text-red-500 font-medium">{error}</p>
      )}
    </div>
  );
});

SelectField.displayName = 'SelectField';
export default SelectField;
