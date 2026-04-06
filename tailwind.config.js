/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        peach: { DEFAULT: '#FFB347', light: '#FFE0B2', dark: '#E8950A' },
        dark: { DEFAULT: '#0F0F0F', card: '#1A1A1A', border: '#2A2A2A' },
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
      },
    },
  },
  plugins: [],
}

