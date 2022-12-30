// 73.获取商品信息的路由模块
const express = require('express')
const router = express.Router()


const commodityInfoHandler = require('../router_handler/commodity')

// 获取用户基本信息的路由
router.get('/commodity/category',commodityInfoHandler.getCategoryInfo) 
router.post('/commodity/createCategory',commodityInfoHandler.createCategoryInfo)
router.post('/commodity/updateCategory',commodityInfoHandler.updateCategoryInfo)
router.delete('/commodity/deleteCategory',commodityInfoHandler.deleteCategoryInfo)


module.exports = router