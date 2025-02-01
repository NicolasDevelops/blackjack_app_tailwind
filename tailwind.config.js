/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,css}"],
  theme: {
    extend: {
      colors: {
        customBlue: '#DBE9E4',
        gradientBlue: '#B0D6CD',
        gradientYellow: '#EFC68D',
        gradientPurple: '#CAAFAD',
        mainBlue: '#AEDCE2',
        mainYellow: '#F7D6A6',
        mainPurple: '#D6BAC3',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-motion')],
}

