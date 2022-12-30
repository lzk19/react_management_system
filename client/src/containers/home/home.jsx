import React from 'react'
import './home.scss'
import { connect } from 'react-redux';
import { Button } from 'antd';
import { reqUpdateUserInfo } from '../../api/user';
function Home(props) {
  const updateInfo = ()=>{
    reqUpdateUserInfo().then((res)=>{
      console.log('res',res);
    })
  }
  return (
    <div>
      <Button onClick={updateInfo} type="primary">Primary Button</Button>
    </div>
  )
}

export default connect(
 
)(Home)
