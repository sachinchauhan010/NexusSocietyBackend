import mongoose from "mongoose";

const { Schema } = mongoose;

const societySchema = new Schema({
  name: { type: String, required: true },
  id: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  description: { type: String },
});

const Society = mongoose.model('Society', societySchema );

export default Society;