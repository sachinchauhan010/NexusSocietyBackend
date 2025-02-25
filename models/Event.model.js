import mongoose from "mongoose";

const {Schema} = mongoose;

const eventSchema= new Schema({
  name:{type: String, required:true},
  id:{type: String, required:true},
  description:{type: String, required:true},
  venue:{type: String, required:true},
  dc_team:{type: Array, required:true},
  participants: {type: Number, required:true},
  registration_link:{type: String},
  Date:{type:Date, required:true},
  start_time:{type: Date, required: true},
  end_time:{type: Date, required: true},
  banner:{type: String, required:true},
})

const Event = mongoose.model('Event', eventSchema );

export default Event;