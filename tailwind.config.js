/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
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
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
