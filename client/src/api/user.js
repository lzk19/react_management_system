// 项目中所有请求由这个文件发出
import myAxios from './myAxios'
import { PUB_BASE_URL, Auth_BASE_URL } from '../config'
// 发起登录请求
export const reqLogin = (username, password) => {
  // axios的post请求默认将参数转成json进而发送给服务器
  return myAxios.post(`${PUB_BASE_URL}/login`, { username, password })
}

export async function reqGetUserInfo() {
  return await myAxios.get(`${Auth_BASE_URL}/userInfo`)
}

export async function reqGetAllUserInfo() {
  return await myAxios.get(`${Auth_BASE_URL}/allUserInfo`)
}

export async function reqCreateUserInfo (params){
  return await myAxios.post(`${PUB_BASE_URL}/register`,params)
}

export async function reqUpdateUserInfo(params) {
  return await myAxios.post(`${Auth_BASE_URL}/updateUserInfo`, params)
}

export async function reqUpdatePassword(params) {
  return await myAxios.post(`${Auth_BASE_URL}/updatePassword`, params)
}

export async function reqDeleteUserInfo(params) {
  return await myAxios.post(`${Auth_BASE_URL}/deleteUserInfo`, params)
}