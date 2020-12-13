import React from 'react';
import { Modal, Button, Form, Select, Input } from 'antd';
import { IAddStoreExists } from '@/pages/types/storeManagement';
import { Dispatch } from 'dva';
import { connect } from 'react-redux';
import { IAddPlayerExists } from '@/pages/types/playerManagement';
import { FormInstance } from 'antd/es/form';

interface IProps {
  visible: boolean;
  dispatch: Dispatch;
  onShow(visible: boolean): void;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

class AddPlayerModel extends React.Component<IProps> {

  formRef = React.createRef<FormInstance>();

  onSubmit = async (values: any) => {
    const params = {
      ...values,
      storeId: '1'
    };
    const submitRes: IAddPlayerExists = await this.props.dispatch({
      type: 'playerManagement/addPlayerManagementEffect',
      params
    });
    if (!submitRes.phoneExists) {
      const phoneError = submitRes.phoneExists ? {} : {
        name: 'phone',
        errors: ['手机号码已存在']
      };
      const errorList = [
        phoneError
      ];
      // @ts-ignore
      this.formRef.current.setFields(errorList);
      return;
    }
    this.props.onShow(false);
  };

  render() {
    return (
      <Modal
        title="新增玩家信息"
        visible={this.props.visible}
        footer={null}
        closable={false}
        destroyOnClose
      >
        <Form {...layout} name="playerAddForm" ref={this.formRef} onFinish={this.onSubmit}>
          <Form.Item
            name="nickname"
            label="昵称"
            rules={[
              {
                required: true,
                message: '输入昵称!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="手机号"
            rules={[
              {
                required: true,
                message: '输入手机号!',
              },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="sex"
            label="性别"
          >
            <Select>
              <Select.Option value="1">男</Select.Option>
              <Select.Option value="0">女</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="remark"
            label="备注"
          >
            <Input.TextArea/>
          </Form.Item>
          <div className="add-player-submit-button-area">
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
export default connect()(AddPlayerModel);
