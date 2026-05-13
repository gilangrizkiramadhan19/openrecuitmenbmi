import { forwardRef } from 'react';

const TextAreaField = forwardRef(({ label, error, required, optional, helperText, rows = 3, ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-bmi-navy mb-1.5">
          {label} {required && <span className="text-red-500">*</span>}
          {optional && <span className="ml-2 text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium">Opsional</span>}
        </label>
      )}
      
      <textarea
        ref={ref}
        rows={rows}
        className={`
          w-full bg-slate-50 border px-4 py-3 rounded-xl outline-none transition-all duration-200 resize-y
          ${error 
            ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 bg-red-50/30' 
            : 'border-slate-200 focus:border-bmi-blue focus:ring-4 focus:ring-bmi-blue/10 focus:bg-white hover:border-slate-300'
          }
        `}
        {...props}
      />

      {helperText && !error && (
        <p className="mt-1.5 text-xs text-slate-500">{helperText}</p>
      )}

      {error && (
        <p className="mt-1.5 text-sm text-red-500 font-medium">{error}</p>
      )}
    </div>
  );
});

TextAreaField.displayName = 'TextAreaField';
export default TextAreaField;
