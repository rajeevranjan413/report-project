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
    const createdBy = req.user.name
    const { report } = req.body
    const files = req.files
    const photosUrls = []
    for (const file of files) {
        const { path } = file;
        const url = await cloudinaryUploadImg(path);

        photosUrls.push(url)
    }
    console.log(photosUrls)

    try {
        const addedReport = await Report.create({
            createdBy: report.createdBy,
            area: report.area,
            topic: report.topic,
            problem: report.problem,
            chemical: report.chemical,
            premise: report.premis,
            tempature: report.tempature,
            rating: report.rating,
            test: report.test,
            comment: report.comment,
            photo: photosUrls
        })
        return res.json({ message: `Report added Successfully`, data: addedReport });

    }
    catch (err) {
        return res.json({ message: "Something went wrong while adding the report", data: err })
    }



    //Checking user alredy exist
    // const filesData = req.file
    // console.log("Files Data", filesData)
    // const report = req?.body?.report;

    // try {
    //     const report = await Report.create({
    //         createdBy: report.workerName,
    //         area: report.area,
    //         topic: report.topic,
    //         chemical: report.chemical,
    //         premise: report.premise,
    //         tempature: report.tempature,
    //         rating: report.rating,
    //         test: report.test,
    //         comment: report.comment,
    //         file: report.file,

    //     });
    //     res.json(user);
    // } catch (error) {
    //     res.json(error);
    // }
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
