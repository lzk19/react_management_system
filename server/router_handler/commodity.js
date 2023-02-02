const db = require('../database/index')

exports.getCategoryInfo = (req, res) => {
  // 74.定义查询商品分类信息的SQL语句
  const getCategoryInfoSQL = 'select * from ev_commodity_category'
  db.query(getCategoryInfoSQL, (err, results) => {
    // 执行SQL语句失败
    if (err) { return res.cc(err) }
    // 商品分类信息获取成功
    res.send({
      status: 0,
      message: '获取商品分类信息成功',
      data: results
    })
  })
}

exports.createCategoryInfo = (req, res) => {
  const { categoryInfo } = req.body
  // 74.定义查询商品分类信息的SQL语句
  const createCategoryInfoSQL = 'insert into ev_commodity_category set?'
  db.query(createCategoryInfoSQL, categoryInfo.info, (err, results) => {
    // 执行SQL语句失败
    if (err) { return res.cc(err) }

    res.send({
      status: 0,
      message: '添加商品分类信息成功',
    })
  })
}

exports.updateCategoryInfo = (req, res) => {
  const { categoryInfo } = req.body

  const updateCategoryInfoSQL = 'update ev_commodity_category set ? where id=?'
  db.query(updateCategoryInfoSQL, [categoryInfo.info, categoryInfo.id], (err, results) => {
    // 执行SQL语句失败
    if (err) { return res.cc(err) }
    if (results.affectedRows !== 1) {
      return res.cc('商品分类不存在!')
    }
    res.send({
      status: 0,
      message: '修改商品分类信息成功',
    })
  })
}

exports.deleteCategoryInfo = (req, res) => {
  const { categoryInfo } = req.body
  // 74.定义查询商品分类信息的SQL语句
  const createCategoryInfoSQL = 'delete from ev_commodity_category where id=?'
  db.query(createCategoryInfoSQL, categoryInfo.id, (err, results) => {
    // 执行SQL语句失败
    if (err) { return res.cc(err) }
    if (results.affectedRows !== 1) {
      return res.cc('商品分类不存在!')
    }
    res.send({
      status: 0,
      message: '删除商品分类信息成功',
    })
  })
}

exports.getSubcategoryInfo = (req, res) => {
  // 74.定义查询商品分类信息的SQL语句
  const getSubcategoryInfoSQL = 'select * from ev_commodity_subcategory where parentId=?'
  db.query(getSubcategoryInfoSQL, req.query.parentId, (err, results) => {
    // 执行SQL语句失败
    if (err) { return res.cc(err) }
    // 商品分类信息获取成功
    res.send({
      status: 0,
      message: '获取商品分类信息成功',
      data: results
    })
  })
}

exports.createSubcategoryInfo = (req, res) => {
  const { subcategoryInfo } = req.body
  // 74.定义查询商品分类信息的SQL语句
  const createSubcategoryInfoSQL = 'insert into ev_commodity_subcategory set?'
  db.query(createSubcategoryInfoSQL, subcategoryInfo.info, (err, results) => {
    // 执行SQL语句失败
    if (err) { return res.cc(err) }

    res.send({
      status: 0,
      message: '添加商品分类信息成功',
    })
  })
}

exports.updateSubcategoryInfo = (req, res) => {
  const { subcategoryInfo } = req.body

  const updateSubcategoryInfoSQL = 'update ev_commodity_subcategory set ? where id=?'
  db.query(updateSubcategoryInfoSQL, [subcategoryInfo.info, subcategoryInfo.id], (err, results) => {
    // 执行SQL语句失败
    if (err) { return res.cc(err) }
    if (results.affectedRows !== 1) {
      return res.cc('商品分类不存在!')
    }
    res.send({
      status: 0,
      message: '修改商品分类信息成功',
    })
  })
}

exports.deleteSubcategoryInfo = (req, res) => {
  const { subcategoryInfo } = req.body
  // 74.定义查询商品分类信息的SQL语句
  const createSubcategoryInfoSQL = 'delete from ev_commodity_subcategory where id=?'
  db.query(createSubcategoryInfoSQL, subcategoryInfo.id, (err, results) => {
    // 执行SQL语句失败
    if (err) { return res.cc(err) }
    if (results.affectedRows !== 1) {
      return res.cc('商品分类不存在!')
    }
    res.send({
      status: 0,
      message: '删除商品分类信息成功',
    })
  })
}

