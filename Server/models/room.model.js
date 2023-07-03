const mongoosse= require('mongoose');

const roomSchema= mongoosse.Schema({
  type_of_room: {
    type: String,
    required: true
  },
  max_people: {
    type: Number,
    default: 0
  },
  cost_per_day: {
    type: Number
  },
  other_information: {
    type: String
  },
  id_location: {
    type: mongoosse.SchemaTypes.ObjectId,
    ref: "destination",
    
  },
  id_user: {
    type: mongoosse.SchemaTypes.ObjectId,
    ref: "manager",
    unique: true
  },
  isFree: {
    type: Number,
    default: 1
  }
}, {
  versionKey: false,
  timestamps: true
})

module.exports= mongoosse.model("room", roomSchema);