const mongoose = require("mongoose");

// This is not a model , only a definition
const postSchema = mongoose.Schema({
  title: { type: String, required: true }, // String with capital "S" not string , differ from angular
  content: { type: String, required: true },
  imagePath: { type: String, required: true },
});

//mongoose.model() will turn the Schema to model
module.exports = mongoose.model("Post", postSchema);
