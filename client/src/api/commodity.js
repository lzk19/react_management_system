import myAxios from './myAxios'
import { Auth_BASE_URL } from '../config'

// category
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
  return await myAxios.post(`${Auth_BASE_URL}/commodity/deleteCategory`,params)
}

// goods
export async function reqGetGoodsInfo (){
  return await myAxios.get(`${Auth_BASE_URL}/commodity/goods`)
}

export async function reqGetGoodsInfoById (id){
  return await myAxios.get(`${Auth_BASE_URL}/commodity/goodsById?id=${id}`)
}

export async function reqCreateGoodsInfo (params){
  return await myAxios.post(`${Auth_BASE_URL}/commodity/createGoods`,params)
}

export async function reqUpdateGoodsInfo (params){
  return await myAxios.post(`${Auth_BASE_URL}/commodity/updateGoods`,params)
}

export async function reqDeleteGoodsInfo (params){
  return await myAxios.post(`${Auth_BASE_URL}/commodity/deleteGoods`,params)
}

export async function reqSearchGoodsInfo (params){
  return await myAxios.post(`${Auth_BASE_URL}/commodity/searchGoods`,params)
}

// subcategory
export async function reqGetSubcategoryInfo (params){
  return await myAxios.get(`${Auth_BASE_URL}/commodity/subcategory?parentId=${params}`)
}

export async function reqCreateSubcategoryInfo (params){
  return await myAxios.post(`${Auth_BASE_URL}/commodity/createSubcategory`,params)
}

export async function reqUpdateSubcategoryInfo (params){
  return await myAxios.post(`${Auth_BASE_URL}/commodity/updateSubcategory`,params)
}

export async function reqDeleteSubcategoryInfo (params){
  return await myAxios.post(`${Auth_BASE_URL}/commodity/deleteSubcategory`,params)
}

export async function reqDeleteSubcategoryInfoByParentId (params){
  return await myAxios.post(`${Auth_BASE_URL}/commodity/deleteSubcategoryInfoByParentId`,params)
}



