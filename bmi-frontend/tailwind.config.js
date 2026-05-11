/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bmi-navy": "#003366", // Biru Gelap Korporat
        "bmi-blue": "#0056B3", // Biru Aksen Modern
        "bmi-soft": "#F8FAFC", // Background abu-abu sangat muda
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
