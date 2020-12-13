import React from 'react';
import { Modal, Button, Form, Switch, Input } from 'antd';
import { IAddDeskResponse } from '@/pages/types/deskManagement';
import { connect } from 'react-redux'
import { Dispatch } from '@/models/connect';

interface IProps {
  visible: boolean;
  dispatch: Dispatch;
  onShow(visible: boolean): void;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

class AddDeskModel extends React.Component<IProps> {
  state = {
    adaptContentDisabled: true,
  };

  onSubmit = async (values: any) => {
    const params = {
      ...values,
      storeId: 1
    };
    const submitRes: IAddDeskResponse = await this.props.dispatch({
      type: 'deskManagement/addDeskManagementEffect',
      params
    });
    this.props.onShow(false);
  };

  render() {
    return (
      <Modal
        title="创建桌台信息"
        visible={this.props.visible}
        footer={null}
        closable={false}
        destroyOnClose
      >
        <Form {...layout} name="deskAddForm" onFinish={this.onSubmit} >
          <Form.Item
            name="title"
            label="桌号"
            rules={[
              {
                required: true,
                message: '输入桌号!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="isEnabled"
            label="是否可用"
          >
            <Switch defaultChecked />
          </Form.Item>
          <div className="add-desk-submit-button-area">
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
export default connect()(AddDeskModel);
