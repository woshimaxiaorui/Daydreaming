import React from 'react';
import { Form, Input, Button } from 'antd';
import { connect } from 'react-redux';
import { Dispatch } from 'dva';

interface IProps {
  dispatch: Dispatch
}

class PlayerSearch extends React.Component<IProps> {
  onSearch = (values: any) => {
    console.log('>>', values);
    this.props.dispatch({
      type: 'playerManagement/getPlayerManagementListEffect',
      params: values
    });
  };

  render() {
    return (
      <Form name="PlayerSearch" layout="inline" onFinish={this.onSearch}>
        <Form.Item
          name="nickname"
        >
          <Input placeholder="昵称" />
        </Form.Item>
        <Form.Item
          name="phone"
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

export default connect()(PlayerSearch);
