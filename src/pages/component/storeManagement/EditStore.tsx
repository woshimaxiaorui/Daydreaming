import React from 'react';
import { Modal, Button, Form, Switch, Input } from 'antd';
import { IAddStoreExists, IStoreTable } from '@/pages/types/storeManagement';
import _ from 'lodash';
import { Dispatch } from 'dva';
import { connect } from 'react-redux';
import { FormInstance } from 'antd/es/form';

interface IProps {
  visible: boolean;
  currentEditData: IStoreTable;
  dispatch: Dispatch;
  onEditShow(visible: boolean): void;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

class EditStoreModel extends React.Component<IProps> {

  formRef = React.createRef<FormInstance>();

  onSubmit = async (values: any) => {
    const params = {
      storeId: this.props.currentEditData.id,
      address: values.address,
      status: values.status,
      storeName: values.storeName,
    };
    const submitRes: IAddStoreExists = await this.props.dispatch({
      type: 'storeManagement/editStoreManagementEffect',
      params
    });
    if (!submitRes.storeNameExists) {
      // @ts-ignore
      this.formRef.current.setFields([{
        name: 'storeName',
        errors: ['该门店名称已存在']
      }]);
      return;
    }
    this.props.onEditShow(false);
  };

  render() {
    const initialValues = !_.isEmpty(this.props.currentEditData) ? { ...this.props.currentEditData } : {};
    const switchStatus = !_.isEmpty(this.props.currentEditData) ? this.props.currentEditData.status : false;
    return (
      <Modal
        title="修改门店信息"
        visible={this.props.visible}
        footer={null}
        closable={false}
        destroyOnClose
      >
        <Form {...layout} name="storeEditForm" ref={this.formRef} initialValues={initialValues} onFinish={this.onSubmit}>
          <Form.Item
            name="storeName"
            label="门店名称"
            rules={[
              {
                required: true,
                message: '输入门店名称!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="status"
            label="系统使用状态"
            rules={[{required: true, message: '不可以为空'}]}
          >
            <Switch defaultChecked={switchStatus}/>
          </Form.Item>
          <Form.Item
            name="address"
            label="门店地址"
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
          <div className="add-store-submit-button-area">
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
export default connect()(EditStoreModel);
