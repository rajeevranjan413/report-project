import { useState, useEffect } from "react";
import {
  Space,
  Table,
  Button,
  ConfigProvider,
  Upload,
  Modal,
  message,
} from "antd";
import axios from "axios";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaRegEdit, FaUpload } from "react-icons/fa";

const TodayReportTable = ({ currentText }) => {
  const [reports, setAllReports] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploading, setUploading] = useState(false);

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
      render: (_, { photo }) => (
        <Button onClick={() => handleViewImage(photo)}>View Image</Button>
      ),
    },
    {
      title: `${currentText?.action}`,
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

  useEffect(() => {
    const getResponse = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/report/todayReport",
          { withCredentials: true }
        );
        setAllReports(data.data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch reports", error);
      }
    };

    getResponse();
  }, []);

  const handleViewImage = (photos) => {
    setSelectedImages(photos || []);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedImages([]);
  };

  const handleDeleteImage = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

  const handleUploadImage = async (info) => {
    if (info.file.status === "uploading") {
      setUploading(true);
      return;
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
      setUploading(false);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
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
        <Table columns={columns} dataSource={reports} rowKey="id" />
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
                <img
                  src={image}
                  alt={`Report Image ${index}`}
                  style={{ width: "70px", height: "70px" }}
                />
                <Button
                  type="danger"
                  icon={<MdOutlineDeleteOutline />}
                  size="small"
                  style={{ position: "absolute", top: "-10px", right: "-10px" }}
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
