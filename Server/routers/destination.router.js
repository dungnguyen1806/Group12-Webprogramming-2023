const express= require("express");
const asyncHandle = require("../middlewares/asyncHandle");
const {
  getAll,
  createDestination,
  updateDestination,
  deleteDestination
}= require("../controllers/destination.controller");
const { get } = require("mongoose");


const router= express.Router();

router
  .route("")
  .get(asyncHandle(getAll))
  .post(asyncHandle(createDestination))
router
  .route("/:id")
  .patch(asyncHandle(updateDestination))
  .delete(asyncHandle(deleteDestination))
  
module.exports= router;  