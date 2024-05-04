import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <main className='mx-auto max-w-[1200px]'>
            <Header />
            <Outlet />
        </main>
    )
}

export default Layout
