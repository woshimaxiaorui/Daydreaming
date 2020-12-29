import React from 'react';
import { connect } from 'react-redux';
import { ConnectState, ConnectProps } from '@/models/connect';
import _ from 'lodash';
import './index.scss';
import { Table, Button, Space } from "antd";
import { IPlayerTable } from '@/pages/types/playerManagement';
import AddPlayerModel from '@/pages/component/playerManagement/AddPlayer';
import EditPlayerModel from '@/pages/component/playerManagement/EditPlayer';
import AccountRechargeModelModel from '@/pages/component/playerManagement/AccountRecharge';
import StoreSearch from './Search';

interface IState {
  createPlayerModalStatus: boolean;
  editPlayerModalStatus: boolean;
  accountRechargeModalStatus: boolean;
  currentData: IPlayerTable;
}

interface IProps extends StateProps, ConnectProps {
}

class PlayerManagement extends React.Component<IProps, IState> {
  state = {
    createPlayerModalStatus: false,
    editPlayerModalStatus: false,
    accountRechargeModalStatus: false,
    currentData: Object.create(null)
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
      title: '总榜积分',
      dataIndex: 'totalIntegral',
      key: 'totalIntegral'
    },
    {
      title: '可用积分',
      dataIndex: 'activeIntegral',
      key: 'activeIntegral'
    },
    {
      title: '账户余额',
      dataIndex: 'accountBalance',
      key: 'accountBalance',
      align: 'right'
    },
    {
      title: '代金卷余额',
      dataIndex: 'voucherBalance',
      key: 'voucherBalance',
      align: 'right'
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark'
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (record: any) => (
        <Space size="middle">
          <a onClick={() => this.accountRechargeModalStatusSwitch(true, record)}>充值</a>
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

  editPlayerModalStatusSwitch = (editPlayerModalStatus: boolean, currentData?: any) => {
    this.setState({
      editPlayerModalStatus,
      currentData
    })
  };

  accountRechargeModalStatusSwitch = (accountRechargeModalStatus: boolean, currentData: any) => {
    this.setState({
      accountRechargeModalStatus,
      currentData
    })
  }

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
        <EditPlayerModel visible={this.state.editPlayerModalStatus} currentData={this.state.currentData} onEditShow={this.editPlayerModalStatusSwitch}/>
        <AccountRechargeModelModel visible={this.state.accountRechargeModalStatus} currentData={this.state.currentData} onShow={this.accountRechargeModalStatusSwitch}/>
      </div>
    )
  }
}
const mapStateToProps = (state: ConnectState) => ({
  playerManagement: state.playerManagement
});
type StateProps = ReturnType<typeof mapStateToProps>;
export default connect(mapStateToProps)(PlayerManagement);
