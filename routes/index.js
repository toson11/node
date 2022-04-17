/*
 * @Author: longtuxin
 * @LastEditors: longtuxin
 * @LastEditTime: 2022-04-16 20:34:08
 * @FilePath: /node-project/routes/index.js
 * @Description: 简介
 */
const fs = require('fs')
const router = require('./users')

module.exports = (app) => {
  fs.readdirSync(__dirname).forEach(file => {
    if(file === 'index.js') return
    const router = require(`./${file}`)
    app.use(router.routes(), router.allowedMethods())
  })
}
