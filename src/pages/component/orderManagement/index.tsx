import React from 'react';
import { connect } from 'react-redux';
import { ConnectState, ConnectProps } from '@/models/connect';
import _ from 'lodash';
import { Button, Space, Table } from 'antd';
import { dateAdd } from '@/utils/func';

import './index.scss';
import { IDeskTable } from '@/pages/types/deskManagement';
import AddOrderModel from '@/pages/component/orderManagement/AddOrder';
import EditOrderModel from '@/pages/component/orderManagement/EditOrder';
import SettlementOrderModel from '@/pages/component/orderManagement/SettlementOrder';
import { IOrderTable } from '@/pages/types/orderManagement';

interface IProps extends StateProps, ConnectProps {
  deskList: IDeskTable[];
}

interface IState {
  createOrderModalStatus: boolean;
  editOrderModalStatus: boolean;
  settlementOrderModalStatus: boolean;
  currentData: IOrderTable;
  deskId: string;
};

class OrderManagement extends React.Component<IProps, IState> {
  state = {
    createOrderModalStatus: false,
    editOrderModalStatus: false,
    settlementOrderModalStatus: false,
    currentData: Object.create(null),
    deskId: '0'
  };

  columns = [
    {
      title: '卓号',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: '剧本名称',
      key: 'scriptTitle',
      render: (record: any) => _.isEmpty(record.orderInfo) || _.isEmpty(record.orderInfo.scriptInfo) ? '' : record.orderInfo.scriptInfo.title
    },
    {
      title: '开始时间',
      key: 'orderTime',
      render: (record: any) => _.isEmpty(record.orderInfo) ? '' : record.orderInfo.orderTime
    },
    {
      title: '预计结束时间',
      key: 'orderTime',
      render: (record: any) => {
        const orderTime = _.isEmpty(record.orderInfo) ? '' : record.orderInfo.orderTime;
        const scriptGameTime: number = _.isEmpty(record.orderInfo) || _.isEmpty(record.orderInfo.scriptInfo) ? '' : record.orderInfo.scriptInfo.gameTime;
        let dateTime = dateAdd('h',scriptGameTime,orderTime);
        return(
          dateTime
        )
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (record: any) => {
        if(_.isEmpty(record.orderInfo)){
          return (
            <Space size="middle">
              <a onClick={ () => this.createOrderModalStatusSwitch(true, record.id) }>开台</a>
            </Space>
          )
        } else {
          return (
            <Space size="middle">
              <a onClick={ () => this.editOrderModalStatusSwitch(true, record.orderInfo) }>修改</a>
              <a onClick={ () => this.settlementOrderModalStatusSwitch(true, record.orderInfo) }>结算</a>
            </Space>
          )
        }
      }
    }
  ];

  componentDidMount() {
    this.props.dispatch({
      type: 'deskManagement/getOrderManagementDeskListEffect'
    });
  }

  createOrderModalStatusSwitch = (createOrderModalStatus: boolean, deskId?: string) => {
    this.setState({
      createOrderModalStatus,
      deskId: _.isUndefined(deskId) ? '0' : deskId
  })
  }

  editOrderModalStatusSwitch = (editOrderModalStatus: boolean, currentData?: IOrderTable) => {
    this.setState({
      editOrderModalStatus,
      currentData: _.isUndefined(currentData) ? {} as IOrderTable : currentData
    })
  }

  settlementOrderModalStatusSwitch = (settlementOrderModalStatus: boolean, currentData?: IOrderTable) => {
    this.setState({
      settlementOrderModalStatus,
      currentData: _.isUndefined(currentData) ? {} as IOrderTable : currentData
    })
  }

  render() {
    return (
      <div className="order-management">
        <div className="order-search">
          <span></span>
          <Button type="primary">创建</Button>
        </div>
        <div className="order-table">
          <Table
            dataSource={this.props.deskList}
            columns={this.columns} />
        </div>
        {
          this.state.createOrderModalStatus && <AddOrderModel visible={this.state.createOrderModalStatus} onShow={this.createOrderModalStatusSwitch} deskId={this.state.deskId} />
        }
        {
          this.state.editOrderModalStatus && <EditOrderModel visible={this.state.editOrderModalStatus} currentData={this.state.currentData} onEditShow={this.editOrderModalStatusSwitch}/>
        }
        {
          this.state.settlementOrderModalStatus && <SettlementOrderModel visible={this.state.settlementOrderModalStatus} currentData={this.state.currentData} onShow={this.settlementOrderModalStatusSwitch}/>
        }
      </div>
    )
  }
}

const mapStateToProps = (state: ConnectState) => ({
  deskList: state.deskManagement.deskList
});
type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(OrderManagement);
