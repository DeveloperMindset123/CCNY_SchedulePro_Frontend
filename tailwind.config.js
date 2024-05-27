    /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./constants/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary : "#366B45",
      },
      fontFamily: {
        sans : ["Inter", "sans-serif"]
      }
    },
  },
  plugins: [],
};