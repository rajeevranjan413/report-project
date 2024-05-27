const expressAsyncHandler = require("express-async-handler");
const WorkTrack = require("../../model/WorkTrack/WorkTrack");
const moment = require("moment-timezone");

const getWtCtrl = expressAsyncHandler(async (req, res) => {
  const { date } = req.params;
  try {
    const wtList = await WorkTrack.find({
      dateString: date ?? getFormattedDate(),
    });

    return res.status(200).json({
      message: "Work Track List",
      detail: { wtList },
      success: true,
    });
  } catch (error) {
    console.error("Error fetching Work Track List:", error);
    return res.status(500).json({
      success: false,
      message: "Work Track List Fetch Failed",
      error: "Internal Server Error",
    });
  }
});
function getFormattedDate() {
  const now = moment();
  const hour = now.hour();

  // Check if time is between 00:00 and 6:00
  if (hour >= 0 && hour < 6) {
    // Use subtract to get the previous day's date
    return now.subtract(1, "days").format("DD-MM-YYYY");
  } else {
    // Use current date
    return now.format("DD-MM-YYYY");
  }
}

module.exports = { getWtCtrl };
