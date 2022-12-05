import { combineReducers } from "redux";
import loginReducer from './login'
import menuReducer from "./menu";

export default combineReducers({
  // 该对象里的key决定着store里保存改该状态的key
  // 该对象里的value决定着store里保存该状态的value
  // 在容器组件中通过state.userInfo读取
  userInfo:loginReducer,
  currentMenu:menuReducer
})