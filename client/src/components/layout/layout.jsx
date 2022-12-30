import React from 'react'
import { useNavigate, useLocation, useRoutes, Outlet, Routes, Route, Navigate, NavLink } from 'react-router-dom';
import './layout.scss'
import { Breadcrumb, Menu, Layout, Card, Image, Avatar, Dropdown, Button, Space } from 'antd';
import {
  DownOutlined,
  HomeOutlined,
  UserOutlined,
  PieChartOutlined,
  LineChartOutlined,
  BarChartOutlined,
  KeyOutlined,
  GiftOutlined,
  InboxOutlined,
  TagsOutlined,
  FundProjectionScreenOutlined,
  FileDoneOutlined,
  LogoutOutlined,
  CaretDownOutlined,

} from '@ant-design/icons'
import { connect } from 'react-redux';
import { clearUserInfo } from '../../redux/actions/login';
import { saveCurrentMenu, clearCurrentMenu, getCurrentMenu } from '../../redux/actions/menu';
const { Header, Sider, Content } = Layout
const menuItems = [
  {
    label: 'Home',
    key: '/home',
    icon: <HomeOutlined />
  },
  {
    label: 'Commodity',
    key: '/commodity',
    icon: <InboxOutlined />,
    children: [
      {
        label: 'Category',
        key: '/commodity/category',
        icon: <TagsOutlined />
      },
      {
        label: 'Goods',
        key: '/commodity/goods',
        icon: <GiftOutlined />
      },
    ]
  },
  {
    label: 'User',
    key: '/user',
    icon: <UserOutlined />
  },
  {
    label: 'Role',
    key: '/role',
    icon: <KeyOutlined />
  },
  {
    label: 'Echarts',
    key: '/echarts',
    icon: <FundProjectionScreenOutlined />,
    children: [
      {
        label: 'Bar',
        key: '/echarts/bar',
        icon: <BarChartOutlined />
      },
      {
        label: 'Line',
        key: '/echarts/line',
        icon: <LineChartOutlined />
      },
      {
        label: 'Pie',
        key: '/echarts/pie',
        icon: <PieChartOutlined />
      },
    ]
  },

  {
    label: 'Order',
    key: '/order',
    icon: <FileDoneOutlined />
  }

];



function MainLayout(props) {
  const items = [
    {
      label: <span>Signed in as <span style={{ fontWeight: 500 }}>{props.userInfo.user.username}</span></span>,
      key: 'info',
    },
    {
      type: 'divider',
    },
    {
      label: 'Your profile',
      key: 'profile',
    },
    {
      type: 'divider',
    },
    {
      label: 'Sign out',
      key: 'sign-out',
    },
  ];
  const navigate = useNavigate()
  const location = useLocation()
  const title = React.useRef()
  const menuRef = React.useRef()
  const [collapsed, setCollapsed] = React.useState(false)
  let [urlPath,setUrlPath] = React.useState([])
  urlPath.shift()
  React.useEffect(() => {
    if (props.userInfo.isLogin == false) {
      navigate('/login')
    }
    
  }, [props.userInfo.isLogin])

  React.useEffect(()=>{
    setUrlPath(location.pathname.split('/'))
  },[location.pathname])

  const changeCollapse = (value) => {
    if (value == true) {
      title.current.style.visibility = 'hidden'
    } else {
      title.current.style.visibility = 'visible'
    }

    setCollapsed(value)
  }

  const logout = () => {
    props.clearUserInfo()
    props.clearCurrentMenu()
    navigate('/login')
  }

  const changeCurrentMenu = (e) => {
    props.saveCurrentMenu(e.key)
    navigate(e.key)
  }

  const showInfo = () => {
    navigate('info')
  }

  const onClick = ({ key }) => {
    if (key === 'sign-out') {
      logout()
    } else if (key === 'info' || key === 'profile') {
      showInfo()
    }
  }


  return (
    // 整体布局
    <Layout style={{ minHeight: '100vh' }}>
      {/* 左侧导航栏 */}
      <Sider collapsible collapsed={collapsed} onCollapse={value => changeCollapse(value)} className='sider' >
        <div className='title' ref={title}>System</div>
        <Menu onClick={changeCurrentMenu} defaultSelectedKeys={props.currentMenu} mode="inline" ref={menuRef} items={menuItems} className="menu" />
      </Sider>
      <Layout className="site-layout">
        {/* 头部 */}
        <Header className="site-layout-background">
          {/* 个人信息下拉框 */}
          <Dropdown overlayClassName='dropdown-box' menu={{ items, onClick }} trigger={['click']} placement="bottomRight" arrow={{ pointAtCenter: true }}>
            <div className='welcome-box'>
              <Avatar className='avatar' src={<Image preview={false} src={'api/'+props.userInfo.user.avatar} />} />
              <CaretDownOutlined className='iconD' />
            </div>
          </Dropdown>
        </Header>
        {/* 主体内容 */}
        <Content style={{ margin: '0 16px' }}>
          {/* 面包屑 */}
          <Breadcrumb style={{ margin: '9px 0' }}>
            {urlPath.map((item) => {
              return <Breadcrumb.Item key={item} >{item.slice(0, 1).toUpperCase() + item.slice(1)}</Breadcrumb.Item>
            })}
          </Breadcrumb>
          <Card
            style={{
              width: '100%',
            }}
          >
            {/* 子组件展示区 */}
            <Outlet></Outlet>
          </Card>
        </Content>
      </Layout>
    </Layout>
  )
}

export default connect(
  state => ({ userInfo: state.userInfo, currentMenu: state.currentMenu }), { clearUserInfo, clearCurrentMenu, saveCurrentMenu, getCurrentMenu }
)(MainLayout)
