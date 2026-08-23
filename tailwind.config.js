/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F6F1E7',
        surface: '#FDFAF2',
        card: '#FFFDF8',
        ink: {
          DEFAULT: '#2B2620',
          soft: '#5C5347',
          faint: '#8A7F6F',
        },
        terracotta: '#D96F4E',
        peach: '#F2B28C',
        sage: '#9CAF88',
        sky: '#A8C7D8',
        butter: '#F2D399',
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'serif'],
      },
    },
  },
  plugins: [],
}
