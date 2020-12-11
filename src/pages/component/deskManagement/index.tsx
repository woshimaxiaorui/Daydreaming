import React from 'react';
import { connect } from 'react-redux'
import { Dispatch } from 'dva';
import _ from 'lodash';
import { Button, Space, Table, Tag } from 'antd';

import './index.scss';
import { IDeskTable } from '@/pages/types/deskManagement';
import AddScriptModel from '@/pages/component/deskManagement/AddDesk';
import EditScriptModel from '@/pages/component/deskManagement/EditDesk';
import ConnectState from '@/models/connect';

interface IProps extends StateProps, ConnectState {
  deskList: IDeskTable[];
  dispatch: Dispatch;
}

interface IState {
  createDeskModalStatus: boolean;
  editDeskModalStatus: boolean;
  currentEditData: IDeskTable;
}

class DeskManagement extends React.Component<IProps, IState> {
  state = {
    createDeskModalStatus: false,
    editDeskModalStatus: false,
    currentEditData: Object.create(null)
  };

  columns = [
    {
      title: '卓号',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: '是否可用',
      dataIndex: 'isEnabled',
      key: 'isEnabled',
      render: (record: boolean) => {
        if (record) {
          return (
            <Tag color="green">是</Tag>
          )
        }
        return <Tag color="red">否</Tag>
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (record: any) => (
        <Space size="middle">
          <a onClick={() => this.editDeskModalStatusSwitch(true, record)}>修改</a>
        </Space>
      )
    }
  ];

  componentDidMount() {
    this.props.dispatch({
      type: 'deskManagement/getDeskManagementListEffect'
    });
  }

  createDeskModalStatusSwitch = (createDeskModalStatus: boolean) => {
    this.setState({
      createDeskModalStatus
    })
  };

  editDeskModalStatusSwitch = (editDeskModalStatus: boolean, currentEditData?: any) => {
    this.setState({
      editDeskModalStatus,
      currentEditData
    })
  };

  render() {
    return (
      <div className="desk-management">
        <div className="desk-search">
          <span></span>
          <Button type="primary" onClick={() => this.createDeskModalStatusSwitch(true)}>创建卓台</Button>
        </div>
        <div className="desk-table">
          <Table
            dataSource={this.props.deskList}
            columns={this.columns} />
        </div>
        <AddScriptModel visible={this.state.createDeskModalStatus} onShow={this.createDeskModalStatusSwitch}/>
        <EditScriptModel visible={this.state.editDeskModalStatus} currentEditData={this.state.currentEditData} onEditShow={this.editDeskModalStatusSwitch}/>
      </div>
    );
  }
}

const mapStateToProps = (state: ConnectState) => ({
  deskList: state.deskManagement.deskList
});
type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(DeskManagement);

