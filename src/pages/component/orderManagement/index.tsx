import React from 'react';
import { connect } from 'react-redux';
import { ConnectState, ConnectProps } from '@/models/connect';
import _ from 'lodash';
import { Space, Spin, Card,  Button } from 'antd';
import { getPaginationParams, getRandomuserParams } from '@/utils/func';
import './index.scss';
import { IDeskTable } from '@/pages/types/deskManagement';
import AddOrderModel from '@/pages/component/orderManagement/AddOrder';
import EditOrderModel from '@/pages/component/orderManagement/EditOrder';
import SettlementOrderModel from '@/pages/component/orderManagement/SettlementOrder';
import { IOrderTable } from '@/pages/types/orderManagement';
import { IPagination } from '@/pages/types/pagination';

interface IProps extends StateProps, ConnectProps {
  deskOrderList: IDeskTable[];
}

interface IState {
  createOrderModalStatus: boolean;
  editOrderModalStatus: boolean;
  settlementOrderModalStatus: boolean;
  currentData: IOrderTable;
  deskId: string;
  pagination: IPagination;
  formValues: any;
};

class OrderManagement extends React.Component<IProps, IState> {
  state = {
    dataLoading: true,
    createOrderModalStatus: false,
    editOrderModalStatus: false,
    settlementOrderModalStatus: false,
    currentData: Object.create(null),
    deskId: '0',
    pagination: {
      current: 1,
      pageSize: 100
    },
    formValues: Object.create(null)
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
    await this.getListData({
      storeId: this.props.loginUserInfo.storeId,
      pagination: {
        ...this.state.pagination
      }
    });
  }

  getListData = async (params: any = {}) => {
    const requestParams = getRandomuserParams(params);
    await this.props.dispatch({
      type: 'deskManagement/getOrderManagementDeskListEffect',
      params: requestParams
    });
    await this.setState(getPaginationParams(params,params.pagination,this.props.deskOrderDataCount));
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

  renderCard = (deskItem: IDeskTable) => {
    return (
      <Card
        key={deskItem.id}
        className="order-card"
        title={deskItem.title}
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
        <Spin tip="Loading..." spinning={this.props.loading}>
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
  loginUserInfo: state.loginManagement.userInfo,
  deskOrderList: state.deskManagement.deskOrderList,
  deskOrderDataCount: state.deskManagement.dataCount,
  loading: state.loading.global
});
type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(OrderManagement);
