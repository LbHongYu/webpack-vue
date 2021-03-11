
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
console.log(VueLoaderPlugin);

module.exports =  {
  entry: path.resolve(__dirname, '../src/index.js'),
  output: path.resolve(__dirname, '../webpack-vue'),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules|vue.esm.browser.js/,
        use: ['babel-loader']
      }, {
        test: /\.s[ac]ss$/i,
        use: ['vue-style-loader', 'css-loader', 'sass-loader']
      }, {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: ['file-loader']
      }, {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: ['vue-loader']
      }
    ]
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './webpack-vue',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    })
  ]

};