const path = require('path')
const fs = require('fs')
// 63.引入express的multer模块
const multer = require('multer')

// 64.选择diskStorage存储
var storage = multer.diskStorage({
  destination:function(req,file,cb){
    // 72.判断uploads文件中是否存在同一个id的用户的图片，有则删除
    fs.readdir('public/uploads',(err,files)=>{
      if(err){
        return console.log(err);
      }
      for(let i=0;i<files.length;i++){
        var arr = files[i].split('-')
        if(arr[0]==req.user.id){
          fs.unlink('public/uploads/'+files[i],function(err){
            if (err) {
              return console.log(err);
            }
          })
        }
      }
    })
    
    // 64.1文件保存的路径，需要自己创建
    cb(null,path.resolve('public/uploads'))
  },
  filename:function(req,file,cb){
    // 64.2将保存文件名设置为 时间戳+字段名
    
    cb(null,req.user.id+'-'+Date.now()+path.extname(file.originalname))
  }
})

// 65.需要上传的地方使用这个
const upload = multer({storage:storage})
exports.upload = upload