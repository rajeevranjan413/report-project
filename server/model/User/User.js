const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment-timezone");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
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
    firstLogin: {
      type: Boolean,
      default: true,
    },
    language: {
      type: String,
      enum: ["eng", "lit"],
      default: "eng",
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
  const currentTime = moment().tz("Europe/Vilnius");
  if (this.role === "Worker") {
    let loginWindowStart;
    let loginWindowEnd;
    if (currentTime.hour() < 6) {
      loginWindowStart = currentTime
        .clone()
        .set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
      loginWindowEnd = loginWindowStart
        .clone()
        .set({ hour: 6, minute: 0, second: 0, millisecond: 0 });
    } else {
      loginWindowStart = currentTime
        .clone()
        .set({ hour: 18, minute: 0, second: 0, millisecond: 0 });
      loginWindowEnd = loginWindowStart
        .clone()
        .add(1, "days")
        .set({ hour: 6, minute: 0, second: 0, millisecond: 0 });
      console.log(currentTime.hour());
    }

    const isWithinLoginWindow = currentTime.isBetween(
      loginWindowStart,
      loginWindowEnd,
      null,
      "[]"
    );
    if (!isWithinLoginWindow) {
      throw new Error(
        "Login is not allowed at this time. Please try again between 6:00 PM and 6:00 AM Lithuania time."
      );
    }

    const expirationTime = loginWindowEnd.diff(currentTime, "seconds");
    return jwt.sign(
      {
        _id: this._id,
        name: this.name,
        role: this.role,
        factory: this.factory,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: expirationTime }
    );
  } else {
    return jwt.sign(
      {
        _id: this._id,
        name: this.name,
        role: this.role,
        factory: this.factory,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10d" }
    );
  }
};

//Compile schema into model
const User = mongoose.model("User", userSchema);

module.exports = User;
