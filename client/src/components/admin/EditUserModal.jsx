import React, { useEffect, useState } from "react";
import { Modal, Select, Input } from "antd";

const EditUserModal = ({
  isModalOpen,
  handleOk,
  handleCancel,
  userData,
  factoryData,
  text
}) => {
  console.log(userData);
  const [role, setRole] = useState(userData?.role);
  const [factory, setFactory] = useState(userData?.factory);
  const [name, setName] = useState(userData?.name);

  useEffect(() => {
    setRole(userData?.role);
    setFactory(userData?.factory);
    setName(userData?.name);
  }, [userData]);

  const handleRoleChange = (value) => {
    setRole(value);
  };

  const handleFactoryChange = (value) => {
    setFactory(value);
  };

  return (
    <Modal
      centered
      okText={text.save}
      title={text.edit}
      open={isModalOpen}
      onOk={() => handleOk({ role, factory, name })}
      onCancel={handleCancel}
      cancelText={text.cancel}
    >
      <div className="mt-4 grid gap-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="role">{text.role}</label>
          <Select
            value={role}
            style={{ width: 120 }}
            onChange={handleRoleChange}
            options={[
              { value: "Admin", label: "Admin" },
              { value: "Worker", label: "Worker" },
              { value: "User", label: "User" },
              { value: "Manager", label: "Manager" },
            ]}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="factory">{text.factory}</label>
          <Select
            value={factory}
            style={{ width: 120 }}
            onChange={handleFactoryChange}
          >
            {factoryData.map((v, i) => (
              <Select.Option key={i} value={v._id}>
                {v.name}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="name">{text.factory}</label>
          <Input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
    </Modal>
  );
};

export default EditUserModal;
