import React from 'react';
import { Modal, Button, Form, Switch, Input, Select } from 'antd';
import { IAddPlayerExists, IPlayerTable } from '@/pages/types/playerManagement';
import _ from 'lodash';
import { FormInstance } from 'antd/es/form';
import { IAddStoreExists } from '@/pages/types/storeManagement';
import { Dispatch } from 'dva';
import { connect } from 'react-redux';

interface IProps {
  visible: boolean;
  currentEditData: IPlayerTable;
  dispatch: Dispatch;
  onEditShow(visible: boolean): void;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

class EditPlayerModel extends React.Component<IProps> {

  formRef = React.createRef<FormInstance>();

  onSubmit = async (values: any) => {
    console.log('values=>', values);
    const params = {...values, playerId: values.id};
    const submitRes: IAddPlayerExists = await this.props.dispatch({
      type: 'playerManagement/editPlayerManagementEffect',
      params
    });
    if (!submitRes.phoneExists) {
      // @ts-ignore
      this.formRef.current.setFields([{
        name: 'phone',
        errors: ['该电话号码已存在']
      }]);
      return;
    }
    this.props.onEditShow(false);
  };

  render() {
    const initialValues = !_.isEmpty(this.props.currentEditData)
      ? {...this.props.currentEditData, sex: _.isEqual(this.props.currentEditData.sex, 0) ? '女' : '男'} : {};
    return (
      <Modal
        title="修改玩家信息"
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
              修改
            </Button>
            <Button className="cancel" onClick={() => this.props.onEditShow(false)}>取消</Button>
          </div>
        </Form>
      </Modal>
    )
  }
}
export default connect()(EditPlayerModel);
