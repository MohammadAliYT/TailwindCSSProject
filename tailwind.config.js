/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        nunito: ['Nunito Sans', "sans-serif"]
      }
    },
  },
  plugins: [],
}
