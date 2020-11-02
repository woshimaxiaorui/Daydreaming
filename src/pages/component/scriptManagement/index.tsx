import React from 'react';
import './index.scss';
import { Table, Tag, Button, Space } from "antd";
import ScriptSearch from './Search';
import { IScriptTable } from '@/pages/types/scriptManagement';
import AddScriptModel from '@/pages/component/scriptManagement/AddScript';
import EditScriptModel from '@/pages/component/scriptManagement/EditScript';
import { connect } from 'react-redux';
import { Dispatch } from 'dva';
import ConnectState from '@/models/connect';
import _ from 'lodash';

interface IState {
  createScriptModalStatus: boolean;
  editScriptModalStatus: boolean;
  currentEditData: IScriptTable;
}

interface IProps extends StateProps, ConnectState{
  scriptList: IScriptTable[];
  dispatch: Dispatch
}

class ScriptManagement extends React.Component<IProps, IState> {
  state = {
    createScriptModalStatus: false,
    editScriptModalStatus: false,
    currentEditData: Object.create(null)
  };

  columns = [
    {
      title: '剧本名称',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: '拥有数量',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right'
    },
    {
      title: '适用人数',
      dataIndex: 'applicableNumber',
      key: 'applicableNumber',
      align: 'right'
    },
    {
      title: '游戏时间（小时）',
      dataIndex: 'gameTime',
      key: 'gameTime',
      align: 'right'
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
      width: '30%'
    },
    {
      title: '操作',
      key: 'action',
      render: (record: any) => (
        <Space size="middle">
          <a onClick={() => this.editScriptModalStatusSwitch(true, record)}>修改</a>
        </Space>
      )
    }
  ];
  componentDidMount() {
    this.props.dispatch({
      type: 'scriptManagement/getScriptManagementListEffect'
    })
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

  render() {
    return (
      <div className="script-management">
        <div className="script-search">
          <ScriptSearch/>
          <Button type="primary" onClick={() => this.createScriptModalStatusSwitch(true)}>创建剧本</Button>
        </div>
        <div className="script-table">
          <Table dataSource={this.props.scriptList} columns={this.columns} />
        </div>
        <AddScriptModel visible={this.state.createScriptModalStatus} onShow={this.createScriptModalStatusSwitch}/>
        <EditScriptModel visible={this.state.editScriptModalStatus} currentEditData={this.state.currentEditData} onEditShow={this.editScriptModalStatusSwitch}/>
      </div>
    )
  }
}

const mapStateToProps = (state: ConnectState) => ({
  scriptList: state.scriptManagement.scriptList
});
type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(ScriptManagement);
