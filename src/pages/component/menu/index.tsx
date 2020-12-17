import React from 'react';
import _ from 'lodash';
import { Menu } from 'antd';
import { IMenu } from '@/pages/types/LeftMenuType';
import { MailOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import router from 'umi/router';

interface IState {
  menuList: IMenu[];
}

class LeftMenu extends React.Component<any, IState> {
  state = {
    menuList: [
      {
        menuTitle: '门店管理',
        menuPath: 'storeManagement'
      },
      {
        menuTitle: '玩家管理',
        menuPath: 'playerManagement'
      },
      {
        menuTitle: '剧本管理',
        menuPath: 'scriptManagement'
      },
      {
        menuTitle: '桌台管理',
        menuPath: 'deskManagement'
      },
      {
        menuTitle: '订单管理',
        menuPath: 'orderManagement'
      },
      {
        menuTitle: '订单历史记录',
        menuPath: 'orderHistoryList'
      },
    ]
  };

  menuClick = (path: string) => {
    // 根据path跳转路由
    router.push(`/${path}`);
  };
  render() {
    return (
      <div>
        <div className="logo" />
        <Menu
          style={{ width: 200 }}
          defaultSelectedKeys={['storeManagement']}
          mode="inline"
          theme="dark"
        >
          {
            _.map(this.state.menuList, item => <Menu.Item
              key={item.menuPath}
              onClick={() => this.menuClick(item.menuPath)}
            >
              <span>
                {item.menuTitle}
              </span>
            </Menu.Item>)
          }
        </Menu>
      </div>
    )
  }
}

export default LeftMenu;
