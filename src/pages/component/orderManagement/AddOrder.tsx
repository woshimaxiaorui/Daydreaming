import React from 'react';
import { connect } from 'react-redux'
import { ConnectState, ConnectProps } from '@/models/connect';
import _ from 'lodash';
import { Modal, Button, Form, Input, Select, Checkbox, Spin } from 'antd';
import { IUserTable } from '@/pages/types/userManagement';
import { IOrderDetailTable } from '@/pages/types/orderDetailManagement';
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const {Option} = Select;

interface IProps extends StateProps, ConnectProps {
  visible: boolean;
  onShow(visible: boolean): void;
  deskId: string;
}

interface IState {
  orderDetailList: IOrderDetailTable[];
  playerDataList: IUserTable[];
  playerValue: string;
  playerFetching: boolean;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

class AddOrderModel extends React.Component<IProps, IState> {
  state = {
    orderDetailList: [],
    playerDataList: [],
    playerValue: '',
    playerFetching: false
  }

  async componentDidMount() {
    // scriptList ajax
    const scriptParams = {
      storeId: this.props.loginUserInfo.storeId,
      pageRecords: 1000
    };
    await this.props.dispatch({
      type: 'scriptManagement/getScriptManagementListEffect',
      params: scriptParams
    });
    // hostList ajax
    const hostParams = {
      storeId: this.props.loginUserInfo.storeId,
      pageRecords: 1000
    }
    await this.props.dispatch({
      type: 'hostManagement/getHostManagementListEffect',
      params: hostParams
    });
  };

  searchPlayer = async (value: any) => {
    this.setState({ playerDataList: [], playerFetching: true });
    const playerParams = {
      storeId: this.props.loginUserInfo.storeId,
      phone: value,
      pageRecords: 1000
    };
    const playerDataList = await this.props.dispatch({
      type: 'playerManagement/getPlayerManagementListEffect',
      params: playerParams
    });
    await this.setState({
      playerDataList
    })
    this.setState({
      playerFetching: false
    })
  }

  handleSearchPlayer = async (value: any) => {
    if(value) {
      //searchPlayerList ajax
      //setState playerDataList
      await this.searchPlayer(value);
    } else {
      this.setState({ playerDataList: [] })
    }
  }

  handleAddStatePlayer = async (userId: string) => {
    const userInfo: IUserTable = _.find(this.state.playerDataList, (user: IUserTable) => user.id === userId) || {} as IUserTable;
    const tempOrderDetail: IOrderDetailTable = {
      tempId: userId,
      userId,
      userInfo
    };
    const { orderDetailList } = this.state;
    this.setState({
      orderDetailList: _.uniqWith(_.compact([tempOrderDetail, ...orderDetailList]), _.isEqual)
    });
  };

  deleteStateUser = (orderDetail: IOrderDetailTable) => {
    const tempOrderDetailList = [...this.state.orderDetailList];
    const removedOrderDetailList = _.filter(tempOrderDetailList, (item: IOrderDetailTable) => orderDetail.tempId !== item.tempId )
    this.setState({
      orderDetailList: removedOrderDetailList
    })
  }

  onSubmit = async (values: any) => {
    const params = {
      ...values,
      storeId: this.props.loginUserInfo.storeId,
      deskId: this.props.deskId,
      orderOperatorId: this.props.loginUserInfo.id,
      detailList: this.state.orderDetailList
      //storeId,scriptId,deskId,hostId,orderOperatorId,remark,detailList
    };

    await this.props.dispatch({
      type: 'orderManagement/addOrderManagementEffect',
      params
    });
    this.props.onShow(false);
  };

  render() {
    return (
      <Modal
        title="创建开台信息"
        visible={this.props.visible}
        footer={null}
        closable={false}
        destroyOnClose
      >
        <Form {...layout} name="orderAddForm" onFinish={this.onSubmit}>
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
            <Select placeholder="请选择剧本" showSearch>
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
              {_.map(this.props.hostList, (item: IUserTable) => (
                <Option key={item.id} value={`${item.id}`}>{item.phone}-{item.nickname}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="userItem"
            label="请选择用户"
          >
            <Select placeholder="请选择用户" style={{ width: '100%' }}
                    showSearch
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    filterOption={false}
                    onSearch={_.debounce(this.handleSearchPlayer,500)}
                    onChange={this.handleAddStatePlayer}
                    notFoundContent={this.state.playerFetching ? <Spin size="small" /> : null}
             >
              {
                _.map(this.state.playerDataList, (player: IUserTable) => {
                  const disabled = !_.isEmpty(_.find(this.state.orderDetailList, (orderDetailItem: IOrderDetailTable) => orderDetailItem?.tempId === player.id))
                  return (
                    <Option key={player.id} disabled={disabled} value={`${player.id}`}>{player.phone}-{player.nickname}</Option>
                  )
                })
              }
            </Select>
          </Form.Item>
          <Form.Item
            name="userItem"
            label="用户列表"
          >
            <ul>
              {
                !_.isEmpty(this.state.orderDetailList) && _.map(this.state.orderDetailList, (item: IOrderDetailTable) => (
                  <li key={item.tempId}><Checkbox>{item.userInfo?.phone}-{item.userInfo?.nickname}</Checkbox> <a onClick={() => this.deleteStateUser(item)}>删除</a></li>
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
          <Form.Item>
            <Editor
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              localization={{
                locale: 'zh',
              }}
            />
          </Form.Item>
          <div className="add-order-submit-button-area">
            <Button
              type="primary"
              htmlType="submit"
            >
              提交
            </Button>
            <Button className="cancel" onClick={() => this.props.onShow(false)}>取消</Button>
          </div>
        </Form>
      </Modal>
    )
  }
}
const mapStateToProps = (state: ConnectState) => ({
  loginUserInfo: state.loginManagement.userInfo,
  scriptList: state.scriptManagement.scriptList,
  hostList: state.hostManagement.hostList,
});
type StateProps = ReturnType<typeof mapStateToProps>;
export default connect(mapStateToProps)(AddOrderModel);
