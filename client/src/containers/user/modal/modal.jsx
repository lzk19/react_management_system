import React, { useRef, useState, useEffect } from 'react';
import { Button, Form, Input, message, Modal, Radio } from 'antd';
import { reqUpdateUserInfo, reqCreateUserInfo } from '../../../api/user';
import dayjs from 'dayjs'
const CreateModal = (props) => {
  const [form] = Form.useForm();
  const myForm = useRef()

  const onCancel = () => {
    props.getOpen(false);
    form.resetFields();
  }

  const onOk = () => {
    if(props.type==="Create"){
      form
      .validateFields()
      .then((values) => {
        onCreate(values);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
    }else{
      form
      .validateFields(['role']).then((values) => {
        onCreate(values);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
    }

  }

  const onCreate = (values) => {
    if (props.type === "Create") {
      const userInfo = {
        username: values.username,
        password: values.password,
        email: values.email,
        tel: values.tel,
        role: values.role,
        registrationTime: dayjs().format('YYYY-MM-DD')

      }
      reqCreateUserInfo(userInfo).then((res) => {
        message.success('Create success!')
        props.getOpen(false, 'submit');
      })
    } else {
      reqUpdateUserInfo({ ...values, id: props.info.id, }).then(() => {
        message.success('Update success!')
        props.getOpen(false, 'submit');
      })
    }

  };

  return (
    <Modal
      width={450}
      open={props.open}

      title={props.type + ' User'}
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
        initialValues={{
          categoryName: props.type === 'Update' ? props.info.name : ''
        }}
      >

        <Form.Item
          hidden={props.type === 'Update' ? true : false}
          name="username"
          label="Username"
          rules={[
            {
              required: true,
              message: 'Please input the username!',
            },
          ]}
        >
          <Input allowClear />
        </Form.Item>

        <Form.Item
        hidden={props.type === 'Update' ? true : false}
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: 'Please input the email!',
            },
          ]}
        >
          <Input allowClear />
        </Form.Item>

        <Form.Item
          name="tel"
          label="Tel"
          hidden={props.type === 'Update' ? true : false}
          rules={[
            {
              required: true,
              message: 'Please input the telephone!',
            },
          ]}
        >
          <Input allowClear />
        </Form.Item>

        <Form.Item
          name="role"
          label="Role"
          rules={[
            {
              required: true,
              message: 'Please input the role!',
            },
          ]}
        >
          <Input allowClear />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          hidden={props.type === 'Update' ? true : false}
          rules={[
            {
              required: true,
              message: 'Please input the password!',
            },
          ]}
        >
          <Input.Password allowClear />
        </Form.Item>

        <Form.Item
          name="rptPassword"
          label="Repeat Password"
          hidden={props.type === 'Update' ? true : false}
          rules={[
            {
              required: true,
              message: '',
            },
            {
              validator: (rule, value) => {
                if (!value) {
                  return Promise.reject('Please repeat the password!')
                }
                else if (myForm.current.getFieldValue('password') !== value) {
                  return Promise.reject('The two passwords must be the same')
                } else {
                  return Promise.resolve()
                }
              }
            }
          ]}
        >
          <Input.Password allowClear />
        </Form.Item>

      </Form>
    </Modal>
  );
};
export default CreateModal;