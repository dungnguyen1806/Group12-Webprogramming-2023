const roomModel= require("../models/room.model")
const destinationModel= require("../models/destination.model")
const ErrorResponse= require("../helpers/ErrorResponse")

module.exports= {
  getAll: async (req, res, next)=>{
    let room= await roomModel.find().populate("id_location").populate("id_user");
    return res.status(200).json(room)
  },
  createRoom: async (req, res, next)=>{
    let {...body}= req.body;
    let room= await roomModel.create(body);
    return res.status(201).json(room);
  },
  updateRoom: async (req, res, next)=>{
    let id= req.params.id;
    let {...body}= req.body;
    let room= await roomModel.findByIdAndUpdate(id, body, {new: true});
    return res.status(200).json(room);
  },
  deleteRoom: async (req, res, next)=>{
    let id= req.params.id;
    let room= await roomModel.findByIdAndDelete(id);
    return res.status(200).json(room);
  },
  getRoomById: async (req, res, next)=>{
    let id= req.params.id;
    return res.status(200).json(await roomModel.findById(id));
  },
  getRoomByLocationSearch: async (req, res, next)=>{
    let str= req.params.key;
    let rooms= await roomModel.find().populate("id_location");
    let rooms2= {};
    rooms2= rooms.filter((ele)=>{
      return ele?.id_location?.name_location?.includes(str);
    })
    return res.status(200).json(rooms2);
  },
  getRoomByUser: async (req, res, next)=>{
    let idUser= req.params.id;
    let room= await roomModel.findOne({id_user: idUser}).populate("id_location").populate("id_user");
    return res.status(200).json(room);
  }
}