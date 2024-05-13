require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { errorHandler, notFound } = require("./middleware/errorHandler");
//const photoRoutes = require("./routes/Photo/photoRoutes");
//const commentRoutes = require("./routes/Comment/commentRoutes");
require("./config/dbConnect")();
const app = express();
app.use(cors({ credentials: true, origin: true, withCredentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));

const userRoutes = require("./routes/user/userRoutes");
const factoryRoutes = require("./routes/factory/factoryRoutes");
// const reportRoutes = require("./routes/report/reportRoutes")
const reportRoutes = require("./routes/report/reportRoutes");

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api/user", userRoutes);
app.use("/api/factory", factoryRoutes);
app.use("/api/report", reportRoutes);

//error handler
app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT || 8000, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
