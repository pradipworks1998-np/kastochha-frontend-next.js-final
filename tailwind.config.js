/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      colors: {
        kasto: {
          red: '#b91c1c',    /* Deep Red for 'Kasto' */
          blue: '#1e3a8a',   /* Deep Blue for 'Chha' */
          lightBlue: '#3b82f6', /* Lighter blue for accents */
        },
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#1e3a8a',
          900: '#1e3a8a',
        }
      }
    },
  },
  plugins: [],
};