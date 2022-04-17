<!--
 * @Author: longtuxin
 * @LastEditors: longtuxin
 * @LastEditTime: 2022-04-17 20:48:37
 * @FilePath: /node-project/学习笔记.md
 * @Description: 简介
-->
# 方案一：安装项目并初始化
# 方案二：用脚手架初始化项目
# supervisor 监听文件变化重启koa项目
# 使用的第三方依赖
    - koa-json -> 美化输出等json内容格式
    - koa-static -> 如果前端访问的路径是静态资源，如js、css、图片等，指定获取静态资源等目录
    - koa-bodyparser -> 解析请求体
    - koa-views -> 使用模板引擎渲染模板index.html，并返回给前端
    - koa-logger -> 打印输出日志，也有人用 log4.js
    - 捕获错误
      - 方案1: koa-json-error -> 处理返回json格式的错误结果（不使用默认返回的是html错误页），支持返回404错误，支持返回错误发生的位置，方便调试。注意：该方案要手动抛出错误，才能捕获，所以需要编写错误中间件
      - 方案2: koa-onerror -> 返回以 error.pug 为模型渲染并返回html格式的报错信息
    - koa-parameter -> 参数校验，mongoose的schema也可以校验参数，为什么还用它？？？mongoose的schema无法给前端返回清晰的参数报错，且不能单独校验一个参数
    - koa-convert -> 让中间件可以用promise的方法来写，如果不用只能用* yield生成器的方法来写
    - debug -> 打印输出日志，体积很小
# 创建http服务
    - 引入node.js自带http模块并创建一个http服务
    - var server = http.createServer(app.callback());
    - server.listen('8080', cb)
    - server.on('error', cb) // 服务启动时发生错误的回调
    - server.on('listening', cb) // 服务启动时的回调
# koa app 自带捕获错误
  -  app.on('error', cb)
# 配置运行脚本
  - 开发用 nodemon 命令启动，监听文件变化
  - 生产只需启动一次，用 node 命令启动
  - 用pm2启动，在后台运行
# 编写接口路由，并自动注册
  - 获取目标目录的所有文件名 fs.readdirSync
  - 引入文件，并用app.use()注册路由
# 按接口模块编写路由中间件
  - 使用类的方式管理每个模块的中间件，如 class UserCtl { find(){} }
# 连接 mongoose
  - 由于是练习用，允许所有ip地址访问
  - 连接报错：rror: querySrv ENODATA _mongodb._tcp.clustertoson.i2ssl.mongodb.net，node版本问题，到mongo网站修改连接的node.js版本，我的电脑选了2.2.12 or later
# 用户注册接口
# 用户登录接口并获取token