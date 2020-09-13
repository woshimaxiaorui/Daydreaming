import React from 'react';
import { Form, Input, Button, Select } from 'antd';
import { connect } from 'react-redux';
import { Dispatch } from 'dva';
import { FormInstance } from 'antd/es/form';
const { Option } = Select;

interface IProps {
  dispatch: Dispatch
}

class StoreSearch extends React.Component<IProps> {
  formRef = React.createRef<FormInstance>();
  onSearch = (values: any) => {
    const params = {
      userName: values.userName,
      storeName: values.storeName,
      status: values.status,
      phoneNumber: values.phoneNumber
    };
    this.props.dispatch({
      type: 'storeManagement/getStoreManagementListEffect',
      params
    });
  };
  onClearAll = () => {
    // @ts-ignore
    this.formRef.current.resetFields();
  };
  render() {
    return (
      <Form name="StoreSearch" ref={this.formRef} layout="inline" onFinish={this.onSearch}>
        <Form.Item
          name="status"
          label="系统使用状态"
        >
          <Select style={{ width: 100 }} allowClear>
            <Option value={1}>使用中</Option>
            <Option value={0}>未激活</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="storeName"
        >
          <Input placeholder="门店名称" allowClear/>
        </Form.Item>
        <Form.Item
          name="userName"
        >
          <Input
            placeholder="管理员名"
            allowClear
          />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
        >
          <Input
            placeholder="手机号"
            allowClear
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
          >
            查询
          </Button>
          <Button style={{marginLeft: 5}} type="primary" onClick={this.onClearAll}>清除</Button>
        </Form.Item>
      </Form>
    )
  }
}

export default connect()(StoreSearch);
