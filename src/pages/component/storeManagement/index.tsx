import React from 'react';
import './index.scss';
import { Table, Tag, Button } from "antd";
import StoreSearch from './Search';
import { IStoreTable } from '@/pages/types/storeManagement';
import AddStoreModel from '@/pages/component/storeManagement/addStore';

interface IState {
  dataSource: IStoreTable[];
  createStoreModalStatus: boolean;
}

class StoreManagement extends React.Component<any, IState> {
  state = {
    dataSource: [
      {
        key: '1',
        storeName: '白日梦 (总店)',
        userName: 'maxiaorui',
        passWord: '19911206',
        phoneNumber: '15598476380',
        address: '北京市昌平区回龙观和谐家园一区十三号楼401',
        status: true
      },
      {
        key: '2',
        storeName: '测试门店_1',
        userName: 'yuweipeng',
        passWord: '19911206',
        phoneNumber: '15598476380',
        address: '北京市昌平区回龙观和谐家园一区十三号楼401',
        status: false
      }
    ],
    createStoreModalStatus: false
  };

  columns = [
    {
      title: '门店名称',
      dataIndex: 'storeName',
      key: 'storeName'
    },
    {
      title: '系统使用状态',
      dataIndex: 'status',
      key: 'status',
      render: (record: boolean) => {
        if (record) {
          return (
            <Tag color="green">使用中</Tag>
          )
        }
        return <Tag color="red">未激活</Tag>
      }
    },
    {
      title: '管理员 (用户名)',
      dataIndex: 'userName',
      key: 'userName'
    },
    {
      title: '管理员 (密码)',
      dataIndex: 'passWord',
      key: 'passWord'
    },
    {
      title: '手机 (电话)',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber'
    },
    {
      title: '门店地址',
      dataIndex: 'address',
      key: 'address',
      width: '30%'
    }
  ];
  createStoreModalStatusSwitch = (createStoreModalStatus: boolean) => {
    this.setState({
      createStoreModalStatus
    })
  };

  render() {
    return (
      <div className="store-management">
        <div className="store-search">
          <StoreSearch/>
          <Button type="primary" onClick={() => this.createStoreModalStatusSwitch(true)}>创建门店</Button>
        </div>
        <div className="store-table">
          <Table dataSource={this.state.dataSource} columns={this.columns} />
        </div>
        <AddStoreModel visible={this.state.createStoreModalStatus} onShow={this.createStoreModalStatusSwitch}/>
      </div>
    )
  }
}

export default StoreManagement;
