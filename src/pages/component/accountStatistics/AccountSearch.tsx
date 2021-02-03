import React from 'react';
import { connect } from 'react-redux';
import { ConnectState, ConnectProps } from '@/models/connect';
import _ from 'lodash';
import { Form, Button, DatePicker } from 'antd';
import moment from 'moment';
import { IPagination } from '@/pages/types/pagination';

const { RangePicker } = DatePicker;

interface IProps extends StateProps, ConnectProps {
  initDateRange: any;
  pagination: IPagination;
  getListData: any;
}

class AccountSearch extends React.Component<IProps> {

  onSearch = (values: any) => {
    if(_.isUndefined(values)){
      return;
    }

    const pagination = this.props.pagination;
    pagination.current = 1;
    const params = {
      ...values,
      pagination,
      storeId: this.props.loginUserInfo.storeId,
      startDate: values.dateRange[0].format('YYYY-MM-DD'),
      endDate: values.dateRange[1].format('YYYY-MM-DD'),
    };

    this.props.getListData(params);
  };

  render() {
    const dateFormat = 'YYYY-MM-DD';
    return (
      <Form name="AccountSearch" layout="inline" onFinish={this.onSearch}
            initialValues={ { dateRange: [
              moment(this.props.initDateRange.startDate, dateFormat),
              moment(this.props.initDateRange.endDate, dateFormat)
            ] } }
      >
        <Form.Item
          name="dateRange"
          label="时间范围"
        >
          <RangePicker
            format={dateFormat}
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

export default connect(mapStateToProps)(AccountSearch);
