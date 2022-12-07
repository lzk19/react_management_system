// 41.获取用户基本信息的处理函数

// 42.导入数据库操作模块
const db = require('../database/index')

// 54.导入处理加密密码的模块
const bcrypt = require('bcryptjs')
exports.getUserInfo = (req, res) => {
  // 43.定义查询用户信息的SQL语句
  const getUserInfoSQL = 'select id,username,nickname,email,avatar from ev_users where id=?'
  // 44.调用db.query()执行SQL语句
  // 只要身份认证成功了,解析token的中间件就会向req身上挂载一个新的属性叫做req.user,是固定写法
  db.query(getUserInfoSQL, req.user.id, (err, results) => {
    // 执行SQL语句失败
    if (err) { return res.cc(err) }
    // 执行SQL语句成功,但是查询的结果可能为空
    if (results.length !== 1) { return res.cc('用户不存在') }
    // 用户信息获取成功
    res.send({
      status: 0,
      message: '获取用户信息成功',
      data: results[0]
    })
  })
}


exports.updateUserInfo = (req, res) => {
  // 49.更新用户基本信息的处理函数具体操作
  // 定义待执行的SQL语句
  const updateUserInfoSQL = 'update ev_users set ? where id=?'
  // 调用db.query()执行SQL语句并传递参数,数组里的内容是占位符
  db.query(updateUserInfoSQL, [req.body, req.body.id], (err, results) => {
    // 执行SQL语句失败
    if (err) { return res.cc(err) }
    // 执行SQL语句成功,但是行数不等于一
    if (results.affectedRows !== 1) {
      return res.cc('用户不存在!')
    }
    // 成功
    res.send('更新用户信息成功')
  })
}

exports.updatePassword = (req, res) => {
  // 53.定义根据id查询用户的信息的SQL语句
  const searchSQL = `select * from ev_users where id=?`
  // 51.修改密码接口的具体实现
  db.query(searchSQL, req.user.id, (err, results) => {
    if (err) { return res.cc(err) }
    if (results.length !== 1) return res.cc('用户不存在!')
    // 55.判断原密码是否输入正确
    const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
    if (!compareResult) { return res.cc('原密码错误!') }
    
    // 56.定义更新密码的SQL语句
    const updatePasswordSQL = `update ev_users set password=? where id=?`
    // 57.对新密码进行加密处理
    const newPwd =  bcrypt.hashSync(req.body.newPwd,10)
    // 58.调用db.query()执行SQL语句
    db.query(updatePasswordSQL,[newPwd,req.user.id],(err,results)=>{
      // 失败
      if(err){return res.cc(err)}
      // 判断影响的行数
      if(results.affectedRows!==1){return res.cc('用户不存在')}
      // 成功
      res.send('更新密码成功')
    })
  })


}

exports.updateAvatar = (req,res)=>{
  // 62.修改头像的具体实现
  const updateAvatarSQL = 'update ev_users set avatar=? where id=?'
  db.query(updateAvatarSQL,[req.body.avatar,req.user.id],(err,results)=>{
    if(err){return res.cc(err)}
    // 判断影响行数是否等于1
    if(results.affectedRows!==1){return res.cc('更换头像失败')}
    res.send('更换头像成功')
  })
}