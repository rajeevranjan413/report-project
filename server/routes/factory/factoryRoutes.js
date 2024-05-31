const express = require("express");
const {
  addFactoryCtrl,
  deleteFactoryCtrl,
  getFactoryListCtrl,
  getIndividualFactoryCtrl,
  editFactoryCtrl,
  workersFactoryCtrl,
} = require("../../controller/factory/factoryCtrl");
const authMiddleware = require("../../middleware/authMiddleware");

const factoryRoutes = express.Router();
factoryRoutes.post("/addFactory", authMiddleware, addFactoryCtrl);
factoryRoutes.get("/factory-list", authMiddleware, getFactoryListCtrl);
factoryRoutes.post("/edit-factory/:id", authMiddleware, editFactoryCtrl);
factoryRoutes.get("/details/:id", authMiddleware, getIndividualFactoryCtrl);
factoryRoutes.delete("/delete-factory/:id", authMiddleware, deleteFactoryCtrl);
factoryRoutes.get("/workers-factory", authMiddleware, workersFactoryCtrl);

module.exports = factoryRoutes;
