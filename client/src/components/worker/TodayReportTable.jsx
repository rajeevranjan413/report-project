import React, { useState, useEffect } from "react";
import {
  Space,
  Table,
  Modal,
  ConfigProvider,
  Button,
  Upload,
  message,
} from "antd";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaRegEdit, FaUpload } from "react-icons/fa";
import axios from "axios";

const columns = (handleViewImage, handleDeleteImage, handleUploadImage) => [
  {
    title: "Area",
    dataIndex: "area",
    key: "area",
  },
  {
    title: "Topic",
    dataIndex: "topic",
    key: "topic",
  },
  {
    title: "Chemical Used",
    dataIndex: "chemical",
    key: "chemical",
  },
  {
    title: "Prepared Premise",
    dataIndex: "premise",
    key: "premise",
  },
  {
    title: "Water Tempature",
    dataIndex: "tempature",
    key: "tempature",
  },
  {
    title: "Job Rating",
    dataIndex: "rating",
    key: "rating",
  },
  {
    title: "ATP Result",
    dataIndex: "test",
    key: "test",
  },
  {
    title: "Comment",
    dataIndex: "comment",
    key: "comment",
  },
  {
    title: "Photos",
    dataIndex: "photo",
    key: "photo",
    render: (_, { photo }) => (
      <>
        <Button onClick={() => handleViewImage(photo[0])}>View Image</Button>
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a onClick={() => handleEdit(record)}>
          <FaRegEdit />
        </a>
        <a onClick={() => handleDelete(record)}>
          <MdOutlineDeleteOutline />
        </a>
      </Space>
    ),
  },
];

const TodayReportTable = () => {
  const [reports, setAllReports] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const getResponse = async () => {
      const { data } = await axios.get(
        "http://localhost:8000/api/report/todayReport",
        { withCredentials: true }
      );
      setAllReports(data.data);
    };

    getResponse();
  }, []);

  const handleViewImage = (photos) => {
    setSelectedImages(photos);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedImages([]);
  };

  const handleDeleteImage = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    console.log("Hellllloooo", updatedImages);

    setSelectedImages(updatedImages);
  };

  const handleUploadImage = async (info) => {
    if (info.file.status === "uploading") {
      setUploading(true);
      return;
    }
    if (info.file.status === "done") {
      // You can handle response from server after successful upload
      message.success(`${info.file.name} file uploaded successfully.`);
      setUploading(false);
    }
  };

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
          columns={columns(
            handleViewImage,
            handleDeleteImage,
            handleUploadImage
          )}
          dataSource={reports}
        />
      </ConfigProvider>

      <Modal
        visible={isModalVisible}
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
            beforeUpload={() => false}
            onChange={handleUploadImage}
          >
            <Button icon={<FaUpload />} loading={uploading}>
              Upload Image
            </Button>
          </Upload>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {selectedImages.length > 0 ? (
            selectedImages.map((image, index) => (
              <div key={index} style={{ margin: "10px", position: "relative" }}>
                <img
                  src={image}
                  alt={`Report Image ${index}`}
                  style={{ width: "70px", height: "70px" }}
                />
                <Button
                  type="danger"
                  icon={<MdOutlineDeleteOutline />}
                  size="small"
                  style={{ position: "sticky", top: "-25px", right: "-25px" }}
                  onClick={() => handleDeleteImage(index)}
                />
              </div>
            ))
          ) : (
            <p>No images to display</p>
          )}
        </div>
      </Modal>
    </>
  );
};

export default TodayReportTable;
