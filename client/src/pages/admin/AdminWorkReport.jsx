import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import FactoryTable from "../../components/admin/FactoryTable";
import { DatePicker, Space } from "antd";
import moment from "moment-timezone";
import { useSelector } from "react-redux";



const translations = {
  eng: {
    factories: "Factories",
    date: "Date",
    name: "Name",
    email: "Email",
    checkInTime: "Check-In Time",
    checkOutTime: "Check-Out Time",
  },
  lit: {
    factories: "Gamyklos", // Lithuanian translation for Factories
    date: "Data",
    name: "Vardas", // Lithuanian translation for Name
    email: "El. paštas", // Lithuanian translation for Email
    checkInTime: "Registracijos laikas", // Lithuanian translation for Check-In Time
    checkOutTime: "Pasitraukimo laikas", // Lithuanian translation for Check-Out Time
  },
};




const AdminWorkReport = () => {
  const [report, setReport] = useState([]);
  const [date, setDate] = useState(null);
  const { userAuth } = useSelector((store) => store?.system);
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
  const currentText = translations[userAuth?.language || "eng"];
  return (
    <>
      <div className="mb-2">
        <div className="h-16 flex justify-between items-center px-4 bg-white mb-1 font-bold">
          <h5>{currentText.factories}</h5> {/* Use translated text for Factories */}
          <Space direction="vertical" size={12}>
            <DatePicker onChange={onChange} />
          </Space>
        </div>
        <FactoryTable
          columns={[
            {
              title: currentText.date, // Use translated text for Date
              dataIndex: "dateString",
              key: "dateString",
            },
            {
              title: currentText.name, // Use translated text for Name
              render: (item) => <p>{item?.worker?.name}</p>,
            },
            {
              title: currentText.email, // Use translated text for Email
              render: (item) => <p>{item?.worker?.email}</p>,
            },
            {
              title: currentText.checkInTime, // Use translated text for Check-In Time
              render: (item) => <p>{convertUTCTimeTo24Hour(item.checkedIn)}</p>,
            },
            {
              title: currentText.checkOutTime, // Use translated text for Check-Out Time
              render: (item) => <p>{convertUTCTimeTo24Hour(item.checkedOut)}</p>,
            },
          ]}
          data={report}
        />
      </div>
    </>
  );
};
export default AdminWorkReport;
