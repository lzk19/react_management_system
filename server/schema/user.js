// 27.定义用户信息验证规则模块
const joi = require('joi')
// string()值必须是字符串
// alphanum()值只能是包含a-zA-Z0-9的字符串
// min(length)最小长度
// max(length)最大长度
// required()值是必填项，不能为undefined
// pattern(正则表达式)值必须符合正则表达式的规则

// 用户名的验证规则
const username = joi.string().alphanum().min(1).max(10).required()

// 密码的验证规则
// 正则表达式：
// 1.^表示匹配字符串的开始 $表示匹配字符串的结束
// 2.[\S]表示匹配非空格 \S表示非空格 []表示匹配
// 3.{6,12}表示匹配6到12次，即字符串长度为6-12
// 4.所以这个正则表达式表示匹配字符串长度为6-12的非空格
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

// 45.定义修改用户信息id,nickname,email的验证规则
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()
// 60.定义修改头像的验证规则(以路径形式将图片存储到数据库中)
const avatar = joi.string().required()

// 定义验证注册和登录表单的验证规则对象
exports.reg_login_schema = {
  // 表示需要对req.body中的数据进行验证
  body:{
    username,password
  }
}

// 46.修改用户信息的验证规则对象
exports.update_userInfo_schema ={
  // 需要对req.body里面的数据进行验证
  // body:{
  //   id,tel,email
  // }
}

// 52.修改密码的验证规则对象
exports.update_password_schema ={
  body:{
    oldPwd:password,
    newPwd:joi.not(joi.ref('oldPwd')).concat(password),
  }
}

// 61.修改头像的验证规则
exports.update_avatar_schema = {
  body:{
    avatar
  }
}