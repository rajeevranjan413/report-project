const express = require("express");
const {
  addReportCtrl,
  deleteReportCtrl,
  updateReportCtrl,
  getTodaysReportsCtrl,
  getReportListForAdminCtrl,
  downloadReport,
  individualReportCtrl,
  uploadImages,
  deleteImage,
} = require("../../controller/reports/reportsCtrl");
const authMiddleware = require("../../middleware/authMiddleware");
const { photoUpload } = require("../../middleware/photoUpload");
const workTrackMiddleware = require("../../middleware/workTrackMiddleware");

const reportRoutes = express.Router();
reportRoutes.post(
  "/addReport",
  authMiddleware,
  workTrackMiddleware,
  photoUpload.array("photos"),
  addReportCtrl
);
reportRoutes.get(
  "/individual-report/:id",
  authMiddleware,
  individualReportCtrl
);
reportRoutes.delete("/deleteReport/:id", authMiddleware, deleteReportCtrl);
reportRoutes.put("/updateReport/:id", authMiddleware, updateReportCtrl);
reportRoutes.get("/todayReport", authMiddleware, getTodaysReportsCtrl);
reportRoutes.get("/allReport", authMiddleware, getReportListForAdminCtrl);
reportRoutes.get("/generate-pdf", downloadReport);
reportRoutes.post(
  "/uploadImages/:id",
  photoUpload.array("photos", 10),
  uploadImages
);
reportRoutes.delete("/deleteImage/:id", deleteImage);
module.exports = reportRoutes;
