const managerModel= require("../models/manager.model")
const ErrorResponse= require("../helpers/ErrorResponse")
const bcrypt = require("bcrypt")
module.exports= {
  getAll: async(req, res, next) =>{
      return res.status(200).json(await managerModel.find());
  },
  register: async(req, res, next)=> {
      let {...body}= req.body;
      return res.status(201).json(await managerModel.create(body));   
  },
  login: async (req, res, next)=>{
    let {...body}= req.body;
    let manager= await managerModel.findOne({username: body?.username});
    if (!manager){
      throw new ErrorResponse(404, "Not found account");
    }
    if (!bcrypt.compareSync(body.password, manager.password)){
      throw new ErrorResponse(403, "Unauthorized")
    }
    
    return res.status(200).json(manager);
  },
  deleteManager: async (req, res, next)=>{
    let id= req.params.id;
    return res.status(200).json(await managerModel.findByIdAndDelete(id));
  },
  updateManager: async (req, res, next)=>{
    let id= req.params.id;
    let mng= await managerModel.findOneAndUpdate({_id: id}, req.body, {new: true})
    return res.status(200).json(mng);
  },
  getManagerById: async (req, res, next)=>{
    let id= req.params.id;
    let mng= await managerModel.findById(id);
    return res.status(200).json(mng);
  }
}