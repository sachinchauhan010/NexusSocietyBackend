import mongoose from "mongoose";
import { ROLE } from '../enum/Role.js' 

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String },
  role: [{ type: String, enum: [ROLE.ADMIN, ROLE.MEMBER, ROLE.STUDENT], default: ROLE.STUDENT }],
  id: { type: String },
  department: { type: String },
  year: { type: Number },
  semester: { type: String },
});

const User = mongoose.model('User', userSchema );

export default User;