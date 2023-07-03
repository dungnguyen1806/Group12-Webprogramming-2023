const mongoose = require("mongoose")

const customerSchema= mongoose.Schema({
  fullname: String,
  age: Number, 
  gender: String,
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String
  }
}, {
  versionKey: false,
  timestamps: true
})

module.exports= mongoose.model("customer", customerSchema);