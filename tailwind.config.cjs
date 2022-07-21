/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', 'src/**/*.{tsx,css}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
}
