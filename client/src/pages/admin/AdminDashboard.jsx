import React from 'react'

const AdminDashboard = () => {
    return (
        <div className='grid gap-1 grid-cols-4 bg-[rgb(247,247,247)] h-screen'>

            <aside className=' w-full bg-white p-4'>
                <h2>Logo.</h2>
                <div>
                    <h5>Dashboard</h5>
                    <ul>
                        <li>
                            Report
                        </li>
                        <li>
                            Users
                        </li>
                    </ul>
                </div>
            </aside>

            <main className='col-span-3'>

            </main>
        </div>
    )
}

export default AdminDashboard
