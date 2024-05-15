import React, { useState, useEffect } from 'react'
import UserTable from '../../components/admin/UserTable'
import axios from 'axios';

const Users = () => {

    return (
        <div>
            <div className='mb-2'>
                <h5 className='h-16 grid place-items-center bg-white mb-1 font-bold'>Workers</h5>
                <UserTable />
            </div>
            <div className='mb-2'>
                <h5 className='h-16 grid place-items-center bg-white mb-1 font-bold'>Manager</h5>
                <UserTable />
            </div>
            <div className='mb-2'>
                <h5 className='h-16 grid place-items-center bg-white mb-1 font-bold'>Users</h5>
                <UserTable />
            </div>
        </div>
    )
}

export default Users
