/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'grid-cols-4',
    'grid-cols-6',
    'grid-cols-8', // Add any other possible numbers here
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

