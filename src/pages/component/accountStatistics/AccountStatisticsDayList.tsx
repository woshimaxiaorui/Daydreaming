import React from 'react';
import { connect } from 'react-redux';
import { ConnectState, ConnectProps } from '@/models/connect';
import './index.scss';
import { Space, Spin, Table } from 'antd';
import { IAccountStatisticsTable } from '@/pages/types/accountStatistics';
import AccountStatisticsDaySearch from '@/pages/component/accountStatistics/AccountStatisticsDaySearch';
import moment from 'moment';
import _ from 'lodash';
import router from 'umi/router';
import { IPagination } from '@/pages/types/pagination';
import { getPaginationParams, getRandomuserParams } from '@/utils/func';

interface IProps extends StateProps, ConnectProps {
  accountStatisticsDayList: IAccountStatisticsTable[];
}

interface IState {
  initDateRange: object;
  pagination: IPagination;
  formValues: any;
}

class AccountStatisticsDayList extends React.Component<IProps, IState> {
  state = {
    initDateRange: {
      startDate: moment().startOf('month').format('YYYY-MM-DD'),
      endDate: moment().endOf('month').format('YYYY-MM-DD')
    },
    pagination: {
      current: 1,
      pageSize: 10
    },
    formValues: Object.create(null)
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
    const params = {
      ...this.state.initDateRange,
      storeId: this.props.loginUserInfo.storeId,
      pagination: this.state.pagination
    };
    await this.getListData(params);
  }

  getListData = async (params: any = {}) => {
    const requestParams = getRandomuserParams(params);
    delete requestParams.pagination;
    await this.props.dispatch({
      type: 'accountStatistics/getAccountStatisticsDayListEffect',
      params: requestParams
    });
    await this.setState(getPaginationParams(params,params.pagination,this.props.accountStatisticsDayDataCount));
  }

  handleTableChange = async (pagination: any, filters: any, sorter: any) => {
    await this.getListData({
      ...this.state.formValues,
      pagination
    });
  }

  accountListDetail(currentData: IAccountStatisticsTable) {
    router.push({
      pathname: '/accountList',
      state: { startDate: currentData.days, endDate: currentData.days }
    });
  }

  render() {
    return (
      <div className="account-management">
        <div className="account-search">
          <AccountStatisticsDaySearch initDateRange={this.state.initDateRange} pagination={this.state.pagination} getListData={this.getListData.bind(this)} />
        </div>
        <div className="account-table">
          <Spin tip="Loading..." spinning={this.props.loading}>
            <Table
              dataSource={this.props.accountStatisticsDayList}
              // @ts-ignore
              columns={this.columns}
              pagination={this.state.pagination}
              onChange={this.handleTableChange}
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
                      <Table.Summary.Cell index={0} colSpan={2}>总计</Table.Summary.Cell>
                      <Table.Summary.Cell index={1} align="right">{summaryAccountBalance.toFixed(2)}</Table.Summary.Cell>
                      <Table.Summary.Cell index={2} align="right" >{summaryVoucherBalance.toFixed(2)}</Table.Summary.Cell>
                      <Table.Summary.Cell index={3} colSpan={2}></Table.Summary.Cell>
                    </Table.Summary.Row>
                  </>
                );
              }}
            />
          </Spin>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: ConnectState) => ({
  loginUserInfo: state.loginManagement.userInfo,
  accountStatisticsDayList: state.accountStatistics.accountStatisticsDayList,
  accountStatisticsDayDataCount: state.accountStatistics.dataCount,
  loading: state.loading.global
});
type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(AccountStatisticsDayList);
