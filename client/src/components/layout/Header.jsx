import { Link, useNavigate } from "react-router-dom";
import { AntDesignOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";
import axios from "axios";
import { useState } from "react";
import { switchLanguageAction } from "../../../redux/slices/systemSlices";
import { useDispatch } from "react-redux";
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
    logoutConform: "Conform Logout",
    cancel: "cancel",
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
    logoutText: "Ar tikrai norite atsijungti?",
    logoutConform: "Atitikti atsijungimą",
    cancel: "atšaukti",
  },
};

const Header = ({ lang }) => {
  const [language, setLanguage] = useState(lang);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    const { data } = await axios.get("http://localhost:8000/api/user/logout", {
      withCredentials: true,
    });
    if (data.message === "User logged Out") {
      navigate("/");
    }
  };
  const handleLanguageSwitch = async () => {
    const newLanguage = language === "eng" ? "lit" : "eng";
    setLanguage(newLanguage);
    dispatch(switchLanguageAction(newLanguage));
  };
  const currentText = translations[language];

  return (
    <div className="h-[80px] flex items-center justify-between font-bold text-xl px-4 bg-white">
      <Link to="/">
        <h1>Logo</h1>
      </Link>

      <div className="flex items-center gap-4">
        <Button onClick={handleLanguageSwitch} type="primary">
          {language === "eng"
            ? currentText.switchToLithuanian
            : currentText.switchToEnglish}
        </Button>
        <Button
          onClick={handleLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            backgroundColor: "grey  ",
          }}
          type="primary"
        >
          {currentText.logout}
        </Button>
      </div>
    </div>
  );
};

export default Header;
