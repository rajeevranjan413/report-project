import { useState, useEffect } from "react";
import UserTable from "../../components/admin/UserTable";
import axios from "axios";
import { IoIosAddCircle } from "react-icons/io";
import { Button, Modal, Select, Input } from "antd";
const { Search } = Input;
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminUsers = () => {
  const [factoryData, setFactoryData] = useState([]);
  const [change, setChange] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [factory, setFactory] = useState("");
  const [isPasswordModelOpen, setIsPasswordModelOpen] = useState(false);
  const [newUser, setNewUser] = useState(null);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    let message;
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/user/createUser",
        {
          name,
          email,
          role,
          factory,
        },
        { withCredentials: true }
      );
      message = data.message;
      if (message === "User Created Successfully") {
        setIsModalOpen(false);
        toast.success("User Created");
        setIsPasswordModelOpen(true);
        setNewUser(data.password);
        setChange(!change); // Trigger a refresh to fetch the updated user list
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error("Failed to create user");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handlePasswordModel = () => {
    setIsPasswordModelOpen(false);
  };

  const handleRoleChange = (value) => {
    setRole(value);
  };

  const handleFactoryChange = (value) => {
    setFactory(value);
  };

  const onSearch = (value) => {
    // Implement search functionality
    console.log("Search:", value);
  };

  useEffect(() => {
    const getFactoryList = async (search = "", offset = 0, limit = 10) => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/factory/factory-list",
          {
            params: { search, offset, limit },
            withCredentials: true,
          }
        );
        setFactoryData(data.detail.factory);
      } catch (error) {
        toast.error("Failed to fetch factory list");
      }
    };

    getFactoryList();
  }, [change]);

  return (
    <div>
      <ToastContainer />
      <div className="flex justify-between p-4 mt-4 mb-6">
        <h1 className="text-xl font-bold">Users</h1>
        <Button
          style={{ display: "flex", alignItems: "center", gap: "4px" }}
          type="primary"
          onClick={showModal}
        >
          <IoIosAddCircle />
          Create New User
        </Button>
      </div>
      {["Workers", "Managers", "Users"].map((category) => (
        <div className="mb-2" key={category}>
          <div className="h-16 flex justify-between items-center px-4 bg-white mb-1 font-bold">
            <h5>{category}</h5>
            <Search
              placeholder={`search ${category.toLowerCase()}`}
              onSearch={onSearch}
              style={{ width: 200 }}
            />
          </div>
          <UserTable category={category} />
        </div>
      ))}

      <Modal
        centered
        okText="Create"
        title="New User"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="mt-4 grid gap-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="role">Role</label>
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
            <label htmlFor="factory">Factory</label>
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
            <label htmlFor="name">Name</label>
            <Input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
      </Modal>

      <Modal
        title="Password"
        open={isPasswordModelOpen}
        onOk={handlePasswordModel}
        onCancel={handlePasswordModel}
      >
        <div className="h1">{newUser}</div>
      </Modal>
    </div>
  );
};

export default AdminUsers;
