/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        night: '#121211',
        navy: '#1C1B18',
        steel: '#262521',
        cream: '#EFEEE9',
        amber: '#E8A44C',
        moss: '#8FA98B',
        skyblue: '#7FAEA3',
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
