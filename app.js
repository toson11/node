/*
 * @Author: longtuxin
 * @LastEditors: longtuxin
 * @LastEditTime: 2022-04-17 20:23:06
 * @FilePath: /node-project/app.js
 * @Description: 简介
 */
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
// const onerror = require('koa-onerror')
const error = require('koa-json-error')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const parameter = require('koa-parameter')

const routing = require('./routes')

const mongoose = require("mongoose")
const {mongoConnectStr} = require("./config")

mongoose.connect(mongoConnectStr, () => console.log('MongoDB连接成功！'))
mongoose.connection.on('error', console.error)

// error handler
// onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
// 校验前端传过来的参数
app.use(parameter(app))
// 美化返回给前端的json
app.use(json())
// 打印日志, 每次请求会有默认信息
app.use(logger())
// 指定访问静态资源时访问的目录
app.use(require('koa-static')(__dirname + '/public'))

// 前端访问html页面时，用模板引擎渲染数据到模板上，并返回给前端
app.use(views(__dirname + '/views', {
  // 支持多种模板引擎，此处使用的是pug, ejs也比较常用
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  // 每次请求打印请求方法 地址 - 时间
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// // 错误中间件（必须在koa-json-error前使用），报出错误给 koa-json-error
app.use(require('./controllers/error'))
// koa-json-error 处理错误，！！！注意：一定要放在注册路由前，否则错误处理出生效
app.use(error({
  postFormat: (e, { stack, ...rest }) => {
    // 非生产环境下才返回错误堆栈信息，方便调试
    return process.env.NODE_ENV === 'production' ? rest : {stack, ...rest}
  }
}))

// 自动注册路由
routing(app)

// error-handling
// app.on('error', (err, ctx) => {
//   console.error('服务端错误------------->', err, ctx)
// });

module.exports = app
