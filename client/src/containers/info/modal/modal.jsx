import React, { useRef, useState } from 'react';
import { Button, Form, Input, message, Modal, Radio } from 'antd';
import './modal.scss'
import { reqUpdatePassword } from '../../../api/user';
const PsdModal = (props) => {
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
    const { oldPwd, newPwd } = values
    reqUpdatePassword({ oldPwd, newPwd }).then((res) => {
      message.success('修改密码成功!')
      form.resetFields();
      props.getOpen(false);
    })
  };

  return (
    <Modal
      width={450}
      open={props.open}
      title="Update password"
      okText="Update"
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
          name="oldPwd"
          label="Old Password"
          rules={[
            {
              required: true,
              message: 'Please input the old password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="newPwd"
          label="New Password"
          rules={[
            { required: true, message: '' },
            {
              validator: (rule, value) => {
                if (!value) {
                  return Promise.reject('please repeat the new password')
                }
                else if (myForm.current.getFieldValue('oldPwd') === value) {
                  return Promise.reject('The old and new passwords cannot be consistent')
                } else {
                  return Promise.resolve()
                }
              }
            }
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="rptPwd"
          label="Repeat Password"
          rules={[
            { required: true, message: '' },
            {
              validator: (rule, value) => {
                if (!value) {
                  return Promise.reject('please repeat the new password')
                }
                else if (myForm.current.getFieldValue('newPwd') === value) {
                  return Promise.resolve()
                } else {
                  return Promise.reject('the two passwords were entered inconsistently')
                }
              }
            }
          ]}
        >
          <Input.Password />
        </Form.Item>

      </Form>
      <span className='tips'>tips: Update password just need to click update button, don't need to click confirm button again</span>
    </Modal>
  );
};
export default PsdModal;