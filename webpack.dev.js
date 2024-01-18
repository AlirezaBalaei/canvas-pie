const path = require("path")
module.exports = {
  entry: "./src/js/chart.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "canvas-pie-webpack.bundle.js"
  },
  resolve: {
    alias: {
      node_modules: path.join(__dirname, "node_modules")
    }
  }
}