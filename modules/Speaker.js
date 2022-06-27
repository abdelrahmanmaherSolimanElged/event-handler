// 1- require mongoose
const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
//address schema
const addressSchema = new mongoose.Schema({
  //address (city,street and building)
  _id: false,
  city: { type: String },
  street: { type: String },
  building: { type: Number },
});
//2- new object from schema
const schema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    auto: true,
  },
  fullname: String,
  role: {
    type: String,
    enum: ["admin", "speaker"],
    default: "speaker",
  },
  email: {
    type: String,
    unique: true,
  },
  image: String,
  address: addressSchema,
});

//3- mapping
module.exports = mongoose.model("speakers", schema);
