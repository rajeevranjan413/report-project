import { useState, useEffect } from "react";
import { Modal, Button, Input, Form } from "antd";

const EditFactoryModal = ({
  isModalOpen,
  handleOk,
  handleCancel,
  factoryData,
  currentText
}) => {
  const [name, setName] = useState(factoryData?.name || "");
  const [fields, setFields] = useState(factoryData?.areas || []);

  useEffect(() => {
    setName(factoryData?.name || "");
    setFields(factoryData?.areas || []);
  }, [factoryData]);

  const handleAddInput = () => {
    setFields([...fields, ""]);
  };

  const handleRemoveInput = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleFieldChange = (index, value) => {
    setFields(fields.map((field, i) => (i === index ? value : field)));
  };

  const onOk = () => {
    handleOk({ name, areas: fields });
  };

  return (
    <Modal
      centered
      okText="Save"
      title="Edit Factory"
      open={isModalOpen}
      onOk={onOk}
      onCancel={handleCancel}
    >
      <div className="mt-4 grid gap-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="name">{currentText.name}</label>
          <Input
            className="p-2 border outline-none rounded"
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
        </div>
      </div>
      <Form layout="vertical">
        {fields.map((field, index) => (
          <Form.Item key={index} label={`Area ${index + 1}`}>
            <Input
              value={field}
              onChange={(e) => handleFieldChange(index, e.target.value)}
            />
            <Button type="danger" onClick={() => handleRemoveInput(index)}>
            {currentText.delete}
            </Button>
          </Form.Item>
        ))}
        <Form.Item>
          <Button type="primary" onClick={handleAddInput}>
          {currentText.addArea}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditFactoryModal;
