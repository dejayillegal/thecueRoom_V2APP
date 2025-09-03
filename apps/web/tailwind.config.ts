import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0B0B0B',
        surface: '#111111',
        lime: '#D1FF3D',
        purple: '#873BBF'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Source Code Pro', 'monospace']
      }
    }
  },
  darkMode: 'class'
};

export default config;
