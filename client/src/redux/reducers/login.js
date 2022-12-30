// 1.该文件是用于创建一个Count组件服务的reducer，reducer的本质就是一个函数
// 2.reducer函数会接收到两个参数，分别为：之前的状态(preState)，动作对象(action)
import { SAVE_USER_INFO, CLEAR_USER_INFO } from "../constant"

console.log('userInfo',sessionStorage.getItem('userInfo'));
var user = JSON.parse(sessionStorage.getItem('userInfo'))
let token = sessionStorage.getItem('token')
const initState = {
  user: user || '',//user有值则为user，没值则为空
  token: token || '',
  isLogin: user && token ? true : false
} //初始化状态
export default function loginReducer(preState = initState, action) {
  // 从action对象中获取类型type和数据data
  const { type, data } = action
  let newState
  // 根据type决定如何加工数据
  switch (type) {
    case SAVE_USER_INFO:
      newState = { user: data.user, token: data.token, isLogin: true }
      return newState

    case CLEAR_USER_INFO:
      sessionStorage.removeItem('userInfo')
      newState = { user: {}, isLogin: false }
      return newState

    default:
      return preState
  }
}