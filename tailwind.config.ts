import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'konfio-bg': '#0A0A0F',
        'konfio-card': 'rgba(255,255,255,0.03)',
        'konfio-border': 'rgba(255,255,255,0.06)',
        'konfio-text': '#E8E6E3',
        'konfio-muted': '#636E72',
        'konfio-subtle': '#4A4A5A',
        'konfio-secondary': '#B2BEC3',
        'konfio-purple': '#6C5CE7',
        'konfio-purple-light': '#A29BFE',
        'konfio-green': '#00B894',
        'konfio-orange': '#E17055',
        'konfio-yellow': '#FDCB6E',
        'konfio-blue': '#0984E3',
        'konfio-gray': '#B2BEC3',
        'konfio-card-dark': '#14141F',
        'konfio-scrollbar': '#2D2D3A',
      },
      fontFamily: {
        sans: ["'DM Sans'", "'Segoe UI'", 'sans-serif'],
        mono: ["'Space Mono'", 'monospace'],
      },
      keyframes: {
        slideUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        'slide-up': 'slideUp 0.5s ease',
        'slide-up-slow': 'slideUp 0.6s ease',
        'fade-in': 'fadeIn 0.4s ease',
        'fade-in-fast': 'fadeIn 0.2s ease',
        'slide-up-modal': 'slideUp 0.3s ease',
      },
    },
  },
  plugins: [],
};

export default config;
