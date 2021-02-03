import React from 'react';
import { connect } from 'react-redux';
import { ConnectState, ConnectProps } from '@/models/connect';
import _ from 'lodash';
import './index.scss';
import { Button, Space, Table, Tag, Spin } from 'antd';
import { IDeskTable } from '@/pages/types/deskManagement';
import AddScriptModel from '@/pages/component/deskManagement/AddDesk';
import EditScriptModel from '@/pages/component/deskManagement/EditDesk';
import { IPagination } from '@/pages/types/pagination';
import { getPaginationParams, getRandomuserParams } from '@/utils/func';

interface IProps extends StateProps, ConnectProps {
  deskList: IDeskTable[];
}

interface IState {
  createDeskModalStatus: boolean;
  editDeskModalStatus: boolean;
  currentEditData: IDeskTable;
  pagination: IPagination;
  formValues: any;
}

class DeskManagement extends React.Component<IProps, IState> {
  state = {
    createDeskModalStatus: false,
    editDeskModalStatus: false,
    currentEditData: Object.create(null),
    pagination: {
      current: 1,
      pageSize: 10
    },
    formValues: Object.create(null)
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

  async componentDidMount() {
    await this.getListData({
      storeId: this.props.loginUserInfo.storeId
    });
  }

  getListData = async (params: any = {}) => {
    const requestParams = getRandomuserParams(params);
    delete requestParams.pagination;
    await this.props.dispatch({
      type: 'deskManagement/getDeskManagementListEffect',
      params: requestParams
    });
    await this.setState(getPaginationParams(params,params.pagination,this.props.deskDataCount));
  }

  handleTableChange = async (pagination: any, filters: any, sorter: any) => {
    await this.getListData({
      ...this.state.formValues,
      pagination
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
          <Spin tip="Loading..." spinning={this.props.loading}>
            <Table
              dataSource={this.props.deskList}
              columns={this.columns}
              pagination={this.state.pagination}
              onChange={this.handleTableChange}
            />
          </Spin>
        </div>
        <AddScriptModel visible={this.state.createDeskModalStatus} onShow={this.createDeskModalStatusSwitch}/>
        <EditScriptModel visible={this.state.editDeskModalStatus} currentEditData={this.state.currentEditData} onEditShow={this.editDeskModalStatusSwitch}/>
      </div>
    );
  }
}

const mapStateToProps = (state: ConnectState) => ({
  loginUserInfo: state.loginManagement.userInfo,
  deskList: state.deskManagement.deskList,
  deskDataCount: state.deskManagement.dataCount,
  loading: state.loading.global
});
type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(DeskManagement);

