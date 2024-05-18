import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AntDesignOutlined } from '@ant-design/icons';
import { Avatar, Button } from 'antd';
import axios from 'axios';


const Header = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        const { data } = await axios.get("http://localhost:8000/api/user/logout", { withCredentials: true })
        if (data.message === "User logged Out") {
            navigate("/")
        }
    }
    return (
        <div className='h-[80px] flex items-center justify-between font-bold text-xl px-4 bg-white'>
            <Link to="/">
                <h1>header</h1>
            </Link>

            <div className='flex items-center gap-4'>

                <Avatar

                    icon={<AntDesignOutlined />}
                />
                <Button onClick={handleLogout} style={{ display: "flex", alignItems: "center", gap: "4px", backgroundColor: "black" }} type="primary">

                    Logout
                </Button>


            </div>
        </div>
    )
}

export default Header
