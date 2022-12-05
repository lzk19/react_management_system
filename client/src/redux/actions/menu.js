import { SAVE_CURRENT_MENU,CLEAR_CURRENT_MENU } from "../constant";
export const saveCurrentMenu = (data)=>{
  sessionStorage.setItem('currentMenu',data)
  return {type:SAVE_CURRENT_MENU,data:data}
}
export const clearCurrentMenu = (data)=>{
  return {type:CLEAR_CURRENT_MENU}
}