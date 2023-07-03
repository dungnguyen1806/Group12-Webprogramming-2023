const mongoose = require("mongoose");

const destinationSchema= mongoose.Schema({
  name_location: {
    type: String, 
    unique: true,
    required: true
  },
  address: String,
  more_detail: String
}, {
  versionKey: false,
  timestamps: true
})

module.exports= mongoose.model('destination', destinationSchema);