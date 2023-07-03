const ErrorResponse = require("../helpers/ErrorResponse");
const serviceModel= require("../models/service.model")

module.exports= {
  getAllService: async (req, res, next)=>{
    let services= await serviceModel.find().populate("id_room");
    return res.status(200).json(services);
  },
  getServiceByRoom: async (req, res, next)=>{
    let idRoom= req.params.id;
    let services= await serviceModel.find({id_room: idRoom}).populate("id_room");
    return res.status(200).json(services);
  },
  createServiceForRoom: async (req, res, next)=>{
    let {...body}= req.body;
    let idRoom= body.id_room;
    if (!idRoom){
      throw new ErrorResponse(404, "Must provide id_room");
    }
    let services= await serviceModel.create(body);
    return res.status(200).json(services);
  },
  updateServiceForRoom: async (req, res, next)=>{
    let {...body}= req.body;
    let id_service= req.params.id;
    
    let service= await serviceModel.findOneAndUpdate({_id: id_service}, body, {new: true})
    return res.status(200).json(service);  
  },
  deleteService: async (req, res, next)=>{
    let id= req.params.id;
    let service= await serviceModel.findByIdAndDelete(id);
    return res.status(200).json(service);
  },
  getServiceById: async (req, res, next)=>{
    let id= req.params.id;
    return res.status(200).json(await serviceModel.findById(id));
  }

}