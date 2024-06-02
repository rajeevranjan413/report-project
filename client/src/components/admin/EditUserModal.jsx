import React, { useEffect, useState } from "react";
import { Modal, Select, Input } from "antd";

const EditUserModal = ({
  isModalOpen,
  handleOk,
  handleCancel,
  userData,
  factoryData,
  text,
}) => {
  const [role, setRole] = useState(userData?.role);
  const [factory, setFactory] = useState(userData?.factory);
  const [name, setName] = useState(userData?.name);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    setRole(userData?.role);
    setFactory(userData?.factory);
    setName(userData?.name);
  }, [userData]);

  const validateForm = () => {
    const errors = {};
    if (!name) errors.name = "Name is required";
    if (!role) errors.role = "Role is required";
    if (role === "Worker" && !factory) {
      errors.factory = "Factory is required for Worker role";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    handleOk({ role, factory, name });
  };

  const handleRoleChange = (value) => {
    setRole(value);
    setFactory(""); // Reset factory when role changes
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
      onOk={handleSave}
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
          {formErrors.role && (
            <span className="text-red-500">{formErrors.role}</span>
          )}
        </div>
        {role === "Worker" && (
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
            {formErrors.factory && (
              <span className="text-red-500">{formErrors.factory}</span>
            )}
          </div>
        )}
        <div className="flex flex-col gap-1">
          <label htmlFor="name">{text.name}</label>
          <Input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {formErrors.name && (
            <span className="text-red-500">{formErrors.name}</span>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default EditUserModal;
