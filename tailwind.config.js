/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0A0A0F',
        surface: '#141420',
        elevated: '#1C1C2E',
        accent: '#00D68F',
        danger: '#FF4757',
        warn: '#FFA502',
        info: '#54A0FF',
        t1: '#F1F2F6',
        t2: '#8E8FA8',
        t3: '#44445A',
      },
      fontFamily: { sans: ['var(--font-outfit)', 'sans-serif'] },
    },
  },
  plugins: [],
}
