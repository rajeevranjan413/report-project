import { Table } from "antd";

const FactoryTable = ({ data, columns, pageSize }) => {
  return (
    <Table
      dataSource={data}
      columns={columns}
      pagination={{ pageSize: pageSize }}
      scroll={{ x: 800 }}
    />
  );
};

export default FactoryTable;
