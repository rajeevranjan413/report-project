import React, { useState, useEffect } from "react";
import ReportData from "./ReportData";
import { Button, message } from "antd";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosSave } from "react-icons/io";

const EditReportCard = ({ report, area, setVisible, fetchReports }) => {
  const [topic, setTopic] = useState(report.topic);
  const [formValues, setFormValues] = useState({
    area: report.area,
    problem: report.problem,
    chemical: report.chemical,
    premise: report.premise,
    tempature: report.tempature,
    rating: report.rating,
    comment: report.comment,
  });

  const topicsConfig = {
    "Before Work": [
      {
        name: "area",
        label: "Area",
        type: "select",
        options: area ?? ["No area"],
      },
      {
        name: "rating",
        label: "Job Rating",
        type: "select",
        options: [20, 30, 40, 50, 60, 70, 80, 90, 100],
      },
      { name: "comment", label: "Comment", type: "text" },
      { name: "photos", label: "Add Photos", type: "file" },
    ],
    Complain: [
      {
        name: "problem",
        label: "Problem Type",
        type: "select",
        options: ["Water", "Hose", "Covering Up", "Another"],
      },
      { name: "comment", label: "Comment", type: "text" },
      { name: "photos", label: "Add Photos", type: "file" },
    ],
    "Chemical Applied": [
      {
        name: "area",
        label: "Area",
        type: "select",
        options: area ?? ["No area"],
      },
      {
        name: "chemical",
        label: "Chemical Used",
        type: "select",
        options: ["Acid", "Alkaline", "Water"],
      },
      { name: "premise", label: "Prepared Premise", type: "text" },
      { name: "tempature", label: "Water Tempature", type: "text" },
      { name: "comment", label: "Comment", type: "text" },
      { name: "photos", label: "Add Photos", type: "file" },
    ],
    "After Work": [
      {
        name: "area",
        label: "Area",
        type: "select",
        options: area ?? ["Area"],
      },
      {
        name: "rating",
        label: "Job Rating",
        type: "select",
        options: [20, 30, 40, 50, 60, 70, 80, 90, 100],
      },
      { name: "comment", label: "Comment", type: "text" },
      { name: "photos", label: "Add Photos", type: "file" },
    ],
  };

  const handleInputChange = (name, value) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedReport = {
      area: formData.get("area") || "",
      topic,
      problem: formData.get("problem") || "",
      chemical: formData.get("chemical") || "",
      premise: formData.get("premise") || "",
      tempature: formData.get("tempature") || "",
      rating: formData.get("rating") || "",
      comment: formData.get("comment") || "",
    };

    formData.delete("area");
    formData.delete("problem");
    formData.delete("chemical");
    formData.delete("premise");
    formData.delete("tempature");
    formData.delete("rating");
    formData.delete("comment");
    formData.append("report", JSON.stringify(updatedReport));

    try {
      const { data } = await axios.put(
        `http://localhost:8000/api/report/updateReport/${report._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (data?.message === "Report updated Successfully") {
        toast("Report Updated");
        fetchReports();
      }
      setVisible(false);
    } catch (error) {
      console.error("Error updating report:", error);
      toast.error("Failed to update report");
    }
  };

  return (
    <>
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="text-sm w-full grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 items-center lg:gap-1 gap-2 py-5"
      >
        <ReportData
          name="topic"
          label="Topic"
          type="select"
          options={[
            "Before Work",
            "Chemical Applied",
            "After Work",
            "Complain",
          ]}
          setTopic={setTopic}
          defaultValue={topic}
        />
        {topic &&
          topicsConfig[topic].map((ele, index) => (
            <ReportData
              key={index}
              name={ele.name}
              label={ele.label}
              type={ele.type}
              options={ele.options}
              defaultValue={formValues[ele.name]}
              onChange={handleInputChange}
            />
          ))}
        <div className="mt-2">
          <button
            className="flex items-center gap-2 text-white bg-black py-2 px-4"
            type="submit"
          >
            <IoIosSave />
            Save Changes
          </button>
        </div>
      </form>
    </>
  );
};

export default EditReportCard;
