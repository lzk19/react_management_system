import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Checkbox, Form, Input, message } from 'antd';
import { UserOutlined } from '@ant-design/icons'
import { reqLogin } from '../../api';
import store from '../../redux/store';
import './login.scss'
import { connect } from 'react-redux';
import { saveUserInfo } from '../../redux/actions/login';
function Login(props) {
  const navigate = useNavigate()
  React.useEffect(()=>{
    console.log('props',props);
  },[])
  const onFinish = (values) => {
    const { username, password } = values
    reqLogin(username, password).then((res) => {
      console.log('res', res);
      if (res.status === 0) {
        const { username, password, email, phone, role } = res.data
        const info = { user:{username, password, email, phone, role}}
        props.saveUserInfo(info)
        navigate('/admin')
      } else {
        message.error('账号或密码错误')
      }
    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };



  return (
    <div id="login" style={{ height: document.documentElement.clientHeight }}>
      <div className='header'>
        <h1>E-commerce Back Management System</h1>
      </div>
      <div className='content'>
        <div className='form' >
          <h2>Login</h2>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 8,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
            >
              <Input allowClear />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
            // rules={[{ validator: checkPassword }]}
            >

              <Input.Password allowClear />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 7,
                span: 7,
              }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 6,
                span: 7,
              }}
            >
              <Button type="primary" htmlType="submit" >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    userInfo:state.userInfo
  }
}

const mapDispatchToProps = {
  saveUserInfo: saveUserInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
