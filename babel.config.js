const { ModuleFilenameHelpers } = require("webpack");

module.exports = {
  presets: [
    '@babel/env',
    '@babel/react'
  ],
  plugins: [
    '@babel/plugin-transform-runtime'
  ]
}
