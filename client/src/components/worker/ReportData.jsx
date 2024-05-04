import React, { useContext, useEffect, useState } from 'react'
import { ReportContext } from '../../context/ReportContext'


const ReportData = ({ name, label, type, isDisplay, options, complain, setComplain }) => {
    const reportContext = useContext(ReportContext)
    const [inputValue, setInputValue] = useState('')
    // console.log("complain", inputValue)


    useEffect(() => {
        if (inputValue == 'Complain') {
            setComplain(true)
        }
        else {
            setComplain(false)
        }
    }, [inputValue])


    const [isEdit, setEdit] = useState(false)
    // console.log(type)
    return (
        <div className={`${isDisplay ? " visible" : "hidden"} ${complain && (name == "comment" || name == "photo") ? "lg:col-span-3 md:col-span-1 col-span-3 " : "col-span-1"} border h-[120px] border-black p-2 rounded grid items-center gap-4`}>
            {
                label && <label className='text-center w-full text-wrap' htmlFor={name}>{label} </label>
            }
            {
                type && type === "select" ? <select
                    className=' w-full bg-gray-100  px-1 py-4 '
                    disabled={isEdit}
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
                    disabled={isEdit}
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
