/*
 * @Author: longtuxin
 * @LastEditors: longtuxin
 * @LastEditTime: 2022-04-17 19:27:41
 * @FilePath: /node-project/controllers/error.js
 * @Description: 简介
 */
module.exports = async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        // 如果没有status，默认为 500
        ctx.status = err.status || err.statusCode || 500
        ctx.body = {
            message: err.message
        }
    }
}