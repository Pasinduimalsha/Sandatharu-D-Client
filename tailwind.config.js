/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        yellowGreenMix: 'rgb(166, 214, 0)', // RGB mix of yellow and green
        yellowGreenHSL: 'hsl(75, 100%, 50%)', // HSL-based mix
      },
    },
  },
  plugins: [],
}