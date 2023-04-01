const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: "development",
  entry: {
    background: "./src/background.ts",
    contentScript: "./src/contentScript.tsx",
    options: "./src/options.ts"
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].js"
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader"
        }
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/options.html",
      filename: "options.html",
      chunks: ["options"]
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/manifest.json', to: '' },
        { from: 'src/icon.png', to: 'icon.png' },
      ],
    }),
  ],
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  }
};
