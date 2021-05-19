
/**
  * webpack.prod.js
  *
  * 正式环境的打包配置
  *
  *
*/

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports =  {
  mode: 'production',

  devtool: 'source-map',

  stats: 'errors-only',

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
      '@': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      t_personal: path.resolve(__dirname, '../src/views/teacher/personal'),
      s_personal: path.resolve(__dirname, '../src/views/student/personal'),
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
          MiniCssExtractPlugin.loader, // 在生产环境下使用 CSS 提取
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
          MiniCssExtractPlugin.loader, // 在生产环境下使用 CSS 提取
          'css-loader',
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

  optimization: {
    namedChunks: true,
    minimizer: [
       // 压缩CSS
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              // Remove all comments
              discardComments: { removeAll: true },
            },
          ],
        }
      })
    ],
    splitChunks: {
      name: false,
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
        }
      },
    },
  },

  plugins: [
    new FriendlyErrorsWebpackPlugin(),
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

    // 定义的 rule 运用在vue单文件中的代码
    new VueLoaderPlugin(),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        collapseBooleanAttributes: true,
        removeScriptTypeAttributes: true,
        minifyJS: true
      }
    }),

    // 抽离CSS 文件,并使用 contenthash 命名，然后打包的文件放在css文件中
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
      ignoreOrder: true
    }),
  ]
};