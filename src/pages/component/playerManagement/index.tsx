import React from 'react';
import './index.scss';
import { Table, Tag, Button, Space } from "antd";
import { IPlayerTable } from '@/pages/types/playerManagement';
import AddPlayerModel from '@/pages/component/playerManagement/AddPlayer';
import EditPlayerModel from '@/pages/component/playerManagement/EditPlayer';
import StoreSearch from './Search';
import { connect } from 'react-redux';
import { Dispatch } from 'dva';
import ConnectState from '@/models/connect';

interface IState {
  createPlayerModalStatus: boolean;
  editPlayerModalStatus: boolean;
  currentEditData: IPlayerTable;
}

interface IProps extends StateProps, ConnectState {
  dispatch: Dispatch
}

class PlayerManagement extends React.Component<IProps, IState> {
  state = {
    createPlayerModalStatus: false,
    editPlayerModalStatus: false,
    currentEditData: Object.create(null)
  };

  columns = [
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
      width: '15%'
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
      title: '杀手积分',
      dataIndex: 'killerIntegral',
      key: 'killerIntegral'
    },
    {
      title: '侦探积分',
      dataIndex: 'detectiveIntegral',
      key: 'detectiveIntegral'
    },
    {
      title: '路人积分',
      dataIndex: 'peopleIntegral',
      key: 'peopleIntegral'
    },
    {
      title: '总积分',
      dataIndex: 'totalIntegral',
      key: 'totalIntegral'
    },
    {
      title: '可用积分',
      dataIndex: 'activeIntegral',
      key: 'activeIntegral'
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
          <a onClick={() => this.editPlayerModalStatusSwitch(true, record)}>修改</a>
        </Space>
      )
    }
  ];
  componentDidMount() {
    this.props.dispatch({
      type: 'playerManagement/getPlayerManagementListEffect'
    })
  }

  createPlayerModalStatusSwitch = (createPlayerModalStatus: boolean) => {
    this.setState({
      createPlayerModalStatus
    })
  };

  editPlayerModalStatusSwitch = (editPlayerModalStatus: boolean, currentEditData?: any) => {
    this.setState({
      editPlayerModalStatus,
      currentEditData
    })
  };

  render() {
    return (
      <div className="player-management">
        <div className="player-search">
          <StoreSearch/>
          <Button type="primary" onClick={() => this.createPlayerModalStatusSwitch(true)}>添加玩家</Button>
        </div>
        <div className="player-table">
          <Table dataSource={this.props.playerManagement.playerList} columns={this.columns} />
        </div>
        <AddPlayerModel visible={this.state.createPlayerModalStatus} onShow={this.createPlayerModalStatusSwitch}/>
        <EditPlayerModel visible={this.state.editPlayerModalStatus} currentEditData={this.state.currentEditData} onEditShow={this.editPlayerModalStatusSwitch}/>
      </div>
    )
  }
}
const mapStateToProps = (state: ConnectState) => ({
  playerManagement: state.playerManagement
});
type StateProps = ReturnType<typeof mapStateToProps>;
export default connect(mapStateToProps)(PlayerManagement);
