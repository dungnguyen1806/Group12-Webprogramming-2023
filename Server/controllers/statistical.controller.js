const statisticalModel= require("../models/statistical.model");
const customerModel= require("../models/customer.model");
const roomModel= require("../models/room.model");
const sendMail= require("../helpers/SendMail");
const ErrorResponse= require("../helpers/ErrorResponse");

module.exports= {
  getAll: async (req, res, next)=>{
    let statisticals= await statisticalModel.find({confirm: "1"}).populate("id_customer").populate({
      path: "id_room",
      populate: {
        path: "id_location"
      }
    });
    return res.status(200).json(statisticals);
  },
  getStatisticalOfRoom: async (req, res, next)=>{
    let idRoom = req.params.id;
    let statisticals= await statisticalModel.find({id_room: idRoom}).populate("id_customer").populate("id_room");
    return res.status(200).json(statisticals);
  },
  createStatistical: async(req, res, next)=>{
    let {...body}= req.body;
    
    if (!body.total){
      throw new ErrorResponse(401, "Total must provide");
    }

    let idRoom= body.id_room;
    if (!idRoom){
      throw new ErrorResponse(401, "id_room must provide");
    }
    let checkRoom= await roomModel.findOne({
      _id: idRoom,
      isFree: 0
    })
    if (checkRoom){
      throw new ErrorResponse(401, "This room already booked")
    }
    await roomModel.findByIdAndUpdate(idRoom, {isFree: 0})
    let customer= await customerModel.findOne({email: body.email});
    if (!customer){
      customer= {}
      customer.fullname= body.fullname;
      customer.age= body.age;
      customer.gender= body.gender;
      customer.phone= body.phone;
      customer.email= body.email;
      customer.address= body.address;
      customer= await customerModel.create(customer);
    }
    // body.id_customer= customer._id;
    let stttc= {
      total: body.total,
      id_customer: customer._id
    }
    if (body.id_room){
      stttc.id_room= body.id_room
    }
    if (body.id_service){
      stttc.id_service= body.id_service
    }
    let otp= Math.floor(Math.random()*10)+""+ Math.floor(Math.random()*10)+ ""+ Math.floor(Math.random()*10)+""+Math.floor(Math.random()*10) ;

    stttc.confirm= otp;
    let statistical= await statisticalModel.create(stttc);
    var today = new Date();
    var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    let option= {
      email: customer.email,
      subject: "THÔNG BÁO ĐẶT DỊCH VỤ THÀNH CÔNG",
      html: `<h1>Xin chân trọng thông báo, quý khách đã đặt dịch vụ room thành công vào thời gian ${dateTime}. Để xác thực thông tin. Hãy nhập mã xác nhận sau ${otp}</h1>`
    }
    await sendMail(option);

    return res.status(201).json(statistical);    
  },
  deleteStatistical: async (req, res, next)=>{
    let id= req.params.id;
    return res.status(200).json(await statisticalModel.findByIdAndDelete(id))
  },
  confirmBooking: async (req, res, next)=>{
    let idStatistical= req.params.id;
    let otp= req.params.otp;

    if (!otp){
      throw new ErrorResponse(403, "OTP must provide");
    }

    let stt= await statisticalModel.findOne({_id: idStatistical, confirm: otp})
    if (!stt){
      throw new ErrorResponse(404, "OTP incorrect");
    }

    let body={
      confirm: "1"
    }
    let result= await statisticalModel.findByIdAndUpdate(idStatistical, body, {new: true});
    if (!result){
      throw new ErrorResponse(404, "Not found statistical. Check id statistical. Please");
    }
    return res.status(200).json(result);
  },
  checkInCheckOut: async (req, res, next)=>{
    let idStatistical= req.params.id;
    let {...body}= req.body;
    let timeOut= body?.timeLeave;
    if (timeOut){
      let st= await statisticalModel.findById(idStatistical);
      let idRoom= st.id_room._id;
      await roomModel.findByIdAndUpdate(idRoom, {isFree: 1})
    }
    let result= await statisticalModel.findByIdAndUpdate(idStatistical, body, {new: true});
    if (!result){
      throw new ErrorResponse(404, "Not found statistical. Check id statistical. Please");
    }
    return res.status(200).json(result);
  }


}