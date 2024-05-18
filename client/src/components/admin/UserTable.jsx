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
        title: 'Name',
        dataIndex: 'name',
        key: 'area',

    },
    {
        title: 'Factory',
        dataIndex: 'factory',
        key: 'address',
    },

    {
        title: 'Password',
        dataIndex: 'password',
        key: 'topic',
    },

    {
        title: 'Address',
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

const ReportTable = () => {

    const [users, setAllUsers] = useState([]);



    useEffect(() => {
        const getRespose = async () => {
            const { data } = await axios.get("http://localhost:8000/api/user/employeeList", { withCredentials: true })
            // console.log(data)
            setAllUsers(data)

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
            {<Table pagination={{ position: ["bottomCenter"] }} columns={columns} dataSource={users} />
            }        </ConfigProvider>
    );
}
export default ReportTable;