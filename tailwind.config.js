    /** @type {import('tailwindcss').Config} */
    module.exports = {
      content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}", // Broaden to include TypeScript if any, and ensure all JS/JSX
        "./src/**/components/**/*.{js,jsx,ts,tsx}", // Explicitly include components folder
        // If you have other folders with Tailwind classes, add them here too, e.g., "./src/layouts/**/*.{js,jsx,ts,tsx}"
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    }
    