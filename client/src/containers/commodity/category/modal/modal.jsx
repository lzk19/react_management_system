import React, { useRef, useState,useEffect } from 'react';
import { Button, Form, Input, message, Modal, Radio } from 'antd';
import { reqCreateCategoryInfo,reqUpdateCategoryInfo } from '../../../../api/commodity';
const CreateModal = (props) => {
  console.log('props',props);
  // console.log(props.type);
  const [form] = Form.useForm();
  const myForm = useRef()
  
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
        categoryInfo: {
          info: {
            name: values.categoryName
          }
        }
      }
      reqCreateCategoryInfo(body).then((res) => {
        message.success('Create success!')
        props.getOpen(false,'submit');
      })
    }else{
      const params = {
        categoryInfo: {
          id:props.info.id,
          info: {
            name: values.categoryName
          }
        }
      }
      reqUpdateCategoryInfo()
    }

  };

  return (
    <Modal
      width={450}
      open={props.open}

      title={props.type + ' category'}
      okText="Create"
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
              initialValues={
                props.info.name
              }
          name="categoryName"
          label="Category Name"
          rules={[
            {
              required: true,
              message: 'Please input the category name!',
            },
          ]}
        >
          <Input allowClear/>
        </Form.Item>

      </Form>
    </Modal>
  );
};
export default CreateModal;