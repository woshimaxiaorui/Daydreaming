import React from 'react';
import { connect } from 'react-redux';
import { ConnectState, ConnectProps } from '@/models/connect';
import _ from 'lodash';
import './index.scss';
import { IAccountTable } from '@/pages/types/accountStatistics';
import AccountSearch from '@/pages/component/accountStatistics/AccountSearch';
import { Space, Spin, Table } from 'antd';
import moment from 'moment';
import { IPagination } from '@/pages/types/pagination';
import { getPaginationParams, getRandomuserParams } from '@/utils/func';

interface IProps extends StateProps, ConnectProps {
  accountList: IAccountTable[]
}

interface IState {
  initDateRange: object;
  pagination: IPagination;
  formValues: any;
}

class AccountList extends React.Component<IProps, IState> {
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
      align: 'right',
      render: (record: IAccountTable) => (
        <Space size="middle">
          { this.getAccountChangeMoney(record) }
        </Space>
      )
    },
    {
      title: '代金卷变更金额',
      key: 'changeMoney',
      align: 'right',
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
      align: 'center'
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
      type: 'accountStatistics/getAccountStatisticsListEffect',
      params: requestParams
    });
    await this.setState(getPaginationParams(params,params.pagination,this.props.accountDataCount));
  }

  handleTableChange = async (pagination: any, filters: any, sorter: any) => {
    await this.getListData({
      ...this.state.formValues,
      pagination
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
          <AccountSearch initDateRange={this.state.initDateRange} pagination={this.state.pagination} getListData={this.getListData.bind(this)} />
        </div>
        <div className="account-table">
          <Spin tip="Loading..." spinning={this.props.loading}>
            <Table
              dataSource={this.props.accountList}
              // @ts-ignore
              columns={this.columns}
              pagination={this.state.pagination}
              onChange={this.handleTableChange}
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
          </Spin>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: ConnectState) => ({
  loginUserInfo: state.loginManagement.userInfo,
  accountList: state.accountStatistics.accountList,
  accountDataCount: state.accountStatistics.dataCount,
  loading: state.loading.global
});
type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(AccountList);
