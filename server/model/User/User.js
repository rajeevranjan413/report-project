const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwt = require('jsonwebtoken');
const moment = require('moment-timezone');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    login: {
      type: String,
    },
    logout: {
      type: String,
    },
    factory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Factory",
    },
    role: {
      type: String,
      enum: ["Admin", "User", "Worker", "Manager"],
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//Hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  //hash password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateAccessToken = async function () {
  // Determine current time in Luthemia time zone (replace with your actual time zone)
  const luthemiaTime = moment().tz('Europe/Amsterdam'); // Adjust as needed

  // Define login window start (17:50) and end (next day 6:00) in Luthemia time
  const loginWindowStart = luthemiaTime.clone().set({ hour: 18, minute: 00 });
  const loginWindowEnd = loginWindowStart.clone().add(1, 'days').set({ hour: 6, minute: 01 });

  // Check if current time falls within the login window
  const isWithinLoginWindow = luthemiaTime.isBetween(loginWindowStart, loginWindowEnd, 'minutes', '[]');

  if (!isWithinLoginWindow) {
    throw new Error('Login is not allowed at this time. Please try again between 5:50 PM and 6:00 AM Luthemia time.');
  }

  // Calculate expiration time based on current time (adjust expiration as needed)


  const desiredExpiration = luthemiaTime.clone().set({ hour: 6, minute: 0, second: 0 });
const timeDifference = desiredExpiration.diff(luthemiaTime, 'minutes', true); // Include milliseconds

const expiration = luthemiaTime.add(timeDifference, 'minutes').toDate();

  // Generate and return the JWT
  return jwt.sign({
    _id: this._id,
    name: this.name,
    role: this.role,
    factory: this.factory,
  }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: expiration,
  });
};

//Compile schema into model
const User = mongoose.model("User", userSchema);

module.exports = User;
