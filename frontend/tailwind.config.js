/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        novel: ['Dancing Script', 'cursive'],
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "fade-in": "fadeIn 0.5s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'paper-texture': 'linear-gradient(0deg, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
      },
      colors: {
        'vintage': {
          50: '#f5e6d3',
          100: '#e6d5c3',
          200: '#d4c1ac',
          300: '#c3ae96',
          400: '#b19a7f',
          500: '#a08669',
          600: '#8f7252',
          700: '#7e5e3c',
          800: '#6d4a25',
          900: '#5c360f',
        },
      },
      spacing: {
        '128': '32rem',
      },
      minHeight: {
        'editor': '500px',
      },
    },
  },
  plugins: [],
}