import React, { useContext, useEffect, useState } from 'react'


const ReportData = ({ name, label, type, options, setComplain, complain }) => {

    const [inputValue, setInputValue] = useState('')


    // console.log(type)
    useEffect(() => {
        // console.log(inputValue)
        if (name == 'topic' && inputValue === "Complain") {
            setComplain(true)
        }
        else if (name == 'topic' && !(inputValue === "Complain")) {
            setComplain(false)
        }


    }, [inputValue])
    return (
        <div className={`${complain && (name == "comment" || name == "photo") ? "lg:col-span-3 md:col-span-1 col-span-3 " : ""} border h-[120px] border-slate-400 p-2 rounded grid items-center gap-4`}>
            {
                label && <label className='text-center w-full text-wrap' htmlFor={name}>{label} </label>
            }
            {
                type && type === "select" ? <select
                    className=' w-full bg-gray-100  px-1 py-4 '

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
