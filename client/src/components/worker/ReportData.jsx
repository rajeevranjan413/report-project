import React, { useContext, useEffect, useState } from 'react'
import { ReportContext } from '../../context/WorkerReport/workerReportContext'


const ReportData = ({ name, label, type, options, disabled, complain, setComplain, setNewReport }) => {
    const { allReports } = useContext(ReportContext)
    const [inputValue, setInputValue] = useState('')


    useEffect(() => {
        if (complain) {
            const report = [
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
                    options: ["Before Work", "After Work", "Complain"]
                },

                {
                    name: "problem",
                    label: "Problem Type",
                    type: "select",
                    options: ["Water", "Hose", "Covering Up", "Another"]
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

            setNewReport(report)

            console.log("state", report)
        }
        // console.log("state", newReport)


    }, [complain])

    useEffect(() => {
        if (inputValue == 'Complain') {
            setComplain(true)
        }
        else {
            setComplain(false)
        }

    }, [inputValue])



    // console.log(type)
    return (
        <div className={` ${complain && (name == "comment" || name == "photo") ? "lg:col-span-3 md:col-span-1 col-span-3 " : ""} border h-[120px] border-slate-400 p-2 rounded grid items-center gap-4`}>
            {
                label && <label className='text-center w-full text-wrap' htmlFor={name}>{label} </label>
            }
            {
                type && type === "select" ? <select
                    className=' w-full bg-gray-100  px-1 py-4 '
                    disabled={disabled}
                    name={name}
                    id={name}
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value)
                    }}
                >
                    {
                        options && options.map((ele, index) =>
                            <option key={index} value={ele}>{ele}</option>
                        )
                    }
                </select> : <input
                    className=' w-full bg-gray-100 px-1 py-4'
                    disabled={disabled}
                    id={name}
                    multiple
                    name={name}
                    type={type}
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value)
                    }}
                ></input>

            }

        </div>
    )
}

export default ReportData
