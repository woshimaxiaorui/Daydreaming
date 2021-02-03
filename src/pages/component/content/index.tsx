import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';

class MainContent extends React.Component{
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        {this.props.children}
      </ConfigProvider>
    )
  }
}

export default MainContent;
