const mongoose = require("mongoose");
const URL = process.env.URL;
const dbConnect = async () => {
  try {
    await mongoose.connect(URL);
    console.log("DB Connected");
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = dbConnect;
