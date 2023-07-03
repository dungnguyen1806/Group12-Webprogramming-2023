const mongoose = require('mongoose');
const bcrypt= require("bcrypt");
const configuration= require("../configs/configuration");

const managerSchema= mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "staff"
  },
  more_detail: {
    type: String
  }
}, {
  versionKey: false,
  timestamps: true
});

managerSchema.set("toJSON", {
  transform: function(doc, ret, options){
    delete ret.password;
    return ret;
  } 
});


managerSchema.pre("save", function(next){
  const user= this;
  if (user.password){
    user.password= bcrypt.hashSync(user.password, configuration.SALT_ROUNDs);
  }
  next();
})

managerSchema.pre("findOneAndUpdate", function(next){
  const _update= {...this.getUpdate()};

  if (_update.password){
    _update.password= bcrypt.hashSync(_update.password, configuration.SALT_ROUNDs);
  }

  this.setUpdate(_update);
  next();
})

module.exports= mongoose.model('manager', managerSchema);

