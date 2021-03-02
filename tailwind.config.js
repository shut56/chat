module.exports = {
  purge: [],
  darkMode: false,
  theme: {
    extend: {
      keyframes: {
        'emersion': {
          '0%': {
            opacity: 0
          },
          '100%': {
            opacity: 100
          }
        }
      },
      animation: {
        'emersion': 'emersion 200ms ease-in 1'
      }
    },
  },
  variants: {},
  plugins: []
}
