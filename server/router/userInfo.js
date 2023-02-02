// 39.获取用户信息的路由模块
const express = require('express')
const router = express.Router()

const userInfoHandler = require('../router_handler/userInfo')
// 67.导入上传文件的封装方法
const {avatarUpload} = require('../middlewares/upload')
// 47.导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 48.导入需要的验证规则对象
const {update_userInfo_schema,update_password_schema,update_avatar_schema} = require('../schema/user')
// 挂载路由

// 获取用户基本信息的路由
router.get('/userInfo',userInfoHandler.getUserInfo)
router.get('/allUserInfo',userInfoHandler.getAllUserInfo)
// 修改用户基本信息的路由
router.post('/updateUserInfo',expressJoi(update_userInfo_schema),userInfoHandler.updateUserInfo)
// 50.更新密码的路由
router.post('/updatePassword',expressJoi(update_password_schema),userInfoHandler.updatePassword)
// 59.更新用户头像的路由
router.post('/files',avatarUpload.single('files'),userInfoHandler.updateAvatar)
router.post('/deleteUserInfo',userInfoHandler.deleteUserInfo)
module.exports = router