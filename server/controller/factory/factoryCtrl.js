const expressAsyncHandler = require("express-async-handler");
const Factory = require("../../model/Factory/Factory");
const ApiResponse = require("../../utils/ApiResponse");
const escapeRegex = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
};
//-------------------------------
//Add Factory
//-------------------------------

const addFactoryCtrl = expressAsyncHandler(async (req, res) => {
  const { name, areas } = req.body;
  console.log(req.body);
  try {
    const factory = await Factory.create({
      name,
      areas,
    });

    return res.json({
      message: "Factory Created Successfully",
      detail: factory,
    });
  } catch (err) {
    console.log(err);
    return res.json({ message: "Factory creation faild", err });
  }
});

const deleteFactoryCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const factory = await Factory.findByIdAndDelete(id);

    return res.json({ message: "Factory Deleted", detail: factory });
  } catch (err) {
    return res.json({ message: "Factory delete fail", err });
  }
});
const getFactoryListCtrl = expressAsyncHandler(async (req, res) => {
  const { search = "", offset = 0, limit = 10 } = req.query;
  const offsetNum = parseInt(offset, 10);
  const limitNum = parseInt(limit, 10);

  try {
    const regexSearch = escapeRegex(search);
    const factory = await Factory.find({
      name: { $regex: regexSearch, $options: "i" },
    });
    // .skip(offsetNum * limitNum)
    // .limit(limitNum);

    const total = await Factory.countDocuments({
      name: { $regex: regexSearch, $options: "i" },
    });
    return res.status(200).json({
      message: "Factory List",
      detail: { factory, total },
    });
  } catch (err) {
    console.error("Error fetching factory list:", err);
    return res.status(500).json({
      message: "Factory List Fetch Failed",
      error: "Internal Server Error",
    });
  }
});
const getIndividualFactoryCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const factory = await Factory.findById(id);

    return res.json({
      message: "Factory Fetched Successfully",
      detail: factory,
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: "Factory Fetch faild", err });
  }
});

//Workers Factory
const workersFactoryCtrl = expressAsyncHandler(async (req, res) => {
  const { factory } = req.user;
  try {
    const factoryarea = await Factory.findById(factory);
    console.log(factoryarea.areas);
    return res.json({
      message: "Factory Fetched Successfully",
      detail: factoryarea.areas,
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: "Factory Fetch faild", err });
  }
});

const editFactoryCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, areas } = req.body;
  try {
    const factory = await Factory.findByIdAndUpdate(id, {
      name,
      areas,
    });

    return res.json({
      message: "Factory Created Successfully",
      detail: factory,
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: "Factory creation faild", err });
  }
});

module.exports = {
  addFactoryCtrl,
  deleteFactoryCtrl,
  getFactoryListCtrl,
  getIndividualFactoryCtrl,
  editFactoryCtrl,
  workersFactoryCtrl,
};
