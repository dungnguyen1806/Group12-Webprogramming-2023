const mongoose= require("mongoose");

const serviceSchema= mongoose.Schema({
  name_service: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  more_detail: {
    type: String
  },
  id_room: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "room"
  }
}, {
  versionKey: false,
  timestamps: true
})

module.exports= mongoose.model("service", serviceSchema);