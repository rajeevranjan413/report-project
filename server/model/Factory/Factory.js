const mongoose = require("mongoose");

const factorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  areas: {
    type: [String],
    required: true,
  },
});

const Factory = mongoose.model("Factory", factorySchema);

module.exports = Factory;
