import React from 'react'
import { Outlet } from 'react-router-dom'

const UserRouter = () => {
    return (
        <main className='mx-auto max-w-[1200px]'>
            User
            <Outlet />
        </main>
    )
}

export default UserRouter
