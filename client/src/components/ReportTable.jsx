import {  Table,  ConfigProvider } from "antd";


const ReportTable = ({t, data }) => {




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
      title: t.photos,
      dataIndex: "photo",
      key: "photo",
    },
  ];

  return (
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
        columns={columns}
        dataSource={data}
      />
    </ConfigProvider>
  );
};

export default ReportTable;
