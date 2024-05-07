import React, { useContext, useEffect, useState } from 'react'
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { CiSaveUp2 } from "react-icons/ci";
import ReportData from './ReportData';
import { ReportContext } from '../../context/ReportContext';






const ReportCard = ({ reportData }) => {

    const reports = reportData.report
    const [newReport, setNewReport] = useState(reports)
    const [disabled, setDisabled] = useState(false)
    const [complain, setComplain] = useState(false)



    const { allReports, setAllReports } = useContext(ReportContext)

    // console.log(reports)


    // console.log("New Report State", newReport)
    const handleEdit = () => {
        setDisabled(false)
    }
    const handleSave = () => {
        // console.log('saved', setReport)
        setDisabled(true)
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
    console.log(newReport)

    return (

        <div className={` px-2 mt-3 mb-9 w-full border bg-white rounded`}>


            <div className={`text-sm w-full grid grid-cols-3  md:grid-cols-5 lg:grid-cols-9 items-center lg:gap-1 gap-2 py-5`}>
                {
                    disabled && reports?.map((ele, index) =>
                        <ReportData disabled={disabled} setComplain={setComplain} key={index} name={ele?.name} label={ele?.label} type={ele?.type} options={ele?.options} isDisplay={ele?.isDisplay} complain={complain} setNewReport={setNewReport} />
                    )
                }

                {
                    !disabled && newReport?.map((ele, index) =>
                        <ReportData disabled={disabled} setComplain={setComplain} key={index} name={ele?.name} label={ele?.label} type={ele?.type} options={ele?.options} isDisplay={ele?.isDisplay} complain={complain} setNewReport={setNewReport} />
                    )
                }




            </div>

            <div className=' flex justify-center gap-3  mb-3'>
                {disabled ? <button className='flex items-center gap-1' onClick={handleEdit}><FaRegEdit />Edit</button> : <button className='flex items-center gap-1' onClick={handleSave}><CiSaveUp2 />Save</button>}
                <button onClick={handleDelete} className='flex items-center gap-1'><RiDeleteBinLine />Delete</button>
            </div>
        </div>

    )
}

export default ReportCard
