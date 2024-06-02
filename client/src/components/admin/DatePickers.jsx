import { DatePicker, Space, ConfigProvider } from "antd";

const { RangePicker } = DatePicker;

const DatePickers = ({ onChange }) => (
  <ConfigProvider
    theme={{
      components: {
        DatePicker: {
          style: { width: "100%" },
        },
      },
      space: {
        size: 8,
      },
    }}
  >
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      <RangePicker
        style={{ width: "100%" }}
        onChange={onChange}
        format="YYYY-MM-DD"
        dropdownClassName="compact-datepicker"
        popupStyle={{
          width: "100%",
          maxWidth: "300px",
        }}
        picker="date"
        className="w-full md:max-w-xs"
      />
    </Space>
  </ConfigProvider>
);

export default DatePickers;
