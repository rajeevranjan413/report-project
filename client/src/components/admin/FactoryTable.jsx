import { Table } from "antd";

const FactoryTable = ({ data, columns, pageSize }) => {
  return (
    <Table
      dataSource={data}
      columns={columns}
      pagination={{ pageSize: pageSize }}
    />
  );
};

export default FactoryTable;
