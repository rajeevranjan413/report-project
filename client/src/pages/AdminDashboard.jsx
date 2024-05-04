import React from 'react'

const AdminDashboard = () => {
    return (
        <div className='bg-white mt-3 sm:mt-4 md:mt-5 h-[400px]'>
            <div className='flex text-sm font-bold items-center justify-evenly bg-slate-100'>
                <div>Calander</div>
                <div className='flex gap-4 md:gap-8 py-4 '>
                    <div>Daily Report</div>
                    <div>Month Report</div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
