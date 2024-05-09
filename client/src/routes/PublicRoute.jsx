import React from 'react'
import Header from '../components/layout/Header'
import { Outlet } from 'react-router-dom'

const PublicRoute = () => {
    return (
        <main className='mx-auto max-w-[1200px]'>
            <Header />
            <Outlet />
            Public
        </main>
    )
}

export default PublicRoute
