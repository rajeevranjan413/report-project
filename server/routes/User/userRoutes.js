const express = require("express");
const {
  createUserCtrl,
  loginUserCtrl,
  checkLoggedCtrl,
  getEmployeeList,
  getManagerList,
  deleteUserCtrl,
  getClientList,
} = require("../../controller/users/usersCtrl");
const authMiddleware = require("../../middleware/authMiddleware");

const userRoutes = express.Router();

userRoutes.post("/createUser", createUserCtrl);
userRoutes.post("/login", loginUserCtrl);
userRoutes.get("/checkLogged", authMiddleware, checkLoggedCtrl);
userRoutes.get("/employeeList", authMiddleware, getEmployeeList);
userRoutes.get("/managerList", authMiddleware, getManagerList);
userRoutes.get("/clientList", authMiddleware, getClientList);
userRoutes.delete("/deleteUser/:id", authMiddleware, deleteUserCtrl);

module.exports = userRoutes;
