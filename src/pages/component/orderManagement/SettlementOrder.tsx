import React from 'react';
import { connect } from 'react-redux';
import { ConnectState, ConnectProps } from '@/models/connect';
import _ from 'lodash';
import { Button, Form, Input, Modal, InputNumber } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { IOrderTable } from '@/pages/types/orderManagement';
import { IRoleTable } from '@/pages/types/roleManagement';
import { IOrderDetailTable } from '@/pages/types/orderDetailManagement';
import { getOrderDetailListForTable } from '@/utils/orderDetailManagementUtils';
import { IOrderDetailIntegralTable } from '@/pages/types/orderDetailIntegralManagement';

interface IProps extends StateProps, ConnectProps {
  visible: boolean;
  currentData: IOrderTable;
  onShow(visible: boolean, currentData?: IOrderTable): void;
}

interface IState {
  roleList: IRoleTable[];
  orderDetailList: IOrderDetailTable[];
  orderReceivablePrice: number;
  orderRealPrice: number;
  orderDetailIntegralList: IOrderDetailIntegralTable[];
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

class SettlementOrderModel extends React.Component<IProps, IState> {
  state = {
    roleList: [],
    orderDetailList: [],
    orderReceivablePrice: 0,
    orderRealPrice: 0,
    orderDetailIntegralList: []
  }

  async componentDidMount() {
    /// orderDetailList
    this.setState({
      orderDetailList: [...getOrderDetailListForTable(this.props.currentData.detailList ?? []) as IOrderDetailTable[] ]
    });

    /// roleList
    const roleParams = {};
    const roleList = await this.props.dispatch({
      type: 'roleManagement/getRoleManagementListEffect',
      params: roleParams
    });

    this.setState({
      roleList
    });

    // orderReceivablePrice and orderRealPrice
    const orderReceivablePrice = _.sum(_.map(this.state.orderDetailList, (item: IOrderDetailTable) => Number(item.unitPrice)));
    const orderRealPrice = _.sum(_.map(this.state.orderDetailList, (item: IOrderDetailTable) => Number(item.discountPrice)));

    this.setState({
      orderReceivablePrice,
      orderRealPrice
    });
  }

  onDiscountChange = async (value: number, detailItem: IOrderDetailTable) => {
    if(!_.isNumber(value) || value > 1){
      return;
    }
    const { orderDetailList } = this.state;
    const tempOrderDetailList = _.map(orderDetailList, (item: IOrderDetailTable) => {
      if( item.id !== detailItem.id ) {
        return item;
      }
      return {
        ...item,
        discount: Number(value),
        discountPrice: Number(_.isUndefined(item.unitPrice) ? 0 : item.unitPrice) * Number(value)
      }
    });

    await this.setState({
      orderDetailList: tempOrderDetailList
    });
    this.changeOrderRealPrice();
  }

  changeOrderRealPrice = async () => {
    const orderRealPrice = _.sum(_.map(this.state.orderDetailList, (item: IOrderDetailTable) => Number(item.discountPrice)));

    await this.setState({
      orderRealPrice
    });
  }

  changeOrderDetailIntegralList = async (value: number, detailItem: IOrderDetailTable, roleItem: IOrderDetailIntegralTable) => {
    const { orderDetailIntegralList } = this.state;
    let data = _.find(this.state.orderDetailIntegralList, (orderDetailIntegralItem: IOrderDetailIntegralTable) => orderDetailIntegralItem.orderDetailId === detailItem.id)?.data ?? [];
    data = _.uniqBy([{
      roleId: _.isUndefined(roleItem.id) ? '0' : roleItem.id,
      integral: Number(value)
    }, ...data], 'roleId');
    const tempParamRole: any = {
      orderDetailId: _.isUndefined(detailItem.id) ? '0' : detailItem.id,
      data
    };

    await this.setState({
      orderDetailIntegralList: _.uniqBy([tempParamRole, ...orderDetailIntegralList],'orderDetailId')
    });
  }

  changeOrderDetailList = async (detailItem: IOrderDetailTable) => {
    const { orderDetailList } = this.state;
    const tempOrderDetailList = _.map(orderDetailList, (item: IOrderDetailTable) => {
      if( item.id !== detailItem.id ) {
        return item;
      }
      const orderDetailIntegral = _.find(this.state.orderDetailIntegralList, (orderDetailIntegralItem: IOrderDetailIntegralTable) => orderDetailIntegralItem.orderDetailId === item.id );
      return {
        ...item,
        orderDetailIntegralList: !_.isEmpty(orderDetailIntegral)? orderDetailIntegral?.data : []
      }
    });

    await this.setState({
      orderDetailList: tempOrderDetailList
    });
  }

