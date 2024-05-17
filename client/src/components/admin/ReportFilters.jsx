import * as React from 'react';
import { Select, Space } from 'antd'
import DatePickers from './DatePicker';


export default function ReportFilters() {
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    return (
        <div className='flex gap-4 items-center  w-full'>
            <div className=''>
                <Space wrap>

                    <Select

                        defaultValue="Factory"
                        style={{
                            height: "40px",
                            width: 120,
                        }}
                        allowClear
                        options={[
                            {
                                value: 'factory 1',
                                label: 'factory1',
                            },
                            {
                                value: 'factory 2',
                                label: 'factory2',
                            },
                        ]}
                    />
                </Space>

            </div>

            <div className=''>
                <DatePickers />

            </div>


        </div>
    )
}


