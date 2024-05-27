import { useEffect, useState } from "react";
import ReportTable from "../../components/ReportTable";
import { Button } from "antd";
import { FaArrowAltCircleDown } from "react-icons/fa";
import ReportFilters from "../../components/admin/ReportFilters";
import axios from "axios";
import { toast } from "react-toastify"; // Assuming you're using react-toastify for toasts

const AdminReports = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({
    date: [],
    factory: "",
    topic: "",
  });
  console.log(filter);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/report/allReport",
          {
            params: {
              date: filter?.date,
              factory: filter?.factory,
              topic: filter?.topic,
            },
            withCredentials: true,
          }
        );
        console.log(response.data.data);
        setData(response.data.data);
      } catch (error) {
        toast.error("Failed to fetch data");
      }
    };

    fetchData();
  }, [filter]);

  const handleDownloadReport = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/report/generate-pdf",
        {
          responseType: "blob",
          withCredentials: true,
        }
      );

      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(pdfBlob);
      const tempLink = document.createElement("a");
      tempLink.href = url;
      tempLink.setAttribute("download", "report.pdf");
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error("Error downloading PDF");
      console.error("Error downloading PDF:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between p-4 mt-4 mb-6">
        <h1 className="text-xl font-bold">Reports</h1>
        <Button
          style={{ display: "flex", alignItems: "center", gap: "4px" }}
          type="primary"
          onClick={handleDownloadReport}
        >
          <FaArrowAltCircleDown />
          Download Report
        </Button>
      </div>
      <div className="mb-2">
        <ReportFilters setFilter={setFilter} />
      </div>
      <div>{data && <ReportTable data={data} />}</div>
    </div>
  );
};

export default AdminReports;
