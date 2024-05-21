const expressAsyncHandler = require("express-async-handler");
const Factory = require("../../model/Factory/Factory");
const ApiResponse = require("../../utils/ApiResponse")


//-------------------------------
//Add Factory
//-------------------------------


const addFactoryCtrl = expressAsyncHandler(async (req, res) => {


  const { factoryName } = req.body


  try {
    const factory = await Factory.create({
      name: factoryName,
    })

    return res.json({ message: "Factory created", detail: factory })
  }
  catch (err) {
    return res.json({ message: "Factory creation faild", err })
  }
});

module.exports = {
  addFactoryCtrl
}