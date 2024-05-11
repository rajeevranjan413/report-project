const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    factory: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Admin", "Client", "Worker", "Manager"],
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

userSchema.methods.generateAccessToken = function (_id, name, role) {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET || "adj23kja;dlkjf",
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "10d",
    }
  );
};

//Compile schema into model
const User = mongoose.model("User", userSchema);

module.exports = User;
