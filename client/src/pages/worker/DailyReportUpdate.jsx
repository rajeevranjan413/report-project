import React, { useState } from 'react'
import ReportsContainer from '../../components/worker/ReportsContainer';
import WorkDetail from '../../components/worker/WorkDetail';
import axios from 'axios';
import TodayReportTable from '../../components/worker/TodayReportTable';

const getTodayReportData = async () => {
    const { data } = await axios.get("http://localhost:8000/api/worker/get")
}

const DailyReportUpdate = () => {

    return (
        <div className='mt-3 sm:mt-4 md:mt-5'>
            <div>
                <h1 className='font-bold text-xl text-center pb-3'>Today's Status</h1>
            </div>

            <div className=''>
                <WorkDetail />
            </div>
            <div>

                AddReprt
            </div>
            <div>
                {/* <ReportsContainer /> */}
                <TodayReportTable />
            </div>

            <div>

            </div>
        </div>
    )
}

export default DailyReportUpdate
