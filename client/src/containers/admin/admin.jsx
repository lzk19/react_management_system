import React from 'react'
import { useNavigate } from 'react-router-dom';
import './admin.scss'
import { Breadcrumb,Menu, Layout } from 'antd';
import {
  DesktopOutlined,
  FileOutlined,
  HomeOutlined,
  TeamOutlined,
  UserOutlined,
  PieChartOutlined,
  LineChartOutlined,
  BarChartOutlined,
  AreaChartOutlined,
  KeyOutlined,
  GiftOutlined,
  InboxOutlined,
  TagsOutlined,
  FundProjectionScreenOutlined,
  FileDoneOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import { connect } from 'react-redux';
import { clearUserInfo } from '../../redux/actions/login';
import { saveCurrentMenu,clearCurrentMenu } from '../../redux/actions/menu';
const { Header, Sider, Content } = Layout

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Home', '1', <HomeOutlined />),
  getItem('Commodity', '2', <InboxOutlined />,[
    getItem('Category','sub2-1',<TagsOutlined />),
    getItem('Goods','sub2-2',<GiftOutlined />)
  ]),
  
  getItem('User', '3', <UserOutlined />),
  getItem('Role', '4', <KeyOutlined />),
  getItem('Echarts', '5', <FundProjectionScreenOutlined />,[
    getItem('Bar', 'sub5-1',<BarChartOutlined />),
    getItem('Line', 'sub5-2',<LineChartOutlined />),
    getItem('Pie', 'sub5-3',<PieChartOutlined />),
  ]),
  getItem('Order', '6', <FileDoneOutlined />),
];

function Admin(props) {
  const navigate = useNavigate()
  const title = React.useRef()
  const menuRef = React.useRef()
  const [collapsed, setCollapsed] = React.useState(false)
  React.useEffect(() => {
    console.log('props',props);
    if (props.userInfo.isLogin == false) {
      navigate('/login')
    }
  },[props.currentMenu])

  function changeCollapse(value){
    if(value==true){
      title.current.style.visibility ='hidden'
    }else{
      title.current.style.visibility ='visible'
    }
    
    setCollapsed(value)
  }

  function logout(){
    props.clearUserInfo()
    props.clearCurrentMenu()
    navigate('/login')
  }

  function changeCurrentMenu(e){
    props.saveCurrentMenu(e.key)
    // navigate(e.key)
    console.log('menuRef.current.props.items',menuRef.current.props.items);
    const menuItem = menuRef.current.props.items.find((item)=>{
      return item.key===e.key
    })
  }
  

  return (
    <Layout style={{ minHeight: '100vh' }}>

    <Sider collapsible collapsed={collapsed} onCollapse={value => changeCollapse(value)} className='sider' >
      <div className='title' ref={title}>System</div>
      
      <Menu defaultSelectedKeys={props.currentMenu} mode="inline" ref={menuRef} onClick={changeCurrentMenu} items={items} className="menu" />
    </Sider>

    <Layout className="site-layout">
      <Header className="site-layout-background" style={{ height:'50px'}}>
        <span className='welcome'>Welcome {props.userInfo.user.username}</span>
        <LogoutOutlined className='logout' onClick={logout}/>
      </Header>
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item>Bill</Breadcrumb.Item>
        </Breadcrumb>
        
      </Content>
    </Layout>
  </Layout>
  )
}

export default connect(
  state => ({ userInfo: state.userInfo,currentMenu:state.currentMenu }), {clearUserInfo,clearCurrentMenu,saveCurrentMenu}
)(Admin)
