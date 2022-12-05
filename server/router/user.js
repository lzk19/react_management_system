// 8.新建user.js文件，作为用户的路由模块，并初始化代码

const express = require('express')
// 创建路由对象
const router = express.Router()

// 13.导入用户路由处理函数模块
const userHandler = require('../router_handler/user')

// 9.注册新用户
router.post('/reguser',userHandler.regUser)

// 10.登录
router.post('/login',userHandler.login)

// 11.将路由对象共享出去
module.exports = router