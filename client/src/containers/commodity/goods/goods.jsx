import React, { useState, useEffect } from 'react'
import { Select, Input, Button, Tag, Space, Table, Divider, message, Popconfirm, Descriptions } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { reqGetGoodsInfo, reqDeleteGoodsInfo, reqSearchGoodsInfo,reqGetGoodsInfoById } from '../../../api/commodity';
import CreateModal from './modal/modal';
import './goods.scss'
export default function Goods() {

  const options = [
    {
      value: 'name',
      label: 'Search by name',
    },
    {
      value: 'des',
      label: 'Search by description',
    },
  ];
  const columns = [
    {
      title: 'Goods Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'des',
      key: 'des',

    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text) => <span>€{text}</span>

    },
    {
      title: 'State',
      key: 'state',
      dataIndex: 'state',

    },
    {
      title: 'Action',
      key: 'action',

      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => showDetails(record.id)}>Details</a>
          <a onClick={() => changeOpenType('Update', record)}>Update</a>
          <Popconfirm
            title="Are you sure to delete this good?"
            onConfirm={() => confirm(record.id)}
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
  const [searchType, setSearchType] = useState('name')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [total, setTotal] = useState(0)
  const [isDetail, setIsDetail] = useState(false)
  const [goodsInfo,setGoodsInfo] = useState({})
  const paginationSetting = {
    showTotal: () => `Total ${total} items`,
    total: total,
    pageSize: 10
  }
  useEffect(() => {
    getGoodsInfo()
  }, [])

  const showDetails = (id) => {
    getGoodsInfoById(id)
    setIsDetail(true)
  }
  const confirm = (id) => {
    delItem(id)
  };
  const cancel = () => {
    message.info('Cancel deletion');
  };

  const getGoodsInfo = () => {
    reqGetGoodsInfo().then((res) => {
      setDataSource(res.data)
      setTotal(res.data.length)
    })
  }

  const getGoodsInfoById = (id) => {
    reqGetGoodsInfoById(id).then((res) => {
      setGoodsInfo(res.data[0])
      console.log('res',res);
    })
  }

  const handleChange = (value) => {
    setSearchType(value)
  };


  const delItem = (id) => {
    const body = {
      goodsInfo: {
        id: id,
      }
    }
    reqDeleteGoodsInfo(body).then(res => {
      message.success('Delete success!')
      getGoodsInfo()
    })
  }

  const getOpen = (value, type) => {
    setOpen(value)
    if (type === 'submit') {
      getGoodsInfo()
    }
  }

  const changeOpenType = (type, record) => {
    setType(type)
    setInfo(record)
    setOpen(true)
  }

  const searchGoods = () => {
    console.log('searchType', searchType);
    console.log('searchKeyword', searchKeyword);
    const body = {
      goodsInfo: {
        type: searchType,
        keyword: searchKeyword
      }
    }
    reqSearchGoodsInfo(body).then((res) => {
      setDataSource(res.data)
      setTotal(res.data.length)
    })
  }

  const changeInputValue = (e) => {
    setSearchKeyword(e.target.value)
  }


  return (
    <div>
      <div style={!isDetail ? { display: 'block' } : { display: 'none' }}>
        <div className='search-box' >
          <Select
            defaultValue="name"
            style={{
              width: 180,
            }}
            onChange={handleChange}
            options={options}
          />
          <Input placeholder="Keyword" className='search-input' onChange={(e) => { changeInputValue(e) }} allowClear />
          <Button type="primary" className="search-btn" onClick={searchGoods} >Search</Button>
          <Button type="primary" className="create-btn" icon={<PlusOutlined className='plus-icon' />} onClick={() => changeOpenType('Create', {})}>Create Goods</Button>
        </div>
      </div>
      <div className='back-title' style={isDetail ? { display: 'block' } : { display: 'none' }} onClick={()=>setIsDetail(false)}>
        <div>Goods</div>
      </div>
      <Divider />
      <div style={!isDetail ? { display: 'block' } : { display: 'none' }}>
        <Table pagination={paginationSetting} columns={columns} dataSource={dataSource} rowKey={dataSource => `${dataSource.id}`} />
      </div>

      <div style={isDetail ? { display: 'block' } : { display: 'none' }}>
        <Descriptions column={2} bordered>
          <Descriptions.Item label="Name">{goodsInfo.name}</Descriptions.Item>
          <Descriptions.Item label="Description">{goodsInfo.des}</Descriptions.Item>
          <Descriptions.Item label="Price">€{goodsInfo.price}</Descriptions.Item>
          <Descriptions.Item label="Category">{goodsInfo.category}</Descriptions.Item>
          <Descriptions.Item label="Picture" span={2}>
            2019-04-24 18:00:00
          </Descriptions.Item>
          <Descriptions.Item label="Detail">{goodsInfo.detail}</Descriptions.Item>
        </Descriptions>
      </div>

      <CreateModal open={open} getOpen={getOpen} type={type} info={info} />
    </div>
  )
}
