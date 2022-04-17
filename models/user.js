/*
 * @Author: longtuxin
 * @LastEditors: longtuxin
 * @LastEditTime: 2022-04-17 20:40:51
 * @FilePath: /node-project/models/user.js
 * @Description: 简介
 */
const mongoose = require('mongoose')

const {Schema, model} = mongoose

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String , required: true }
})

module.exports = model('User', userSchema)