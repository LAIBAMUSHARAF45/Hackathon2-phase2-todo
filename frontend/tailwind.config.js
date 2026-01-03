/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          500: '#6366f1',
        },
        cyan: {
          400: '#22d3ee',
        },
        purple: {
          600: '#7e22ce',
        },
      },
      backdropBlur: {
        '2xl': '40px',
      }
    },
  },
  plugins: [],
}