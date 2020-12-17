import React from 'react';
import { connect } from 'react-redux';
import { ConnectState, ConnectProps } from '@/models/connect';
import { IOrderTable } from '@/pages/types/orderManagement';
import { Space, Table, Tag } from 'antd';
import AddOrderModel from '@/pages/component/orderManagement/AddOrder';
import EditOrderModel from '@/pages/component/orderManagement/EditOrder';
import SettlementOrderModel from '@/pages/component/orderManagement/SettlementOrder';
import _ from 'lodash';
import { dateAdd } from '@/utils/func';

interface IProps extends StateProps, ConnectProps {
  orderList: IOrderTable[];
}

interface IState {
  currentData: IOrderTable;
};

class OrderHistoryList extends React.Component<IProps, IState>{
  state = {
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
      key: 'receivableMoney'
    },
    {
      title: '实收金额',
      dataIndex: 'realMoney',
      key: 'realMoney'
    },
    {
      title: '状态',
      key: 'status',
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
      key: 'orderTime'
    },
    {
      title: '结算时间',
      dataIndex: 'settlementTime',
      key: 'settlementTime'
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark'
    }
  ];

  componentDidMount() {
    this.props.dispatch({
      type: 'orderManagement/getOrderManagementListEffect'
    })
  }

  render() {
    return (
      <div className="order-management">
        <div className="order-search">
          <span></span>
        </div>
        <div className="order-table">
          <Table
            dataSource={this.props.orderList}
            columns={this.columns} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: ConnectState) => ({
  orderList: state.orderManagement.orderList
});
type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(OrderHistoryList);
