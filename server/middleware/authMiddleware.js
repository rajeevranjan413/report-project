const expressAsyncHandler = require("express-async-handler");

const jwt = require("jsonwebtoken");
const User = require("../model/User/User");

const authMiddleware = expressAsyncHandler(async (req, res, next) => {

  try {
    const token = req.cookies?.accessToken || req.headers.authorization?.split(" ")[1]

    console.log(token)
    if (!token) {
      return res.json({ message: "Unauthorized request" })
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    const user = await User.findById(decodedToken?._id).select("-password -accessToken")
    if (!user) {
      return res.json({ message: "Invalid Access Token" })
    }

    req.user = user;
    next()
  }
  catch (error) {
    return res.json({ message: "Invalid acces token", error })
  }

});

module.exports = authMiddleware;
