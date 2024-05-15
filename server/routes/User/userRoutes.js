const express = require("express");
const {
  createUserCtrl,
  loginUserCtrl,
  checkLoggedCtrl,
  getEmployeeList,
  getManagerList,
  deleteUserCtrl,
  logoutUserCtrl
} = require("../../controller/users/usersCtrl");
const authMiddleware = require("../../middleware/authMiddleware");

const userRoutes = express.Router();


userRoutes.post("/createUser", createUserCtrl);
userRoutes.post("/login", loginUserCtrl);
userRoutes.post("/logout", authMiddleware, logoutUserCtrl);
userRoutes.get("/checkLogged", authMiddleware, checkLoggedCtrl);
userRoutes.get("/employeeList", getEmployeeList);
userRoutes.get("/managerList", authMiddleware, getManagerList);
userRoutes.delete("/deleteUser/:id", authMiddleware, deleteUserCtrl);


module.exports = userRoutes;
