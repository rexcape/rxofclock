/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', 'src/**/*.{tsx,css}'],
  theme: {
    fontFamily: {
      sans: [
        '"Rubik"',
        '-apple-system',
        '"Segoe UI"',
        '"Roboto"',
        '"Oxygen"',
        '"Ubuntu"',
        '"Cantarell"',
        '"Fira Sans"',
        '"Droid Sans"',
        '"Helvetica Neue"',
        'sans-serif',
      ],
      mono: [
        '"Victor Mono"',
        '"Noto Mono"',
        '"DejaVu Sans Mono"',
        '"Courier Prime Code"',
        '"Courier New"',
        'Courier',
        'monospace',
      ],
    },
    extend: {},
  },
  daisyui: {
    themes: ['emerald'],
  },
  plugins: [require('daisyui')],
}
