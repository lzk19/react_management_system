// 存放user的路由处理函数

// 20.导入数据库操作模块
const db = require('../database/index')

// 23.导入bcryptjs用于密码加密
const bcrypt = require('bcryptjs')

// 10.编写并导出user路由处理函数
exports.register = (req,res)=>{
  // 获取客户端客户端提交到服务器的用户信息
  const userInfo = req.body

  // 21.定义SQL语句
  const ifHasSql = 'select * from ev_users where username=?' //查询用户名是否被占用
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

exports.login = (req,res)=>{
  res.send('login success')
}

