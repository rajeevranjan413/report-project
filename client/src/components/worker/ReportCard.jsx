import React, { useContext, useEffect, useState } from 'react'
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { CiSaveUp2 } from "react-icons/ci";
import ReportData from './ReportData';
import { ReportContext } from '../../context/ReportContext';




const ReportCard = ({ reportData }) => {
    const [edit, setEdit] = useState(true)
    const [complain, setComplain] = useState(false)
    const [newReport, setNewReport] = useState(reportData.report)

    const { allReports, setAllReports } = useContext(ReportContext)





    useEffect(() => {
        if (complain) {

            setNewReport(newReport.map((report) => {
                const condition = ['premise', "chemical", "tempature", "rating", "test"]
                if (condition.includes(report.name)) {
                    return {
                        ...report,
                        isDisplay: false
                    }
                }
                if (report.name == "problem") {
                    return {
                        ...report,
                        isDisplay: true
                    }
                }

                else {
                    return report
                }

            }))

        }
        else {

            setNewReport(newReport.map((report) => {
                const condition = ['premise', "chemical", "tempature", "rating", "test"]
                if (condition.includes(report.name)) {
                    return {
                        ...report,
                        isDisplay: true
                    }
                }
                if (report.name == "problem") {
                    return {
                        ...report,
                        isDisplay: false
                    }
                }

                else {
                    return report
                }

            }))
        }
    }, [complain])

    console.log("New Report State", newReport)
    const handleEdit = () => {
        setEdit(false)
    }
    const handleSave = () => {
        // console.log('saved', setReport)
        setEdit(true)
        setAllReports((prev) => prev.map((ele) => {
            if (ele.id === newReport.id) {
                return {
                    newReport
                }
            }
            return ele;


        }))
    }

    const handleDelete = () => {
        let indexToDelete = allReports.findIndex(obj => obj.id === newReport.id);
        setAllReports(allReports.splice(indexToDelete, 1))
    }

    return (

        <div className={` px-2 mt-3 mb-9 w-full border bg-white rounded`}>


            <div className={`text-sm w-full grid grid-cols-3  md:grid-cols-5 lg:grid-cols-9 items-center lg:gap-1 gap-2 py-5`}>
                {
                    newReport?.map((ele, index) =>
                        <ReportData setComplain={setComplain} key={index} name={ele?.name} label={ele?.label} type={ele?.type} options={ele?.options} isDisplay={ele?.isDisplay} complain={complain} />
                    )
                }


            </div>

            <div className=' flex justify-center gap-3  mb-3'>
                {edit ? <button className='flex items-center gap-1' onClick={handleEdit}><FaRegEdit />Edit</button> : <button className='flex items-center gap-1' onClick={handleSave}><CiSaveUp2 />Save</button>}
                <button onClick={handleDelete} className='flex items-center gap-1'><RiDeleteBinLine />Delete</button>
            </div>
        </div>

    )
}

export default ReportCard
