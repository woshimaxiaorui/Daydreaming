import React from 'react';
import router from 'umi/router';
import { Dispatch } from 'dva';
import './index.scss';
import { Button, Form, Input, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

interface IProps {
  dispatch: Dispatch;
}

interface IState {
  submitting: boolean;
  checkResult: boolean;
}

class Login extends React.Component<IProps, IState> {
  state = {
    submitting: false,
    checkResult: false
  }

  login = async (values: any) => {
    this.setState({
      submitting: true
    });
    const params = {
      ...values
    }
    const submitRes = await this.props.dispatch({
      type: 'loginManagement/loginCheckEffect',
      params
    });
    if(submitRes){
      router.push('/');
      return;
    }
    this.setState({
      submitting: false,
      checkResult: true
    });
  }

  render() {
    const { checkResult } = this.state;
    return (
      <div className="login-management">
        <div className="login-main">
          <div className="login-title">欢 迎 登 录</div>
          <Form
            name="normal_login"
            className="login-form"
            onFinish={this.login}
          >
            <div className="login-check-result">
              {
                checkResult &&
                <Alert
                  message="验证失败，请重新输入"
                  type="error"
                  showIcon
                />
              }
            </div>
            <Form.Item
              name="userName"
              rules={[{ required: true, message: '请输入用户名!' }]}
            >
              <Input
                size="large"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="用户名：请输入用户名"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码!' }]}
            >
              <Input
                size="large"
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码：请输入密码"
              />
            </Form.Item>
            <Form.Item>
              <Button size="large" type="primary" htmlType="submit" className="login-form-button" loading={ this.state.submitting } >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default connect()(Login);
// export default Login;
