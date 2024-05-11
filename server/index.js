require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { errorHandler, notFound } = require("./middleware/errorHandler");
// const reportRoutes = require("./routes/report/reportRoutes")
//const photoRoutes = require("./routes/Photo/photoRoutes");
//const commentRoutes = require("./routes/Comment/commentRoutes");
require("./config/dbConnect")();
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));

const userRoutes = require("./routes/user/userRoutes")

app.get("/", (req, res) => {
  res.send("hello");
});
app.use("/api/user", userRoutes);
// app.use("/api/reports", reportRoutes);
//app.use("/api/photos", photoRoutes);
//app.use("/api/comments", commentRoutes);

//error handler
app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT || 8000, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
