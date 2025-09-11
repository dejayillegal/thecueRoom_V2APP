import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0B0B0B',
        surface: '#0E0E0E',
        border: '#1F1F1F',
        text: '#EDEDED',
        lime: '#D1E231',
        purple: '#873BBF',
        'accent-lime': '#D1E231',
        'accent-purple': '#873BBF',
        background: '#0B0B0B',
        foreground: '#EDEDED',
      },
      ringColor: {
        DEFAULT: '#D1E231',
        lime: '#D1E231',
      },
      borderRadius: {
        md: '8px',
        lg: '10px',
        xl: '12px',
      },
      boxShadow: {
        'soft-neutral': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'heavy-spread': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"Source Code Pro"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
    container: {
      center: true,
      screens: {
        '2xl': '1120px',
      },
    },
  },
  plugins: [],
};
export default config;
