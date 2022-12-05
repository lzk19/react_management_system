import { message } from "antd";
import axios from "axios";

// 创建axios实例
const instance = axios.create({
  timeout: 4000,
});

// 请求拦截器(发送请求之前执行)
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  });

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 即使账号密码输入错了也是走这里，因为请求是成功的 
    // 请求成功走这里
    return response.data;
  },
  // 请求失败走这里
  (error) => {
    message.error(error.message,2)
    return Promise.reject(error);
  });

export default instance