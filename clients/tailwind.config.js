/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        secondary: "#727c73"
      },
      backgroundImage: {
        banner: "url('./assets/banner2.png')",
        gradientBold: 'linear-gradient(120deg, #EE424E 40%, #121E6C 50%,gray 90%)', // Corregido el nombre a "gradientBold"
      },
      boxShadow: {
        light: "0px 4px 30px rgba(0, 0, 0, 0.08)"
      },
      fontFamily: {
        quicksand: "'Quicksand', sans-serif"
      }
    },
  },
  plugins: [],
}
