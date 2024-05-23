import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FactoryTable from "../../components/admin/FactoryTable";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";

const { Search } = Input;

const AdminTable = ({ openModel, selected, set }) => {
  const [workersData, setWorkersData] = useState([]);
  const [search, setSearch] = useState("");
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const [change, setChange] = useState(false);

  useEffect(() => {
    async function getWorkersList() {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/user/adminList`,
          {
            params: {
              search,
              offset,
              limit,
            },
            withCredentials: true,
          }
        );
        setWorkersData(data.data.users);
      } catch (error) {
        toast.error("Unable to Fetch Users Table");
      }
    }
    getWorkersList();
  }, [search, offset, limit, change, set]);

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8000/api/user/deleteUser/${id}`,
        { withCredentials: true }
      );
      if (data.success) {
        toast.success("User Deleted");
        setSearch(""); // Reset search to refresh the list
        setOffset(0); // Reset offset after deletion
        setChange((i) => !i);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to Delete User");
    }
  };

  const onSearch = (value) => {
    setSearch(value);
    setOffset(0); // Reset offset when searching
  };

  return (
    <div>
      <div className="mb-2">
        <div className="h-16 flex justify-between items-center px-4 bg-white mb-1 font-bold">
          <h5>Admin</h5>
          <Search
            placeholder="Search Factory Name"
            onSearch={onSearch}
            style={{ width: 200 }}
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
              title: "Email",
              dataIndex: "email",
              key: "email",
            },
            {
              title: "Factory",
              render: (item) => <p>{item?.factory ?? "-"}</p>,
            },
            {
              title: "Action",
              render: (item) => (
                <div>
                  <button
                    onClick={() => {
                      openModel(true);
                      selected(item._id);
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
          data={workersData}
          pageSize={3}
        />
      </div>
    </div>
  );
};

export default AdminTable;
