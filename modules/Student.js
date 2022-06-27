//require
const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
//end require
const schema = new mongoose.Schema(
  {
    _id: Number,
    fullname: String,
    password: String,
    email: {
      type: String,
      unique: true,
    },
  },
  { _id: false }
);
schema.plugin(AutoIncrement, { id: "student_id_itrator", inc_field: "_id" });

module.exports = mongoose.model("students", schema);
