import mongoose from "mongoose";
import { ROLE } from '../enum/Role.js' 

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: [{ type: String, enum: [ROLE.ADMIN, ROLE.MEMBER, ROLE.STUDENT], default: ROLE.STUDENT }],
  id: { type: String, required: true },
  course: { type: String },
  department: { type: String, required: true },
  year: { type: String },
  profileimage: { type: String },
});

const User = mongoose.model('User', userSchema );

export default User;