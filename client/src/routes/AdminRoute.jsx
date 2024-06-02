import { useEffect, useState } from "react";
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { TbReportSearch } from "react-icons/tb";
import { HiOutlineUsers, HiHome } from "react-icons/hi2";
import { HiOutlineLogout, HiClipboardList } from "react-icons/hi";
import { Button, Modal } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { switchLanguageAction } from "../../redux/slices/systemSlices";
import { MenuOutlined, SwapOutlined } from "@ant-design/icons";

const translations = {
  eng: {
    dashboard: "Dashboard",
    reports: "Reports",
    users: "Users",
    factory: "Factory",
    workReport: "Work Report",
    switchToLithuanian: "Switch to Lithuanian",
    switchToEnglish: "Switch to English",
    logout: "Logout",
    logoutText: "Are you sure you want to logout?",
    logoutConform: "Confirm Logout",
    cancel: "Cancel",
  },
  lit: {
    dashboard: "Valdymo skydelis",
    reports: "Ataskaitos",
    users: "Vartotojai",
    factory: "Gamykla",
    workReport: "Darbo ataskaita",
    switchToLithuanian: "Perjungti į lietuvių kalbą",
    switchToEnglish: "Perjungti į anglų kalbą",
    logout: "Atsijungti",
    logoutText: "Ar tikrai norite atsijungti?",
    logoutConform: "Patvirtinti atsijungimą",
    cancel: "Atšaukti",
  },
};

