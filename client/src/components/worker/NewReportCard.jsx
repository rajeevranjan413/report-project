import React, { useState } from 'react'
import ReportData from './ReportData'
// import Button from '@mui/material/Button';
import { Button, Modal, Select, message } from 'antd';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoIosAddCircle } from "react-icons/io";
const report = {

}

const Data1 = [
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

const Data2 = [
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
        name: "photos",
        label: "Add Photos",
        type: "file",

    },

]

const NewReportCard = ({ setVisible }) => {
    const [complain, setComplain] = useState(false)
    const handSubmit = async (e) => {
        e.preventDefault();
        console.log("hello")
        const formData = new FormData(e.target);
        const report = {}
        report.area = formData.get("area")
        report.topic = formData.get("topic")
        report.problem = formData.get("problem")
        report.chemical = formData.get("chemical")
        report.premise = formData.get("premise")
        report.rating = formData.get("rating")
        report.test = formData.get("test")
        report.comment = formData.get("topic")
        const photos = formData.get("photos")
        const password = formData.get("password")
        // // console.log(name, password)
        const { data } = await axios.post("http://localhost:8000/api/report/addReport", {
            report, photos
        }, { withCredentials: true })
        if (data?.message === "Report added Successfully") {

            toast("Report Added")
        }
        setVisible(false)
    }
    // const handleAddReport = () => {

    //     setVisible(false)
    // }

    return (
        <>
            <ToastContainer />
            <form onSubmit={handSubmit} className='text-sm w-full grid grid-cols-3  md:grid-cols-5 lg:grid-cols-9 items-center lg:gap-1 gap-2 py-5'>
                {
                    complain ? Data1?.map((ele, index) =>
                        <ReportData setComplain={setComplain} key={index} name={ele?.name} label={ele?.label} type={ele?.type} options={ele?.options} isDisplay={ele?.isDisplay} complain={complain} />
                    )
                        : Data2.map((ele, index) => <ReportData setComplain={setComplain} key={index} name={ele?.name} label={ele?.label} type={ele?.type} options={ele?.options} isDisplay={ele?.isDisplay} complain={complain} />)
                }

                <div className=' bg-red-300 w-full'>
                    <button className='flex items-center gap-2 text-white bg-black py-2 px-4' type='submit'>
                        <IoIosAddCircle />
                        Add Report
                    </button>

                </div>

            </form>

        </>


    )
}

export default NewReportCard
