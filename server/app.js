// 1.导入express模块
const express = require('express')
// 4.导入cors中间件(用于解决跨域)
const cors = require('cors')

const joi = require('joi')

// 2.创建express的服务器实例
const app = express()


// 5.将cors注册为全局中间件
app.use(cors())
// 6.配置解析表单数据的中间件
app.use(express.urlencoded({extended:false}))

// 26.一定要在路由之前，封装res.cc函数对错误进行统一处理
app.use((req,res,next)=>{
  // status默认值为1，标识失败的清空
  // err的值可能是一个错误对象，也可能是一个错误的描述字符串
  res.cc = function(err,status=1){
    res.send({
      status,
      message:err instanceof Error ?err.message:err
    })
  }
  next()
})

// 38.一定要在路由之前配置解析token的中间件并且导入配置文件
const expressJWT = require('express-jwt')
const config = require('./config')

app.use(expressJWT({secret:config.jwtSecretKey}).unless({path:[/^\/pub/]}))

// 15.导入并注册用户路由模块(导入的接口这部分必须写在cors和解析表单数据中间件后面)
const userRouter = require('./router/user')
// 用户注册登录路由模块添加pub前缀表示不需要进行权限验证即token
app.use('/pub',userRouter)
// 40.导入并使用用户信息的路由模块
const userInfoRouter = require('./router/userInfo')
app.use(userInfoRouter)



// 30.定义错误级别的中间件，放在路由之后
app.use(function(err,req,res,next){
  // 数据验证失败
  if(err instanceof joi.ValidationError) return res.cc(err)
  // token没有或过期，身份认证失败
  if(err.name === 'UnauthorizedError') return res.cc('身份认证失败!')
  // 未知错误
  res.cc(err)
})

// 3.调用app.listen方法，指定端口号启动web服务器
app.listen(80,function(){
  console.log('server run at 127.0.0.1');
})