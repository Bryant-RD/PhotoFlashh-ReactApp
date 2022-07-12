/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{jpg,png,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        colors: {
        "verde": "#01a870",
        "naranja": "#f99d14",
        "rojo": "#ed1b28",
        "rojo_2": "#f04555",
        "amarillo": "#feea4d",
      },
    },
  },
  plugins: [],
}
