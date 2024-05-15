import React from 'react'
import ReportTable from '../../components/admin/ReportTable'
// import Button from '@mui/material/Button';
import DatePicker from '../../components/admin/DatePicker'



const UserReport = () => {
    return (
        <div className='bg-white mt-3 sm:mt-4 md:mt-5 h-[400px]'>
            <div className=' text-sm font-bold  bg-slate-100'>

                <div className='bg-white mb-2 grid place-items-center h-[150px]'>
                    <DatePicker />
                </div>
                <div className='grid place-items-center py-4 mb-1 '>
                    REPORTS
                </div>

                <div>
                    <ReportTable />
                </div>

                <div className='bg-white mb-2 grid place-items-center h-[150px]' >
                    {/* <Button variant="contained">Download Report</Button> */}
                </div>



            </div>
        </div>
    )
}

export default UserReport
