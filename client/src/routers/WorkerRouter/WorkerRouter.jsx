import React from 'react'
import { Outlet } from 'react-router-dom'

const WorkerRouter = () => {
    return (
        <main className='mx-auto max-w-[1200px]'>
            worker
            <Outlet />
        </main>
    )
}

export default WorkerRouter
