import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminRoute = () => {
    return (
        <main className='mx-auto max-w-[1200px]'>
            Admin
            <Outlet />
        </main>
    )
}

export default AdminRoute
