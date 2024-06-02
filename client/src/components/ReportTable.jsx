import { Table, ConfigProvider, Button, Popconfirm, Image, Modal } from "antd";
import { useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";

const ReportTable = ({ t, data }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const handleViewImage = (photos, record) => {
    setSelectedImages(photos || []);
    setSelectedReport(record);
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedImages([]);
  };
  const columns = [
    {
      title: t.area,
      dataIndex: "area",
      key: "area",
    },
    {
      title: t.topic,
      dataIndex: "topic",
      key: "topic",
    },
    {
      title: t.chemicalUsed,
      dataIndex: "chemical",
      key: "chemical",
    },
    {
      title: t.preparedPremise,
      dataIndex: "premise",
      key: "premise",
    },
    {
      title: t.waterTemperature,
      dataIndex: "tempature",
      key: "tempature",
    },
    {
      title: t.jobRating,
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: t.atpResult,
      dataIndex: "test",
      key: "test",
    },
    {
      title: t.comment,
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: `${t?.photos}`,
      dataIndex: "photo",
      key: "photo",
      render: (_, record) => (
        <Button onClick={() => handleViewImage(record.photo, record)}>
          View Image
        </Button>
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
          pagination={{ position: ["bottomCenter"] }}
          rowKey="id"
          scroll={{ x: 800 }}
          columns={columns}
          dataSource={data}
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
        ></div>
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
                  }}
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

export default ReportTable;
