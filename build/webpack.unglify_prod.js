
/**
  * webpack.prod.js
  *
  * 打包正式环境的不压缩的代码
  *
*/
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports =  {
  entry: {
    index: path.resolve(__dirname, '../src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, '../webpack-vue'),
    /* NOTE: 使用了 NamedChunksPlugin 利用 hash 做缓存 */
    filename: '[name].js'
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
  optimization: {
    // namedChunks: true,
    splitChunks: {
      // name: false,
      chunks: 'all',
      minSize: 20000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      cacheGroups: {
        // vue: {
        //   chunks: 'all',
        //   name: 'chunk-vue',
        //   priority: 10,
        //   test:  /[\\/]node_modules[\\/]vue[\\/]/
        // },
        _vue: {
          chunks: 'all',
          name: 'chunk_vue',
          priority: 10,
          test:  /vue\.esm\.browser/
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProgressPlugin(),
    new webpack.HashedModuleIdsPlugin({
      hashDigest: 'hex'
    }),
    /* NOTE: 在这里利用 hash 做缓存 */
    new webpack.NamedChunksPlugin(chunk => {
      if (chunk.name) {
        return chunk.name
      }

      const hash = require('hash-sum')
      const joinedHash = hash(
        Array.from(chunk.modulesIterable, m => m.id).join('_')
      )

      return `chunk-` + joinedHash
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    })
  ]

};