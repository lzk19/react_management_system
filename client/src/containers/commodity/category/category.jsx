import React, { useEffect, useState } from 'react'
import { Table, Divider, Button, Space, message, Popconfirm } from 'antd';
import './category.scss'
import {RightOutlined} from '@ant-design/icons'
import { reqGetCategoryInfo, reqDeleteCategoryInfo, reqGetSubcategoryInfo, reqDeleteSubcategoryInfo,reqDeleteSubcategoryInfoByParentId } from '../../../api/commodity';
import CreateModal from './modal/modal';
export default function Category() {
  const [dataSource, setDataSource] = useState([])
  const [subDataSource, setSubDataSource] = useState([])
  const [open, setOpen] = useState(false)
  const [type, setType] = useState('')
  const [info, setInfo] = useState({})
  const [level, setLevel] = useState('top')
  const [parentId2,setParentId2] = useState(0)
  const columns = [
    {
      title: level === "top" ? "Top Category Name" : "Subcategory Name",
      dataIndex: 'name',
      key: 'name',
      align: 'left',
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size="middle" >
          <a onClick={() => changeOpenType('Update', record.id, record.name,record.parentId)}>Update</a>
          <a onClick={() => showSubcategory(record.id)} style={level === "top" ? { display: "block" } : { display: "none" }} >Show subcategory</a>
          <Popconfirm
            title="Are you sure to delete this category?"
            onConfirm={() => confirm(record.id,record.parentId)}
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

  useEffect(() => {
    getCategoryInfo()
  }, [])

  const confirm = (id,parentId) => {
    if(level==="top"){
      delCategory(id)
    }else{
      delSubcategory(id,parentId)
    }
  }

  const cancel = () => {
    message.info('Cancel deletion');
  }

  const delCategory = (id) => {
    const body = {
      categoryInfo: {
        id: id,
      }
    }
    const params = {
      subcategoryInfo:{
        parentId:id
      }
    }
    
    reqDeleteCategoryInfo(body).then(res => {
      reqDeleteSubcategoryInfoByParentId(params)
      message.success('Delete success!')
      getCategoryInfo()
    })
  }

  const delSubcategory = (id,parentId) => {
    const body = {
      subcategoryInfo: {
        id: id,
      }
    }
    reqDeleteSubcategoryInfo(body).then(res => {
      message.success('Delete success!')
      getSubcategoryInfo(parentId)
    })
  }

  const getCategoryInfo = () => {
    reqGetCategoryInfo().then((res) => {
      setDataSource(res.data)
    })
  }

  const getSubcategoryInfo = (id) => {
    reqGetSubcategoryInfo(id).then((res) => {
      setSubDataSource(res.data)
    })
  }

  const getOpen = (value, type,parentId) => {
    setOpen(value)
    if (type === 'submit') {
      getCategoryInfo()
    }else if(type==='sub-submit'){
      getSubcategoryInfo(parentId)
    }else{

    }
  }

  const changeOpenType = (type, id, name,parentId) => {
    setType(type)
    setInfo({ id, name,parentId })
    setOpen(true)
  }

  const showTop = () => {
    setLevel('top')
  }

  const showSubcategory = (id) => {
    getSubcategoryInfo(id)
    setParentId2(id)
    setLevel('subcategory')
    
  }

  return (
    <div>
      <div className='create-btn-box'>
        <div className='category-title' style={level !== "top" ? { display: "block" } : { display: "none" }} onClick={showTop}>Top Category</div>
        <Button className='create-btn' type="primary" onClick={() => changeOpenType('Create',{},'',parentId2)} >Create</Button>
      </div>
      <Divider />
      <div className='top-category' style={level === "top" ? { display: "block" } : { display: "none" }}>
        <Table dataSource={dataSource} columns={columns} rowKey={dataSource => `${dataSource.id}`} />
      </div>

      <div className='subcategory' style={level === "subcategory" ? { display: "block" } : { display: "none" }}>
        <Table dataSource={subDataSource} columns={columns} rowKey={dataSource => `${dataSource.id}`} />
      </div>

      <CreateModal open={open} getOpen={getOpen} type={type} info={info} level={level} />
    </div>
  )
}
