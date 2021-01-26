const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode:"development",
  entry: {
  index:  ['@babel/polyfill','./src/index.js'],
},
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js',
    },
  resolve: {
    extensions: ['*', '.js', 'json']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  plugins: [new HtmlWebpackPlugin({
    template: "index.html"
    }
  )]
};