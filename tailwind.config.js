/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'pastel-purple': '#E6E6FA',
        'pastel-pink': '#FFE4E1',
        'pastel-blue': '#E0FFFF',
        'warm-gray': {
          800: '#3D3B3B',
          700: '#4A4646',
          600: '#575151'
        }
      },
      keyframes: {
        slidePattern: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '40px 40px' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        slideInDown: {
          '0%': { transform: 'translateY(-100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        }
      },
      animation: {
        slidePattern: 'slidePattern 10s linear infinite',
        'spin-slow': 'spin-slow 4s linear infinite',
        slideInDown: 'slideInDown 0.5s ease-out 0.75s both'
      },
    },
  },
  plugins: [],
};