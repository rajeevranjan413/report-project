const expressAsyncHandler = require("express-async-handler");
const Report = require("../../model/Report/Report");
const cloudinaryUploadImg = require("../../utils/cloudinary");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const moment = require("moment-timezone");

const { default: mongoose } = require("mongoose");
const temp = require("temp");
const getCurrentTimeInLithuania = require("../../utils/getCurrentTimeInLithunia");
const WorkTrack = require("../../model/WorkTrack/WorkTrack");
require("pdfkit-table");
//-----------------------------------------
// Add Report Ctrl
//-----------------------------------------
const addReportCtrl = expressAsyncHandler(async (req, res) => {
  const { _id, factory, role } = req.user;
  console.log("Hello From File", req.files, req.files);
  const files = req.files ? req.files : [];
  const photosUrls = [];

  for (const file of files) {
    const { path } = file;
    const url = await cloudinaryUploadImg(path);
    console.log(url.url);
    photosUrls.push(url.url);
  }

  console.log("Hello from Image", photosUrls);
  console.log("Hello From req.body", req.body);

  // Assuming req.body contains the 'report' object directly
  const report = JSON.parse(req.body.report);

  console.log("Parsed Report", report);

  try {
    const addedReport = await Report.create({
      createdBy: _id,
      factory: factory,
      area: report.area,
      topic: report.topic,
      chemical: report.chemical || "",
      premise: report.premise || "",
      tempature: report.tempature || "",
      rating: report.rating || "",
      test: report.test || "",
      comment: report.comment || "",
      photo: photosUrls.length > 0 ? photosUrls : [],
    });
    if (role == "Worker") {
      const currentTime = getCurrentTimeInLithuania();
      console.log(currentTime);
      await WorkTrack.findOneAndUpdate(
        {
          worker: _id,
          dateString: getFormattedDate(),
        },
        { checkedOut: currentTime }
      );
    }
    return res.json({
      message: `Report added Successfully`,
      data: addedReport,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      message: "Something went wrong while adding the report",
      data: err.message,
    });
  }
});
function getFormattedDate() {
  const now = moment();
  const hour = now.hour();

  // Check if time is between 00:00 and 6:00
  if (hour >= 0 && hour < 6) {
    // Use subtract to get the previous day's date
    return now.subtract(1, "days").format("YYYY-MM-DD");
  } else {
    // Use current date
    return now.format("YYYY-MM-DD");
  }
}
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

const individualReportCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deletedReport = await Report.findById(id).populate("factory");
    return res.json({
      success: true,
      message: `Report Fetch Successfully`,
      report: deletedReport,
    });
  } catch (error) {
    return res.json({
      success: false,
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

//------------------------------
//  Update Report Image
//------------------------------

const uploadImages = expressAsyncHandler(async (req, res) => {
  console.log("hello");
  try {
    const reportId = req.params.id;
    const report = await Report.findById(reportId);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    const files = req.files;
    const photosUrls = [];

    for (const file of files) {
      const { path } = file;
      const url = await cloudinaryUploadImg(path);
      photosUrls.push(url.url);
    }

    report.photo.push(...photosUrls);
    await report.save();

    res.status(200).json({ message: "Images uploaded successfully", report });
  } catch (error) {
    console.error("Failed to upload images", error);
    res.status(500).json({ message: "Failed to upload images", error });
  }
});

//-------------------------------
// Get Today's Report List Ctrl
//-------------------------------

const getTodaysReportsCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const currentTime = moment().tz("Europe/Vilnius");

    let startOfDay, endOfDay;

    if (currentTime.hour() >= 18) {
      // If current time is between 18:00 and 23:59:59
      startOfDay = currentTime
        .clone()
        .set({ hour: 21, minute: 0, second: 0, millisecond: 0 });
      endOfDay = currentTime
        .clone()
        .add(1, "day")
        .set({ hour: 9, minute: 0, second: 0, millisecond: 0 });
    } else if (currentTime.hour() <= 6) {
      // If current time is between 00:00 and 6:00
      startOfDay = currentTime
        .clone()
        .subtract(1, "day")
        .set({ hour: 21, minute: 0, second: 0, millisecond: 0 });
      endOfDay = currentTime
        .clone()
        .set({ hour: 9, minute: 0, second: 0, millisecond: 0 });
    } else {
      // If current time is between 6:01 and 17:59:59, use today's range from 21:00 to 09:00 next day
      startOfDay = currentTime
        .clone()
        .subtract(1, "day")
        .set({ hour: 21, minute: 0, second: 0, millisecond: 0 });
      endOfDay = currentTime
        .clone()
        .set({ hour: 9, minute: 0, second: 0, millisecond: 0 });
    }

    // Query for reports with timestamp between start and end of the specified time range
    const todaysReports = await Report.find({
      createdBy: new mongoose.Types.ObjectId(_id),
      createdAt: { $gte: startOfDay.toDate(), $lte: endOfDay.toDate() },
    });

    return res.json({
      message: `Today's reports fetched successfully`,
      data: todaysReports,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something went wrong while fetching today's reports",
      error: err,
    });
  }
});

