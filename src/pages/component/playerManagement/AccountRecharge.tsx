import React from 'react';
import { Modal, Button, Form, InputNumber, Input, message } from 'antd';
import { IPlayerTable } from '@/pages/types/playerManagement';
import _ from 'lodash';
import { FormInstance } from 'antd/es/form';
import { Dispatch } from 'dva';
import { connect } from 'react-redux';

interface IProps {
  visible: boolean;
  currentData: IPlayerTable;
  dispatch: Dispatch;
  onShow(visible: boolean): void;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

class AccountRechargeModel extends React.Component<IProps> {

  formRef = React.createRef<FormInstance>();

  onSubmit = async (values: any) => {
    if(!_.isNumber(values.rechargeAmount)){
      return;
    }
    const params = {...values, userId: values.id};
    const submitRes = await this.props.dispatch({
      type: 'playerManagement/accountRechargeEffect',
      params
    });
    if (!submitRes) {
      message.error('充值失败！');
      return;
    }
    message.success('充值成功！');
    this.props.onShow(false);
  };

  render() {
    const initialValues = !_.isEmpty(this.props.currentData)
      ? {...this.props.currentData, sex: _.isEqual(this.props.currentData.sex, 0) ? '女' : '男'} : {};
    return (
      <Modal
        title="玩家信息"
        visible={this.props.visible}
        footer={null}
        closable={false}
        destroyOnClose
      >
        <Form {...layout} name="playerEditForm" ref={this.formRef} initialValues={initialValues} onFinish={this.onSubmit}>
          <Form.Item
            name="id"
            label="ID"
            hidden
          />
          <Form.Item
            name="nickname"
            label="昵称"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="phone"
            label="手机号"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="accountBalance"
            label="账户余额"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="voucherBalance"
            label="代金卷余额"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="rechargeAmount"
            label="充值金额"
            rules={[
              {
                required: true,
                message: '请输入充值金额!',
              },
            ]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <div className="add-player-submit-button-area">
            <Button
              type="primary"
              htmlType="submit"
            >
              充值
            </Button>
            <Button className="cancel" onClick={() => this.props.onShow(false)}>取消</Button>
          </div>
        </Form>
      </Modal>
    )
  }
}
export default connect()(AccountRechargeModel);
