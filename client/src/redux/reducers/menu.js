import { SAVE_CURRENT_MENU, CLEAR_CURRENT_MENU,GET_CURRENT_MENU } from "../constant";


var initState =  sessionStorage.getItem('currentMenu')
if(initState===null){
  initState='/home'
}
export default function menuReducer(preState = initState, action) {
  const { type } = action
  switch (type) {
    case SAVE_CURRENT_MENU:
      let currentMenu = sessionStorage.getItem('currentMenu')
      return currentMenu
    case CLEAR_CURRENT_MENU:
      sessionStorage.removeItem('currentMenu')
      return '1'
    default:
      return preState
  }
}