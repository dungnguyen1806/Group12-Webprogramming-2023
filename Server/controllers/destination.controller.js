const destinationModel= require("../models/destination.model")


module.exports= {
  getAll: async(req, res, next)=>{
    return res.status(200).json(await destinationModel.find());
  },
  createDestination: async (req, res, next)=>{
    let {...body}= req.body;
    return res.status(201).json(await destinationModel.create(body));
  },
  updateDestination: async (req, res, next)=>{
    let {...body} = req.body;
    let id= req.params.id;
    let destination= await destinationModel.findByIdAndUpdate(id, body, {new: true});
    return res.status(200).json(destination);
  },
  deleteDestination: async (req, res, next)=>{
    let id= req.params.id;
    let destination= await destinationModel.findByIdAndDelete(id);
    return res.status(200).json(destination);
  }
}