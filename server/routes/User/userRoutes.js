const express = require("express");
const {
  createUserCtrl,
  loginUserCtrl,
  checkLoggedCtrl,
  getEmployeeList,
  getManagerList,
  deleteUserCtrl,
  logoutUserCtrl,
  getClientList,
  getAdminList,
  userDetailsCtrl,
  userEditCtrl,
  changePassword,
} = require("../../controller/users/usersCtrl");
const authMiddleware = require("../../middleware/authMiddleware");

const userRoutes = express.Router();

userRoutes.post("/createUser", authMiddleware, createUserCtrl);
userRoutes.post("/login", loginUserCtrl);
userRoutes.get("/logout", authMiddleware, logoutUserCtrl);
userRoutes.get("/checkLogged", authMiddleware, checkLoggedCtrl);
userRoutes.get("/employeeList", authMiddleware, getEmployeeList);
userRoutes.get("/managerList", authMiddleware, getManagerList);
userRoutes.get("/adminList", authMiddleware, getAdminList);
userRoutes.get("/clientList", authMiddleware, getClientList);
userRoutes.get("/details/:id", authMiddleware, userDetailsCtrl);
userRoutes.delete("/deleteUser/:id", authMiddleware, deleteUserCtrl);
userRoutes.post("/editUser/:id", authMiddleware, userEditCtrl);
userRoutes.post("/edit-password", authMiddleware, changePassword);

module.exports = userRoutes;
