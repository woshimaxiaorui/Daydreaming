import React from 'react';
import { Form, Input, Button, Select, InputNumber } from 'antd';
import { connect } from 'react-redux';
import { Dispatch } from 'dva';
import { FormInstance } from 'antd/es/form';
import _ from 'lodash';
const { Option } = Select;

interface IProps {
  dispatch: Dispatch;
}

class ScriptSearch extends React.Component<IProps> {
  formRef = React.createRef<FormInstance>();
  onSearch = (values: any) => {
    const params = {
      storeId: 1,
      title: values.title,
      type: values.type,
      applicableNumber: values.applicableNumber,
      isAdapt: values.isAdapt
    };
    this.props.dispatch({
      type: 'scriptManagement/getScriptManagementListEffect',
      params
    });
  };
  onClearAll = () => {
    if(!_.isEmpty(this.formRef.current)){
      // @ts-ignore
      this.formRef.current.resetFields();
    }
  };
  render() {
    return (
      <Form name="ScriptSearch" ref={this.formRef} layout="inline" onFinish={this.onSearch}>
        <Form.Item
          name="isAdapt"
          label="是否改編"
        >
          <Select style={{ width: 100 }} allowClear>
            <Option value="true">是</Option>
            <Option value="false">否</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="title"
        >
          <Input placeholder="剧本名称" />
        </Form.Item>
        <Form.Item
          name="type"
        >
          <Input
            placeholder="剧本类型"
          />
        </Form.Item>
        <Form.Item
          name="applicableNumber"
        >
          <InputNumber
            placeholder="适用人数"
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

export default connect()(ScriptSearch);
