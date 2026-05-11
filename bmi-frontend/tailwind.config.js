/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bmi-navy": "#003366", // Deep Navy Blue - Professional Corporate
        "bmi-blue": "#0056B3", // Ocean Blue - Fisheries & Maritime
        "bmi-cyan": "#0EA5E9", // Soft Cyan - Active States & Analytics
        "bmi-soft": "#F4F7FA", // Soft Gray Background
      },
      fontFamily: {
        sans: ["Inter", "Public Sans", "sans-serif"],
      },
      boxShadow: {
        premium:
          "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};
