import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { TbReportSearch } from "react-icons/tb";
import { HiOutlineUsers } from "react-icons/hi2";

const AdminRoute = () => {
    const users = useLocation().pathname.includes("/admin/users")
    const reports = useLocation().pathname.includes("/admin/reports")
    console.log(users)
    return (
        <div className='grid gap-1 grid-cols-4 bg-[rgb(247,247,247)'>

            <aside className=' w-full bg-white p-4 h-screen'>
                <h2>Logo.</h2>
                <div className='my-8 mx-4'>
                    <h5 className=' opacity-80 my-4'>DASHBOARD</h5>
                    <ul className=' flex flex-col gap-2'>
                        <li className={`${reports ? "bg-red-400" : ""} py-2 px-4 rounded-lg flex items-center gap-2`}>
                            <TbReportSearch />
                            <Link to={"/admin/reports"}>
                                Reports
                            </Link>
                        </li>
                        <li className={`${users ? "bg-red-400" : ""} py-2 px-4 rounded-lg flex items-center gap-2`}>

                            <HiOutlineUsers />
                            <Link to={"/admin/users"}>
                                Users
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>

            <div className='col-span-3'>
                <Outlet />
            </div>
        </div>
    )
}

export default AdminRoute

const Li = () => {
    return (
        <li>
            <TbReportSearch />
            report
        </li>
    )

}
