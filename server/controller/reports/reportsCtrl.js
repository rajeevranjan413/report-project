const expressAsyncHandler = require("express-async-handler");
const Report = require("../../model/Report/Report");
const generateToken = require("../../config/generateToken");
const validateMongodbID = require("../../utils/validateMongodbID");
const cloudinaryUploadImg = require("../../utils/cloudinary");
const fs = require("fs");

//-----------------------------------------
// Add Report Ctrl
//-----------------------------------------
const addReportCtrl = expressAsyncHandler(async (req, res) => {
  const { id: _id, factory } = req.user;
  const { report } = req.body;
  const files = req.files;
  const photosUrls = [];
  for (const file of files) {
    const { path } = file;
    const url = await cloudinaryUploadImg(path);

    photosUrls.push(url);
  }
  console.log(photosUrls);

  try {
    const addedReport = await Report.create({
      createdBy: createdBy,
      factory: factory,
      area: report.area,
      topic: report.topic,
      problem: report.problem,
      chemical: report.chemical,
      premise: report.premis,
      tempature: report.tempature,
      rating: report.rating,
      test: report.test,
      comment: report.comment,
      photo: photosUrls,
    });
    return res.json({
      message: `Report added Successfully`,
      data: addedReport,
    });
  } catch (err) {
    return res.json({
      message: "Something went wrong while adding the report",
      data: err,
    });
  }
});

//-------------------------------
// Delete User Ctrl
//-------------------------------

const deleteReportCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deletedReport = await Report.findByIdAndDelete(id);
    return res.json({
      message: `Report Deleted Successfully`,
      data: deletedReport,
    });
  } catch (error) {
    return res.json({
      message: "Something went wrong while Deleting the report",
      data: error,
    });
  }
});

//-------------------------------
//Update Report Ctrl
//-------------------------------

const updateReportCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { report } = req.body;
  const files = req.files;
  const photosUrls = [];
  for (const file of files) {
    const { path } = file;
    const url = await cloudinaryUploadImg(path);
    photosUrls.push(url);
  }
  console.log(photosUrls);

  try {
    const updatedReport = await Report.findByIdAndUpdate(
      id,
      {
        // Assuming `Report` is your Mongoose model
        area: report?.area,
        topic: report?.topic,
        problem: report?.problem,
        chemical: report?.chemical,
        premise: report?.premis,
        tempature: report?.tempature,
        rating: report?.rating,
        test: report?.test,
        comment: report?.comment,
        $push: { photo: { $each: photosUrls } }, // Adding new photos to the existing ones
      },
      { new: true }
    ); // To return the updated document

    if (!updatedReport) {
      return res.status(404).json({
        message: "Report not found",
      });
    }

    return res.json({
      message: `Report updated successfully`,
      data: updatedReport,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong while updating the report",
      error: err,
    });
  }
});

//-------------------------------
// Get Today Report Ctrl
//-------------------------------

const getTodaysReportsCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // Query for reports with timestamp between start and end of today
    const todaysReports = await Report.find({
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    });

    return res.json({
      message: `Today's reports fetched successfully`,
      data: todaysReports,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong while fetching today's reports",
      error: err,
    });
  }
});

module.exports = {
  addReportCtrl,
  deleteReportCtrl,
  updateReportCtrl,
  getTodaysReportsCtrl,
};
