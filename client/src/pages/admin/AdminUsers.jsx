import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { IoIosAddCircle } from "react-icons/io";
import { Button, Modal, Select, Input } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WorkersTable from "../../components/admin/WorkersTable";
import ManagersTable from "../../components/admin/ManagersTable";
import ClientsTable from "../../components/admin/ClientList";
import AdminTable from "../../components/admin/AdminTable";
import EditUserModal from "../../components/admin/EditUserModal";

const AdminUsers = () => {
  const [factoryData, setFactoryData] = useState([]);
  const [change, setChange] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
    factory: "",
  });
  const [isPasswordModelOpen, setIsPasswordModelOpen] = useState(false);
  const [newUser, setNewUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userForEdit, setUserForEdit] = useState(null);
  const [editModelOpen, setEditModelOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/user/createUser",
        formData,
        { withCredentials: true }
      );
      if (data.message === "User Created Successfully") {
        setIsModalOpen(false);
        toast.success("User Created");
        setIsPasswordModelOpen(true);
        setNewUser(data.password);
        setChange(!change);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to create user");
    }
  };

  const handleEditOk = async (updatedUser) => {
    try {
      const { data } = await axios.post(
        `http://localhost:8000/api/user/editUser/${userForEdit._id}`,
        updatedUser,
        { withCredentials: true }
      );
      if (data.success) {
        setEditModelOpen(false);
        toast.success("User Updated");
        setChange(!change);
      } else {
        toast.error("User Edit Failed");
      }
    } catch (error) {
      toast.error("Failed to update user");
    }
  };

  const handleCancel = () => {
    setEditModelOpen(false);
    setIsModalOpen(false);
  };

  const handlePasswordModel = () => {
    setIsPasswordModelOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRoleChange = (value) => {
    setFormData((prevData) => ({ ...prevData, role: value }));
  };

  const handleFactoryChange = (value) => {
    setFormData((prevData) => ({ ...prevData, factory: value }));
  };

  const fetchFactoryList = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/factory/factory-list",
        { withCredentials: true }
      );
      setFactoryData(data.detail.factory);
    } catch (error) {
      toast.error("Failed to fetch factory list");
    }
  }, []);

  const fetchUserDetails = useCallback(async () => {
    if (userId) {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/user/details/${userId}`,
          { withCredentials: true }
        );
        setUserForEdit(data.data.user);
        setEditModelOpen(true);
      } catch (error) {
        toast.error("Failed to fetch selected User");
      }
    }
  }, [userId]);

  useEffect(() => {
    fetchFactoryList();
  }, [change, fetchFactoryList]);

  useEffect(() => {
    fetchUserDetails();
  }, [userId, fetchUserDetails]);

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
      <div className="mb-2">
        <WorkersTable
          selected={setUserId}
          set={change}
          openModel={setEditModelOpen}
        />
        <ManagersTable
          selected={setUserId}
          set={change}
          openModel={setEditModelOpen}
        />
        <ClientsTable
          selected={setUserId}
          set={change}
          openModel={setEditModelOpen}
        />
        <AdminTable
          selected={setUserId}
          set={change}
          openModel={setEditModelOpen}
        />
      </div>

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
              value={formData.role}
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
              value={formData.factory}
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
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
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

      {userForEdit && (
        <EditUserModal
          isModalOpen={editModelOpen}
          handleOk={handleEditOk}
          handleCancel={handleCancel}
          userData={userForEdit}
          factoryData={factoryData}
        />
      )}
    </div>
  );
};

export default AdminUsers;
