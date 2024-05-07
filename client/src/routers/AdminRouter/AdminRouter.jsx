import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminRouter = () => {
    return (
        <main className='mx-auto max-w-[1200px]'>
            Admin
            <Outlet />
        </main>
    )
}

export default AdminRouter
