import React from 'react';
import './index.scss';
import LeftMenu from '@/pages/component/menu';
import router from 'umi/router';
import { useAuth } from '@/utils/useAuth';
import { ConnectProps, ConnectState } from '@/models/connect';
import { connect } from 'react-redux';
import { Layout, Menu, Dropdown, Avatar } from 'antd';
import { LogoutOutlined, DownOutlined } from '@ant-design/icons';
import storage from '@/utils/storage';

const { Header, Footer, Sider, Content } = Layout;


interface IProps extends StateProps, ConnectProps {
}

class Main extends React.Component<IProps> {
  state = {
    collapsed: false,
  };

  async componentDidMount() {
    const { isLogin, userInfo } = await useAuth();

    await this.props.dispatch({
      type: 'loginManagement/setLoginUserInfoReducer',
      userInfo
    });
    if (isLogin) {
      router.push('/storeManagement');
    } else {
      router.push('/login');
    }
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  userLogoff = () => {
    storage.removeUserToken();
    router.push('/login');
  }

  render() {
    const userMenu = (
      <Menu className="menu">
        <Menu.Item onClick={this.userLogoff}><LogoutOutlined />退出登录</Menu.Item>
      </Menu>
    );
    return (
      <div className="main">
        <Layout>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <LeftMenu />
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-header" style={{ padding: 0 }}>
              <div className="right">
                <Dropdown overlay={userMenu} >
                  <span className="action" >
                    <Avatar
                      size="small"
                      className="avatar"
                      alt="avatar"
                    />
                    <span>{ this.props.loginManagement.userInfo.nickname } <DownOutlined /></span>
                  </span>
                </Dropdown>
              </div>
            </Header>
            <Content className="site-layout-content">
              { this.props.children }
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state: ConnectState) => ({
  loginManagement: state.loginManagement
});
type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Main);

// export default connect()(Main);
