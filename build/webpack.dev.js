
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports =  {
  // watch: true,
  entry: {
    index: path.resolve(__dirname, '../src/index.js'),
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, '../webpack-vue'),
    filename: '[name]-[hash].js'
  },
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
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './webpack-vue',
    // hot: true，启用 webpack 的 Hot Module Replacement 功能，
    // 也可以在 plugins 数组中引入 HotModuleReplacementPlugin
    hot: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    new webpack.HotModuleReplacementPlugin()
  ]

};