const express = require("express");
const {
    addReportCtrl,
    deleteReportCtrl,
    updateReportCtrl,
    getTodaysReportsCtrl,
} = require("../../controller/reports/reportsCtrl");
const authMiddleware = require("../../middleware/authMiddleware");
const { photoUpload } = require("../../middleware/photoUpload");

const reportRoutes = express.Router();
reportRoutes.post(
    "/addReport",
    photoUpload.array("photos"),
    authMiddleware,
    addReportCtrl
);
reportRoutes.delete("/deleteReport/:id", authMiddleware, deleteReportCtrl);
reportRoutes.put("/updateReport/:id", authMiddleware, updateReportCtrl);
reportRoutes.get("/todayReport", authMiddleware, getTodaysReportsCtrl);
module.exports = reportRoutes;