//require
const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
//end require
const schema = new mongoose.Schema(
  {
    _id: Number,
    tittle: String,
    eventDate: Date,
    mainSpeaker: {
      type: mongoose.Types.ObjectId,
      ref: "speakers",
    },
    speakers: [{ type: mongoose.Types.ObjectId, ref: "speakers" }],
    students: [{ type: Number, ref: "students" }],
  },
  { _id: false }
);
schema.plugin(AutoIncrement, { id: "events_id_itrator", inc_field: "_id" });

module.exports = mongoose.model("students", schema);
