import React, { useEffect, useState } from 'react'
import ReportTable from '../../components/admin/ReportTable'
import DatePicker from '../../components/admin/DatePicker'
import Button from '@mui/material/Button';

const Reports = () => {



    return (
        <div>

            <div className='bg-white mb-2 grid place-items-center h-[150px]'>
                <DatePicker />
            </div>
            <div>
                <ReportTable />
            </div>
            <div className='bg-white mb-2 grid place-items-center h-[150px]' >
                <Button variant="contained">Download Report</Button>
            </div>

        </div>
    )
}

export default Reports
