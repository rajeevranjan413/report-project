const express = require("express");
const {
  addReportCtrl,
  deleteReportCtrl,
  updateReportCtrl,
  getTodaysReportsCtrl,
  getReportListForAdminCtrl,
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
reportRoutes.get("/allReport", authMiddleware, getReportListForAdminCtrl);

module.exports = reportRoutes;
