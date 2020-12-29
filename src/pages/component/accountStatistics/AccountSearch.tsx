import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'dva';
import _ from 'lodash';
import { Form, Button, DatePicker } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
import moment from 'moment';
import { FormInstance } from 'antd/es/form';

const { RangePicker } = DatePicker;

interface IProps {
  dispatch: Dispatch,
  initDateRange: any
}

class AccountSearch extends React.Component<IProps> {

  onSearch = (values: any) => {
    if(_.isUndefined(values)){
      return;
    }
    const params = {
      startDate: values.dateRange[0].format('YYYY-MM-DD'),
      endDate: values.dateRange[1].format('YYYY-MM-DD'),
    };
    this.props.dispatch({
      type: 'accountStatistics/getAccountStatisticsListEffect',
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

export default connect()(AccountSearch);
