/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors
        "primary": {
          50: "#f0f4f9",
          100: "#e1e9f3",
          200: "#c3d3e7",
          300: "#a5bcd1",
          400: "#5e8ab8",
          500: "#0056B3", // Main brand blue
          600: "#004099",
          700: "#002d6f",
          800: "#001a45",
          900: "#000d23",
        },
        // Secondary Navy
        "navy": {
          50: "#f0f3f7",
          100: "#e1e7ef",
          200: "#c3cfe0",
          300: "#a5b7d0",
          400: "#5e7fab",
          500: "#003366", // Navy base
          600: "#002d4f",
          700: "#002140",
          800: "#001530",
          900: "#000921",
        },
        // Accent Cyan
        "cyan": {
          50: "#f0fdfb",
          100: "#e0fdf8",
          200: "#c1faf2",
          300: "#a2f7ec",
          400: "#48f0e6",
          500: "#0EA5E9", // Accent cyan
          600: "#0a8cc4",
          700: "#067399",
          800: "#025a6e",
          900: "#014246",
        },
        // Neutral Grays
        "neutral": {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
        // Semantic colors
        "success": "#10b981",
        "warning": "#f59e0b",
        "error": "#ef4444",
        "info": "#0ea5e9",
        
        // Legacy BMI colors (for backward compatibility)
        "bmi-navy": "#003366",
        "bmi-blue": "#0056B3",
        "bmi-cyan": "#0EA5E9",
        "bmi-soft": "#F4F7FA",
      },
      fontFamily: {
        sans: ["Inter", "Public Sans", "sans-serif"],
      },
      fontSize: {
        // Premium typography scale
        "xs": ["12px", { lineHeight: "1.5" }],
        "sm": ["14px", { lineHeight: "1.6" }],
        "base": ["16px", { lineHeight: "1.6" }],
        "lg": ["18px", { lineHeight: "1.7" }],
        "xl": ["20px", { lineHeight: "1.7" }],
        "2xl": ["24px", { lineHeight: "1.35" }],
        "3xl": ["30px", { lineHeight: "1.35" }],
        "4xl": ["36px", { lineHeight: "1.1" }],
        "5xl": ["48px", { lineHeight: "1.1" }],
        "6xl": ["60px", { lineHeight: "1" }],
      },
      boxShadow: {
        // Premium shadow system
        "none": "none",
        "xs": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        "sm": "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        "base": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "md": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        "lg": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        
        "premium": "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
        "card": "0 4px 12px rgba(0,0,0,0.06)",
        "card-hover": "0 16px 40px rgba(0,56,150,0.12)",
        "elevated": "0 20px 40px rgba(0, 0, 0, 0.08)",
        "glass": "0 8px 32px rgba(31, 41, 55, 0.1)",
      },
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
      borderRadius: {
        xs: "4px",
        sm: "6px",
        base: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "32px",
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        "2xl": "32px",
        "3xl": "48px",
        "4xl": "64px",
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.8s infinite linear',
        float: 'float 3s ease-in-out infinite',
        slideIn: 'slideIn 0.3s ease-out',
        slideInRight: 'slideInRight 0.3s ease-out',
        slideDown: 'slideDown 0.3s ease-out',
        fadeIn: 'fadeIn 0.3s ease-out',
        scaleIn: 'scaleIn 0.3s ease-out',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      transitionDuration: {
        fast: '150ms',
        normal: '300ms',
        slow: '500ms',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
        ease: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};
