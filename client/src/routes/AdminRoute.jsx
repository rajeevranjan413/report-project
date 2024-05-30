import { useEffect, useState } from "react";
import { Link, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { TbReportSearch } from "react-icons/tb";
import { HiOutlineUsers, HiHome } from "react-icons/hi2";
import { HiOutlineLogout, HiClipboardList } from "react-icons/hi";
import { Button, Modal } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { switchLanguageAction } from "../../redux/slices/systemSlices";

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
    logoutText:"Are you sure you want to logout?",
    logoutConform:"Conform Logout",
    cancel:"cancel"

  },
  lit: {
    dashboard: "Valdymo skydelis", // Lithuanian translation for Dashboard
    reports: "Ataskaitos",
    users: "Vartotojai",
    factory: "Gamykla",
    workReport: "Darbo ataskaita",
    switchToLithuanian: "Perjungti į lietuvių kalbą",
    switchToEnglish: "Perjungti į anglų kalbą",
    logout: "Atsijungti",
    logoutText:"Ar tikrai norite atsijungti?",
    logoutConform:"Atitikti atsijungimą",
    cancel:"atšaukti"
  },
};

const AdminRoute = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userAuth } = useSelector((store) => store?.system);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [language, setLanguage] = useState("eng");
  
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
  if (userAuth?.role !== 'Admin') {
    return <Navigate to="/login" />;
  }
  return (
    <main className="grid gap-2 md:grid-cols-6 grid-cols-1 bg-[rgb(247,247,247)] h-screen">
      {/* Sidebar for large screens */}
      <aside className="relative w-full bg-white p-4 overflow-hidden hidden md:flex flex-col shadow-lg">
        <h2 className="text-2xl font-bold">Logo</h2>
        <div className="my-8 mx-4">
          <h5 className="opacity-80 my-4">{currentText.dashboard}</h5>
          <ul className="flex flex-col gap-2">
            <li
              className={`${reports ? "bg-[#1976d2] text-white" : ""}
              py-2
              px-4
              rounded-lg
              flex
              items-center
              gap-2
              transition-colors
              duration-200`}
            >
              <TbReportSearch />
              <Link to={"/admin/reports"} className="w-full">
                {currentText.reports}
              </Link>
            </li>
            <li
              className={`${users ? "bg-[#1976d2] text-white" : ""}
              py-2
              px-4
              rounded-lg
              flex
              items-center
              gap-2
              transition-colors
              duration-200`}
            >
              <HiOutlineUsers />
              <Link to={"/admin/users"} className="w-full">
                {currentText.users}
              </Link>
            </li>
            <li
              className={`${factory ? "bg-[#1976d2] text-white" : ""}
              py-2
              px-4
              rounded-lg
              flex
              items-center
              gap-2
              transition-colors
              duration-200`}
            >
              <HiHome />
              <Link to={"/admin/factory"} className="w-full">
                {currentText.factory}
              </Link>
            </li>
            <li
              className={`${wt ? "bg-[#1976d2] text-white" : ""}
              py-2
              px-4
              rounded-lg
              flex
              items-center
              gap-2
              transition-colors
              duration-200`}
            >
              <HiClipboardList />
              <Link to={"/admin/work-report"} className="w-full">
                {currentText.workReport}
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4 absolute bottom-4 left-4">
          <Button onClick={handleLanguageSwitch} type="primary">
            {language === "eng" ? currentText.switchToLithuanian : currentText.switchToEnglish}
          </Button>
          <Button onClick={showModal} style={{ display: "flex", alignItems: "center", gap: "4px" }} type="primary">
            <HiOutlineLogout /> {currentText.logout}
          </Button>
        </div>
      </aside>
      {/* Navbar for small screens */}
  {/* Navbar for small screens */}
  <nav className="md:hidden bg-white p-4 flex justify-between items-center shadow-lg fixed bottom-0 left-0 w-full z-50">
        <Link
          to={"/admin/reports"}
          className={`${
            reports ? "bg-[#1976d2] text-white" : ""
          } p-2 rounded-lg flex items-center gap-2 transition-colors duration-200 w-full justify-center`}
        >
          <TbReportSearch />
          <span className="hidden sm:inline">Reports</span>
        </Link>
        <Link
          to={"/admin/users"}
          className={`${
            users ? "bg-[#1976d2] text-white" : ""
          } p-2 rounded-lg flex items-center gap-2 transition-colors duration-200 w-full justify-center`}
        >
          <HiOutlineUsers />
          <span className="hidden sm:inline">Users</span>
        </Link>
        <Link
          to={"/admin/factory"}
          className={`${
            factory ? "bg-[#1976d2] text-white" : ""
          } p-2 rounded-lg flex items-center gap-2 transition-colors duration-200 w-full justify-center`}
        >
          <HiHome />
          <span className="hidden sm:inline">Factory</span>
        </Link>
        <Link
          to={"/admin/work-report"}
          className={`${
            wt ? "bg-[#1976d2] text-white" : ""
          } p-2 rounded-lg flex items-center gap-2 transition-colors duration-200 w-full justify-center`}
        >
          <HiClipboardList />
          <span className="hidden sm:inline">In-Out</span>
        </Link>
        <Button
          onClick={showModal}
          className="p-2 flex items-center gap-2 w-full justify-center"
          type="primary"
        >
          <HiOutlineLogout />
          <span className="hidden sm:inline">LgOut</span>
        </Button>
      </nav>

      {/* Main content */}
      <div className="col-span-5 overflow-auto p-4">
        <Outlet />
      </div>

      {/* Logout Confirmation Modal */}
      <Modal title={currentText.logoutConform} open={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText={currentText.logout} cancelText={currentText.cancel}>
        <p>{currentText.logoutText}</p>
      </Modal>
    </main>
  );
};

export default AdminRoute;