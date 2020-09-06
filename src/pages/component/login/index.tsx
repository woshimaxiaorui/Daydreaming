import React from 'react';
import { Button } from 'antd';
import router from 'umi/router';

class Login extends React.Component{
  login = () => {
    router.push('/')
  };

  render() {
    return (
      <div>
        <Button onClick={this.login}>Login1</Button>
      </div>
    )
  }
}

export default Login;
