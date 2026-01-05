/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
    "./src/**/*.html",
    "./src/**/*.jsx",
    "./src/**/*.js",
    "./src/**/*.ts",
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      screens: {
        xs: "480px",
        // Add any custom breakpoints here
      },
      // Add any custom theme extensions here
    },
  },
  plugins: [
    // Add any Tailwind plugins here
  ],
}