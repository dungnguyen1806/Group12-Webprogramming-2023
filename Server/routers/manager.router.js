const express= require("express");
const router= express.Router();
const asyncHandle= require("../middlewares/asyncHandle");


const {
  getAll,
  register,
  login,
  deleteManager,
  updateManager,
  getManagerById
} = require("../controllers/manager.controler")

router
  .route("")
  .get(asyncHandle(getAll))
  .post(asyncHandle(register))
router
  .route("/login")
  .post(asyncHandle(login))

router
  .route("/:id")
  .delete(asyncHandle(deleteManager))
  .patch(asyncHandle(updateManager))
  .get(asyncHandle(getManagerById))

module.exports= router;