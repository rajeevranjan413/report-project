import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import FactoryTable from "../../components/admin/FactoryTable";
import { DatePicker, Space } from "antd";
import moment from "moment-timezone";
const AdminWorkReport = () => {
  const [report, setReport] = useState([]);
  const [date, setDate] = useState(null);
  useEffect(() => {
    const getWtDetails = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/wt/get-list`,
          {
            params: { date: date || null },
            withCredentials: true,
          }
        );
        if (data.success == true) setReport(data?.detail?.wtList);
      } catch (error) {
        toast.error("Failed to fetch");
      }
    };
    console.log("THIS DATE", date);
    getWtDetails();
  }, [date]);

  function convertUTCTimeTo24Hour(utcTimeString) {
    // Parse the UTC time string
    const date = new Date(utcTimeString);

    // Get hours in 24-hour format (0-23) based on UTC time
    const hours = date.getUTCHours();

    // Add leading zero if hours is less than 10
    const formattedHours = hours < 10 ? `0${hours}` : hours;

    // Get minutes (0-59)
    const minutes = date.getUTCMinutes();

    // Add leading zero if minutes is less than 10
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    // Return the formatted time in 24-hour clock format, considering exact conversion
    return `${formattedHours}:${formattedMinutes}`;
  }
  const onChange = (date, dateString) => {
    setDate(dateString);
  };
  function getCurrentTimeInLithuania() {
    // Include Moment.js library (assuming it's already loaded)
    // You might need to install it using a package manager if not included

    // Get current time in UTC
    const utcTime = moment.utc();

    // Lithuania time zone identifier (change if needed for a different zone)
    const lithuaniaZone = "Europe/Vilnius";

    // Convert UTC time to Lithuania time (EEST)
    const lithuaniaTime = utcTime.clone().tz(lithuaniaZone);

    // Format the time for user output (adjust format as desired)
    const formattedTime = lithuaniaTime.format("YYYY-MM-DD HH:mm:ss Z");

    return formattedTime;
  }
  console.log(getCurrentTimeInLithuania());
  return (
    <>
      <div className="mb-2">
        <div className="h-16 flex justify-between items-center px-4 bg-white mb-1 font-bold">
          <h5>Factories</h5>
          <Space direction="vertical" size={12}>
            <DatePicker onChange={onChange} />
          </Space>
        </div>
        <FactoryTable
          columns={[
            {
              title: "Date",
              dataIndex: "dateString",
              key: "dateString",
            },
            {
              title: "Name",
              render: (item) => <p>{item?.worker?.name}</p>,
            },
            {
              title: "Email",
              render: (item) => <p>{item?.worker?.email}</p>,
            },
            {
              title: "CheckIn Time",
              render: (item) => <p>{convertUTCTimeTo24Hour(item.checkedIn)}</p>,
            },
            {
              title: "CheckOut Time",
              render: (item) => (
                <p>{convertUTCTimeTo24Hour(item.checkedOut)}</p>
              ),
            },
          ]}
          data={report}
        />
      </div>
    </>
  );
};
export default AdminWorkReport;