const getReportListForAdminCtrl = expressAsyncHandler(async (req, res) => {
  function areDatesEqual(date1, date2) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  try {
    let startDate, endDate;
    const { date, factory, topic } = req.query;
    const currentTime = moment().tz("Europe/Vilnius");

    if (date) {
      startDate = moment(date[0]).tz("Europe/Vilnius");
      endDate = moment(date[1]).tz("Europe/Vilnius");

      if (areDatesEqual(startDate.toDate(), endDate.toDate())) {
        console.log("helllo equal dates");
        startDate.set({ hour: 21, minute: 0, second: 0, millisecond: 0 });
        endDate = startDate
          .clone()
          .add(1, "day")
          .set({ hour: 9, minute: 0, second: 0, millisecond: 0 });
      }
    } else {
      if (currentTime.hour() >= 18) {
        startDate = currentTime
          .clone()
          .set({ hour: 21, minute: 0, second: 0, millisecond: 0 });
        endDate = currentTime
          .clone()
          .add(1, "day")
          .set({ hour: 9, minute: 0, second: 0, millisecond: 0 });
      } else if (currentTime.hour() <= 6) {
        startDate = currentTime
          .clone()
          .subtract(1, "day")
          .set({ hour: 21, minute: 0, second: 0, millisecond: 0 });
        endDate = currentTime
          .clone()
          .set({ hour: 9, minute: 0, second: 0, millisecond: 0 });
      } else {
        startDate = currentTime
          .clone()
          .subtract(1, "day")
          .set({ hour: 21, minute: 0, second: 0, millisecond: 0 });
        endDate = currentTime
          .clone()
          .set({ hour: 9, minute: 0, second: 0, millisecond: 0 });
      }
    }

    // Construct query based on start date, end date, factory ID, and topic
    const query = {
      createdAt: { $gte: startDate.toDate(), $lte: endDate.toDate() },
    };

    if (factory) {
      query.factory = new mongoose.Types.ObjectId(factory); // Assuming factoryId is the field in the Report model
    }

    if (topic) {
      query.topic = topic; // Assuming topic is the field in the Report model
    }

    // Fetch reports based on the constructed query
    const reports = await Report.find(query).populate({
      path: "createdBy",
      select: "name",
    });

    return res.json({
      message: "Reports fetched successfully",
      data: reports,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong while fetching reports",
      error: error.message,
    });
  }
});

const downloadReport = expressAsyncHandler(async (req, res) => {
  try {
    let startDate, endDate;
    const { date, factory, topic } = req.query;
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

    if (factory) {
      query.factory = new mongoose.Types.ObjectId(factory); // Assuming factoryId is the field in the Report model
    }

    if (topic) {
      query.topic = topic; // Assuming topic is the field in the Report model
    }

    // Fetch reports based on the constructed query
    const reports = await Report.find(query)
      .populate("factory")
      .populate("createdBy");
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

    // Add title with factory name
    const factoryName = factory
      ? reports[0].factory?.name || "Factory"
      : "All factories";
    doc
      .fontSize(18)
      .text(`Reports Table - ${factoryName}`, { align: "center" });
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

    const columnWidths = [70, 70, 50, 70, 70, 70, 70, 60, 50, 50, 100];

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
      if (y + 20 > doc.page.height - 30) {
        doc.addPage();
        y = drawRow(doc.y, headers, true);
      }
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
    res.status(500).send("Error generating PDF");
  }
});

const deleteImage = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { imageIndex } = req.body;

  const report = await Report.findById(id);
  if (!report) {
    res.status(404);
    throw new Error("Report not found");
  }

  if (imageIndex < 0 || imageIndex >= report.photo.length) {
    res.status(400);
    throw new Error("Invalid image index");
  }

  report.photo.splice(imageIndex, 1);
  await report.save();

  res.status(200).json({ message: "Image deleted successfully", report });
});

module.exports = {
  addReportCtrl,
  deleteReportCtrl,
  updateReportCtrl,
  getTodaysReportsCtrl,
  getReportListForAdminCtrl,
  downloadReport,
  individualReportCtrl,
  uploadImages,
  deleteImage,
};
