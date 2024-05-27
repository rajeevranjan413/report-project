const mongoose = require("mongoose");


const workTrackSchema = new mongoose.Schema(
  {
    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Worker",
    },
    checkedIn: {
      type: String,
      required: true,
    },
    checkedOut: {
      type: String,
      required: true,
    },
    factory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Factory",
    },

  },
  { timestamps: true }
);

//Compile schema into model
const WorkTrack = mongoose.model("WorkTrack", workTrackSchema);

module.exports = WorkTrack;
