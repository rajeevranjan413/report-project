import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ReportData from "./ReportData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosAddCircle } from "react-icons/io";
import axios from "axios";

const Data1 = [
  {
    name: "area",
    label: "Area",
    type: "select",
    options: ["Area 1", "Area 2", "Area 3", "Area 4"],
  },
  {
    name: "topic",
    label: "Topic",
    type: "select",
    options: ["Before Work", "After Work", "Complain"],
  },
  {
    name: "problem",
    label: "Problem Type",
    type: "select",
    options: ["Water", "Hose", "Covering Up", "Another"],
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
];

const Data2 = [
  {
    name: "area",
    label: "Area",
    type: "select",
    options: ["Area 1", "Area 2", "Area 3", "Area 4"],
  },
  {
    name: "topic",
    label: "Topic",
    type: "select",
    options: ["Before Work", "Chemical Applied", "After Work", "Complain"],
  },
  {
    name: "chemical",
    label: "Chemical Used",
    type: "select",
    options: ["Acid", "Alkaline", "Water"],
  },
  {
    name: "premise",
    label: "Prepared Premise",
    type: "text",
  },
  {
    name: "temperature",
    label: "Water Temperature",
    type: "text",
  },
  {
    name: "rating",
    label: "Job Rating",
    type: "select",
    options: [20, 30, 40, 50, 60, 70, 80, 90, 100],
  },
  {
    name: "test",
    label: "ATP Result",
    type: "text",
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
];

const NewReportCard = ({ setVisible }) => {
  const [complain, setComplain] = useState(false);

  const validationSchema = Yup.object().shape({
    area: Yup.string().required("Area is required"),
    topic: Yup.string().required("Topic is required"),
    chemical: Yup.string().when("topic", {
      is: "Chemical Applied",
      then: Yup.string().required("Chemical Used is required"),
    }),
    premise: Yup.string().when("topic", {
      is: "Chemical Applied",
      then: Yup.string().required("Prepared Premise is required"),
    }),
    temperature: Yup.string().when("topic", {
      is: "Chemical Applied",
      then: Yup.string().required("Water Temperature is required"),
    }),
    rating: Yup.number().when("topic", {
      is: "Chemical Applied",
      then: Yup.number().required("Job Rating is required"),
    }),
    test: Yup.string().when("topic", {
      is: "Chemical Applied",
      then: Yup.string().required("ATP Result is required"),
    }),
    comment: Yup.string(),
    photos: Yup.mixed(),
  });

  const formik = useFormik({
    initialValues: {
      area: "",
      topic: "",
      chemical: "",
      premise: "",
      temperature: "",
      rating: "",
      test: "",
      comment: "",
      photos: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formDataToSend = new FormData();
      formDataToSend.append("report", JSON.stringify(values));

      if (values.photos) {
        Array.from(values.photos).forEach((photo) => {
          formDataToSend.append("photos", photo);
        });
      }

      try {
        const { data } = await axios.post(
          "http://localhost:8000/api/report/addReport",
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );

        if (data?.message === "Report added Successfully") {
          toast.success("Report Added");
        }
        setVisible(false);
      } catch (error) {
        console.error("Error uploading report:", error);
        toast.error("Failed to add report. Please try again.");
      }
    },
  });

  return (
    <>
      <ToastContainer />
      <form
        onSubmit={formik.handleSubmit}
        className="text-sm w-full grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 items-center lg:gap-1 gap-2 py-5"
      >
        {(complain ? Data1 : Data2).map((ele, index) => (
          <ReportData
            setComplain={setComplain}
            key={index}
            name={ele.name}
            label={ele.label}
            type={ele.type}
            options={ele.options}
            value={formik.values[ele.name]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched[ele.name] && formik.errors[ele.name]}
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
