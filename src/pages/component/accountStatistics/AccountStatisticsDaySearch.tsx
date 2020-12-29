import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'dva';
import _ from 'lodash';
import { Form, Button, DatePicker } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';

const { RangePicker } = DatePicker;

interface IProps {
  dispatch: Dispatch,
  initDateRange: any
}

class AccountStatisticsDaySearch extends React.Component<IProps> {

  onSearch = (values: any) => {
    if(_.isUndefined(values)){
      return;
    }
    const params = {
      startDate: values.dateRange[0].format('YYYY-MM-DD'),
      endDate: values.dateRange[1].format('YYYY-MM-DD'),
    };
    this.props.dispatch({
      type: 'accountStatistics/getAccountStatisticsDayListEffect',
      params
    });
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
            locale={locale}
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

export default connect()(AccountStatisticsDaySearch);
