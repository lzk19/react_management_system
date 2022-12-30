import { SAVE_USER_INFO,CLEAR_USER_INFO } from "../constant";
export const saveUserInfo = (data)=>{
  // console.log(data);
  // 不论是在sessionStorage还是localStorage里存数据都是字符串，如果存的数据是一个对象，就需要用JSON.stringify转成字符串
  sessionStorage.setItem('userInfo',JSON.stringify(data.user))
  sessionStorage.setItem('isLogin',true)
  sessionStorage.setItem('token',data.token)
  return{type:SAVE_USER_INFO,data:data}
}

export const clearUserInfo = ()=>{
  return{type:CLEAR_USER_INFO}
}