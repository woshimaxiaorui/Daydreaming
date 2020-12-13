import React from 'react';
import router from 'umi/router';
import { Dispatch } from 'dva';
import './index.scss';
import { Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { ILoginCheckResponse } from '@/pages/types/loginCheck';
import { connect } from 'react-redux';

interface IProps {
  dispatch: Dispatch;
}

class Login extends React.Component<IProps> {

  login = async (values: any) => {
    const params = {
      ...values
    }
    const submitRes = await this.props.dispatch({
      type: 'loginManagement/loginCheckEffect',
      params
    });
    if(submitRes){
      router.push('/')
    }
  }

  render() {
    return (
      <div className="login-management">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={this.login}
        >
          <Form.Item
            name="userName"
            rules={[{ required: true, message: 'Please input your UserName!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="UserName" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default connect()(Login);
// export default Login;
