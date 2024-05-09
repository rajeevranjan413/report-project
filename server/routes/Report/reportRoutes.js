const express = require("express");
const {
    addReportCtrl,

} = require("../../controller/reports/reportsCtrl");
const authMiddleware = require("../../middleware/authMiddleware");
const { photoUpload } = require("../../middleware/photoUpload");

const reportRoutes = express.Router();
reportRoutes.post("/addReport", photoUpload.array('photos'), authMiddleware, addReportCtrl);
reportRoutes.delete("/deleteReport/:id", authMiddleware);
reportRoutes.put("/updateReport/:id", authMiddleware);
reportRoutes.get("/todayReport", authMiddleware);
module.exports = reportRoutes;
