import React from 'react';
import { connect } from 'react-redux';
import { ConnectState, ConnectProps } from '@/models/connect';
import _ from 'lodash';
import './index.scss';
import { Table, Button, Space } from "antd";
import { IPlayerTable } from '@/pages/types/playerManagement';
import AddPlayerModel from '@/pages/component/playerManagement/AddPlayer';
import EditPlayerModel from '@/pages/component/playerManagement/EditPlayer';
import StoreSearch from './Search';

interface IState {
  createPlayerModalStatus: boolean;
  editPlayerModalStatus: boolean;
  currentEditData: IPlayerTable;
}

interface IProps extends StateProps, ConnectProps {
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
      title: '杀手积分',
      dataIndex: 'killerIntegral',
      key: 'killerIntegral'
    },
    {
      title: '杀手排名',
      dataIndex: 'killerRanking',
      key: 'killerRanking'
    },
    {
      title: '杀手称号',
      dataIndex: 'killerTitle',
      key: 'killerTitle'
    },
    {
      title: '侦探积分',
      dataIndex: 'detectiveIntegral',
      key: 'detectiveIntegral'
    },
    {
      title: '侦探排名',
      dataIndex: 'detectiveRanking',
      key: 'detectiveRanking'
    },
    {
      title: '侦探称号',
      dataIndex: 'detectiveTitle',
      key: 'detectiveTitle'
    },
    {
      title: '路人积分',
      dataIndex: 'peopleIntegral',
      key: 'peopleIntegral'
    },
    {
      title: '路人排名',
      dataIndex: 'peopleRanking',
      key: 'peopleRanking'
    },
    {
      title: '路人称号',
      dataIndex: 'peopleTitle',
      key: 'peopleTitle'
    },
    {
      title: '总榜积分',
      dataIndex: 'totalIntegral',
      key: 'totalIntegral'
    },
    {
      title: '总榜排名',
      dataIndex: 'totalRanking',
      key: 'totalRanking'
    },
    {
      title: '总榜称号',
      dataIndex: 'totalTitle',
      key: 'totalTitle'
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
