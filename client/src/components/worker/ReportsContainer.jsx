import React, { useContext, useState } from 'react'
import ReportCard from './ReportCard'
import { ReportContext } from '../../context/WorkerReport/workerReportContext'
import { useId } from 'react';

const ReportContainer = () => {
    const { allReports, setAllReports } = useContext(ReportContext)
    // console.log(reportContext)
    const reportId = useId();

    console.log(allReports)
    const addNewReoprtHandler = () => {
        const newReport = {
            id: reportId,
            report: [
                {
                    name: "area",
                    label: "Area",
                    type: "select",
                    options: ["Area 1", "Area 2", "Area 3", "Area 4"]
                },
                {
                    name: "topic",
                    label: "Topic",
                    type: "select",
                    options: ["Before Work", "Chemical Applied", "After Work", "Complain"]
                },

                {
                    name: "chemical",
                    label: "Chemical Used",
                    type: "select",
                    options: ["Acid", "Alkaline", "Water"]
                },
                {
                    name: "premise",
                    label: "Prepared Premise",
                    isSelect: "false",
                    type: "text",
                },
                {
                    name: "tempature",
                    label: "Water Tempature",
                    isSelect: "false",
                    type: "text",
                },
                {
                    name: "rating",
                    label: "Job Rating",
                    type: "select",
                    options: [20, 30, 40, 50, 60, 70, 80, 90, 100]
                },
                {
                    name: "test",
                    label: "ATP Result",
                    type: "text"
                },
                {
                    name: "comment",
                    label: "Comment",
                    type: "text",
                },
                {
                    name: "photo",
                    label: "Add Photos",
                    type: "file",

                },

            ]
        }


        setAllReports([newReport, ...allReports])


    }

    return (
        <>
            {allReports?.length <= 0 && <div className={`px-2 mt-3 h-[200px] w-full bg-white grid place-items-center`}>No Updates</div>}
            {allReports?.length > 0 &&
                allReports?.map((ele, index) => {
                    return (
                        <ReportCard key={index}
                            reportData={ele}
                        />
                    )
                })
            }
            <div>
                <button onClick={addNewReoprtHandler}>Add Report</button>
            </div>
        </>

    )
}

export default ReportContainer
