/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E2A5E',  // Dark blue color
        primarylight: '#4E5D9E',
        secondary: '#27b860', // Light green color
        tertiary: '#98DED9',  
      },
      fontFamily: {
        header: ['"Montserrat"', 'sans-serif'], // Custom font for headers
        body: ['"Roboto"', 'sans-serif'], // Custom font for body text
        // Add other font families as needed
      },
      fontSize: {
        'header1': ['3rem', { lineHeight: '1.2' }],  // Example for Header 1
        'header2': ['2rem', { lineHeight: '1.3' }],  // Example for Header 2
        'subtitle': ['1.5rem', { lineHeight: '1.4' }],  // Example for Subtitles
        'body': ['1rem', { lineHeight: '1.6' }],  // Example for Body text
      },
      // Optionally add more font weights if needed
      fontWeight: {
        normal: 400,
        bold: 700,
        extraBold: 800,
      },
    },
  },
  plugins: [],
}
