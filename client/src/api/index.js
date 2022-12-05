// 项目中所有请求由这个文件发出
import myAxios from './myAxios'

// 发起登录请求
export const reqLogin = (username,password)=>{
  // axios的post请求默认将参数转成json进而发送给服务器
  return myAxios.post('/api/login',{username,password})
}