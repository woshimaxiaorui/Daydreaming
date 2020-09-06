import React from 'react';
import { Form, Input, Button, Select } from 'antd';

const { Option } = Select;

class StoreSearch extends React.Component {
  onSearch = (values: any) => {
    console.log('>>', values);
  };

  render() {
    return (
      <Form name="StoreSearch" layout="inline" onFinish={this.onSearch}>
        <Form.Item
          name="status"
          label="系统使用状态"
        >
          <Select style={{ width: 100 }} allowClear>
            <Option value="true">使用中</Option>
            <Option value="false">未激活</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="storeName"
        >
          <Input placeholder="门店名称" />
        </Form.Item>
        <Form.Item
          name="userName"
        >
          <Input
            placeholder="管理员名"
          />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
        >
          <Input
            placeholder="手机号"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
          >
            查询
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

export default StoreSearch;
