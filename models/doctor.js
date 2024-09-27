
import mongoose, { model } from "mongoose";

const dbUser = new mongoose.Schema({
  name: { type: String },
  profilePicture: { type: String },
  email: { type: String},
  phoneNumber: { type: Number },
  yearOfExp: { type: Number, select: false },  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});



export const doctor = mongoose.model("doctor", dbUser);
