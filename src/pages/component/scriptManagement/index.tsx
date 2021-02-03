import React from 'react';
import { connect } from 'react-redux';
import { ConnectState, ConnectProps } from '@/models/connect';
import _ from 'lodash';
import './index.scss';
import { Table, Button, Space, Spin } from 'antd';
import ScriptSearch from './Search';
import { IScriptTable } from '@/pages/types/scriptManagement';
import AddScriptModel from '@/pages/component/scriptManagement/AddScript';
import EditScriptModel from '@/pages/component/scriptManagement/EditScript';
import { getPaginationParams, getRandomuserParams } from '@/utils/func';
import { IPagination } from '@/pages/types/pagination';
import ContentScriptModel from '@/pages/component/scriptManagement/ContentScript';

interface IProps extends StateProps, ConnectProps {
  scriptList: IScriptTable[];
}

interface IState {
  createScriptModalStatus: boolean;
  editScriptModalStatus: boolean;
  contentScriptModalStatus: boolean;
  currentEditData: IScriptTable;
  pagination: IPagination;
  formValues: any;
}

class ScriptManagement extends React.Component<IProps, IState> {
  state = {
    createScriptModalStatus: false,
    editScriptModalStatus: false,
    contentScriptModalStatus: false,
    currentEditData: Object.create(null),
    pagination: {
      current: 1,
      pageSize: 10
    },
    formValues: Object.create(null)
  };

  columns = [
    {
      title: '剧本名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '成本价格',
      dataIndex: 'costPrice',
      key: 'costPrice',
      align: 'right',
    },
    {
      title: '开本价格',
      dataIndex: 'formatPrice',
      key: 'formatPrice',
      align: 'right',
    },
    {
      title: '拥有数量',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: '适用人数',
      dataIndex: 'applicableNumber',
      key: 'applicableNumber',
    },
    {
      title: '游戏时间（小时）',
      dataIndex: 'gameTime',
      key: 'gameTime',
    },
    {
      title: '是否改编',
      dataIndex: 'isAdapt',
      key: 'isAdapt',
      render: (item: any) => {
        const isAdapt = _.isEqual(item, 0) ? '否' : '是';
        return <span>{isAdapt}</span>
      }
    },
    {
      title: '改编内容',
      dataIndex: 'adaptContent',
      key: 'adaptContent',
      width: '20%'
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      width: '20%'
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (record: any) => (
        <Space size="middle">
          <a onClick={() => this.contentScriptModalStatusSwitch(true, record)}>内容详情</a>
          <a onClick={() => this.editScriptModalStatusSwitch(true, record)}>修改</a>
        </Space>
      )
    }
  ];

  async componentDidMount() {
    await this.getListData({
      storeId: this.props.loginUserInfo.storeId,
      pagination: this.state.pagination
    });
  }

  createScriptModalStatusSwitch = (createScriptModalStatus: boolean) => {
    this.setState({
      createScriptModalStatus
    })
  };

  editScriptModalStatusSwitch = (editScriptModalStatus: boolean, currentEditData?: any) => {
    this.setState({
      editScriptModalStatus,
      currentEditData
    })
  };

  contentScriptModalStatusSwitch = (contentScriptModalStatus: boolean, currentEditData?: any) => {
    this.setState({
      contentScriptModalStatus,
      currentEditData
    });
  }

  handleTableChange = async (pagination: any, filters: any, sorter: any) => {
    await this.getListData({
      ...this.state.formValues,
      pagination
    });
  }

  getListData = async (params: any = {}) => {
    const requestParams = getRandomuserParams(params);
    delete requestParams.pagination;
    await this.props.dispatch({
      type: 'scriptManagement/getScriptManagementListEffect',
      params: requestParams
    });
    await this.setState(getPaginationParams(params,params.pagination,this.props.scriptDataCount));
  }

  render() {
    return (
      <div className="script-management">
        <div className="script-search">
          <ScriptSearch pagination={this.state.pagination} getListData={this.getListData.bind(this)} />
          <Button type="primary" onClick={() => this.createScriptModalStatusSwitch(true)}>创建剧本</Button>
        </div>
        <div className="script-table">
          <Spin tip="Loading..." spinning={this.props.loading}>
            <Table
              dataSource={this.props.scriptList}
              // @ts-ignore
              columns={this.columns}
              pagination={this.state.pagination}
              onChange={this.handleTableChange}
            />
          </Spin>
        </div>
        <AddScriptModel visible={this.state.createScriptModalStatus} onShow={this.createScriptModalStatusSwitch}/>
        <EditScriptModel visible={this.state.editScriptModalStatus} currentEditData={this.state.currentEditData} onEditShow={this.editScriptModalStatusSwitch}/>
        <ContentScriptModel visible={this.state.contentScriptModalStatus} currentEditData={this.state.currentEditData} onContentShow={this.contentScriptModalStatusSwitch} />
      </div>
    )
  }
}

const mapStateToProps = (state: ConnectState) => ({
  loginUserInfo: state.loginManagement.userInfo,
  scriptList: state.scriptManagement.scriptList,
  scriptDataCount: state.scriptManagement.dataCount,
  loading: state.loading.global
});
type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(ScriptManagement);
