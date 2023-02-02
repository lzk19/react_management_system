import React, { useRef, useState, useEffect } from 'react';
import { Button, Form, Input, message, Modal, Radio,InputNumber } from 'antd';
import { reqCreateGoodsInfo, reqUpdateGoodsInfo } from '../../../../api/commodity';
const CreateModal = (props) => {
  const [form] = Form.useForm();
  const myForm = useRef()

  useEffect(() => {
    console.log('props', props);
    form.setFieldsValue({ name:props.info.name,des:props.info.des, price:props.info.price,})
  }, [props.open])

  const onCancel = () => {
    props.getOpen(false);
    form.resetFields();
  }

  const onOk = () => {
    form
      .validateFields()
      .then((values) => {
        onCreate(values);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  }

  const onCreate = (values) => {
    if (props.type === "Create") {
      const body = {
        goodsInfo: {
          info: {
            name: values.name,
            des: values.des,
            price: values.price,
          }
        }
      }
      reqCreateGoodsInfo(body).then((res) => {
        message.success('Create success!')
        props.getOpen(false, 'submit');
      })
    } else {
      const params = {
        goodsInfo: {
          id: props.info.id,
          info: {
            name: values.name,
            des: values.des,
            price: values.price,
          }
        }
      }
      reqUpdateGoodsInfo(params).then((res) => {
        message.success('Update success!')
        props.getOpen(false, 'submit');
      })
    }

  };

  return (
    <Modal
      width={450}
      open={props.open}
      forceRender={true}
      title={props.type + ' goods'}
      okText={props.type}
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={onOk}
    >
      <Form
        ref={myForm}
        form={form}
        name="form_in_modal"
        labelCol={{ offset: -2, span: 8 }}
        labelAlign="left"
      >

        <Form.Item
          name="name"
          label="Goods Name"
          rules={[
            {
              required: true,
              message: 'Please input the goods name!',
            },
          ]}
        >
          <Input allowClear />
        </Form.Item>

        <Form.Item
          name="des"
          label="Goods Description"
          rules={[
            {
              required: true,
              message: 'Please input the goods description!',
            },
          ]}
        >
          <Input allowClear />
        </Form.Item>

        <Form.Item
          name="price"
          label="Goods Price"
          rules={[
            {
              required: true,
              message: 'Please input the goods price!',
            },
          ]}
        >
          <Input allowClear />
        </Form.Item>

        <Form.Item
          name="category"
          label="Goods Category"
          rules={[
            {
              required: true,
              message: 'Please input the goods category!',
            },
          ]}
        >
          <Input allowClear />
        </Form.Item>


        <Form.Item
          name="detail"
          label="Goods Detail"
          rules={[
            {
              required: true,
              message: 'Please input the goods detail!',
            },
          ]}
        >
          <Input allowClear />
        </Form.Item>

      </Form>
    </Modal>
  );
};
export default CreateModal;