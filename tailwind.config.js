/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './studio.html',
    './index.tsx',
    './App.tsx',
    './{components,pages,lib,content}/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#7c3aed',
        'primary-light': '#8b5cf6',
        'primary-dark': '#6d28d9',
        'accent': '#0891b2',
        'accent-light': '#06b6d4',
        'accent-pink': '#db2777',
        'surface': '#ffffff',
        'surface-secondary': '#f8fafc',
        'surface-tertiary': '#f1f5f9',
        'text-primary': '#0f172a',
        'text-secondary': '#475569',
        'text-muted': '#94a3b8',
        'border': '#e2e8f0',
        'border-light': '#f1f5f9',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      animation: {
        'gradient': 'gradient 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
