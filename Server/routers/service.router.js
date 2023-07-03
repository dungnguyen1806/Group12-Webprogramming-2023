const express= require("express");
const asyncHandle= require("../middlewares/asyncHandle")

const {
  getServiceByRoom,
  createServiceForRoom,
  updateServiceForRoom,
  deleteService,
  getAllService,
  getServiceById
}= require("../controllers/service.controller");
const router= express.Router();

router
  .route("")
  .get(asyncHandle(getAllService))
  .post(asyncHandle(createServiceForRoom))
  

router  
  .route("/:id")
  .get(asyncHandle(getServiceByRoom))
  .delete(asyncHandle(deleteService))
  .patch(asyncHandle(updateServiceForRoom))

router
  .route("/item/:id")
  .get(asyncHandle(getServiceById))  

module.exports= router;