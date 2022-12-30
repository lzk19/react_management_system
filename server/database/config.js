// 18.创建数据库配置
module.exports = {
  port:80,//express服务启动端口
  db:{
    host:'localhost',//主机名
    port:3306, //MySQL默认端口号为3306,
    user:'root', //MySQL账号
    password:'123456', //MySQL密码
    database:'react_project', //数据库名称
    useConnectionPooling: true
  }
}