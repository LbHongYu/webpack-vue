
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports =  {
  // watch: true,
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  stats: 'errors-only',
  entry: {
    index: path.resolve(__dirname, '../src/index.js'),
  },

  output: {
    publicPath: '/',
    path: path.resolve(__dirname, '../webpack-vue'),
    filename: '[name]-[hash].js'
  },

  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets')
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
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
          {
            loader: 'style-resources-loader', // 如果使用了variables , mixins , functions 等功能，必须添加这个插件
            options: {
                patterns: path.resolve(__dirname, '../src/assets/scss/file.scss') // 使用 variables , mixins , functions 等功能的文件
            }
          }
        ]
      },

      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader'
        ]
      },

      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
       use: [
          {
            loader: 'url-loader',
            options: {
              // 指定文件的最大体积（以字节为单位）。
              // 如果文件体积等于或大于限制，默认情况下将使用 file-loader 并将所有参数传递给它。
              // 可以通过 fallback 选项设置 file-loader 的可选参数。
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'media/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },

      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'fonts/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },

      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: ['vue-loader']
      }
    ]
  },
  devServer: {
    contentBase: './webpack-vue',
    // NOTE:
    // hot: true，启用 webpack 的 Hot Module Replacement 功能，
    // 也可以在 plugins 数组中引入 HotModuleReplacementPlugin
    hot: true
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new CleanWebpackPlugin(),
    new webpack.ProgressPlugin(),

    // NOTE: 这个插件是必须的！ 它的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。
    //       例如，如果你有一条匹配 /\.js$/ 的规则，那么它会应用到 .vue 文件里的 <script> 块。
    new VueLoaderPlugin(),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    // new webpack.HotModuleReplacementPlugin()
  ]

};