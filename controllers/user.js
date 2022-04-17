/*
 * @Author: longtuxin
 * @LastEditors: longtuxin
 * @LastEditTime: 2022-04-17 20:46:20
 * @FilePath: /node-project/controllers/user.js
 * @Description: 用户接口
 */
const User = require('../models/user')

class UserCtl {
    async find(ctx){
        const users = await User.find() 
        ctx.body = users
    }
    async findById(ctx){
        // 注意：如果参数符合id规范，会发生服务端报错，如果符合才会进行下一步
        const user = await User.findById(ctx.params.id)
        if(!user) ctx.throw(404, '用户不存在')
        ctx.body = user
    }
    async create(ctx){
        const user = await User.create(ctx.request.body)
        ctx.body = user
    }
    async update(ctx){
        // ctx.verifyParams({
        //     username: {type: 'string', required: true},
        //     password: {type: 'string', required: true}
        // })
        const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body)
        if(!user) ctx.throw(404, '用户不存在')
        ctx.body = user
    }
    async delete(ctx){
        const user = await User.findByIdAndRemove(ctx.params.id) 
        if(!user) ctx.throw(404, '用户不存在')
        ctx.status = 204
    }
}

module.exports = new UserCtl() // 单例模式