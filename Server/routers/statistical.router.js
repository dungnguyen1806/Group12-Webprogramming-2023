const express= require("express");
const router= express.Router();
const asyncHandle= require("../middlewares/asyncHandle");

const {
  getAll,
  getStatisticalOfRoom,
  createStatistical,
  deleteStatistical,
  confirmBooking,
  checkInCheckOut
}= require("../controllers/statistical.controller")

router
  .route("")
  .get(asyncHandle(getAll))
  .post(asyncHandle(createStatistical))

router
  .route("/:id")
  .get(asyncHandle(getStatisticalOfRoom))  
  .delete(asyncHandle(deleteStatistical))
  .patch(asyncHandle(checkInCheckOut))

router
  .route("/confirm/:id/:otp")
  .patch(asyncHandle(confirmBooking))  
  
module.exports= router;