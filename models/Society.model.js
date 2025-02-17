import mongoose from "mongoose";

const { Schema } = mongoose;

const SocietySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  logoimage: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },

});

const Society = mongoose.model("Society", SocietySchema);

export default Society;

