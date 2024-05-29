import React from "react";
import { DatePicker, Space, ConfigProvider } from "antd";

const { RangePicker } = DatePicker;

const DatePickers = ({ onChange }) => (
  <ConfigProvider
    theme={{
      components: {
        DatePicker: {
          style: { width: "100%" }, // Ensure date picker occupies full width
        },
      },
      space: {
        size: 8, // Set default space size
      },
    }}
  >
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      <RangePicker
        style={{ width: "100%" }}
        onChange={onChange}
        format="YYYY-MM-DD"
        dropdownClassName="compact-datepicker" // Custom class for compact styling
        popupStyle={{
          width: "100%", // Ensure popup takes full width
          maxWidth: "300px", // Limit popup width on small screens
        }}
        picker="date" // Set picker to date to show only date picker on small screens
      />
    </Space>
  </ConfigProvider>
);

export default DatePickers;
