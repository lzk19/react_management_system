// 16.在此自定义模块中创建数据库的连接对象

// 17.导入mysql模块
const mysql = require('mysql')
// 18.导入配置
const config = require('./config').db

// 19.向外共享db数据库连接对象
module.exports = mysql.createConnection(config)