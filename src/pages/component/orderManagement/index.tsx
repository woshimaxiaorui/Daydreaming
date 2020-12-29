import React from 'react';
import { connect } from 'react-redux';
import { ConnectState, ConnectProps } from '@/models/connect';
import _ from 'lodash';
import { Space, Table, Spin, Card,  Button, Row, Col } from 'antd';
import { dateAdd } from '@/utils/func';

import './index.scss';
import { IDeskTable } from '@/pages/types/deskManagement';
import AddOrderModel from '@/pages/component/orderManagement/AddOrder';
import EditOrderModel from '@/pages/component/orderManagement/EditOrder';
import SettlementOrderModel from '@/pages/component/orderManagement/SettlementOrder';
import { IOrderTable } from '@/pages/types/orderManagement';

interface IProps extends StateProps, ConnectProps {
  deskOrderList: IDeskTable[];
}

interface IState {
  dataLoading: boolean;
  createOrderModalStatus: boolean;
  editOrderModalStatus: boolean;
  settlementOrderModalStatus: boolean;
  currentData: IOrderTable;
  deskId: string;
};

class OrderManagement extends React.Component<IProps, IState> {
  state = {
    dataLoading: true,
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

  async componentDidMount() {
    await this.props.dispatch({
      type: 'deskManagement/getOrderManagementDeskListEffect'
    });
    this.setState({
      dataLoading: false
    })
  }

  createOrderModalStatusSwitch = (createOrderModalStatus: boolean, deskId?: string) => {
    this.setState({
      createOrderModalStatus,
      deskId: _.isUndefined(deskId) ? '0' : deskId
    })
  };

  editOrderModalStatusSwitch = (editOrderModalStatus: boolean, currentData?: IOrderTable) => {
    this.setState({
      editOrderModalStatus,
      currentData: _.isUndefined(currentData) ? {} as IOrderTable : currentData
    })
  };

  settlementOrderModalStatusSwitch = (settlementOrderModalStatus: boolean, currentData?: IOrderTable) => {
    this.setState({
      settlementOrderModalStatus,
      currentData: _.isUndefined(currentData) ? {} as IOrderTable : currentData
    })
  };

  renderOverTime = (deskItem: IDeskTable) => {
    const orderTime = _.isEmpty(deskItem.orderInfo) ? '' : deskItem.orderInfo.orderTime;
    const scriptGameTime = deskItem.orderInfo.scriptInfo.gameTime;
    const dateTime = dateAdd('h',scriptGameTime,orderTime);
    return (
      <div className="desk-info">
        <span>预计结束时间:</span>
        <span>{dateTime}</span>
      </div>
    )
  };

  renderCard = (deskItem: IDeskTable) => {
    return (
      <Card
        className="order-card"
        title={deskItem.title}
        loading={this.state.dataLoading}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
      >
        {
          !_.isEmpty(deskItem.orderInfo) ? (
            <>
              <div className="desk-info">
                <span>剧本:</span>
                <span>{deskItem.orderInfo?.scriptInfo?.title ?? ''}</span>
              </div>
              <div className="desk-info">
                <span>开始时间:</span>
                <span>{deskItem.orderInfo.orderTime}</span>
              </div>
              {this.renderOverTime(deskItem)}
            </>
          ) : <div className="desk-info-empty">欢迎使用</div>
        }
        <div className="action-area">
          {
            _.isEmpty(deskItem.orderInfo) ? (<Space size="middle">
              <Button type="primary" onClick={ () => this.createOrderModalStatusSwitch(true, deskItem.id) }>开台</Button>
            </Space>) : (<Space size="middle">
              <Button type="primary" onClick={ () => this.editOrderModalStatusSwitch(true, deskItem.orderInfo) }>修改</Button>
              <Button type="primary" onClick={ () => this.settlementOrderModalStatusSwitch(true, deskItem.orderInfo) }>结算</Button>
            </Space>)
          }
        </div>
      </Card>
    )
  }

  render() {
    return (
      <div className="order-management">
        <div className="order-search">
          <span></span>
          {/*<Button type="primary">创建</Button>*/}
        </div>
        <Spin spinning={_.isEmpty(this.props.deskOrderList)} >
          <div className="order-content">
              {
                _.map(this.props.deskOrderList, deskItem => (
                  this.renderCard(deskItem)
                ))
              }
          </div>
        </Spin>
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
  deskOrderList: state.deskManagement.deskOrderList
});
type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(OrderManagement);
