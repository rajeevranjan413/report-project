const expressAsyncHandler = require("express-async-handler");
const moment = require("moment-timezone");
const WorkTrack = require("../model/WorkTrack/WorkTrack");
const getCurrentTimeInLithuania = require("../utils/getCurrentTimeInLithunia");

const workTrackMiddleware = expressAsyncHandler(async (req, res, next) => {
  try {
    const { id } = req.user;

    const currentTime = getCurrentTimeInLithuania();
    console.log(currentTime);
    await WorkTrack.findOneAndUpdate(
      {
        worker: id,
        dateString: getFormattedDate(),
      },
      { checkedOut: currentTime }
    );
    next();
  } catch (error) {
    console.log(error);
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

module.exports = workTrackMiddleware;
