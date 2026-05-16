/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bmi-navy": "#003366",
        "bmi-blue": "#0056B3",
        "bmi-cyan": "#0EA5E9",
        "bmi-soft": "#F4F7FA",
      },
      fontFamily: {
        sans: ["Inter", "Public Sans", "sans-serif"],
      },
      boxShadow: {
        premium:
          "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
        card: "0 4px 12px rgba(0,0,0,0.06)",
        "card-hover": "0 16px 40px rgba(0,56,150,0.12)",
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
      },
      animation: {
        shimmer: 'shimmer 1.8s infinite linear',
        float: 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
