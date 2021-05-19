2020/12/07

  1. 初始化项目 npm init - y (`-y` 表示所有选项默认为 yes)
  2. 安装 webpack webpack-cli `npm install webpack webpack-cli --save-dev`

  可以将 `./node_modules/.bin/` 中的命令简化后放在 script 中，
  `./node_modules/.bin/webpack` 简化为

  ```
    "script": {
      "dev": "webpack"
    }
  ```
  3. 添加打包配置文件夹 `build`，添加 `base`、`dev`、`prod` 等文件
    添加 `webpack.ProgressPlugin` 用于显示编译过程
    添加 `clean-webpack-plugin` 用于清理上一次的编译结果
    添加 `html-webpack-plugin`，和 html template `pulic/template.html`， 用于将打包结果自动插入到html

2020/12/08
  1. 添加 `babel-loader` `@babel/core` `@babel/preset-env`，用于转换 ES6 代码为浏览器能够运行的代码
  2. 添加 `core.js@3`
  3. 添加 `.babelrc` 文件
  ```
  {
    "presets": [
      [
        "@babel/preset-env",
        {
          "useBuiltIns": "usage",
          "corejs": 3
        }
      ]
    ]
  }
  ```

  NOTE:
    `@babel/preset-env`的 `corejs` 配置默认为 `2.0` 使用了 core.js3+，需要指定 corejs 版本

  3. <!--添加 `@babel/plugin-transform-runtime` `@babel/runtime`，引入 Babel runtime 作为一个独立模块，来避免重复引入 -->
     添加 .babelrc 文件设置 preset

  4. 添加 `vue-loader` `vue-template-compiler` 、`VueLoaderPlugin`用于编译 vue 单文件

     NOTE:
        每一个新的vue版本会对应一个新的 vue-template-compiler 版本,
        `vue-loader` 中内嵌了 `vue-style-loader`(vue-style-loader 是从 style-loader fork 而来)

        VueLoaderPlugin
        这个插件是必须的！ 它的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。
        例如，如果你有一条匹配 /\.js$/ 的规则，那么它会应用到 .vue 文件里的 `<script>` 块。

  5. 添加 `css-loader`
     添加 `node-sass`(4.14.1) `sass-loader`(7.3.1) 用于编译 scss 文件
     添加 `postcss-loader` 和 `postcss`, 以及添加 postcss.config.js 文件，配置 `autoprefixer`
     ```
      {
        plugins: {
          'autoprefixer': {
          }
        }
      }
     ```
  6. 引入 style-resources-loader
     用途: 导入css 预处理器的一些公共的样式文件变量，比如：variables , mixins , functions，避免在每个样式文件中手动的@import导入，然后在各个css 文件中直接使用 变量。

    NOTE:
      需要配置 variables, mixins, functions 等功能的文件
      ```
        {
          loader: 'style-resources-loader',
          options: {
            patterns: path.resolve(__dirname, '../src/assets/scss/file.scss')
          }
        }
      ```

2020/12/09
  1. 添加 `file-loader` `url-loader` 解析图片、媒体资源

  NOTE:
    小于 4k 的资源使用 `url-loader` 将文件转换为 base64 URI
    大于 4k 的资源使用 `file-loader`， 将一个文件中的 import/require() 解析为 url，并且将文件发送到输出文件夹。

===========================

2020/12/10
  #### 配置正式环境
  1. 添加 webpack.prod.js, 用于打包生产环境
      添加 `MiniCssExtractPlugin` 抽离CSS 文件

      NOTE:
        给 output 文件名添加 hash, CSS 文件名添加 contenthash, 图片的文件名添加 hash
        ```
          new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
            ignoreOrder: true
          })
        ```

  2. 压缩 HTML
     HtmlWebpackPlugin^4.5.0 添加 minify 配置选项
     ```
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        collapseBooleanAttributes: true,
        removeScriptTypeAttributes: true,
        minifyJS: true
      }
     ```

2020/12/14
 1. 添加 CSS 压缩[`CssMinimizerWebpackPlugin`](https://github.com/webpack-contrib/css-minimizer-webpack-plugin)
 CssMinimizerWebpackPlugin 在 source map 和 asset 使用查询字符串上会更加精确，且允许缓存和并行处理
    ```
    optimization: {
      minimizer: [
        new CssMinimizerPlugin({
          minimizerOptions: {
            preset: [
              'default',
              {
                discardComments: { removeAll: true },
              },
            ],
          }
        })
      ]
    }
    ```
 NOTE:
  还有其他的压缩插件: optimize-css-assets-webpack-plugin、 @intervolga/optimize-cssnano-plugin
  Vue-Cli 中使用的 @intervolga/optimize-cssnano-plugin 来压缩CSS

 2. 安装 postcss, autoprefixer，PostCSS 插件，用于解析 CSS 并使用 Can I Use 中的值向 CSS 规则添加供应商前缀
  ```
  {
    plugins: {
      'autoprefixer': {}
    }
  }
  ```
2020/12/15
  1. 添加 source-map,
    * eval:    使用 eval 包裹模块代码的 source map， 不产生.map⽂件
    * cheap: 不包含列信息
    * inline:  将.map作为 DataURI 嵌⼊，不单独⽣成.map⽂文件
    * module: 包含 loader 的 sourcemap
  NOTE：
    顺序： [ inline-|hidden-|eval- ][ nosources- ][cheap-[ module- ]]source-map

    开发环境：`devtool: 'eval-cheap-source-map'`
    生产环境：`devtool: 'source-map'`

2020/01/04
  1. 添加 SplitChunksPlugin
  2. 添加 TerserWebpackPlugin

2020/05/14
  1. 通过 webpack-dev-server + HotModuleReplacementPlugin 和  webpackDevMiddleware + webpackHotMiddleware + HotModuleReplacementPlugin
     热编译和热更新

  NOTE:
    第一种方式，如果在devServer 字段设置了 hot: true, 就可以不需要在 plugins 中指定 HotModuleReplacementPlugin 插件，因为 webpack-dev-server 插件里中添加。

2020/05/18
  1. 通过 .browserslistrc 文件指定 @babel/preset-env 需要支持的目标浏览器环境
  2. `stats: 'errors-only'` + `FriendlyErrorsWebpackPlugin` 优化控制台的打印信息







