import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/layout/Header'

const WorkerRoute = () => {
    return (
        <main className='mx-auto max-w-[1200px]'>
            <Header />
            <Outlet />
        </main>
    )
}

export default WorkerRoute
