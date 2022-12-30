import { Navigate } from 'react-router-dom'
import { lazy } from 'react'
import Home from '../containers/home/home'
import Login from '../containers/login/login'
import Layout from '../components/layout/layout'
import User from '../containers/user/user'
import Role from '../containers/role/role'
import Category from '../containers/commodity/category/category'
import Goods from '../containers/commodity/goods/goods'
import Bar from '../containers/echarts/bar/bar'
import Line from '../containers/echarts/line/line'
import Pie from '../containers/echarts/pie/pie'
import Order from '../containers/order/order'
import Info from '../containers/info/info'
const routes = [
  // 二级及以上路由不加/
  {
    path: '/login',
    element:<Login/>
  },
  {
    path: '/',
    element: <Navigate to='/login' />
  },
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        path:'home',
        element:<Home/>
      },
      {
        path: 'commodity',
        children: [
          {
            path: 'category',
            element:<Category/>
          },
          {
            path: 'goods',
            element:<Goods/>
          },
        ]
      },
      {
        path: 'user',
        element:<User/>
      },
      {
        path: 'role',
        element:<Role/>
      },
      {
        path: 'echarts',
        children: [
          {
            path: 'bar',
            element:<Bar/>
          },
          {
            path: 'line',
            element:<Line/>
          },
          {
            path: 'pie',
            element:<Pie/>
          },
        ]
      },
      {
        path: 'order',
        element:<Order/>
      },
      {
        path: 'info',
        element:<Info/>
      },
    ]
  },
]
export default routes