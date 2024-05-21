import React from 'react'
import axios from 'axios';
import ReportTable from '../../components/ReportTable'
import ReportFilters from '../../components/admin/ReportFilters'
import { Button } from 'antd';
import { FaArrowAltCircleDown } from "react-icons/fa";



const UserReport = () => {

    const handleDownloadReport = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8000/api/report/generate-pdf",
                {
                    responseType: "blob",
                }
                , { withCredentials: true }
            );

            // Create a Blob from the response data
            const pdfBlob = new Blob([response.data], { type: "application/pdf" });

            // Create a temporary URL for the Blob
            const url = window.URL.createObjectURL(pdfBlob);

            // Create a temporary <a> element to trigger the download
            const tempLink = document.createElement("a");
            tempLink.href = url;
            tempLink.setAttribute(
                "download",
                `report.pdf`
            ); // Set the desired filename for the downloaded file

            // Append the <a> element to the body and click it to trigger the download
            document.body.appendChild(tempLink);
            tempLink.click();

            // Clean up the temporary elements and URL
            document.body.removeChild(tempLink);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading PDF:", error);
        }
    }
    return (
        <div className='bg-white mt-3 sm:mt-4 md:mt-5 h-[400px]'>
            <div className=' text-sm font-bold  bg-slate-100'>

                <div className='flex justify-between p-4 mt-4 mb-6'>
                    <h1 className='text-xl font-bold'>Reports</h1>
                    <Button style={{ display: "flex", alignItems: "center", gap: "4px" }} type="primary" onClick={handleDownloadReport}>
                        <FaArrowAltCircleDown />
                        Download Report
                    </Button>
                </div>
                <div className='mb-2'>
                    <ReportFilters />
                </div>

                <div>
                    <ReportTable />
                </div>

                <div className='bg-white mb-2 grid place-items-center h-[150px]' >
                    {/* <Button variant="contained">Download Report</Button> */}
                </div>



            </div>
        </div>
    )
}

export default UserReport
