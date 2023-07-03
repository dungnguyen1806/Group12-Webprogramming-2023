const express= require("express")
const asyncHandle = require("../middlewares/asyncHandle")
const router= express.Router();
const {
  getAll,
  createRoom,
  updateRoom,
  deleteRoom,
  getRoomById,
  getRoomByLocationSearch,
  getRoomByUser
}= require("../controllers/room.controller")

router
  .route("")
  .get(asyncHandle(getAll))
  .post(asyncHandle(createRoom))

router
  .route("/:id")
  .get(asyncHandle(getRoomById))
  .patch(asyncHandle(updateRoom))
  .delete(asyncHandle(deleteRoom))  
router
  .route("/search/:key")
  .get(asyncHandle(getRoomByLocationSearch));
router
  .route("/user/:id")
  .get(asyncHandle(getRoomByUser))
module.exports= router;