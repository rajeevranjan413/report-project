import { Table } from "antd";

const FactoryTable = ({ data, columns }) => {
  return (
    <Table dataSource={data} columns={columns} pagination={{ pageSize: 7 }} />
  );
};

export default FactoryTable;
