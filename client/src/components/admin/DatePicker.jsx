import React from "react";
import { DatePicker, Space, ConfigProvider } from "antd";
const { RangePicker } = DatePicker;
const DatePickers = ({ onChange }) => (
  <ConfigProvider
    theme={{
      components: {
        DatePicker: {},
      },
    }}
  >
    <Space direction="vertical" size={12}>
      <RangePicker
        style={{ height: "40px" }}
        onChange={onChange}
        format="YYYY-MM-DD" // Specify consistent date format
      />
    </Space>
  </ConfigProvider>
);
export default DatePickers;
