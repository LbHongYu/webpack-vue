

/**
  * webpack.server.js
  *
  * webpack-dev-middleware + webpack-hot-middleware + HotModuleReplacementPlugin
  * 实现本地编译热更新
  *
*/
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports =  {
  // entry 必须使用数组的方式引入 webpack-hot-middleware/client.js，否则不能实现热更新效果
  // 官方也是使用数组的方式来引入，暂时没有去了解为啥。。。。
  entry: [
    path.resolve(__dirname, '../src/index.js'),
    'webpack-hot-middleware/client.js'
  ],
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
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProgressPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    new webpack.HotModuleReplacementPlugin()
  ]

};