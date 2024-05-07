const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/User/User");
const generateToken = require("../../config/generateToken");
const validateMongodbID = require("../../utils/validateMongodbID");
const cloudinaryUploadImg = require("../../utils/cloudinary");
const fs = require("fs");

//-----------------------------------------
// create User
//-----------------------------------------
const createUserCtrl = expressAsyncHandler(async (req, res) => {
  //Checking user alredy exist
  const userExist = await User.findOne({ email: req?.body?.email });
  if (userExist) {
    throw new Error("User already exist ");
  }
  try {
    const user = await User.create({
      name: req?.body?.name,
      email: req?.body?.email,
      password: req?.body?.password,
      isEmployee: req?.body?.isEmployee,
    });
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

//-------------------------------
//Login user
//-------------------------------

const loginUserCtrl = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //check if user exists
  const userFound = await User.findOne({ email });
  //Check if password is match
  if (userFound && (await userFound.isPasswordMatched(password))) {
    res.json({
      _id: userFound?._id,
      name: userFound?.name,
      email: userFound?.email,
      profilePhoto: userFound?.profilePhoto,
      isEmployee: userFound?.isEmployee,
      isAdmin: userFound?.isAdmin,
      token: generateToken(userFound._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

//-------------------------------
//Employee List
//-------------------------------

const getEmployeeList = expressAsyncHandler(async (req, res) => {
  //check if user exists
  const userFound = await User.find({ isEmployee: true });
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
  const { email, password } = req.body;
  //check if user exists
  const userFound = await User.find({ isEmployee: false });
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
};
