// 7.router文件夹下存放所有的路由模块，在路由模块中，只存放客户端的请求与处理函数之间的映射关系
// 8.新建user.js文件，作为用户的路由模块，并初始化代码

const express = require('express')
// 9.创建路由对象
const router = express.Router()

// 11.导入用户路由处理函数模块
const userHandler = require('../router_handler/user')

// 28.导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 29.导入需要的验证规则对象
const {reg_login_schema} = require('../schema/user')

// 注意：注册和登录用的是同一个数据验证规则
// 12.注册新用户，在注册新用户的路由中，声明局部中间件，对当前请求中携带的数据进行验证
// 12.1数据验证通过后，会把这次请求流传给后面的路由处理函数
// 12.2数据验证失败后，终止后续代码的执行，并抛出一个全局的Error错误，进入全局错误级别中间件中进行处理
router.post('/register',expressJoi(reg_login_schema),userHandler.register)

// 13.登录
router.post('/login',expressJoi(reg_login_schema),userHandler.login)

// 14.将路由对象共享出去
module.exports = router