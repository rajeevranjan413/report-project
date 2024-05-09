const expressAsyncHandler = require("express-async-handler");
const Report = require("../../model/Report/Report");
const generateToken = require("../../config/generateToken");
const validateMongodbID = require("../../utils/validateMongodbID");
const cloudinaryUploadImg = require("../../utils/cloudinary");
const fs = require("fs");

//-----------------------------------------
// create User
//-----------------------------------------
const addReportCtrl = expressAsyncHandler(async (req, res) => {
    //Checking user alredy exist
    const report = req?.body?.report;

    try {
        const report = await Report.create({
            createdBy: report.workerName,
            area: report.area,
            topic: report.topic,
            chemical: report.chemical,
            premise: report.premise,
            tempature: report.tempature,
            rating: report.rating,
            test: report.test,
            comment: report.comment,
            file: report.file,

        });
        res.json(user);
    } catch (error) {
        res.json(error);
    }
});

//-------------------------------
//Login user
//-------------------------------

const deleteReportCtrl = expressAsyncHandler(async (req, res) => {
    // const { email, password } = req.body;
    // //check if user exists
    // const userFound = await User.findOne({ email });
    // //Check if password is match
    // if (userFound && (await userFound.isPasswordMatched(password))) {
    //     res.json({
    //         _id: userFound?._id,
    //         name: userFound?.name,
    //         email: userFound?.email,
    //         role: userFound?.role,
    //         token: generateToken(userFound._id),
    //     });
    // } else {
    //     res.status(401);
    //     throw new Error("Invalid Credentials");
    // }
});

//-------------------------------
//Employee List
//-------------------------------

const updateReportCtrl = expressAsyncHandler(async (req, res) => {
    // //check if user exists
    // const userFound = await User.find({ role: "Worker" });
    // //Check if password is match
    // if (userFound) {
    //     res.json(userFound);
    // } else {
    //     res.status(401);
    //     throw new Error("Invalid Credentials");
    // }
});

//-------------------------------
//Manager List
//-------------------------------

const getTodatReportCtrl = expressAsyncHandler(async (req, res) => {
    // const userFound = await User.find({ role: "Manager" });
    // //Check if password is match
    // if (userFound) {
    //     res.json(userFound);
    // } else {
    //     res.status(401);
    //     throw new Error("Invalid Credentials");
    // }
});

//-------------------------------
//Client List
//-------------------------------

// const getClientList = expressAsyncHandler(async (req, res) => {
//     const userFound = await User.find({ role: "Client" });
//     //Check if password is match
//     if (userFound) {
//         res.json(userFound);
//     } else {
//         res.status(401);
//         throw new Error("Invalid Credentials");
//     }
// });

// const deleteUserCtrl = expressAsyncHandler(async (req, res) => {
//     const { id } = req.params;
//     validateMongodbID(id);
//     try {
//         const deleteUser = await User.findByIdAndDelete(id);
//         res.json(deleteUser);
//     } catch (error) {
//         res.json(error);
//     }
// });

module.exports = {
    addReportCtrl
};
