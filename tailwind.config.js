/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        autoblue: {
          50: '#f0f7ff',
          100: '#e0effe',
          500: '#0284c7',
          600: '#0369a1',
          700: '#075985',
          800: '#0c4a6e',
          900: '#082f49',
        },
        autoamber: {
          500: '#f59e0b',
          600: '#d97706',
        },
        oem: {
          DEFAULT: '#10b981',
          dark: '#047857'
        },
        casse: {
          DEFAULT: '#f97316',
          dark: '#c2410c'
        }
      }
    },
  },
  plugins: [],
}