  onRoleInputChange = async (value: number, detailItem: IOrderDetailTable, roleItem: IOrderDetailIntegralTable) => {
    await this.changeOrderDetailIntegralList(value, detailItem, roleItem);
    await this.changeOrderDetailList(detailItem);
  }

  onSubmit = async (values: any) => {
    Modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: '确认结算该订单吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: async (e) => {
        const params = {
          orderId: this.props.currentData.id,
          settlementOperatorId: 1,
          remark: values.remark,
          orderDetailList: this.state.orderDetailList
        };
        console.log('params',params);
        return;
      }
    });
  }

  render() {
    const initialValues = { ...this.props.currentData };
    return (
      <Modal
        title="开台信息"
        visible={this.props.visible}
        footer={null}
        closable={false}
        destroyOnClose
        width={1000}
      >
        <Form {...layout} name="orderAddForm" onFinish={this.onSubmit}
              initialValues={ initialValues }>
          <Form.Item
            name="scriptTitle"
            label="卓号"
          >
            { initialValues.deskInfo.title }
          </Form.Item>
          <Form.Item
            name="scriptId"
            label="选择剧本"
          >
            { initialValues.scriptInfo.title }
          </Form.Item>
          <Form.Item
            name="hostId"
            label="主持人"
          >
            { initialValues.hostInfo.phone }-{ initialValues.hostInfo.nickname }
          </Form.Item>
          <Form.Item
            name="orderTime"
            label="下单时间"
          >
            { initialValues.orderTime }
          </Form.Item>
          <Form.Item
            name="remark"
            label="备注"
            rules={[
              {
                max: 200,
                message: '不超过200个字符!',
              }
            ]}
          >
            <Input.TextArea/>
          </Form.Item>
          <div className="settlement-order-detail-list">
            <div className="title-list">
              <span>用户</span>
              {
                _.map(this.state.roleList, (roleItem: IRoleTable) => {
                  return (
                    <span key={roleItem.id}>{roleItem.title}</span>
                  )
                })
              }
              <span>折扣</span>
              <span>付款金额</span>
            </div>
            {
              !_.isEmpty(this.state.orderDetailList) && _.map(this.state.orderDetailList, (item: IOrderDetailTable) => {
                return (
                    <div className="value-list" key={item.id}>
                        <span>
                          { !_.isEmpty(item.userInfo) && item.userInfo?.phone } - { !_.isEmpty(item.userInfo) && item.userInfo?.nickname }
                        </span>
                        {
                          _.map(this.state.roleList, (roleItem: IRoleTable) => {
                            return (
                              <span key={roleItem.id}>
                                  <Form.Item>
                                    <InputNumber size={'small'} placeholder={`max:${Number(roleItem.maxAddIntegral)}` } max={ Number(roleItem.maxAddIntegral) } min={0} onChange={(value) => this.onRoleInputChange(Number(value),item,roleItem)} />
                                  </Form.Item>
                              </span>
                            )
                          })
                        }
                        <span>
                          <Form.Item>
                            <InputNumber size={'small'} defaultValue={ item.discount } max={1} min={0} onChange={(value) => this.onDiscountChange(Number(value), item)} />
                          </Form.Item>
                        </span>
                        <span>
                          { item.discountPrice?.toFixed(2) }
                        </span>
                    </div>
                )
              })
            }
            <div className="total-price">
              <span>剧本开本价:</span>
              <span>￥{ Number(initialValues.scriptInfo.formatPrice).toFixed(2) }</span>
              <span>应收总价:</span>
              <span>￥{ this.state.orderReceivablePrice.toFixed(2) }</span>
              <span>实收总价:</span>
              <span>￥{ this.state.orderRealPrice.toFixed(2) }</span>
            </div>
          </div>
          <div className="add-order-submit-button-area">
            <Button
              type="primary"
              htmlType="submit"
            >
              结算
            </Button>
            <Button className="cancel" onClick={() => this.props.onShow(false)}>取消</Button>
          </div>
        </Form>
      </Modal>
    )
  }
}

const mapStateToProps = (state: ConnectState) => ({
  // scriptList: state.scriptManagement.scriptList
});
type StateProps = ReturnType<typeof mapStateToProps>;
export default connect(mapStateToProps)(SettlementOrderModel);
