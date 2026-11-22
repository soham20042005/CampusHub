/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          500: '#0284c7',
          600: '#0369a1',
          700: '#075985',
          800: '#0c4a6e',
          900: '#0a3651',
          950: '#031b2a',
        },
        navy: {
          800: '#0f172a',
          900: '#0b1120',
          950: '#070a14',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
