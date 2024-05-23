import { useEffect, useState } from "react";
import axios from "axios";
import { IoIosAddCircle } from "react-icons/io";
import { Button, Modal, Form, Input } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FactoryTable from "../../components/admin/FactoryTable";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import EditFactoryModal from "../../components/admin/EditFctoryModel";

const { Search } = Input;

const AdminFactory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [fields, setFields] = useState([]);
  const [factoryData, setFactoryData] = useState(null);
  const [search, setSearch] = useState("");
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const [change, setChange] = useState(false);

  const [factoryForEdit, setFactoryForEdit] = useState(null);
  const [editModelOpen, setEditModelOpen] = useState(null);
  const [factoryId, setFactoryId] = useState(null);

  useEffect(() => {
    async function getFactoryList(search, offset, limit) {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/factory/factory-list`,
          {
            params: {
              search: search,
              offset: offset,
              limit: limit,
            },
            withCredentials: true,
          }
        );
        setFactoryData(data.detail.factory);
        setChange(true);
      } catch (error) {
        toast.error("Failed to fetch factory list");
      }
    }
    getFactoryList(search, offset, limit);
  }, [search, offset, limit, change]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    let message;
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/factory/addFactory",
        {
          name: name,
          areas: fields.map((field) => field.value),
        },
        { withCredentials: true }
      );
      message = data.message;
      setChange(!change);
      if (message === "Factory Created Successfully") {
        setIsModalOpen(false);
        toast.success("Factory Created");
        setSearch(""); // Reset search to refresh the list
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error("Failed to create factory");
    }
  };

  const handleDelete = async (id) => {
    let message;

    try {
      const { data } = await axios.delete(
        `http://localhost:8000/api/factory/delete-factory/${id}`,
        { withCredentials: true }
      );
      setChange(!change);
      message = data.message;
      if (message === "Factory Deleted") {
        setIsModalOpen(false);
        toast.success("Factory Delete");
        setSearch(""); // Reset search to refresh the list
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error("Failed to create factory");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditModelOpen(false);
  };

  const onSearch = (value) => {
    console.log(value);
    setSearch(value);
    setOffset(0); // Reset offset when searching
  };

  const handleAddInput = () => {
    setFields([...fields, { value: "" }]);
  };

  const handleRemoveInput = (index) => {
    setFields(fields.filter((field, i) => i !== index));
  };

  useEffect(() => {
    const getFactoryDetails = async () => {
      console.log(factoryId);
      // setEditModelOpen(true); // Open the edit modal once the user data is fetched

      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/factory/details/${factoryId}`,
          {
            withCredentials: true,
          }
        );
        console.log(data);
        if (data.success == true) setFactoryForEdit(data?.detail);
      } catch (error) {
        toast.error("Failed to fetch selected Factory");
      }
    };

    if (factoryId) {
      getFactoryDetails();
    }
  }, [factoryId]);

  const handleEditOk = async (factory) => {
    console.log(factory);
    try {
      const { data } = await axios.post(
        `http://localhost:8000/api/factory/edit-factory/${factoryForEdit._id}`,
        {
          name: factory.name,
          areas: factory.areas,
        },
        { withCredentials: true }
      );
      console.log(data);
      if (data.success === true) {
        setEditModelOpen(false);
        toast.success("User Updated");
        setEditModelOpen(false);
        setChange(!change); // Trigger a refresh to fetch the updated user list
      } else {
        toast.error("User Edit Fail");
      }
    } catch (error) {
      toast.error("Failed to update user");
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="flex justify-between p-4 mt-4 mb-6">
        <h1 className="text-xl font-bold">Factories</h1>
        <Button
          style={{ display: "flex", alignItems: "center", gap: "4px" }}
          type="primary"
          onClick={showModal}
        >
          <IoIosAddCircle />
          Create New Factory
        </Button>
      </div>
      <div className="mb-2">
        <div className="h-16 flex justify-between items-center px-4 bg-white mb-1 font-bold">
          <h5>Factories</h5>
          <Search
            placeholder="Search Factory Name"
            onSearch={onSearch}
            style={{
              width: 200,
            }}
          />
        </div>
        <FactoryTable
          columns={[
            {
              title: "Name",
              dataIndex: "name",
              key: "name",
            },
            {
              title: "Areas",
              dataIndex: "areas",
              render: (item) => item.map((i, k) => <p key={k}>{i}</p>),
            },
            {
              title: "Action",
              render: (item) => (
                <div>
                  <button
                    onClick={() => {
                      setEditModelOpen(true);
                      setFactoryId(item._id);
                    }}
                  >
                    <FaRegEdit />
                  </button>{" "}
                  <button onClick={() => handleDelete(item._id)}>
                    <MdOutlineDeleteOutline />
                  </button>
                </div>
              ),
            },
          ]}
          data={factoryData || []}
          pageSize={10}
        />
      </div>

      <div>
        <Modal
          centered={true}
          okText="Create"
          title="Create New Factory"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className="mt-4 grid gap-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name</label>
              <input
                className="p-2 border outline-none rounded"
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              />
            </div>
          </div>
          <Form layout="inline">
            {fields.map((field, index) => (
              <Form.Item key={index} label={`Area ${index + 1}`}>
                <Input
                  value={field.value}
                  onChange={(e) =>
                    setFields(
                      fields.map((f, i) =>
                        i === index ? { ...f, value: e.target.value } : f
                      )
                    )
                  }
                />
                <Button onClick={() => handleRemoveInput(index)}>Remove</Button>
              </Form.Item>
            ))}
            <Form.Item>
              <Button type="primary" onClick={handleAddInput}>
                Add Area
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>

      {factoryForEdit && (
        <EditFactoryModal
          isModalOpen={editModelOpen}
          handleOk={handleEditOk}
          handleCancel={handleCancel}
          factoryData={factoryForEdit}
        />
      )}
    </div>
  );
};

export default AdminFactory;
