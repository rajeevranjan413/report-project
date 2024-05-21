import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { TbReportSearch } from "react-icons/tb";
import { HiOutlineUsers, HiHome } from "react-icons/hi2";
import { Button } from "antd";
import axios from "axios";

const AdminRoute = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const { data } = await axios.get("http://localhost:8000/api/user/logout", {
      withCredentials: true,
    });
    if (data.message === "User logged Out") {
      navigate("/");
    }
  };
  const users = useLocation().pathname.includes("/admin/users");
  const reports = useLocation().pathname.includes("/admin/reports");
  const factory = useLocation().pathname.includes("/admin/factory");
  console.log(users);
  return (
    <main className="grid gap-2 grid-cols-6 bg-[rgb(247,247,247) h-screen">
      <aside className="relative w-full bg-white p-4 overflow-hidden ">
        <h2>Logo.</h2>
        <div className="my-8 mx-4">
          <h5 className=" opacity-80 my-4">DASHBOARD</h5>
          <ul className=" flex flex-col gap-2">
            <li
              className={`${
                reports ? "bg-[#1976d2] text-white" : ""
              } py-2 px-4 rounded-lg flex items-center gap-2`}
            >
              <TbReportSearch />
              <Link to={"/admin/reports"}>Reports</Link>
            </li>
            <li
              className={`${
                users ? "bg-[#1976d2] text-white" : ""
              } py-2 px-4 rounded-lg flex items-center gap-2`}
            >
              <HiOutlineUsers />
              <Link to={"/admin/users"}>Users</Link>
            </li>
            <li
              className={`${
                factory ? "bg-[#1976d2] text-white" : ""
              } py-2 px-4 rounded-lg flex items-center gap-2`}
            >
              <HiHome />
              <Link to={"/admin/factory"}>Factory</Link>
            </li>
          </ul>
        </div>
        <div className=" left-[30%] absolute bottom-4">
          <Button
            onClick={handleLogout}
            style={{ display: "flex", alignItems: "center", gap: "4px" }}
            type="primary"
          >
            Logout
          </Button>
        </div>
      </aside>

      {/* <div className=' w-full bg-white p-4 overflow-hidden'>
                <DashboardMenu />
            </div> */}

      <div className="col-span-5 overflow-scroll">
        <Outlet />
      </div>
    </main>
  );
};

export default AdminRoute;

const Li = () => {
  return (
    <li>
      <TbReportSearch />
      report
    </li>
  );
};
