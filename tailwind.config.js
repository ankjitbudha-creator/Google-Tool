/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366f1', // indigo-500
          hover: '#4f46e5',   // indigo-600
        },
        accent: {
          DEFAULT: '#f59e0b', // amber-500
          hover: '#d97706',   // amber-600
        },
        secondary: '#1e293b', // slate-800
        light: '#f8fafc',     // slate-50
        dark: '#0f172a',      // slate-900
        'brand-yellow': '#fbbf24' // amber-400
      },
      animation: {
          'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          'float': 'float 6s ease-in-out infinite',
          'float-delay-1': 'float 7s ease-in-out infinite 0.5s',
          'float-delay-2': 'float 8s ease-in-out infinite 1s',
          'shake': 'shake 0.5s ease-in-out',
          'fade-in': 'fadeIn 0.3s ease-in-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        shake: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
