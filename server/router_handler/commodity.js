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
  const {categoryInfo} = req.body
  // 74.定义查询商品分类信息的SQL语句
  const createCategoryInfoSQL = 'insert into ev_commodity_category set?'
  db.query(createCategoryInfoSQL,categoryInfo.info,(err, results) => {
    // 执行SQL语句失败
    if (err) { return res.cc(err) }

    res.send({
      status: 0,
      message: '添加商品分类信息成功',
    })
  })
}

exports.updateCategoryInfo = (req, res) => {
  const {categoryInfo} = req.body

  const updateCategoryInfoSQL = 'update ev_commodity_category set ? where id=?'
  db.query(updateCategoryInfoSQL,[categoryInfo.info, categoryInfo.id],(err, results) => {
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
  const {categoryInfo} = req.body
  // 74.定义查询商品分类信息的SQL语句
  const createCategoryInfoSQL = 'delete from ev_commodity_category where id=?'
  db.query(createCategoryInfoSQL,categoryInfo.id,(err, results) => {
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