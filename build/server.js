const express = require('express')
const webpack = require('webpack')
const config = require('./webpack.server.js')
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware')

const app = new express();
const compiler = webpack(config)

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  })
)

app.use(webpackHotMiddleware(compiler, {
  heartbeat: 1000
}))

app.listen(8082, () => {
  console.log('server started!')
})