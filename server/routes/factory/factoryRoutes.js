const express = require("express");
const {
    addFactoryCtrl,

} = require("../../controller/factory/factoryCtrl");
const authMiddleware = require("../../middleware/authMiddleware");


const factoryRoutes = express.Router();
factoryRoutes.post("/addFactory", authMiddleware, addFactoryCtrl);

module.exports = factoryRoutes;
