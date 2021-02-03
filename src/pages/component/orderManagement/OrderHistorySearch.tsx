import React from 'react';
import { connect } from 'react-redux';
import { ConnectProps, ConnectState } from '@/models/connect';
import { FormInstance } from 'antd/es/form';
import { Button, DatePicker, Form, Select } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
import moment from 'moment';
const { Option } = Select;
const { RangePicker } = DatePicker;

interface IProps extends StateProps, ConnectProps {
  initDateRange: any
}

class OrderHistorySearch extends React.Component<IProps> {
  formRef = React.createRef<FormInstance>();
  onSearch = (values: any) => {
    const params = {
      storeId: this.props.loginUserInfo.storeId,
      statusId: values.statusId,
      startDate: values.dateRange[0].format('YYYY-MM-DD'),
      endDate: values.dateRange[1].format('YYYY-MM-DD')
    };
    this.props.dispatch({
      type: 'orderManagement/getOrderManagementListEffect',
      params
    });
  };
  onClearAll = () => {
    // @ts-ignore
    this.formRef.current.resetFields();
  };
  render() {
    const dateFormat = 'YYYY-MM-DD';
    return (
      <Form name="OrderHistorySearch" ref={this.formRef} layout="inline" onFinish={this.onSearch}
            initialValues={ { dateRange: [
                moment(this.props.initDateRange.startDate, dateFormat),
                moment(this.props.initDateRange.endDate, dateFormat)
              ] } }
      >
        <Form.Item
          name="statusId"
          label="订单状态"
        >
          <Select style={{ width: 100 }} allowClear>
            <Option value={10}>进行中</Option>
            <Option value={20}>已完成</Option>
          </Select>
        </Form.Item>
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
          <Button style={{marginLeft: 5}} type="primary" onClick={this.onClearAll}>清除</Button>
        </Form.Item>
      </Form>
    )
  }
}

const mapStateToProps = (state: ConnectState) => ({
  loginUserInfo: state.loginManagement.userInfo
});
type StateProps = ReturnType<typeof mapStateToProps>;
export default connect(mapStateToProps)(OrderHistorySearch);
