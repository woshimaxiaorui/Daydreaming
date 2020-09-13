import React from 'react';
import { Modal, Button, Form, Switch, Input } from 'antd';

interface IProps {
  visible: boolean;
  onShow(visible: boolean): void;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

class AddStoreModel extends React.Component<IProps> {
  onSubmit = (values: any) => {
    // console.log('?', values)
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
        <Form {...layout} name="storeAddForm" onFinish={this.onSubmit}>
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
            rules={[{required: true, message: '不可以为空'}]}
          >
            <Switch defaultChecked/>
          </Form.Item>
          <Form.Item
            name="userName"
            label="管理员 (用户名)"
            rules={[
              {
                required: true,
                message: '输入管理员 (用户名)!',
              },
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
              查询
            </Button>
            <Button className="cancel" onClick={() => this.props.onShow(false)}>取消</Button>
          </div>
        </Form>
      </Modal>
    )
  }
}
export default AddStoreModel;
