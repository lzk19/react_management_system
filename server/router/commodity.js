// 73.获取商品信息的路由模块
const express = require('express')
const router = express.Router()


const commodityInfoHandler = require('../router_handler/commodity')
const {filesUpload} = require('../middlewares/upload')

// 获取商品分类信息的路由
router.get('/commodity/category',commodityInfoHandler.getCategoryInfo) 
router.post('/commodity/createCategory',commodityInfoHandler.createCategoryInfo)
router.post('/commodity/updateCategory',commodityInfoHandler.updateCategoryInfo)
router.post('/commodity/deleteCategory',commodityInfoHandler.deleteCategoryInfo)

router.get('/commodity/subcategory',commodityInfoHandler.getSubcategoryInfo) 
router.post('/commodity/createSubcategory',commodityInfoHandler.createSubcategoryInfo)
router.post('/commodity/updateSubcategory',commodityInfoHandler.updateSubcategoryInfo)
router.post('/commodity/deleteSubcategory',commodityInfoHandler.deleteSubcategoryInfo)
router.post('/commodity/deleteSubcategoryInfoByParentId',commodityInfoHandler.deleteSubcategoryInfoByParentId)

// 获取商品信息的路由
router.get('/commodity/goods',commodityInfoHandler.getGoodsInfo)
router.get('/commodity/goodsById',commodityInfoHandler.getGoodsInfoById) 
router.post('/commodity/createGoods',commodityInfoHandler.createGoodsInfo)
router.post('/commodity/updateGoods',commodityInfoHandler.updateGoodsInfo)
router.post('/commodity/deleteGoods',commodityInfoHandler.deleteGoodsInfo)
router.post('/commodity/searchGoods',commodityInfoHandler.searchGoodsInfo)
router.post('/commodity/uploadGoodsPic',filesUpload.array('files'),commodityInfoHandler.uploadGoodsPic)
module.exports = router