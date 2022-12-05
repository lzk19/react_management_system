import Login from '../containers/login/login'
import Admin from '../containers/admin/admin'
import Commodity from '../containers/commodity/commodity'
import Category from '../containers/commodity/category/category'
import Goods from '../containers/commodity/goods/goods'
import User from '../containers/user/user'
import Role from '../containers/role/role'
import Echarts from '../containers/echarts/echarts'
import Bar from '../containers/echarts/bar/bar'
import Line from '../containers/echarts/line/line'
import Pie from '../containers/echarts/pie/pie'
import Order from '../containers/order/order'
import {Navigate} from 'react-router-dom'

export default [
  // 二级及以上路由不加/
  {
    
    path:'/login',
    element:<Login/>,
  },
  {
    name:'1',
    path:'/admin',
    element:<Admin/>
  },
  {
    name:'2',
    path:'/commodity',
    element:<Commodity/>,
    children:[
      {
        name:'sub2-1',
        path:'category',
        element:<Category/>
      },
      {
        name:'sub2-2',
        path:'goods',
        element:<Goods/>
      },
    ]
  },
  {
    name:'3',
    path:'/user',
    element:<User/>
  },
  {
    name:'4',
    path:'/role',
    element:<Role/>
  },
  {
    name:'5',
    path:'/echarts',
    element:<Echarts/>,
    children:[
      {
        name:'sub5-1',
        path:'bar',
        element:<Bar/>
      },
      {
        name:'sub5-2',
        path:'line',
        element:<Line/>
      },
      {
        name:'sub5-3',
        path:'pie',
        element:<Pie/>
      },
    ]
  },
  {
    name:'6',
    path:'/order',
    element:<Order/>
  },

  
  {
    path:'/',
    element:<Navigate to='/login' />
  }
]