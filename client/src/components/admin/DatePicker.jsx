import React from 'react';
import { DatePicker, Space, ConfigProvider } from 'antd';
const { RangePicker } = DatePicker;
const DatePickers = () => (
    <ConfigProvider
        theme={{
            components: {
                DatePicker: {

                }
            },
        }}
    >
        <Space direction="vertical" size={12}>
            <RangePicker
                style={{
                    height: '40px',
                }}
            />

        </Space>

    </ConfigProvider>);
export default DatePickers;