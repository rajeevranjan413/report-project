import {
  Button,
  ConfigProvider,
  Modal,
  Space,
  Table,
  Upload,
  message,
  Image,
  Popconfirm,
} from "antd";
import EditReportCard from "./EditReportCard";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaUpload } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";

const TodayReportTable = ({ currentText }) => {
  const [reports, setAllReports] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const fetchReports = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/report/todayReport",
        {
          withCredentials: true,
        }
      );
      setAllReports(data.data);
    } catch (error) {
      console.error("Failed to fetch reports", error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleEdit = async (record) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/report/individual-report/${record._id}`,
        { withCredentials: true }
      );
      setSelectedReport(data.report);
      setEditModalVisible(true);
    } catch (error) {
      console.error("Failed to fetch report for editing", error);
    }
  };

  const handleDelete = async (record) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/report/deleteReport/${record._id}`,
        { withCredentials: true }
      );
      message.success("Report deleted successfully");
      fetchReports();
    } catch (error) {
      console.error("Failed to delete report", error);
      message.error("Failed to delete report");
    }
  };

  const handleViewImage = (photos, record) => {
    setSelectedImages(photos || []);
    setSelectedReport(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedImages([]);
  };

  const handleDeleteImage = async (index) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8000/api/report/deleteImage/${selectedReport._id}`,
        {
          data: { imageIndex: index },
          withCredentials: true,
        }
      );

      setSelectedReport(data.report);
      setSelectedImages(data.report.photo);
      message.success("Image deleted successfully");
    } catch (error) {
      console.error("Failed to delete image", error);
      message.error("Failed to delete image");
    }
  };

  const handleUploadImage = async ({ file }) => {
    if (!selectedReport) {
      message.error("No report selected");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("photos", file);

    try {
      const { data } = await axios.post(
        `http://localhost:8000/api/report/uploadImages/${selectedReport._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      setSelectedReport(data.report);
      setSelectedImages(data.report.photo);
      setUploading(false);
      message.success(`${file.name} file uploaded successfully.`);
    } catch (error) {
      console.error("Failed to upload image", error);
      setUploading(false);
      message.error(`${file.name} file upload failed.`);
    }
  };

  const columns = [
    {
      title: `${currentText?.area}`,
      dataIndex: "area",
      key: "area",
    },
    {
      title: `${currentText?.topic}`,
      dataIndex: "topic",
      key: "topic",
    },
    {
      title: `${currentText?.chemicalUsed}`,
      dataIndex: "chemical",
      key: "chemical",
    },
    {
      title: `${currentText?.preparedPremise}`,
      dataIndex: "premise",
      key: "premise",
    },
    {
      title: `${currentText?.waterTemperature}`,
      dataIndex: "tempature",
      key: "tempature",
    },
    {
      title: `${currentText?.jobRating}`,
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: `${currentText?.atpResult}`,
      dataIndex: "test",
      key: "test",
    },
    {
      title: `${currentText?.comment}`,
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: `${currentText?.photos}`,
      dataIndex: "photo",
      key: "photo",
      render: (_, record) => (
        <Button onClick={() => handleViewImage(record.photo, record)}>
          View Image
        </Button>
      ),
    },
    {
      title: `${currentText?.action}`,
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure you want to delete this report?"
          onConfirm={() => handleDelete(record)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="danger" icon={<MdOutlineDeleteOutline />}>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "white",
            },
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={reports}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          scroll={{ x: 800 }}
        />
      </ConfigProvider>
      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
        width={600}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <Upload
            accept="image/*"
            showUploadList={false}
            beforeUpload={() => true}
            customRequest={handleUploadImage}
          >
            <Button icon={<FaUpload />} loading={uploading}>
              Upload Image
            </Button>
          </Upload>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {selectedImages.length > 0 ? (
            selectedImages.map((image, index) => (
              <div key={index} style={{ margin: "10px", position: "relative" }}>
                <Image
                  src={image}
                  alt={`Report Image ${index}`}
                  style={{ width: "70px", height: "70px" }}
                  preview={{
                    src: image,
                    mask: (
                      <Popconfirm
                        title="Are you sure you want to delete this image?"
                        onConfirm={() => handleDeleteImage(index)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <MdOutlineDeleteOutline
                          style={{ color: "red", fontSize: "20px" }}
                        />
                      </Popconfirm>
                    ),
                  }}
                />
              </div>
            ))
          ) : (
            <p>No images to display</p>
          )}
        </div>
      </Modal>
      <Modal
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
        centered
        width={800}
      >
        {selectedReport && (
          <EditReportCard
            report={selectedReport}
            area={reports.map((report) => report.area)}
            setVisible={setEditModalVisible}
            fetchReports={fetchReports}
          />
        )}
      </Modal>
    </>
  );
};

export default TodayReportTable;
