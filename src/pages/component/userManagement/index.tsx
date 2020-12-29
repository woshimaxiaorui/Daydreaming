import React from 'react';
import { connect } from 'react-redux';
import { ConnectState, ConnectProps } from '@/models/connect'
import { IUserTable } from '@/pages/types/userManagement';
import './index.scss';
import { Button, Space, Table } from 'antd';
import _ from 'lodash';

interface IProps extends StateProps, ConnectProps {
  userList: IUserTable[];
}

interface IState {
  createUserModalStatus: boolean;
  editUserModalStatus: boolean;
  currentData: IUserTable;
  userList: IUserTable[];
}

class UserManagement extends React.Component<IProps, IState> {
  state = {
    createUserModalStatus: false,
    editUserModalStatus: false,
    currentData: Object.create(null),
    userList: []
  }

  columns = [
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname'
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      render: (item: any) => {
        const sex = _.isEqual(item, '0') ? '女' : '男';
        return <span>{sex}</span>
      }
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: '用户角色',
      key: 'role',
      render: (item: any) => {
        if(Number(item.role) == 1){
          return <span>店长</span>
        }
        return <span>店员</span>
      }
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark'
    },
    {
      title: '操作',
      key: 'action',
      render: (record: any) => (
        <Space size="middle">
          <a onClick={() => this.editUserModalStatusSwitch(true, record)}>修改</a>
        </Space>
      )
    }
  ];

  componentDidMount() {
    const params = {
      storeId: this.props.loginManagement.userInfo.storeId
    }
    this.props.dispatch({
      type: 'userManagement/getUserManagementListEffect',
      params
    });
    const userList = _.filter(this.props.userManagement.userList, (user: IUserTable) => {
      return user.role !== '3';
    });
    this.setState({
      userList
    })
  }

  createUserModalStatusSwitch = (createUserModalStatus: boolean) => {
    this.setState({
      createUserModalStatus
    })
  }

  editUserModalStatusSwitch = (editUserModalStatus: boolean,currentData: IUserTable) => {
    this.setState({
      editUserModalStatus,
      currentData
    })
  }

  render() {
    return (
      <div className="user-management">
        <div className="user-search">
          <Button type="primary" onClick={() => this.createUserModalStatusSwitch(true)}>添加用户</Button>
        </div>
        <div className="user-table">
          <Table dataSource={this.state.userList} columns={this.columns} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: ConnectState) => ({
  loginManagement: state.loginManagement,
  userManagement: state.userManagement
});
type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(UserManagement);
