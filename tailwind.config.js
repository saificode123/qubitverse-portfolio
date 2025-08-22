/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}", // This line is crucial for React/Vite projects
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}