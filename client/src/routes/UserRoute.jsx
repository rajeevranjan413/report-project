import React from 'react'
import { Outlet } from 'react-router-dom'

const UserRoute = () => {
    return (
        <main className='mx-auto max-w-[1200px]'>
            User
            <Outlet />
        </main>
    )
}

export default UserRoute