const AdminRoute = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userAuth } = useSelector((store) => store?.system);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [language, setLanguage] = useState("eng");
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    setLanguage(userAuth?.language);
  }, [userAuth]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setIsModalVisible(false);
    const { data } = await axios.get("http://localhost:8000/api/user/logout", {
      withCredentials: true,
    });
    if (data.message === "User logged Out") {
      localStorage.removeItem("userInfo");
      navigate("/");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleLanguageSwitch = async () => {
    const newLanguage = language === "eng" ? "lit" : "eng";
    setLanguage(newLanguage);
    dispatch(switchLanguageAction(newLanguage));
  };

  const currentText = translations[language];

  const users = useLocation().pathname.includes("/admin/users");
  const reports = useLocation().pathname.includes("/admin/reports");
  const factory = useLocation().pathname.includes("/admin/factory");
  const wt = useLocation().pathname.includes("/admin/work-report");

  if (userAuth?.role !== "Admin") {
    return <Navigate to="/login" />;
  }

  return (
    <main className="grid grid-cols-1 md:grid-cols-6 bg-[rgb(247,247,247)] h-screen">
      {/* Sidebar for large screens */}
      <aside className="relative w-full bg-white p-4 overflow-hidden hidden md:flex flex-col shadow-lg">
        <img
          src="/LOGO_.png"
          alt="Company Logo"
          className="w-24 mb-6 mx-auto"
        />
        <nav className="my-8 mx-4">
          <h5 className="opacity-80 my-4">{currentText.dashboard}</h5>
          <ul className="flex flex-col gap-2">
            <li
              className={`${
                reports ? "bg-[#1976d2] text-white" : ""
              } py-2 px-4 rounded-lg flex items-center gap-2 transition-colors duration-200`}
            >
              <TbReportSearch />
              <Link to={"/admin/reports"} className="w-full">
                {currentText.reports}
              </Link>
            </li>
            <li
              className={`${
                users ? "bg-[#1976d2] text-white" : ""
              } py-2 px-4 rounded-lg flex items-center gap-2 transition-colors duration-200`}
            >
              <HiOutlineUsers />
              <Link to={"/admin/users"} className="w-full">
                {currentText.users}
              </Link>
            </li>
            <li
              className={`${
                factory ? "bg-[#1976d2] text-white" : ""
              } py-2 px-4 rounded-lg flex items-center gap-2 transition-colors duration-200`}
            >
              <HiHome />
              <Link to={"/admin/factory"} className="w-full">
                {currentText.factory}
              </Link>
            </li>
            <li
              className={`${
                wt ? "bg-[#1976d2] text-white" : ""
              } py-2 px-4 rounded-lg flex items-center gap-2 transition-colors duration-200`}
            >
              <HiClipboardList />
              <Link to={"/admin/work-report"} className="w-full">
                {currentText.workReport}
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex flex-col gap-4 absolute bottom-4 left-4">
          <Button onClick={handleLanguageSwitch} type="primary">
            {language === "eng"
              ? currentText.switchToLithuanian
              : currentText.switchToEnglish}
          </Button>
          <Button
            onClick={showModal}
            style={{ display: "flex", alignItems: "center", gap: "4px" }}
            type="primary"
          >
            <HiOutlineLogout /> {currentText.logout}
          </Button>
        </div>
      </aside>

      {/* Navbar for small screens */}
      <nav className="md:hidden bg-white p-4 flex justify-between items-center shadow-lg fixed top-0 left-0 w-full z-50">
        <div className="flex items-center gap-2">
          <Button
            icon={<MenuOutlined />}
            onClick={() => setMenuVisible(!menuVisible)}
          />
          <img src="/LOGO_.png" alt="Company Logo" className="w-12" />
        </div>
        <div className="flex gap-2">
          <Button
            icon={<SwapOutlined />}
            onClick={handleLanguageSwitch}
            className="p-2 flex items-center gap-2 transition-colors duration-200"
            type="primary"
          />
          <Button
            onClick={showModal}
            className="p-2 flex items-center gap-2 transition-colors duration-200"
            type="primary"
          >
            <HiOutlineLogout />
            <span className="hidden sm:inline">{currentText.logout}</span>
          </Button>
        </div>
      </nav>

      {/* Sidebar for small screens */}
      {menuVisible && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex md:hidden">
          <div className="w-64 bg-white shadow-lg flex flex-col">
            <div className="p-4 flex justify-between items-center">
              <img src="/LOGO_.png" alt="Company Logo" className="w-24 mb-6" />
              <Button
                icon={<MenuOutlined />}
                onClick={() => setMenuVisible(false)}
              />
            </div>
            <nav className="my-8 mx-4">
              <h5 className="opacity-80 my-4">{currentText.dashboard}</h5>
              <ul className="flex flex-col gap-2">
                <li
                  className={`${
                    reports ? "bg-[#1976d2] text-white" : ""
                  } py-2 px-4 rounded-lg flex items-center gap-2 transition-colors duration-200`}
                >
                  <TbReportSearch />
                  <Link to={"/admin/reports"} className="w-full">
                    {currentText.reports}
                  </Link>
                </li>
                <li
                  className={`${
                    users ? "bg-[#1976d2] text-white" : ""
                  } py-2 px-4 rounded-lg flex items-center gap-2 transition-colors duration-200`}
                >
                  <HiOutlineUsers />
                  <Link to={"/admin/users"} className="w-full">
                    {currentText.users}
                  </Link>
                </li>
                <li
                  className={`${
                    factory ? "bg-[#1976d2] text-white" : ""
                  } py-2 px-4 rounded-lg flex items-center gap-2 transition-colors duration-200`}
                >
                  <HiHome />
                  <Link to={"/admin/factory"} className="w-full">
                    {currentText.factory}
                  </Link>
                </li>
                <li
                  className={`${
                    wt ? "bg-[#1976d2] text-white" : ""
                  } py-2 px-4 rounded-lg flex items-center gap-2 transition-colors duration-200`}
                >
                  <HiClipboardList />
                  <Link to={"/admin/work-report"} className="w-full">
                    {currentText.workReport}
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="flex flex-col gap-4 p-4">
              <Button onClick={handleLanguageSwitch} type="primary">
                {language === "eng"
                  ? currentText.switchToLithuanian
                  : currentText.switchToEnglish}
              </Button>
              <Button
                onClick={showModal}
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
                type="primary"
              >
                <HiOutlineLogout /> {currentText.logout}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="col-span-5 overflow-auto p-4 mt-16 md:mt-0">
        <Outlet />
      </div>

      {/* Logout Confirmation Modal */}
      <Modal
        title={currentText.logoutConform}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={currentText.logout}
        cancelText={currentText.cancel}
      >
        <p>{currentText.logoutText}</p>
      </Modal>
    </main>
  );
};

export default AdminRoute;
