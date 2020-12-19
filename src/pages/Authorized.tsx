import React from 'react';
import { ConnectProps, ConnectState } from '@/models/connect';
import { connect } from 'react-redux';
import { message, Spin } from 'antd';
import { useAuth } from '@/utils/useAuth';
import _ from 'lodash';
import router from 'umi/router';

interface IState {
  isLogin: boolean;
}

export class Authorized extends React.Component<ConnectProps & StateProps, IState> {
  state = {
    isLogin: false
  };
  async componentDidMount() {
    const { isLogin, userInfo } = await useAuth();

    await this.props.dispatch({
      type: 'loginManagement/setLoginUserInfoReducer',
      userInfo
    });
    this.setState({
      isLogin
    }, () => {
      console.log('??=>', isLogin);
      if (isLogin && !_.isEmpty(this.props.loginManagement.userInfo)) {
        router.push('/storeManagement');
        return;
      }
      message.warning('请登录');
      router.push('/login');
    })
  }

  render() {
    if (this.state.isLogin) {
      return this.props.children;
    }
    return (
      <div style={{ width: '100%', textAlign: 'center', marginTop: 100 }}>
        <Spin spinning={true} />
      </div>
    );
  }
}

const mapStateToProps = (state: ConnectState) => ({
  loginManagement: state.loginManagement
});
type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Authorized);
