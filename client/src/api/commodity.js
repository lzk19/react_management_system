import myAxios from './myAxios'
import { Auth_BASE_URL } from '../config'

export async function reqGetCategoryInfo (){
  return await myAxios.get(`${Auth_BASE_URL}/commodity/category`)
}

export async function reqCreateCategoryInfo (params){
  return await myAxios.post(`${Auth_BASE_URL}/commodity/createCategory`,params)
}

export async function reqUpdateCategoryInfo (params){
  return await myAxios.post(`${Auth_BASE_URL}/commodity/updateCategory`,params)
}

export async function reqDeleteCategoryInfo (params){
  return await myAxios.delete(`${Auth_BASE_URL}/commodity/deleteCategory`,params)
}