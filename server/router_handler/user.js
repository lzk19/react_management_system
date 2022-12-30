// 7.router_handler文件夹用来存放所有的路由处理函数模块，路由处理函数模块中，专门负责存放每个路由对应的处理函数

// 存放user的路由处理函数

// 20.导入数据库操作模块
const db = require('../database/index')

// 23.导入bcryptjs用于密码加密
const bcrypt = require('bcryptjs')

// 33.导入生成token的包
const jwt = require('jsonwebtoken')

// 35.导入全局的配置文件(密钥)
const config = require('../config')

const ifHasSql = 'select * from ev_users where username=?' //查询用户名是否存在

// 10.编写并导出user路由处理函数
exports.register = (req,res)=>{
  // 获取客户端客户端提交到服务器的用户信息
  const userInfo = req.body

  // 21.定义SQL语句
  const addUserSql = 'insert into ev_users set?' //新增用户
  // 对表单中的数据进行合法性的校验
  if(!userInfo.username||!userInfo.password){
    return res.send({status:1,message:'用户名或密码为空!'})
  }
  // 22.查询用户名是否被占用
  db.query(ifHasSql,userInfo.username,(err,results)=>{
    // 执行SQL语句失败
    if(err){
      // return res.send({status:1,message:err.message})
      return res.cc(err)
    }
    // 判断用户名是否被占用
    if(results.length>0){
      return res.send({status:1,message:'该用户名已存在，请更换其他用户名!'})
    }
    // 24.在注册用户的处理函数中，确认用户名可用之后，调用bcrypt.hash(明文密码，随机盐的长度)方法，对用户的密码进行加密处理
    userInfo.password = bcrypt.hashSync(userInfo.password,10)
    // 25.向数据库中插入数据
    db.query(addUserSql,userInfo,(err,results)=>{
      if(err){
        return res.cc(err)
      }
      if(results.affectedRows === 1){
        return res.send({status:0,message:'插入数据成功'})
      }
    })
  })
  
}

// 31.实现登录功能
exports.login = (req,res)=>{
  const userInfo = req.body

  db.query(ifHasSql,userInfo.username,(err,results)=>{
    // results就是从数据库里查询出来的结果
    if(err){return res.cc(err+'出错')}
    // 31.1判断用户名是否填写正确
    if(results.length!==1){return res.cc('用户名错误!')}
    // 31.2判断用户名密码是否填写正确 调用bcrypt.compareSync(用户输入的密码,数据库中的密码)，返回结果是布尔值
    const compareResult = bcrypt.compareSync(userInfo.password,results[0].password)
    // 31.3如果对比的结果等于false，则证明用户输入的密码错误
    if(!compareResult){
      return res.cc('密码错误!')
    }

    // 32在服务器生成token字符串
    // 注意生成token字符串要先去除敏感信息如密码、头像等，以免被黑客破解
    const user = {...results[0],password:'',avatar:''}

    // 36.对用户的信息进行加密，生成token字符串
    // 调用jwt.sign方法，传入三个参数，第一个是要加密的对象，第二个是密钥，第三个是token有效期
    const token = jwt.sign(user,config.jwtSecretKey,{expiresIn:config.expresIin})
    
    const {id,username,nickname,email,avatar,tel} = results[0]
    console.log(results[0]);
    // 37.调用res.send()将token响应给客户端
    res.send({
      status:0,
      message:'登录成功!',
      data:{
        user:{
          id,username,nickname,email,avatar,tel
        },
        // 给token添加前缀，方便前端使用
        token:'Bearer '+token,
      },
    })
  })
  
}

