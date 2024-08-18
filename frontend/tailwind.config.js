/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#1E3A8A', // Dark blue color
        'secondary-green': '#9AE3A0', // Light green color
      },
      width: {
        'sidebar': '4rem', // Adjust as needed
      },
    },
  },
  plugins: [],
}
