const path = require('path')
module.exports = {
  entry: {
    "app": './index.js'
  },
  mode: "development",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  watch: true
}