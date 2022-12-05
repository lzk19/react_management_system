import { SAVE_CURRENT_MENU, CLEAR_CURRENT_MENU } from "../constant";


const initState =  '1'
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