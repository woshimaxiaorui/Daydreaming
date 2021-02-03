import React from 'react';
import { connect } from 'react-redux';
import { ConnectState, ConnectProps } from '@/models/connect';
import _ from 'lodash';
import './index.scss';
import { Table, Tag, Button, Space } from "antd";
import StoreSearch from './Search';
import { IStoreTable } from '@/pages/types/storeManagement';
import AddStoreModel from '@/pages/component/storeManagement/AddStore';
import EditStoreModel from '@/pages/component/storeManagement/EditStore';

interface IProps extends StateProps, ConnectProps {
  storeList: IStoreTable[];
}

interface IState {
  dataLoading: boolean;
  createStoreModalStatus: boolean;
  editStoreModalStatus: boolean;
  currentEditData: IStoreTable;
}

class StoreManagement extends React.Component<IProps, IState> {
  state = {
    dataLoading: true,
    createStoreModalStatus: false,
    editStoreModalStatus: false,
    currentEditData: Object.create(null)
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
      title: '管理员账号 (真实姓名)',
      key: 'userName',
      render: (record: any) => {
        if (!_.isEmpty(record.bossInfo)) {
          return record.bossInfo.userName;
        }
        return '';
      }
    },
    {
      title: '管理员 (密码)',
      key: 'passWord',
      render: (record: any) => {
        if (!_.isEmpty(record.bossInfo)) {
          return record.bossInfo.password;
        }
        return '';
      }
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
    },
    {
      title: '操作',
      key: 'action',
      render: (record: any) => (
        <Space size="middle">
          <a onClick={ () => this.editStoreModalStatusSwitch(true, record) }>修改</a>
        </Space>
      )
    }
  ];
  async componentDidMount() {
    await this.props.dispatch({
      type: 'storeManagement/getStoreManagementListEffect'
    });
    this.setState({
      dataLoading: false
    });
  }

  createStoreModalStatusSwitch = (createStoreModalStatus: boolean) => {
    this.setState({
      createStoreModalStatus
    })
  };

  editStoreModalStatusSwitch = (editStoreModalStatus: boolean, currentEditData?: any) => {
    this.setState({
      editStoreModalStatus,
      currentEditData
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
          <Table
            dataSource={this.props.storeManagement.storeList}
            columns={this.columns}
            loading={this.state.dataLoading}
          />
        </div>
        <AddStoreModel visible={this.state.createStoreModalStatus} onShow={this.createStoreModalStatusSwitch}/>
        <EditStoreModel visible={this.state.editStoreModalStatus} currentEditData={this.state.currentEditData} onEditShow={this.editStoreModalStatusSwitch}/>
      </div>
    )
  }
}

const mapStateToProps = (state: ConnectState) => ({
  storeManagement: state.storeManagement
});
type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(StoreManagement);
