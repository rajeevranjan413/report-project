const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const reportSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    factory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Factory",
    },
    area: {
      type: String,
    },

    topic: {
      type: String,
      enum: ["Before Work", "After Work", "Complain", "Chemical Applied"],
      required: true,
    },
    problem: {
      type: String,
      enum: ["Water", "Hose", "Covering Up", "Another", ""],
    },

    chemical: {
      type: String,
      enum: ["Acid", "Alkaline", "Water", ""],
    },
    premise: {
      type: String,
    },
    tempature: {
      type: String,
    },
    rating: {
      type: String,
      enum: [20, 30, 40, 50, 60, 70, 80, 90, 100, ""],
    },
    test: {
      type: String,
    },

    comment: {
      type: String,
    },
    photo: { type: [String], required: true },
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
