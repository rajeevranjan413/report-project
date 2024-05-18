const express = require("express");
const {
  addReportCtrl,
  deleteReportCtrl,
  updateReportCtrl,
  getTodaysReportsCtrl,
  getReportListForAdminCtrl,
  downloadReport,
} = require("../../controller/reports/reportsCtrl");
const authMiddleware = require("../../middleware/authMiddleware");
const { photoUpload } = require("../../middleware/photoUpload");

const reportRoutes = express.Router();
reportRoutes.post(
  "/addReport",
  authMiddleware,
  photoUpload.array("photos"),
  addReportCtrl
);
reportRoutes.delete("/deleteReport/:id", authMiddleware, deleteReportCtrl);
reportRoutes.put("/updateReport/:id", authMiddleware, updateReportCtrl);
reportRoutes.get("/todayReport", authMiddleware, getTodaysReportsCtrl);
reportRoutes.get("/allReport", authMiddleware, getReportListForAdminCtrl);
reportRoutes.get("/generate-pdf", authMiddleware, downloadReport);

module.exports = reportRoutes;
