import React from 'react';
import { Modal, Button, Form, Switch, Input, InputNumber } from 'antd';
import { IAddScriptResponse } from '@/pages/types/scriptManagement';
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

class AddScriptModel extends React.Component<IProps> {
  state = {
    adaptContentDisabled: true,
  };

  onSubmit = async (values: any) => {
    const params = {
      ...values,
      storeId: 1
    };
    const submitRes: IAddScriptResponse = await this.props.dispatch({
      type: 'scriptManagement/addScriptManagementEffect',
      params
    });
    this.props.onShow(false);
  };

  isAdaptOnChange = (checked: any) => {
    this.setState({
      adaptContentDisabled: !this.state.adaptContentDisabled,
    });
  };

  render() {
    return (
      <Modal
        title="创建剧本信息"
        visible={this.props.visible}
        footer={null}
        closable={false}
        destroyOnClose
      >
        <Form {...layout} name="scriptAddForm" onFinish={this.onSubmit}
              initialValues={{
                'applicableNumber': 1,
                'gameTime': 1,
                'isAdapt': false,
                'adaptContent': ''
              }}
          >
          <Form.Item
            name="title"
            label="剧本名称"
            rules={[
              {
                required: true,
                message: '输入剧本名称!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="类型"
            rules={[
              {
                required: true,
                message: '输入类型!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="描述"
            rules={[
              {
                required: true,
                message: '不可以为空!',
              },
              {
                max: 200,
                message: '不超过200个字符!',
              }
            ]}
          >
            <Input.TextArea/>
          </Form.Item>
          <Form.Item
            name="applicableNumber"
            label="适用人数"
          >
            <InputNumber size="large" min={1} max={100000} />
          </Form.Item>
          <Form.Item
            name="gameTime"
            label="游戏时间（小时）"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="isAdapt"
            label="是否改编"
          >
            <Switch onChange={this.isAdaptOnChange} />
          </Form.Item>
          <Form.Item
            name="adaptContent"
            label="改编内容"
            rules={[
              {
                max: 200,
                message: '不超过200个字符!',
              }
            ]}
          >
            <Input.TextArea disabled={this.state.adaptContentDisabled} />
          </Form.Item>
          <div className="add-script-submit-button-area">
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
export default connect()(AddScriptModel);
