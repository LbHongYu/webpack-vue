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
    添加 `html-webpack-plugin`，和html template `pulic/template.html`， 用于将打包结果自动插入到html

2020/12/08
  1. 添加 `babel-loader` `@babel/core` `@babel/preset-env`，用于转换 ES6 代码为浏览器能够运行的代码
  2. 添加 `core.js` (TODO: )

  3. 添加 `@babel/plugin-transform-runtime` `@babel/runtime`，引入 Babel runtime 作为一个独立模块，来避免重复引入
     添加 .babelrc 文件设置 preset

  4. 添加 `vue-loader` `vue-template-compiler` 用于编译 vue 单文件,
     每一个新的vue版本会对应一个新的vue-template-compiler版本,
     `vue-loader` 中内嵌了 `vue-style-loader`(vue-style-loader 是从 style-loader fork 而来)

  5. 添加 `css-loader`

  6. 添加 `node-sass`(4.14.1) `sass-loader`(7.3.1) 用于编译 scss 文件




