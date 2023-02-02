import React, { useEffect, useState } from 'react'
import { Button, Divider, Table, Space,Popconfirm,message } from 'antd'
import { reqGetAllUserInfo,reqDeleteUserInfo } from '../../api/user'
import CreateModal from './modal/modal';
import dayjs from 'dayjs';
export default function User() {
  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Tel',
      dataIndex: 'tel',
      key: 'tel',
    },
    {
      title: 'Registration Time',
      dataIndex: 'registrationTime',
      key: 'registrationTime',
      render: (text) => <span>{dayjs(text).format('YYYY-MM-DD')}</span>,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => changeOpenType('Update', record.id, record.name)}>Update</a>
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={()=>confirm(record.id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <a >Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const [dataSource, setDataSource] = useState([])
  const [open, setOpen] = useState(false)
  const [type, setType] = useState('')
  const [info, setInfo] = useState({})
  useEffect(() => {
    getUserInfo()
  }, [])
  const getUserInfo = () => {
    reqGetAllUserInfo().then((res) => {
      console.log(res);
      setDataSource(res.data)
    })
  }

  const getOpen = (value, type) => {
    setOpen(value)
    if (type === 'submit') {
      getUserInfo()
    }
  }

  const changeOpenType = (type, id, name) => {
    setType(type)
    setInfo({ id, name })
    setOpen(true)
  }

  const confirm = (id)=>{
    delItem(id)
  }

  const delItem = (id) => {
    const body = {
      userInfo: {
        id: id,
      }
    }
    reqDeleteUserInfo(body).then(res => {
      message.success('Delete success!')
      getUserInfo()
    })
  }

  const cancel = ()=>{
    message.info('Cancel deletion');
  }
  return (
    <div>
      <div className='create-box'>
        <Button type="primary" onClick={() => changeOpenType('Create')}>Create User</Button>
      </div>
      <Divider/>
      <div>
        <Table columns={columns} dataSource={dataSource} rowKey={dataSource => `${dataSource.id}`} />
      </div>
      
      <CreateModal open={open} getOpen={getOpen} type={type} info={info} />
    </div>
  )
}
