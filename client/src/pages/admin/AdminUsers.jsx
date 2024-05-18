import React, { useState, useEffect } from 'react'
import UserTable from '../../components/admin/UserTable'
import axios from 'axios';
import { IoIosAddCircle } from "react-icons/io";
// import Button from '@mui/material/Button';
import { Button, Modal, Select } from 'antd';
import { Input } from 'antd';
const { Search } = Input;
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// import NewUserModal from '../../components/admin/NewUserModal';



const AdminUsers = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [factory, setFactory] = useState('');
    const [password, setPassword] = useState('');
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        let message;
        try {
            const { data } = await axios.post("http://localhost:8000/api/user/createUser", {
                name: name,
                email: email,
                role: role,
                factory: factory,
                password: password
            }, { withCredentials: true })
            message = data.message
            if (message === "User Created Successfully") {
                setIsModalOpen(false);
                toast("User Created")
            }
            else {
                toast(message)
            }
            console.log(message)
        }
        catch {
            // setIsModalOpen(false);
            toast(message)
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleSelectChange = (value) => {
        setRole(value);
    };

    const onSearch = () => {

    }


    return (
        <div>
            <ToastContainer />
            <div className='flex justify-between p-4 mt-4 mb-6'>
                <h1 className='text-xl font-bold'>Users</h1>
                {/* <Button
                    onClick={showModal}
                    variant="contained"
                    startIcon={<FaArrowAltCircleDown />}

                >

                </Button> */}
                <Button style={{ display: "flex", alignItems: "center", gap: "4px" }} type="primary" onClick={showModal}>
                    <IoIosAddCircle />
                    Create New User
                </Button>
            </div>
            <div className='mb-2'>
                <div className='h-16 flex justify-between items-center px-4 bg-white mb-1 font-bold'>
                    <h5 className=''>Workers</h5>
                    <Search
                        placeholder="serarch workers"
                        onSearch={onSearch}
                        style={{
                            width: 200,
                        }}
                    />
                </div>
                <UserTable />
            </div>
            <div className='mb-2'>
                <div className='h-16 flex justify-between items-center px-4 bg-white mb-1 font-bold'>
                    <h5 className=''>Managers</h5>
                    <Search
                        placeholder="serarch managers"
                        onSearch={onSearch}
                        style={{
                            width: 200,
                        }}
                    />
                </div>
                <UserTable />
            </div>
            <div className='mb-2'>
                <div className='h-16 flex justify-between items-center px-4 bg-white mb-1 font-bold'>
                    <h5 className=''>Users</h5>
                    <Search
                        placeholder="serarch users"
                        onSearch={onSearch}
                        style={{
                            width: 200,
                        }}
                    />
                </div>
                <UserTable />
            </div>


            <div className=''>
                <Modal centered={true} okText='Create' title="New User" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <div className=' mt-4 grid gap-2'>
                        <div className='flex flex-col gap-1 '>
                            <label className='' htmlFor="factory">Role</label>
                            <Select
                                defaultValue={"Admin"}
                                value={role ? role : null}
                                style={{
                                    width: 120,
                                }}
                                onChange={handleSelectChange}
                                options={[
                                    {
                                        value: 'Admin',
                                        label: 'Admin',
                                    },
                                    {
                                        value: 'Worker',
                                        label: 'Worker',
                                    },
                                    {
                                        value: 'User',
                                        label: 'User',
                                    },
                                    {
                                        value: 'Manager',
                                        label: 'Manager',
                                    },
                                ]}
                            />
                        </div>
                        <div className='flex flex-col gap-1 '>
                            <label className='' htmlFor="name">Name</label>
                            <input
                                className='p-2 border outline-none rounded'
                                type="text"
                                id='name'
                                name='name'
                                value={name}
                                onChange={(ev) => setName(ev.target.value)}
                            />
                        </div>
                        <div className='flex flex-col gap-1 '>
                            <label className='' htmlFor="email">Email</label>
                            <input
                                className='p-2 border outline-none rounded'
                                type="email"
                                id='email'
                                name='email'
                                value={email}
                                onChange={(ev) => setEmail(ev.target.value)}
                            />
                        </div>
                        <div className='flex flex-col gap-1 '>
                            <label className='' htmlFor="factory">Factory</label>
                            <input
                                className='p-2 border outline-none rounded'
                                type="factory"
                                id='factory'
                                name='factory'
                                value={factory}
                                onChange={(ev) => setFactory(ev.target.value)}
                            />
                        </div>

                        <div className='flex flex-col gap-1 '>
                            <label className='' htmlFor="factory">Passwoard</label>
                            <input
                                className='p-2 border outline-none rounded'
                                type="text"
                                id='name'
                                name='name'
                                value={password}
                                onChange={(ev) => setPassword(ev.target.value)}
                            />
                        </div>
                    </div>

                </Modal>
            </div>
        </div>
    )
}

export default AdminUsers
