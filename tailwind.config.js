/**** @type {import('tailwindcss').Config} ****/
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0ea5e9',
        accent: '#22d3ee',
        dark: '#0b1220'
      }
    }
  },
  plugins: []
};
