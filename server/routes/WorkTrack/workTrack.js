const express = require("express");
const authMiddleware = require("../../middleware/authMiddleware");
const { getWtCtrl } = require("../../controller/worktrack/wtCtrl");
const wtRoutes = express.Router();

wtRoutes.get("/get-list", authMiddleware, getWtCtrl);

module.exports = wtRoutes;
