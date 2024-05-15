const express = require("express");
const {
  createUserCtrl,
  loginUserCtrl,
  checkLoggedCtrl,
  getEmployeeList,
  getManagerList,
  deleteUserCtrl,
<<<<<<< HEAD
  logoutUserCtrl
=======
  getClientList,
>>>>>>> edb062afcc14979b2cc8b95b20f39a2c633261dd
} = require("../../controller/users/usersCtrl");
const authMiddleware = require("../../middleware/authMiddleware");

const userRoutes = express.Router();

userRoutes.post("/createUser", createUserCtrl);
userRoutes.post("/login", loginUserCtrl);
userRoutes.post("/logout", authMiddleware, logoutUserCtrl);
userRoutes.get("/checkLogged", authMiddleware, checkLoggedCtrl);
userRoutes.get("/employeeList", getEmployeeList);
userRoutes.get("/managerList", authMiddleware, getManagerList);
userRoutes.get("/clientList", authMiddleware, getClientList);
userRoutes.delete("/deleteUser/:id", authMiddleware, deleteUserCtrl);

module.exports = userRoutes;
