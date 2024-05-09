import React from 'react'
import { Outlet } from 'react-router-dom'

const WorkerRoute = () => {
    return (
        <main className='mx-auto max-w-[1200px]'>
            worker
            <Outlet />
        </main>
    )
}

export default WorkerRoute
