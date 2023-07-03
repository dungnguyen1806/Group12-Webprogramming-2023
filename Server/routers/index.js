const managerRouter= require("./manager.router")
const destinationRouter= require("./destination.router")
const roomRouter= require("./room.router")
const statisticalRouter= require("./statistical.router")
const serviceRouter= require("./service.router")
const errorHandle= require("../middlewares/errorHandler")

module.exports = (app)=>{
  app.use("/api/managers", managerRouter);
  app.use("/api/destinations", destinationRouter);
  app.use("/api/rooms", roomRouter);
  app.use("/api/statisticals", statisticalRouter);
  app.use("/api/services", serviceRouter);
  app.use(errorHandle);
}