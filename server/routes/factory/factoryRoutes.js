const express = require("express");
const {
    addFactoryCtrl,

} = require("../../controller/reports/reportsCtrl");
const authMiddleware = require("../../middleware/authMiddleware");
// const { photoUpload } = require("../../middleware/photoUpload");

const reportRoutes = express.Router();
reportRoutes.post("/addFactory", addFactoryCtrl);
// reportRoutes.delete("/deleteReport/:id", authMiddleware);
// reportRoutes.put("/updateReport/:id", authMiddleware);
// reportRoutes.get("/todayReport", authMiddleware);
module.exports = reportRoutes;
