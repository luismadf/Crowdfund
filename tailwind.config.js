/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

export default {
  content: [
    "./index.html",
    "./src/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "moderate-cyan": "#3cb4ac",
      "dark-cyan": "#147b74",
      "dark-gray": "#7a7a7a",
      black: colors.black,
      white: colors.white,
    },
    extend: {
      backgroundImage: {
        "hero-mobile": "url('/src/assets/image-hero-mobile.jpg')",
        "hero-desktop": "url('/src/assets/image-hero-desktop.jpg')",
      },
    },
  },
  plugins: [],
};
