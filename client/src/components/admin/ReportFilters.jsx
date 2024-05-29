import { Select, Space } from "antd";
import DatePickers from "./DatePicker";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function ReportFilters({ setFilter }) {
  const [factoryData, setFactoryData] = useState([]);
  const [selectedFactory, setSelectedFactory] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null); // State for selected topic
  const [dates, setDates] = useState(null);

  const onChange = (date, dateString) => {
    setDates(date);
    setFilter((prev) => ({ ...prev, date: dateString }));
  };

  const fetchFactoryList = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/factory/factory-list",
        {
          withCredentials: true,
        }
      );
      setFactoryData(data.detail.factory);
    } catch (error) {
      toast.error("Failed to fetch factory list");
    }
  }, []);

  useEffect(() => {
    fetchFactoryList();
  }, [fetchFactoryList]);

  useEffect(() => {
    setFilter((prev) => ({
      ...prev,
      factory: selectedFactory,
      topic: selectedTopic, // Adding topic to the filter
    }));
  }, [selectedFactory, selectedTopic, setFilter]);

  return (
    <div className="flex gap-4 items-center w-full">
      <div>
        <Space wrap>
          <Select
            value={selectedFactory}
            style={{ width: 120 }}
            onChange={(value) => setSelectedFactory(value)}
            placeholder={"Select Factory"}
          >
            <Select.Option value={""}>All Factories</Select.Option>
            {factoryData.map((factory) => (
              <Select.Option key={factory._id} value={factory._id}>
                {factory.name}
              </Select.Option>
            ))}
          </Select>
        </Space>
      </div>
      <div>
        <Space direction="vertical" size={12}>
          <DatePickers onChange={onChange} />
        </Space>
      </div>
      <div>
        <Space wrap>
          <Select
            value={selectedTopic}
            style={{ width: 120 }}
            onChange={(value) => setSelectedTopic(value)}
            placeholder={"Select Topic"}
          >
            {" "}
            <Select.Option value={""}>All Topics</Select.Option>
            {/* Assuming topics are hardcoded or fetched similarly to factories */}
            <Select.Option value={"Before Work"}>Before Work</Select.Option>
            <Select.Option value={"After Work"}>After Work</Select.Option>
            <Select.Option value={"With Chemical"}>With Chemical</Select.Option>
            <Select.Option value={"Complain"}>Complain</Select.Option>
            {/* Add more topics as needed */}
          </Select>
        </Space>
      </div>
    </div>
  );
}
