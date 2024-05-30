const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/User/User");
// const generateToken = require("../../config/generateToken");
const validateMongodbID = require("../../utils/validateMongodbID");
const mongoose = require("mongoose");
const moment = require("moment-timezone");
const WorkTrack = require("../../model/WorkTrack/WorkTrack");
const getCurrentTimeInLithuania = require("../../utils/getCurrentTimeInLithunia");

//-----------------------------------------
// create User
//-----------------------------------------

function generatePassword() {
  var length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

const createUserCtrl = expressAsyncHandler(async (req, res) => {
  const { name, email, factory, role } = req.body;
  const password = generatePassword();
  if (
    [name, email, factory, password, role].some((field) => field?.trim() === "")
  ) {
    return res.json({
      message: `All fields are require`,
    });
  }

  // console.log(email);

  const userExist = await User.findOne({ email: email });

  if (userExist) {
    return res.json({
      message: `User already exist `,
    });
  }

  try {
    const user = await User.create({
      name: name,
      factory: new mongoose.Types.ObjectId(factory),
      email: email,
      password: password,
      role: role,
    });

    const createdUser = await User.findById(user._id).select(
      "-password -accessToken"
    );

    if (!createdUser) {
      return res.json({
        message: "Something went wrong while registering the user",
      });
    }

    return res.json({
      message: `User Created Successfully`,
      data: createdUser,
      password: password,
    });
  } catch (err) {
    return res.json({
      message: "Something went wrong while adding the user",
      data: err,
    });
  }
});

//-------------------------------
//Login user
//-------------------------------

const loginUserCtrl = expressAsyncHandler(async (req, res) => {
  const { name, password } = req.body;

  if (!name && !password) {
    return res.json({ message: "username or email is required" });
  }
  //check if user exists
  const userFound = await User.findOne({ name });

  if (!userFound) {
    return res.json({ message: "user not found" });
  }

  const isPasswordValid = await userFound.isPasswordMatched(password);

  if (!isPasswordValid) {
    return res.json({ message: "Invalid Credentials" });
  }

  const accessToken = await userFound.generateAccessToken();
  const loggedInUser = await User.findById(userFound._id).select(
    "-password -accessToken"
  );
  if (loggedInUser.role == "Worker") {
    const todaysWorkTrack = await WorkTrack.find({
      worker: new mongoose.Types.ObjectId(loggedInUser),
      dateString: getFormattedDate(),
    });
    if (todaysWorkTrack.length == 0) {
      const currentTime = getCurrentTimeInLithuania();
      const workTrack = new WorkTrack({
        worker: loggedInUser._id,
        checkedIn: currentTime,
        dateString: getFormattedDate(),
        factory: loggedInUser.factory,
      });
      try {
        await workTrack.save();
      } catch (error) {
        console.log(error);
      }
    }
  }

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .cookie("accessToken", accessToken, options)
    .json({ message: "User logedIn !", data: loggedInUser });
});

//-------------------------------
//Checklogged user
//-------------------------------

const checkLoggedCtrl = expressAsyncHandler(async (req, res) => {
  const {id} = req.user;
  console.log("hello");
  try {
    const loggedInUser = await User.findById(id).select(
      "-password -accessToken"
    );
    return res.json({success:true, message: "ok", data: loggedInUser });
  } catch (err) {
    console.log(err);
    return res.json({success:false, message: "Invalid Credentials", err });
  }
});

//-------------------------------
//Employee List
//-------------------------------

const escapeRegex = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
};

const getEmployeeList = expressAsyncHandler(async (req, res) => {
  // Helper function to escape special characters for regex
  const escapeRegex = (text) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };

  try {
    const { search = "" } = req.query;
    const regexSearch = new RegExp(escapeRegex(search), "i");

    const userFound = await User.aggregate([
      {
        $match: {
          role: "Worker",
        },
      },
      {
        $lookup: {
          from: "factories", // The name of the factory collection
          localField: "factory", // The field in the User collection
          foreignField: "_id", // The field in the Factory collection
          as: "factoryDetails",
        },
      },
      {
        $unwind: "$factoryDetails",
      },
      {
        $match: {
          $or: [
            { name: { $regex: regexSearch } },
            { email: { $regex: regexSearch } },
            { "factoryDetails.name": { $regex: regexSearch } },
          ],
        },
      },
      {
        $project: {
          name: 1,
          email: 1,
          factory: "$factoryDetails.name",
        },
      },
    ]);

    // Check if users are found
    if (userFound.length > 0) {
      res.json({
        success: true,
        message: "Employee List fetched",
        data: {
          users: userFound,
        },
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No employees found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Employee Fetch Fail",
      error,
    });
  }
});

//-------------------------------
//Manager List
//-------------------------------

const getManagerList = expressAsyncHandler(async (req, res) => {
  const escapeRegex = (text) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };

  try {
    const { search = "" } = req.query;
    const regexSearch = new RegExp(escapeRegex(search), "i");

    const userFound = await User.aggregate([
      {
        $match: {
          role: "Manager",
        },
      },
      {
        $lookup: {
          from: "factories", // The name of the factory collection
          localField: "factory", // The field in the User collection
          foreignField: "_id", // The field in the Factory collection
          as: "factoryDetails",
        },
      },
      {
        $unwind: "$factoryDetails",
      },
      {
        $match: {
          $or: [
            { name: { $regex: regexSearch } },
            { email: { $regex: regexSearch } },
            { "factoryDetails.name": { $regex: regexSearch } },
          ],
        },
      },
      {
        $project: {
          name: 1,
          email: 1,
          factory: "$factoryDetails.name",
        },
      },
    ]);

    // Check if users are found
    if (userFound.length > 0) {
      res.json({
        success: true,
        message: "Employee List fetched",
        data: {
          users: userFound,
        },
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No employees found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Employee Fetch Fail",
      error,
    });
  }
});

