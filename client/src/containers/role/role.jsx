import React from 'react'
import { Button,Divider,Table,Space } from 'antd'
import './role.scss'
export default function Role() {
  const columns = [
    {
      title: 'Role Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Create Time',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: 'Authorization Time',
      dataIndex: 'authorizationTime',
      key: 'authorizationTime',
    },
    {
      title: 'Authorizer',
      dataIndex: 'authorizer',
      key: 'Authorizer',
    },
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  return (
    <div>
      <div className='create-box'>
        <Button type="primary">Create Role</Button>
        <Button >Set Role Permissions</Button>
      </div>
      <Divider/>
      <div>
      <Table rowSelection={{
          type: 'radio'
        }} columns={columns} dataSource={data} />
      </div>

    </div>
  )
}
