import React, { useState } from "react";
import ReportData from "./ReportData";
import { Button, Modal, Select, message } from "antd";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosAddCircle } from "react-icons/io";

const NewReportCard = ({ area, setVisible }) => {
  const [topic, setTopic] = useState("");
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const report = {
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
    formData.append("report", JSON.stringify(report));

    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/report/addReport",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (data?.message === "Report added Successfully") {
        toast("Report Added");
      }
      setVisible(false);
    } catch (error) {
      console.error("Error uploading report:", error);
      toast.error("Failed to add report");
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
        />
        {topic &&
          topicsConfig[topic].map((ele, index) => (
            <ReportData
              key={index}
              name={ele.name}
              label={ele.label}
              type={ele.type}
              options={ele.options}
            />
          ))}
        <div className="mt-2">
          <button
            className="flex items-center gap-2 text-white bg-black py-2 px-4"
            type="submit"
          >
            <IoIosAddCircle />
            Save Report
          </button>
        </div>
      </form>
    </>
  );
};

export default NewReportCard;
