import React from 'react';
import { Modal, Button, Form, Switch, Input } from 'antd';
import { Dispatch } from 'dva';
import { connect } from 'react-redux';
import { FormInstance } from 'antd/es/form';
import { IAddStoreExists } from '@/pages/types/storeManagement';


interface IProps {
  visible: boolean;
  dispatch: Dispatch;
  onShow(visible: boolean): void;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

class AddStoreModel extends React.Component<IProps> {

  formRef = React.createRef<FormInstance>();

  onSubmit = async (values: any) => {
    const params = {
      address: values.address,
      password: values.passWord,
      phoneNumber: values.phoneNumber,
      status: values.status,
      storeName: values.storeName,
      userName: values.userName,
      realName: values.realName
    };
    const submitRes: IAddStoreExists = await this.props.dispatch({
      type: 'storeManagement/addStoreManagementEffect',
      params
    });
    if (!submitRes.userNameExists || !submitRes.storeNameExists) {
      const userNameError = submitRes.userNameExists ? {} : {
        name: 'userName',
        errors: ['该用户名称已存在']
      };
      const storeNameError = submitRes.storeNameExists ? {} : {
        name: 'storeName',
        errors: ['该门店名称已存在']
      };
      const errorList = [
        userNameError,
        storeNameError
      ];
      // @ts-ignore
      this.formRef.current.setFields(errorList);
      return;
    }
    this.props.onShow(false);
  };

  render() {
    return (
      <Modal
        title="创建门店信息"
        visible={this.props.visible}
        footer={null}
        closable={false}
        destroyOnClose
      >
        <Form {...layout} name="storeAddForm" ref={this.formRef} onFinish={this.onSubmit}>
          <Form.Item
            name="storeName"
            label="门店名称"
            rules={[
              {
                required: true,
                message: '输入门店名称!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="status"
            label="系统使用状态"
            initialValue={true}
            rules={[{required: true, message: '不可以为空'}]}
          >
            <Switch defaultChecked/>
          </Form.Item>
          <Form.Item
            name="realName"
            label="管理员 (真实姓名)"
            rules={[
              {
                required: true,
                message: '输入管理员 (真实姓名)!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="userName"
            label="管理员 (账号)"
            rules={[
              {
                required: true,
                message: '输入管理员 (用户名)!',
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="passWord"
            label="管理员 (密码)"
            rules={[
              {
                required: true,
                message: '输入密码!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="确认密码"
            dependencies={['passWord']}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请确认密码!',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('passWord') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('两次输入的密码不一致!');
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="管理员手机号"
            rules={[
              {
                required: true,
                message: '不可以为空!',
              }
            ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="address"
            label="门店地址"
            rules={[
              {
                required: true,
                message: '不可以为空!',
              },
              {
                max: 200,
                message: '不超过200个字符!',
              }
            ]}
          >
            <Input.TextArea/>
          </Form.Item>
          <div className="add-store-submit-button-area">
            <Button
              type="primary"
              htmlType="submit"
            >
              提交
            </Button>
            <Button className="cancel" onClick={() => this.props.onShow(false)}>取消</Button>
          </div>
        </Form>
      </Modal>
    )
  }
}
export default connect()(AddStoreModel);