//-------------------------------
//Client List
//-------------------------------

const getClientList = expressAsyncHandler(async (req, res) => {
  const escapeRegex = (text) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };

  try {
    const { search = "" } = req.query;
    const regexSearch = new RegExp(escapeRegex(search), "i");

    const userFound = await User.aggregate([
      {
        $match: {
          role: "User",
        },
      },
      {
        $lookup: {
          from: "factories", // The name of the factory collection
          localField: "factory", // The field in the User collection
          foreignField: "_id", // The field in the Factory collection
          as: "factoryDetails",
        },
      },
      {
        $unwind: "$factoryDetails",
      },
      {
        $match: {
          $or: [
            { name: { $regex: regexSearch } },
            { email: { $regex: regexSearch } },
            { "factoryDetails.name": { $regex: regexSearch } },
          ],
        },
      },
      {
        $project: {
          name: 1,
          email: 1,
          factory: "$factoryDetails.name",
        },
      },
    ]);

    // Check if users are found
    if (userFound.length > 0) {
      res.json({
        success: true,
        message: "Employee List fetched",
        data: {
          users: userFound,
        },
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No employees found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Employee Fetch Fail",
      error,
    });
  }
});

//-------------------------------
//Admin List
//-------------------------------

const getAdminList = expressAsyncHandler(async (req, res) => {
  const escapeRegex = (text) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };

  try {
    const { search = "" } = req.query;
    const regexSearch = new RegExp(escapeRegex(search), "i");

    const userFound = await User.aggregate([
      {
        $match: {
          role: "Admin",
        },
      },
      {
        $lookup: {
          from: "factories", // The name of the factory collection
          localField: "factory", // The field in the User collection
          foreignField: "_id", // The field in the Factory collection
          as: "factoryDetails",
        },
      },
      {
        $unwind: "$factoryDetails",
      },
      {
        $match: {
          $or: [
            { name: { $regex: regexSearch } },
            { email: { $regex: regexSearch } },
            { "factoryDetails.name": { $regex: regexSearch } },
          ],
        },
      },
      {
        $project: {
          name: 1,
          email: 1,
          factory: "$factoryDetails.name",
        },
      },
    ]);

    // Check if users are found
    if (userFound.length > 0) {
      res.json({
        success: true,
        message: "Employee List fetched",
        data: {
          users: userFound,
        },
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No employees found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Employee Fetch Fail",
      error,
    });
  }
});

//-------------------------------
//Delete User
//-------------------------------

const deleteUserCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbID(id);
  try {
    const deleteUser = await User.findByIdAndDelete(id);
    res.json({
      success: true,
      data: {
        user: deleteUser,
        message: "User Deleted",
      },
    });
  } catch (error) {
    return res.json({ message: "Employee Delete Fail", err });
  }
});

//-------------------------------
// User Details
//-------------------------------

const userDetailsCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbID(id);
  try {
    const user = await User.findById(id);
    res.json({
      success: true,
      data: {
        user: user,
        message: "User Fetched",
      },
    });
  } catch (error) {
    return res.json({ message: "Employee Fetch Fail", err });
  }
});


//-------------------------------
// Switch Language
//-------------------------------

const switchLanguageCtrl = expressAsyncHandler(async (req, res) => {
 
  const {id} = req.user
  const {language} = req.body
console.log("hello");
  try {
    const user = await User.findByIdAndUpdate(id,{language},{new:true}).select(
      "-password -accessToken"
    );
    console.log(user);
    res.json({
      success: true,
      data: {
        user: user,
        message: "Fetched",
      },
    });
  } catch (error) {
    console.log(error);
    return res.json({success:false, message: "Employee Fetch Fail", err });
  }
});
const userEditCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, factory, role } = req.body;
  if ([name, email, factory, role].some((field) => field?.trim() === "")) {
    return res.json({
      message: `All fields are require`,
    });
  }

  try {
    const user = await User.findByIdAndUpdate(id, {
      name: name,
      factory: new mongoose.Types.ObjectId(factory),
      email: email,
      role: role,
    });

    return res.json({
      message: `User Created Successfully`,
      success: true,
      data: user,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      message: "Something went wrong while adding the user",
      data: err,
      success: false,
    });
  }
});

const logoutUserCtrl = expressAsyncHandler(async (req, res) => {
  const { id, role } = req.user;

  try {
    if (role == "Worker") {
      const currentTime = getCurrentTimeInLithuania();
      console.log(currentTime);
      await WorkTrack.findOneAndUpdate(
        {
          worker: id,
          dateString: getFormattedDate(),
        },
        { checkedOut: currentTime }
      );
    }
  } catch (error) {
    console.log(error);
  }

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .clearCookie("accessToken", options)
    .json({ message: "User logged Out" });
});

const changePassword =  expressAsyncHandler(async(req,res)=>{
  const {_id} = req.user
  console.log(_id);
  const {password} = req.body;
  if (!password) {
    throw new Error("Both Password should be same!")
  }
  try {
    const user = await User.findById(_id);
    user.password = password;
    user.firstLogin = false;
    await user.save()
    res.json({
      success: true,
      message: "Password Updated",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Unable to Update Password",
    });
  }
})
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

module.exports = {
  createUserCtrl,
  loginUserCtrl,
  logoutUserCtrl,
  getEmployeeList,
  getManagerList,
  getAdminList,
  getClientList,
  deleteUserCtrl,
  checkLoggedCtrl,
  userDetailsCtrl,
  userEditCtrl,
  changePassword,
  switchLanguageCtrl
};
