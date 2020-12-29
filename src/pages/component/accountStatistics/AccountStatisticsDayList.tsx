import React from 'react';
import { connect } from 'react-redux';
import { Space, Table } from 'antd';
import { ConnectState, ConnectProps } from '@/models/connect';
import './index.scss';
import { IAccountStatisticsTable } from '@/pages/types/accountStatistics';
import AccountStatisticsDaySearch from '@/pages/component/accountStatistics/AccountStatisticsDaySearch';
import moment from 'moment';
import _ from 'lodash';
import router from 'umi/router';

interface IProps extends StateProps, ConnectProps {
  accountStatisticsDayList: IAccountStatisticsTable[];
}

interface IState {
  dataLoading: boolean;
  initDateRange: object;
}

class AccountStatisticsDayList extends React.Component<IProps, IState> {
  state = {
    dataLoading: true,
    initDateRange: {
      startDate: moment().startOf('month').format('YYYY-MM-DD'),
      endDate: moment().endOf('month').format('YYYY-MM-DD')
    }
  }

  columns = [
    {
      title: '账单日期',
      dataIndex: 'days',
      key: 'days'
    },
    {
      title: '总金额',
      dataIndex: 'totalBalance',
      key: 'totalBalance',
      align: 'right',
    },
    {
      title: '总收入',
      dataIndex: 'accountBalance',
      key: 'accountBalance',
      align: 'right',
    },
    {
      title: '代金卷金额',
      dataIndex: 'voucherBalance',
      key: 'voucherBalance',
      align: 'right',
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (record: any) => (
        <Space size="middle">
          <a onClick={() => this.accountListDetail(record)} >明细</a>
        </Space>
      )
    },
  ];

  async componentDidMount() {
    const params = this.state.initDateRange;
    await this.props.dispatch({
      type: 'accountStatistics/getAccountStatisticsDayListEffect',
      params
    });
    this.setState({
      dataLoading: false
    });
  }

  accountListDetail(currentData: IAccountStatisticsTable) {
    const initDateRange = this.state.initDateRange;
    router.push({
      pathname: '/accountList',
      state: { startDate: currentData.days, endDate: currentData.days }
    });
  }

  render() {
    return (
      <div className="account-management">
        <div className="account-search">
          <AccountStatisticsDaySearch initDateRange={this.state.initDateRange} />
        </div>
        <div className="account-table">
          <Table
            dataSource={this.props.accountStatisticsDayList}
            columns={this.columns}
            loading={this.state.dataLoading}
            summary={pageData => {
              let summaryTotalBalance = 0;
              let summaryAccountBalance = 0;
              let summaryVoucherBalance = 0;

              _.forEach(pageData, (value: IAccountStatisticsTable) => {
                summaryTotalBalance += Number(value.totalBalance);
                summaryAccountBalance += Number(value.accountBalance);
                summaryVoucherBalance += Number(value.voucherBalance);
              })

              return (
                <>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0}>总计</Table.Summary.Cell>
                    <Table.Summary.Cell index={1} align="right"></Table.Summary.Cell>
                    <Table.Summary.Cell index={2} align="right">{summaryAccountBalance.toFixed(2)}</Table.Summary.Cell>
                    <Table.Summary.Cell index={3} align="right" >{summaryVoucherBalance.toFixed(2)}</Table.Summary.Cell>
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
  accountStatisticsDayList: state.accountStatistics.accountStatisticsDayList
});
type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(AccountStatisticsDayList);