exports.deleteSubcategoryInfoByParentId = (req, res) => {
  const { subcategoryInfo } = req.body
  // 74.定义查询商品分类信息的SQL语句
  const createSubcategoryInfoSQL = 'delete from ev_commodity_subcategory where parentId=?'
  db.query(createSubcategoryInfoSQL, subcategoryInfo.parentId, (err, results) => {
    // 执行SQL语句失败
    if (err) { return res.cc(err) }
    res.send({
      status: 0,
      message: '删除商品分类信息成功',
    })
  })
}

exports.getGoodsInfo = (req, res) => {
  // 74.定义查询商品分类信息的SQL语句
  const getGoodsInfoSQL = 'select * from ev_commodity_goods'
  db.query(getGoodsInfoSQL, (err, results) => {
    // 执行SQL语句失败
    if (err) { return res.cc(err) }
    // 商品分类信息获取成功
    res.send({
      status: 0,
      message: '获取商品信息成功',
      data: results
    })
  })
}

exports.getGoodsInfoById = (req, res) => {
  // 74.定义查询商品分类信息的SQL语句
  const getGoodsInfoByIdSQL = 'select * from ev_commodity_goods where id=?'
  db.query(getGoodsInfoByIdSQL, req.query.id, (err, results) => {
    // 执行SQL语句失败
    if (err) { return res.cc(err) }
    // 商品分类信息获取成功
    res.send({
      status: 0,
      message: '获取商品信息成功',
      data: results
    })
  })
}

exports.createGoodsInfo = (req, res) => {
  const { goodsInfo } = req.body
  // 74.定义查询商品分类信息的SQL语句
  const createGoodsInfoSQL = 'insert into ev_commodity_goods set?'
  db.query(createGoodsInfoSQL, goodsInfo.info, (err, results) => {
    // 执行SQL语句失败
    if (err) { return res.cc(err) }

    res.send({
      status: 0,
      message: '添加商品信息成功',
    })
  })
}

exports.updateGoodsInfo = (req, res) => {
  const { goodsInfo } = req.body

  const updateGoodsInfoSQL = 'update ev_commodity_goods set ? where id=?'
  db.query(updateGoodsInfoSQL, [goodsInfo.info, goodsInfo.id], (err, results) => {
    // 执行SQL语句失败
    if (err) { return res.cc(err) }
    if (results.affectedRows !== 1) {
      return res.cc('商品不存在!')
    }
    res.send({
      status: 0,
      message: '修改商品信息成功',
    })
  })
}

exports.deleteGoodsInfo = (req, res) => {
  const { goodsInfo } = req.body
  // 74.定义查询商品分类信息的SQL语句
  const createGoodsInfoSQL = 'delete from ev_commodity_goods where id=?'
  db.query(createGoodsInfoSQL, goodsInfo.id, (err, results) => {
    // 执行SQL语句失败
    if (err) { return res.cc(err) }
    if (results.affectedRows !== 1) {
      return res.cc('商品不存在!')
    }
    res.send({
      status: 0,
      message: '删除商品信息成功',
    })
  })
}

exports.searchGoodsInfo = (req, res) => {
  const { goodsInfo } = req.body
  const searchGoodsSQL = `select * from ev_commodity_goods where ${goodsInfo.type} like '%${goodsInfo.keyword}%'`
  db.query(searchGoodsSQL, (err, results) => {
    // 执行SQL语句失败
    if (err) { return res.cc(err) }
    res.send({
      status: 0,
      message: '查询商品信息成功',
      data: results
    })
  })
}

exports.uploadGoodsPic = (req, res) => {
  console.log('req',req.files);
  const uploadGoodsPictureSQL = 'insert into ev_files set?'
  // db.query(uploadGoodsPictureSQL,['uploads/'+path.basename(req.file.path),req.user.id],(err,results)=>{
  // db.query(uploadGoodsPictureSQL,[{name:req.file.file}],(err, results) => {
  //   if (err) { return res.cc(err) }
  //   // 判断影响行数是否等于1
  //   if (results.affectedRows !== 1) { return res.cc('更换头像失败') }
  //   res.send({
  //     status: 0,
  //     message: '上传成功',
  //     name: req.file.originalname,
  //     filePath: 'uploads/' + path.basename(req.file.path)
  //   })
  // })
}

