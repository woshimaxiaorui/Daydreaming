import React from 'react';
import { connect } from 'react-redux'
import { ConnectState, ConnectProps } from '@/models/connect';
import _ from 'lodash';
import { Modal, Button, Form, Input, Select, Checkbox } from 'antd';
import { IOrderTable } from '@/pages/types/orderManagement';
import { IUserTable } from '@/pages/types/userManagement';
import { IOrderDetailTable } from '@/pages/types/orderDetailManagement';
import { getOrderDetailListForTable } from '@/utils/orderDetailManagementUtils';

interface IProps extends StateProps, ConnectProps {
  visible: boolean;
  currentData: IOrderTable;
  onEditShow(visible: boolean, currentData?: IOrderTable): void;
}

interface IState {
  hostList: IUserTable[];
  orderDetailList: IOrderDetailTable[];
}

const {Option} = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

class AddOrderModel extends React.Component<IProps, IState> {
  state = {
    hostList: [],
    orderDetailList: []
  }

  async componentDidMount() {
    /// orderDetailList
    this.setState({
      orderDetailList: [...getOrderDetailListForTable(this.props.currentData.detailList || [])]
    });

    /// scriptList
    const scriptParams = {
      storeId: 1
    };
    await this.props.dispatch({
      type: 'scriptManagement/getScriptManagementListEffect',
      params: scriptParams
    });

    /// userList
    const userParams = {
      storeId: 1
    };
    await this.props.dispatch({
      type: 'userManagement/getUserManagementListEffect',
      params: userParams
    });

    /// hostList
    const hostList = _.filter(this.props.userList, (user: IUserTable) => {
      return user.role !== '3';
    });
    this.setState({
      hostList
    });
  };

  addStateUser = (userId: string) => {
    const userInfo: IUserTable = _.find(this.props.userList, user => user.id === userId) || {} as IUserTable;
    const tempOrderDetail: IOrderDetailTable = {
      tempId: userId,
      userInfo
    };
    const { orderDetailList } = this.state;
    this.setState({
      orderDetailList: _.uniqWith(_.compact([tempOrderDetail, ...orderDetailList]), _.isEqual)
      // _.uniqWith(_.compact([tempOrderDetail, ...orderDetailList]),_.isEqual)
    }, () => {
      // console.log(`state.userList`, this.state.orderDetailList);
    });
  };

  deleteStateUser = (orderDetail: IOrderDetailTable) => {
    const tempOrderDetailList = [...this.state.orderDetailList];
    const removedOrderDetailList = _.filter(tempOrderDetailList, (item: IOrderDetailTable) => orderDetail.tempId !== item.tempId )
    this.setState({
      orderDetailList: removedOrderDetailList
    }, () => {
      // console.log("removedOrderDetailList", this.state.orderDetailList);
    })
  }

  onSubmit = async (values: any) => {
    const playerArr = _.map(values.playerItem, (value, prop) => ({
      userId: value,
      isPay: 0
    }));
    const userArr = _.map(values.userItem, (value, prop) => ({
      userId: value,
      isPay: 1
    }));
    const detailList = _.unionBy(playerArr, userArr, "userId");

    const params = {
      ...values,
      storeId: 1,
      deskId: this.props.currentData.deskId,
      orderOperatorId: 1,
      detailList: detailList
      //storeId,scriptId,deskId,orderOperatorId,remark,detailList
    };
    await this.props.dispatch({
      type: 'orderManagement/addOrderManagementEffect',
      params
    });
    this.props.onEditShow(false);
  };

  render() {
    const initialValues = { ...this.props.currentData };
    return (
      <Modal
        title="修改开台信息"
        visible={this.props.visible}
        footer={null}
        closable={false}
        destroyOnClose
      >
        <Form {...layout} name="orderAddForm" onFinish={this.onSubmit}
              initialValues={ initialValues }>
          <Form.Item
            name="scriptId"
            label="选择剧本"
            rules={[
              {
                required: true,
                message: '请选择剧本!',
              },
            ]}
          >
            <Select placeholder="请选择剧本">
              {_.map(this.props.scriptList, item => (
                <Option key={item.id} value={`${item.id}`}>{item.title}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="hostId"
            label="请选择主持人"
            rules={[
              {
                required: true,
                message: '请选择主持人!',
              },
            ]}
          >
            <Select placeholder="请选择主持人" style={{ width: '100%' }} showSearch >
              {_.map(this.state.hostList, (item: IUserTable) => (
                <Option key={item.id} value={`${item.id}`}>{item.phone}-{item.nickname}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="userItem"
            label="请选择用户"
            rules={[
              {
                required: true,
                message: '请选择用户!',
              },
            ]}
          >
            <Select placeholder="请选择用户" style={{ width: '100%' }} showSearch onChange={this.addStateUser}>
              {_.map(this.props.userList, item => {
                const disabled = !_.isEmpty(_.find(this.state.orderDetailList, (orderDetailItem: IOrderDetailTable) => orderDetailItem?.tempId === item.id ));
                return (
                  <Option key={item.id} disabled={disabled} value={`${item.id}`}>{item.phone}-{item.nickname}</Option>
                )
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="userItem"
            label="用户列表"
          >
            <ul>
              {
                !_.isEmpty(this.state.orderDetailList) && _.map(this.state.orderDetailList, (item: IOrderDetailTable) => (
                  <li key={item.tempId}><Checkbox defaultChecked={ item.isPay }>{item.userInfo?.phone}-{item.userInfo?.nickname}</Checkbox> <a onClick={() => this.deleteStateUser(item)}>删除</a></li>
                ))
              }
            </ul>
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
          <div className="add-order-submit-button-area">
            <Button
              type="primary"
              htmlType="submit"
            >
              提交
            </Button>
            <Button className="cancel" onClick={() => this.props.onEditShow(false)}>取消</Button>
          </div>
        </Form>
      </Modal>
    )
  }
}
const mapStateToProps = (state: ConnectState) => ({
  scriptList: state.scriptManagement.scriptList,
  userList: state.userManagement.userList
});
type StateProps = ReturnType<typeof mapStateToProps>;
//
export default connect(mapStateToProps)(AddOrderModel);


