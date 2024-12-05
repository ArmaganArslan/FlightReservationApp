/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          600: '#4F46E5', // Book Flight butonu için
          700: '#4338CA', // Hover durumu için
        }
      }
    },
  },
  plugins: [],
} 