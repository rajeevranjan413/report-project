const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/User/User");
// const generateToken = require("../../config/generateToken");
const validateMongodbID = require("../../utils/validateMongodbID");
const cloudinaryUploadImg = require("../../utils/cloudinary");
const fs = require("fs");

//-----------------------------------------
// create User
//-----------------------------------------
const createUserCtrl = expressAsyncHandler(async (req, res) => {
  const { name, email, factoryName, password, role } = req.body

  console.log(email)

  const userExist = await User.findOne({ email: email });

  if (userExist) {
    throw new Error("User already exist ");
  }
  try {
    const createdUser = await User.create({
      name: name,
      factoryName: factoryName,
      email: email,
      password: password,
      role: role,
    });
    return res.json({ message: `User Created Successfully`, data: createdUser });
  }
  catch (err) {
    return res.json({ message: "Something went wrong while registering the user", data: err })
  }
});

//-------------------------------
//Login user
//-------------------------------

const loginUserCtrl = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // if (!username && !email) {
  //   return res.json({ message: "username or email is required" })
  // }
  //check if user exists
  const userFound = await User.findOne({ email });

  if (!userFound) {
    return res.json({ message: "user not found" })
  }

  const isPasswordValid = await userFound.isPasswordMatched(password)

  if (!isPasswordValid) {
    return res.json({ message: "Invalid Credentials" })
  }

  const accessToken = userFound.generateAccessToken(userFound._id, userFound.name, userFound.role)

  const options = {
    httpOnly: true,
    secure: true
  }

  res.cookie('accessToken', options).json({ message: "User logedIn !", data: userFound })



});

//-------------------------------
//Employee List
//-------------------------------

const getEmployeeList = expressAsyncHandler(async (req, res) => {
  //check if user exists
  const userFound = await User.find({ role: "Worker" });
  //Check if password is match
  if (userFound) {
    res.json(userFound);
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

//-------------------------------
//Manager List
//-------------------------------

const getManagerList = expressAsyncHandler(async (req, res) => {
  const userFound = await User.find({ role: "Manager" });
  //Check if password is match
  if (userFound) {
    res.json(userFound);
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

//-------------------------------
//Client List
//-------------------------------

const getClientList = expressAsyncHandler(async (req, res) => {
  const userFound = await User.find({ role: "Client" });
  //Check if password is match
  if (userFound) {
    res.json(userFound);
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

const deleteUserCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbID(id);
  try {
    const deleteUser = await User.findByIdAndDelete(id);
    res.json(deleteUser);
  } catch (error) {
    res.json(error);
  }
});

module.exports = {
  createUserCtrl,
  loginUserCtrl,
  getEmployeeList,
  getManagerList,
  deleteUserCtrl,
  getClientList,
};
