import React from 'react';
import { connect } from 'react-redux';
import { ConnectState, ConnectProps } from '@/models/connect';
import { Form, Input, Button } from 'antd';
import { IPagination } from '@/pages/types/pagination';
import _ from 'lodash';

interface IProps extends StateProps, ConnectProps {
  pagination: IPagination;
  getListData: any;
}

class PlayerSearch extends React.Component<IProps> {

  onSearch = (values: any) => {
    if(_.isUndefined(values)){
      return;
    }

    const pagination = this.props.pagination;
    pagination.current = 1;
    const params = {
      ...values,
      pagination,
      storeId: this.props.loginUserInfo.storeId
    };

    this.props.getListData(params);
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

const mapStateToProps = (state: ConnectState) => ({
  loginUserInfo: state.loginManagement.userInfo
});
type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(PlayerSearch);
