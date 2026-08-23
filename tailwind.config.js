/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        night: '#0A0F1C',
        navy: '#121B2E',
        steel: '#1B2740',
        cream: '#EFEEE9',
        amber: '#E8A44C',
        moss: '#8FA98B',
        skyblue: '#8FB6D9',
        rose: '#D98E73',
        gold: '#D9B96E',
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'serif'],
      },
    },
  },
  plugins: [],
}
