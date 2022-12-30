import { message } from "antd";
import axios from "axios";
import store from '../redux/store'
import {clearUserInfo} from '../redux/actions/login'
// 创建axios实例
const instance = axios.create({
  timeout: 4000,
});

// 请求拦截器(发送请求之前执行)
instance.interceptors.request.use(
  (config) => {
    // 从redux中获取之前所保存的token
    const {token} = store.getState().userInfo
    // 向请求头中添加token，用于校验身份
    if(token) config.headers.Authorization = token
    return config;
  },
  (error) => {
    return Promise.reject(error);
  });

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    // 即使账号密码输入错了也是走这里，因为请求是成功的 
    // 请求成功走这里
    if(res.data.status===1){
      message.error(res.data.message,2)
      if(res.data.message=='身份认证失败!请重新登录!'){
        store.dispatch(clearUserInfo())
        console.log(store.getState().userInfo);
      }
      return Promise.reject(res);
    }
    return res.data;
    
  },
  // 请求失败走这里
  (err) => {
    // console.log('出错了');
    message.error(err.message,2)
    return Promise.reject(err);
  });

export default instance