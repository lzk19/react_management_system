import React, { useRef, useState, useEffect } from 'react';
import { Button, Form, Input, message, Modal, Radio } from 'antd';
import { reqCreateCategoryInfo, reqUpdateCategoryInfo, reqCreateSubcategoryInfo, reqUpdateSubcategoryInfo } from '../../../../api/commodity';
const CreateModal = (props) => {
  const [form] = Form.useForm();
  const myForm = useRef()

  useEffect(() => {
    console.log('props', props);
    form.setFieldsValue({ categoryName: props.info.name })
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
    if (props.level === "top") {
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
          props.getOpen(false, 'submit');
        })
      } else {
        const params = {
          categoryInfo: {
            id: props.info.id,
            info: {
              name: values.categoryName
            }
          }
        }
        reqUpdateCategoryInfo(params).then((res) => {
          message.success('Update success!')
          props.getOpen(false, 'submit');
        })
      }
    } else {
      if (props.type === "Create") {
        const body = {
          subcategoryInfo: {
            info: {
              name: values.categoryName,
              parentId: props.info.parentId,
            }
          }
        }
        reqCreateSubcategoryInfo(body).then((res) => {
          message.success('Create success!')
          props.getOpen(false, 'sub-submit', props.info.parentId);
        })
      } else {
        const params = {
          subcategoryInfo: {
            id: props.info.id,
            info: {
              name: values.categoryName
            }
          }
        }
        reqUpdateSubcategoryInfo(params).then((res) => {
          message.success('Update success!')
          props.getOpen(false, 'sub-submit', props.info.parentId);
        })
      }
    }


  };

  return (
    <Modal
      forceRender={true}
      width={450}
      open={props.open}
      title={props.level === "top" ? props.type + ' Category' : props.type + ' Subcategory'}
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
          name="categoryName"
          label={props.level === "top" ? "Top Category Name" : "Subcategory Name"}
          labelCol={{ span: 10 }}
          rules={[
            {
              required: true,
              message: 'Please input the category name!',
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