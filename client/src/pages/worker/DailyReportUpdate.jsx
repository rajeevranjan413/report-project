import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import TodayReportTable from "../../components/worker/TodayReportTable";
import { Button, Modal, Select } from "antd";
import { TbReportMedical } from "react-icons/tb";
import NewReportCard from "../../components/worker/NewReportCard";
import { useSelector } from "react-redux";

const translations = {
  eng: {
    area: "Area",
    topic: "Topic",
    chemicalUsed: "Chemical Used",
    preparedPremise: "Prepared Premise",
    waterTemperature: "Water Temperature",
    jobRating: "Job Rating",
    atpResult: "ATP Result",
    comment: "Comment",
    photos: "Photos",
    reports: "Reports",
    action: "Action",
    dr: "Download Report",
    sf: "Select Factory",
    af: "All Factories",
    at: "All Topics",
    title: "Your's Today Reports",
    newReport: "New Report",
  },
  lit: {
    area: "Vieta",
    topic: "Tema",
    chemicalUsed: "Naudotos cheminės medžiagos",
    preparedPremise: "Paruoštos patalpos",
    waterTemperature: "Vandens temperatūra",
    jobRating: "Darbo įvertinimas",
    atpResult: "ATP rezultatas",
    comment: "Komentaras",
    photos: "Nuotraukos",
    reports: "Ataskaitos",
    action: "Veiksmas",
    dr: "Atsisiųskite ataskaitą",
    sf: "Pasirinkite gamyklą",
    af: "Visos gamyklos",
    at: "Visos temos",
    title: "Jūsų šiandienos ataskaitos",
    newReport: "Nauja ataskaita",
  },
};
const DailyReportUpdate = () => {
  const [newReport, setNewReport] = useState(false);
  const [area, setArea] = useState([]);

  const { userAuth } = useSelector((store) => store?.system);
  const currentText = translations[userAuth?.language];

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        "http://localhost:8000/api/factory/workers-factory",
        {
          withCredentials: true,
        }
      );
      setArea(data.detail);
    };

    fetchData();
  }, []);

  return (
    <div className="mt-3 sm:mt-4 md:mt-5">
      <div className="flex justify-between p-4 mt-4 mb-6">
        <h1 className="text-xl font-bold">{currentText.title}</h1>
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
          {currentText.newReport}
        </Button>
      </div>

      <div
        className={`${
          newReport ? " visible" : " hidden"
        } px-2 mt-3 mb-9 w-full border bg-white rounded`}
      >
        <NewReportCard area={area} setVisible={setNewReport} />
      </div>
      <div>
        {/* <ReportsContainer /> */}
        <TodayReportTable currentText={currentText} />
      </div>

      <div></div>
    </div>
  );
};

export default DailyReportUpdate;
