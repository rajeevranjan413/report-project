const express = require("express");
const {
  addFactoryCtrl,
  deleteFactoryCtrl,
  getFactoryListCtrl,
} = require("../../controller/factory/factoryCtrl");
const authMiddleware = require("../../middleware/authMiddleware");

const factoryRoutes = express.Router();
factoryRoutes.post("/addFactory", authMiddleware, addFactoryCtrl);
factoryRoutes.get("/factory-list", authMiddleware, getFactoryListCtrl);
factoryRoutes.delete("/delete-factory/:id", authMiddleware, deleteFactoryCtrl);

module.exports = factoryRoutes;
