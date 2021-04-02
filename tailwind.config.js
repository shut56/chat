module.exports = {
  purge: [
    './client/**/*.html',
    './client/**/*.js',
    './client/**/*.jsx'
  ],
  darkMode: false,
  theme: {
    extend: {
      keyframes: {
        'emersion': {
          '0%': {
            opacity: 0
          },
          '100%': {
            opacity: 100,
          }
        }
      },
      animation: {
        'emersion': 'emersion 200ms ease-in 1'
      },
      maxWidth: {
        '1': '10rem'
      },
      minWidth: {
        '1': '10rem'
      }
    },
  },
  variants: {},
  plugins: []
}
