/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        title: ["Saira Stencil One"],
        paragraph: ["Raleway"]
      },
    },
    
  },
  plugins: [],
}