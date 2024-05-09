import React from 'react'
import { Link } from 'react-router-dom'


const Header = () => {
    return (
        <div className='h-[80px] flex items-center justify-between font-bold text-xl px-4 md:px-8 lg:px-12 bg-white'>
            <Link to="/">
                <h1>header</h1>
            </Link>

            <div>
                <div className='w-[40px] h-[40px]  rounded-full bg-[#e3e6e3]'>

                </div>

            </div>
        </div>
    )
}

export default Header
