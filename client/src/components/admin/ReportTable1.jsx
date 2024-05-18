import React, { useState, useEffect } from 'react';
import { Space, Table, Tag, ConfigProvider } from 'antd';
import axios from 'axios';
const columns = [
    {
        title: 'Area',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Topic',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Chemical Used',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Prepared Premise',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Water Tempature',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Job Rating',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'ATP Result',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Comment',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Photos',
        dataIndex: 'address',
        key: 'address',
    },
    // {
    //     title: 'Prepared Premise',
    //     key: 'tags',
    //     dataIndex: 'tags',
    //     render: (_, { tags }) => (
    //         <>
    //             {tags.map((tag) => {
    //                 let color = tag.length > 5 ? 'geekblue' : 'green';
    //                 if (tag === 'loser') {
    //                     color = 'volcano';
    //                 }
    //                 return (
    //                     <Tag color={color} key={tag}>
    //                         {tag.toUpperCase()}
    //                     </Tag>
    //                 );
    //             })}
    //         </>
    //     ),
    // },
    // {
    //     title: 'Action',
    //     key: 'action',
    //     render: (_, record) => (
    //         <Space size="middle">
    //             <a>Edit {record.name}</a>
    //             <a>Delete</a>
    //         </Space>
    //     ),
    // },
];

const App = () => {

    const [reports, setAllReports] = useState([]);



    useEffect(() => {
        const getRespose = async () => {
            const { data } = await axios.get("http://localhost:8000/api/report/allReport", { withCredentials: true })
            console.log(data)
            setAllReports(data.data)
        }

        getRespose()


    }, [])

    console.log("report table")
    return (
        <ConfigProvider
            theme={{
                components: {
                    Table: {
                        /* here is your component tokens */
                        headerBg: "white"
                    },
                },
            }}
        >
            <Table columns={columns} dataSource={reports} />
        </ConfigProvider>
    );
}
export default App;