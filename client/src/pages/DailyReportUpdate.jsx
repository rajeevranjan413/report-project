import React, { useState } from 'react'
import ReportsContainer from '../components/worker/ReportsContainer';


const DailyReportUpdate = () => {

    return (
        <div className='mt-3 sm:mt-4 md:mt-5'>
            <div>
                <h1 className='font-bold text-xl text-center pb-3'>Today's Status</h1>
            </div>

            <div>
                <ReportsContainer />
            </div>

            <div>

            </div>
        </div>
    )
}

export default DailyReportUpdate
