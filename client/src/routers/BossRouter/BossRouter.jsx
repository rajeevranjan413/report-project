import React from 'react'
import { Outlet } from 'react-router-dom'

const BossRouter = () => {
    return (
        <main className='mx-auto max-w-[1200px]'>
            Boss
            <Outlet />
        </main>
    )
}

export default BossRouter
