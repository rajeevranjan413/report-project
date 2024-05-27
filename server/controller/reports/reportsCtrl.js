const expressAsyncHandler = require("express-async-handler");
const Report = require("../../model/Report/Report");
const cloudinaryUploadImg = require("../../utils/cloudinary");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const { default: mongoose } = require("mongoose");
const temp = require("temp");
require("pdfkit-table");
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
      premise: report.premise ? report.premise : "",
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
    const { date: date, factoryId, topic } = req.query;
    console.log(req.query);
    // If start date and end date are provided, parse them
    if (date) {
      startDate = new Date(date[0]);
      endDate = new Date(date[1]);
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

    // Construct query based on start date, end date, factory ID, and topic
    const query = {
      createdAt: { $gte: startDate, $lte: endDate },
    };

    if (factoryId) {
      query.factory = new mongoose.Types.ObjectId(factoryId); // Assuming factoryId is the field in the Report model
    }

    if (topic) {
      query.topic = topic; // Assuming topic is the field in the Report model
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

const downloadReport = expressAsyncHandler(async (req, res) => {
  try {
    const reports = await Report.find({})
      .populate("createdBy")
      .populate("factory");
    console.log(reports);
    if (reports.length === 0) {
      return res.status(404).send("No reports found");
    }

    // Create a new PDF document with landscape orientation
    const doc = new PDFDocument({
      margin: 30,
      size: "A4",
      layout: "landscape",
    });

    const tempFilePath = temp.path({ suffix: ".pdf" });

    const writeStream = fs.createWriteStream(tempFilePath);
    doc.pipe(writeStream);

    // Add title
    doc.fontSize(18).text("Reports Table", { align: "center" });
    doc.moveDown();

    // Add table headers
    doc.fontSize(12).fillColor("#000000").text("");

    const headers = [
      "Created By",
      "Factory",
      "Area",
      "Topic",
      "Problem",
      "Chemical",
      "Premise",
      "Temperature",
      "Rating",
      "Test",
      "Comment",
    ];

    const columnWidths = [70, 70, 50, 70, 70, 70, 70, 60, 50, 50, 100, 80, 80];

    // Function to draw a table row
    const drawRow = (y, row, isHeader = false) => {
      const rowHeight = 20;
      const cellPadding = 5;
      let x = 30;

      row.forEach((cell, i) => {
        doc.rect(x, y, columnWidths[i], rowHeight).stroke();
        doc
          .fillColor(isHeader ? "#000000" : "#000000")
          .text(cell, x + cellPadding, y + cellPadding, {
            width: columnWidths[i] - cellPadding * 2,
            height: rowHeight - cellPadding * 2,
            align: "left",
            valign: "center",
          });
        x += columnWidths[i];
      });

      return y + rowHeight;
    };

    // Draw header row
    let y = drawRow(doc.y, headers, true);

    // Add report data as table rows
    reports.forEach((report) => {
      const row = [
        report.createdBy?.name || "",
        report.factory?.name || "",
        report.area || "",
        report.topic || "",
        report.problem || "",
        report.chemical || "",
        report.premise || "",
        report.tempature || "",
        report.rating || "",
        report.test || "",
        report.comment || "",
      ];
      y = drawRow(y, row);
    });

    // Finalize the PDF and end the stream
    doc.end();

    // Wait for the PDF to be fully written
    writeStream.on("finish", () => {
      res.download(tempFilePath, "reports.pdf", (err) => {
        if (err) {
          console.error("Error downloading the file", err);
        }
        // Cleanup the temp file
        temp.cleanup((err, stats) => {
          if (err) {
            console.error("Error cleaning up temp files", err);
          }
        });
      });
    });

    writeStream.on("error", (err) => {
      console.error("Error writing the PDF file", err);
      res.status(500).send("Error generating PDF");
    });
  } catch (err) {
    console.error("Error generating PDF", err);
    res.status(500).send("Error generating PDF 123");
  }
});

module.exports = {
  addReportCtrl,
  deleteReportCtrl,
  updateReportCtrl,
  getTodaysReportsCtrl,
  getReportListForAdminCtrl,
  downloadReport,
};
