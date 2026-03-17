import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Nature-inspired palette
        forest: {
          50:  '#f0f7f0',
          100: '#dceddc',
          200: '#bbd9bb',
          300: '#8fbe8f',
          400: '#5e9d5e',
          500: '#3d7d3d',
          600: '#2d632d',
          700: '#254f25',
          800: '#1f3f1f',
          900: '#1a341a',
          950: '#0d1f0d',
        },
        earth: {
          50:  '#faf6f0',
          100: '#f2eadc',
          200: '#e4d2b8',
          300: '#d4b58d',
          400: '#c09060',
          500: '#b07840',
          600: '#966535',
          700: '#7c502d',
          800: '#664229',
          900: '#553826',
          950: '#2d1b11',
        },
        amber: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        moss: {
          50:  '#f5f7f0',
          100: '#e8eddc',
          200: '#d1dbb9',
          300: '#b3c38e',
          400: '#8fa866',
          500: '#728c47',
          600: '#5a7036',
          700: '#47592c',
          800: '#3b4826',
          900: '#333e22',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'inherit',
            a: {
              color: '#2d632d',
              '&:hover': { color: '#3d7d3d' },
            },
            h1: { color: 'inherit', fontFamily: 'var(--font-playfair)' },
            h2: { color: 'inherit', fontFamily: 'var(--font-playfair)' },
            h3: { color: 'inherit', fontFamily: 'var(--font-playfair)' },
          },
        },
      },
    },
  },
  plugins: [],
}

export default config
