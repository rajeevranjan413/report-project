const expressAsyncHandler = require("express-async-handler");
const Report = require("../../model/Report/Report");
const cloudinaryUploadImg = require("../../utils/cloudinary");

const { default: mongoose } = require("mongoose");

//-----------------------------------------
// Add Report Ctrl
//-----------------------------------------
const addReportCtrl = expressAsyncHandler(async (req, res) => {
  const { _id, factory } = req.user;
  const { report } = req.body;
  const files = req.files ? req.files : [];
  const photosUrls = [];
  for (const file of files) {
    const { path } = file;
    const url = await cloudinaryUploadImg(path);

    photosUrls.push(url);
  }
  console.log(photosUrls);
  console.log(report);

  try {
    const addedReport = await Report.create({
      createdBy: _id,
      factory: factory,
      area: report.area,
      topic: report.topic,
      problem: report.problem ? report.problem : "",
      chemical: report.chemical ? report.chemical : "",
      premise: report.premis ? report.premis : "",
      tempature: report.tempature ? report.tempature : "",
      rating: report.rating ? report.rating : "",
      test: report.test ? report.test : "",
      comment: report.comment ? report.comment : "",
      photo: photosUrls.length > 0 ? photosUrls : [],
    });
    return res.json({
      message: `Report added Successfully`,
      data: addedReport,
    });
  } catch (err) {
    return res.json({
      message: "Something went wrong while adding the report",
      data: err.message,
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
// Get Today's Report List Ctrl
//-------------------------------

const getTodaysReportsCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;

  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // Query for reports with timestamp between start and end of today
    const todaysReports = await Report.find({
      createdBy: new mongoose.Types.ObjectId(_id),
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

const getReportListForAdminCtrl = expressAsyncHandler(async (req, res) => {
  try {
    let startDate, endDate;
    const {
      startDate: startDateString,
      endDate: endDateString,
      factoryId,
    } = req.query;

    // If start date and end date are provided, parse them
    if (startDateString && endDateString) {
      startDate = new Date(startDateString);
      endDate = new Date(endDateString);
    } else {
      // Default to today's date if start date and end date are not provided
      const today = new Date();
      startDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        0,
        0,
        0,
        0
      );
      endDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        23,
        59,
        59,
        999
      );
    }

    // Construct query based on start date, end date, and factory ID
    const query = {
      createdAt: { $gte: startDate, $lte: endDate },
    };

    if (factoryId) {
      query.factory = factoryId; // Assuming factoryId is the field in the Report model
    }

    // Fetch reports based on the constructed query
    const reports = await Report.find({});

    return res.json({
      message: `Reports fetched successfully`,
      data: reports,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong while fetching reports",
      error: error,
    });
  }
});

module.exports = {
  addReportCtrl,
  deleteReportCtrl,
  updateReportCtrl,
  getTodaysReportsCtrl,
  getReportListForAdminCtrl,
};
