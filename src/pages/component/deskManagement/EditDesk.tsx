import React from 'react';
import { connect } from 'react-redux'
import { Dispatch } from '@/models/connect';
import _ from 'lodash';
import { Modal, Button, Form, Switch, Input, InputNumber } from 'antd';

import { IAddDeskResponse, IDeskTable } from '@/pages/types/deskManagement';

interface IProps {
  visible: boolean;
  currentEditData: IDeskTable;
  dispatch: Dispatch;
  onEditShow(visible: boolean): void;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

class EditDeskModel extends React.Component<IProps> {
  onSubmit = async (values: any) => {
    const params = {
      ...values,
      deskId: values.id
    };
    const submitRes: IAddDeskResponse = await this.props.dispatch({
      type: 'deskManagement/editDeskManagementEffect',
      params
    });
    this.props.onEditShow(false);
  };

  render() {
    const initialValues = { ...this.props.currentEditData };
    const switchIsEnabled = !_.isEmpty(initialValues) ? initialValues.isEnabled : false;
    return (
      <Modal
        title="修改桌台信息"
        visible={this.props.visible}
        footer={null}
        closable={false}
        destroyOnClose
      >
        <Form {...layout} name="deskAddForm" onFinish={this.onSubmit}
              initialValues={ initialValues }
        >
          <Form.Item
            name="id"
            label="ID"
            hidden
          />
          <Form.Item
            name="title"
            label="桌号"
            rules={[
              {
                required: true,
                message: '输入剧本桌号!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="isEnabled"
            label="是否可用"
          >
            <Switch defaultChecked={switchIsEnabled} />
          </Form.Item>
          <div className="add-desk-submit-button-area">
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
export default connect()(EditDeskModel);
