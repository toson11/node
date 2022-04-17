
/*
* @Author: longtuxin
 * @LastEditors: longtuxin
 * @LastEditTime: 2022-04-17 11:28:18
 * @FilePath: /node-project/routes/users.js
* @Description: 简介
*/
const router = require('koa-router')()
const User = require('../controllers/user')

router.prefix('/users')

router.get('/', User.find)

router.get('/:id', User.findById)

router.post('/', User.create)

router.put('/:id', User.update)

router.delete('/:id', User.delete)

module.exports = router
