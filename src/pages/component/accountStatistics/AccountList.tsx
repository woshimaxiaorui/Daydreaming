import React from 'react';
import { ConnectState, ConnectProps } from '@/models/connect';
import { connect } from 'react-redux';
import _ from 'lodash';
import { IAccountTable } from '@/pages/types/accountStatistics';
import AccountSearch from '@/pages/component/accountStatistics/AccountSearch';
import { Space, Table } from 'antd';
import moment from 'moment';

interface IProps extends StateProps, ConnectProps{
  accountList: IAccountTable[]
}

interface IState {
  dataLoading: boolean;
  initDateRange: object;
}

class AccountList extends React.Component<IProps, IState> {
  state = {
    dataLoading: true,
    initDateRange: {
      startDate: moment().startOf('month').format('YYYY-MM-DD'),
      endDate: moment().endOf('month').format('YYYY-MM-DD')
    }
  }

  columns = [
    {
      title: '用户信息',
      key: 'user',
      children: [
        {
          title: '手机号',
          key: 'userPhone',
          render: (record: IAccountTable) => {
            if(Number(record.userId) !== 0){
              return (
                <Space size="middle">
                  { record.userInfo?.phone }
                </Space>
              )
            }
          }
        },
        {
          title: '昵称',
          key: 'userNickName',
          render: (record: IAccountTable) => {
            if(Number(record.userId) !== 0){
              return (
                <Space size="middle">
                  { record.userInfo?.nickname }
                </Space>
              )
            }
          }
        },
      ],
    },
    {
      title: '账户变更金额',
      key: 'changeMoney',
      render: (record: IAccountTable) => (
        <Space size="middle">
          { this.getAccountChangeMoney(record) }
        </Space>
      )
    },
    {
      title: '代金卷变更金额',
      key: 'changeMoney',
      render: (record: IAccountTable) => (
        <Space size="middle">
          { this.getVoucherChangeMoney(record) }
        </Space>
      )
    },
    {
      title: '变更时间',
      dataIndex: 'changeTime',
      key: 'changeTime',
    },
    {
      title: '变更类型',
      key: 'changeType',
      render: (record: IAccountTable) => {
        if(Number(record.changeType) === 1){
          return (
            <Space size="middle">
              账户余额变动
            </Space>
          )
        }
        return (
          <Space size="middle">
            账户代金卷余额变动
          </Space>
        )
      }
    },
    {
      title: '活动',
      key: 'promotions',
      render: (record: IAccountTable) => {
        if(Number(record.promotionsId) !== 0){
          return (
            <Space size="middle">
              { record.promotionsInfo?.title }
            </Space>
          )
        }
      }
    },
  ];

  async componentDidMount() {
    const params = this.state.initDateRange;
    await this.props.dispatch({
      type: 'accountStatistics/getAccountStatisticsListEffect',
      params
    });
    this.setState({
      dataLoading: false
    });
  }

  getAccountChangeMoney(record: IAccountTable) {
    if(Number(record.changeType) === 1) {
      return record.changeMoney;
    }
    return 0.00.toFixed(2);
  }

  getVoucherChangeMoney(record: IAccountTable) {
    if(Number(record.changeType) === 2) {
      return record.changeMoney;
    }
    return 0.00.toFixed(2);
  }

  render() {
    return (
      <div className="account-management">
        <div className="account-search">
          <AccountSearch initDateRange={this.state.initDateRange} />
        </div>
        <div className="account-table">
          <Table
            dataSource={this.props.accountList}
            columns={this.columns}
            loading={this.state.dataLoading}
            summary={pageData => {
              let summaryAccountMoney = 0;
              let summaryVoucherMoney = 0;
              _.forEach(pageData, (value: IAccountTable) => {
                summaryAccountMoney += Number(this.getAccountChangeMoney(value));
                summaryVoucherMoney += Number(this.getVoucherChangeMoney(value));
              })
              return (
                <>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={2}>总计</Table.Summary.Cell>
                    <Table.Summary.Cell index={1} align="right">{summaryAccountMoney.toFixed(2)}</Table.Summary.Cell>
                    <Table.Summary.Cell index={2} align="right">{summaryVoucherMoney.toFixed(2)}</Table.Summary.Cell>
                    <Table.Summary.Cell index={3} colSpan={3}></Table.Summary.Cell>
                  </Table.Summary.Row>
                </>
              );
            }}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: ConnectState) => ({
  accountList: state.accountStatistics.accountList
});
type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(AccountList);
