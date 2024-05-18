import React, { useState, useEffect } from 'react';
import { Space, Table, Tag, ConfigProvider } from 'antd';
import axios from 'axios';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
const columns = [
    // {
    //     title: 'Created',
    //     dataIndex: 'createdBy',
    //     key: 'name',

    // },
    {
        title: 'Area',
        dataIndex: 'area',
        key: 'area',

    },
    {
        title: 'Topic',
        dataIndex: 'topic',
        key: 'topic',
    },
    {
        title: 'Chemical Used',
        dataIndex: 'chemical',
        key: 'address',
    },
    {
        title: 'Prepared Premise',
        dataIndex: 'premise',
        key: 'address',
    },
    {
        title: 'Water Tempature',
        dataIndex: 'tempature',
        key: 'address',
    },
    {
        title: 'Job Rating',
        dataIndex: 'rating',
        key: 'address',
    },
    {
        title: 'ATP Result',
        dataIndex: 'test',
        key: 'address',
    },
    {
        title: 'Comment',
        dataIndex: 'comment',
        key: 'address',
    },
    {
        title: 'Photos',
        dataIndex: 'photo',
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
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                {/* {record.name} */}
                <a><FaRegEdit /></a>
                <a><MdOutlineDeleteOutline /></a>
            </Space>
        ),
    },
];

const TodayReportTable = () => {

    const [reports, setAllReports] = useState([]);



    useEffect(() => {
        const getRespose = async () => {
            const { data } = await axios.get("http://localhost:8000/api/report/todayReport", { withCredentials: true })
            // console.log(data)
            setAllReports(data.data)
        }

        getRespose()


    }, [])

    // console.log(reports[0])
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
export default TodayReportTable;