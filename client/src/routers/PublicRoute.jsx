import React from 'react'
import Header from '../components/layout/Header'
import { Outlet } from 'react-router-dom'

const PublicRouter = () => {
    return (
        <main className='mx-auto max-w-[1200px]'>
            <Header />
            <Outlet />
            Public
        </main>
    )
}

export default PublicRouter
