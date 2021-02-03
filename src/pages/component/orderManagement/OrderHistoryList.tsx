import React from 'react';
import { connect } from 'react-redux';
import { ConnectState, ConnectProps } from '@/models/connect';
import { IOrderTable } from '@/pages/types/orderManagement';
import { Space, Table, Tag } from 'antd';
import AccountStatisticsDaySearch from '@/pages/component/accountStatistics/AccountStatisticsDaySearch';
import OrderHistorySearch from '@/pages/component/orderManagement/OrderHistorySearch';
import moment from 'moment';
import _ from 'lodash';
import { IAccountTable } from '@/pages/types/accountStatistics';

interface IProps extends StateProps, ConnectProps {
  orderList: IOrderTable[];
}

interface IState {
  dataLoading: boolean;
  initDateRange: object;
  currentData: IOrderTable;
};

class OrderHistoryList extends React.Component<IProps, IState>{
  state = {
    dataLoading: true,
    initDateRange: {
      startDate: moment().startOf('month').format('YYYY-MM-DD'),
      endDate: moment().endOf('month').format('YYYY-MM-DD')
    },
    currentData: Object.create(null)
  };

  columns = [
    {
      title: '订单号',
      dataIndex: 'orderNo',
      key: 'orderNo'
    },
    {
      title: '桌号',
      key: 'deskInfoTitle',
      render: (record: any) => (
        <Space size="middle">
          { record.deskInfo?.title }
        </Space>
      )
    },
    {
      title: '剧本名称',
      key: 'scriptInfoTitle',
      render: (record: any) => (
        <Space size="middle">
          { record.scriptInfo?.title }
        </Space>
      )
    },
    {
      title: '主持人',
      key: 'hostInfoNickName',
      render: (record: any) => (
        <Space size="middle">
          { record.hostInfo?.nickname }
        </Space>
      )
    },
    {
      title: '应收金额',
      dataIndex: 'receivableMoney',
      key: 'receivableMoney',
      align: 'right'
    },
    {
      title: '实收金额',
      dataIndex: 'realMoney',
      key: 'realMoney',
      align: 'right'
    },
    {
      title: '状态',
      key: 'status',
      align: 'center',
      render: (record: any) => {
        if (Number(record.status) === 10) {
          return (
           <Tag color="red">进行中</Tag>
          )
        }
        return <Tag color="green">完成</Tag>
      }
    },
    {
      title: '下单时间',
      dataIndex: 'orderTime',
      key: 'orderTime',
      align: 'center'
    },
    {
      title: '结算时间',
      dataIndex: 'settlementTime',
      key: 'settlementTime',
      align: 'center'
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark'
    }
  ];

  async componentDidMount() {
    const params = {
      ...this.state.initDateRange,
      storeId: this.props.loginUserInfo.storeId
    }
    await this.props.dispatch({
      type: 'orderManagement/getOrderManagementListEffect',
      params
    });
    this.setState({
      dataLoading: false
    });
  }

  render() {
    return (
      <div className="order-management">
        <div className="order-search">
          <OrderHistorySearch initDateRange={this.state.initDateRange} />
        </div>
        <div className="order-table">
          <Table
            dataSource={this.props.orderList}
            // @ts-ignore
            columns={this.columns}
            loading={this.state.dataLoading}
            summary={pageData => {
              let summaryReceivableMoney = 0;
              let summaryRealMoney = 0;
              _.forEach(pageData, (value: IOrderTable) => {
                summaryReceivableMoney += Number(value.receivableMoney);
                summaryRealMoney += Number(value.realMoney);
              })
              return (
                <>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={4}>总计</Table.Summary.Cell>
                    <Table.Summary.Cell index={1} align="right">{summaryReceivableMoney.toFixed(2)}</Table.Summary.Cell>
                    <Table.Summary.Cell index={2} align="right">{summaryRealMoney.toFixed(2)}</Table.Summary.Cell>
                    <Table.Summary.Cell index={3} colSpan={4}></Table.Summary.Cell>
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
  loginUserInfo: state.loginManagement.userInfo,
  orderList: state.orderManagement.orderList
});
type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(OrderHistoryList);
