/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0B192C',
          navy: '#1E3E62',
          accent: '#00B4D8',
          teal: '#06D6A0',
          warning: '#FFB703',
          danger: '#E63946',
          bg: '#F8FAFC',
          card: '#FFFFFF'
        }
      }
    },
  },
  plugins: [],
}
