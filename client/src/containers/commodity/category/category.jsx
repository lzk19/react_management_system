import React,{useEffect,useState} from 'react'
import { Table, Divider, Button,Space } from 'antd';
import './category.scss'
import { reqGetCategoryInfo,reqCreateCategoryInfo,reqUpdateCategoryInfo,reqDeleteCategoryInfo } from '../../../api/commodity';
import CreateModal from './modal/modal';
export default function Category() {

  const columns = [
    {
      title: 'Category Type',
      dataIndex: 'name',
      key: 'name',
      align:'left',
    },
    {
      title: 'Action',
      key: 'action',
      align:'center',
      render: (_, record) => (
        <Space size="middle" >
          <a onClick={()=>changeOpenType('Update',record.id,record.name)}>Update</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const [dataSource,setDataSource] = useState([])
  const [open,setOpen] = useState(false)
  const [type,setType] = useState('')
  const [info,setInfo] = useState({})
  useEffect(()=>{
    getCategoryInfo()
  },[])

  const getCategoryInfo = ()=>{
    reqGetCategoryInfo().then((res)=>{
      setDataSource(res.data)
    })
  }

  const getOpen = (value,type)=>{
    setOpen(value)
    if(type==='submit'){
      getCategoryInfo()
    }
  }

  const changeOpenType = (type,id,name)=>{
    setType(type)
    setInfo({id,name})
    setOpen(true)
  }

  return (
    <div>
      <div className='create-btn-box'>
        <Button className='create-btn' type="primary" onClick={()=>changeOpenType('Create')} >Create</Button>
      </div>
      <Divider />
      <Table dataSource={dataSource} columns={columns} rowKey={dataSource=>`${dataSource.id}`} />
      <CreateModal open={open} getOpen={getOpen} type={type} info={info}/>
    </div>
  )
}
