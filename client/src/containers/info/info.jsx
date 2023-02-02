import React, { useState, useCallback, useRef, createRef, useEffect } from 'react'
import { Avatar, Button, Checkbox, Form, Input, message, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined,EditOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { reqUpdateUserInfo, reqGetUserInfo } from '../../api/user';
import './info.scss'
import PsdModal from './modal/modal';
import { saveUserInfo } from '../../redux/actions/login';
function Info(props) {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [open,setOpen] = useState(false)
  const [headers,setHeaders] = useState('')
  const [avatar,setAvatar] =useState('')
  const myForm = useRef()

  useEffect(() => {
    getUserInfo()
  }, [])

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
      message.success('修改头像成功!')
      getUserInfo()
    }
  };
  const beforeUpload = (file) => {
    setHeaders(props.userInfo.token)
  };


  
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  const onFinish = (values) => {
    reqUpdateUserInfo({ ...values, id: props.userInfo.user.id }).then(() => {
      message.success('Update success!')
    })
    getUserInfo()
    
  };

  const getUserInfo = () => {
    reqGetUserInfo().then((res) => {
      const { id, username, nickname, email, avatar,tel } = res.data
      const info = {user:{id, username, nickname, email, avatar,tel},token:props.userInfo.token}
      myForm.current.setFieldsValue({
        username: username,
        tel: tel,
        email: email,
      })
      setAvatar(avatar)
      props.saveUserInfo(info)
    })
  }

  const openTrue = ()=>{
    setOpen(true)
  }

  const getOpen = (value)=>{
    setOpen(value)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className='my-info'>
      <Upload
        name="files"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="/api/files"
        beforeUpload={beforeUpload}
        onChange={handleChange}
        headers={{authorization:headers}}
      >
        {props.userInfo.user.avatar ? (
          <img
            src={'api/'+props.userInfo.user.avatar}
            alt="avatar"
            style={{
              width: '100%',
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>

        <Form
          ref={myForm}
          className='info-form'
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          labelCol={{ span: 6 }}
          labelAlign="right"
        >
          <Form.Item
            label="Username"
            name="username"
          >
            <Input allowClear />
          </Form.Item>

          <Form.Item
            label="Tel"
            name="tel"
          >
            <Input allowClear />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
          >
            <Input allowClear />
          </Form.Item>

          <div className='password-box'>
            <div className='password-label'>Password:</div>
            <Input.Password disabled value={111111} className='password-input' />
            <EditOutlined className='edit-icon' onClick={openTrue} />
            {/* onClick={setOpen(true)}  */}
          </div>

          <Form.Item className='confirm-btn'>
            <Button type="primary" htmlType='submit'>
              Confirm
            </Button>
          </Form.Item>
        </Form>

        <PsdModal open={open} getOpen={getOpen} />

    </div>
  )
}


export default connect(
  state => ({ userInfo: state.userInfo }), {saveUserInfo:saveUserInfo}
)(Info)