const mongoose= require("mongoose")

const statisticalSchema= mongoose.Schema({
  total: {
    type: Number,
    default: 0
  },
  id_room:{
    type: mongoose.SchemaTypes.ObjectId,
    ref: "room"
  },
  id_service: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "service"
  },
  id_customer: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "customer"
  },
  confirm: {
    type: String,
    default: "0"
  },
  timeCome: {
    type: String,
    default: null
  },
  timeLeave: {
    type: String,
    default: null
  }
}, {
  versionKey: false,
  timestamps: true
})

module.exports= mongoose.model("statisticals", statisticalSchema);