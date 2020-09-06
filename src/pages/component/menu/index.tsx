import React from 'react';
import _ from 'lodash';
import { Menu } from 'antd';
import { IMenu } from '@/pages/types/LeftMenuType';
import { MailOutlined } from '@ant-design/icons';
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
      }
    ]
  };

  menuClick = (path: string) => {
    // 根据path跳转路由
    router.push(`/${path}`);
  };

  render() {
    return (
      <Menu
        style={{ width: 200 }}
        defaultSelectedKeys={['storeManagement']}
        mode="inline"
      >
        {
          _.map(this.state.menuList, item => <Menu.Item
            key={item.menuPath}
            onClick={() => this.menuClick(item.menuPath)}
          >
            <span>
              <MailOutlined/>
              {item.menuTitle}
            </span>
          </Menu.Item>)
        }
      </Menu>
    )
  }
}

export default LeftMenu;
