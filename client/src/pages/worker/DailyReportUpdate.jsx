import React, { useEffect, useState } from "react";
import axios from "axios";
import TodayReportTable from "../../components/worker/TodayReportTable";
import { Button, Modal, Select } from "antd";
import { TbReportMedical } from "react-icons/tb";
import NewReportCard from "../../components/worker/NewReportCard";

const getTodayReportData = async () => {
  const { data } = await axios.get("http://localhost:8000/api/worker/get");
};

const DailyReportUpdate = () => {
  const [newReport, setNewReport] = useState(false);

  useEffect(() => {}, [newReport]);
  return (
    <div className="mt-3 sm:mt-4 md:mt-5">
      <div className="flex justify-between p-4 mt-4 mb-6">
        <h1 className="text-xl font-bold">Your's Today Reports</h1>
        {/* <Button
                    onClick={showModal}
                    variant="contained"
                    startIcon={<FaArrowAltCircleDown />}

                >

                </Button> */}
        <Button
          onClick={() => {
            setNewReport((prev) => !prev);
          }}
          style={{ display: "flex", alignItems: "center", gap: "4px" }}
          type="primary"
        >
          <TbReportMedical />
          New Report
        </Button>
      </div>

      <div
        className={`${
          newReport ? " visible" : " hidden"
        } px-2 mt-3 mb-9 w-full border bg-white rounded`}
      >
        <NewReportCard setVisible={setNewReport} />
      </div>
      <div>
        {/* <ReportsContainer /> */}
        <TodayReportTable />
      </div>

      <div></div>
    </div>
  );
};

export default DailyReportUpdate;
