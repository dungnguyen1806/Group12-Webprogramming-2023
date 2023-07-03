const mongoose = require("mongoose");
const managerModel= require("../models/manager.model");
const configuration= require("./configuration");

const connectDB= async()=>{
  try {
    const conn = await mongoose.connect(configuration.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    let ad = await managerModel.findOne({ username: "admin" });
    if (!ad) {
      await managerModel.create(configuration.USER_ADMIN);
    }
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log("Error db: "+ error.message);
  }
}

module.exports= connectDB;