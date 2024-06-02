import { Table, ConfigProvider, Button, Image, Modal } from "antd";
import { useState } from "react";

const ReportTable = ({ t, data }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);

  const handleViewText = (text) => {
    setSelectedText(text);
    setIsModalVisible(true);
  };

  const handleViewImage = (photos, record) => {
    setSelectedImages(photos || []);
    setSelectedText(null);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedText("");
    setSelectedImages([]);
  };

  const renderTextWithModal = (text) => {
    const words = text.split(" ");
    const shortText = words.slice(0, 5).join(" ");
    const isLongText = words.length > 20;

    return (
      <div onClick={() => handleViewText(text)} style={{ cursor: "pointer" }}>
        {shortText}
        {isLongText && "..."}
      </div>
    );
  };

  const columns = [
    {
      title: t.area,
      dataIndex: "area",
      key: "area",
    },
    {
      title: `${"Name"}`,
      dataIndex: "photo",
      key: "photo",
      render: (_, record) => <p>{record?.createdBy?.name}</p>,
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
      dataIndex: "temperature",
      key: "temperature",
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
      render: renderTextWithModal,
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
        {selectedText ? (
          <p>{selectedText}</p>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {selectedImages.length > 0 ? (
              selectedImages.map((image, index) => (
                <div
                  key={index}
                  style={{ margin: "10px", position: "relative" }}
                >
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
        )}
      </Modal>
    </>
  );
};

export default ReportTable;
