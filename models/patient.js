
import mongoose, { model } from "mongoose";

const dbUser = new mongoose.Schema({
  name: { type: String },
  profilePicture: { type: String },
  email: { type: String},
  phoneNumber: { type: Number },
  age: { type: Number },
  yearOfExp: { type: Number, select: false }, 
  historyOfSurgery: { type: String },
  historyOfIllness: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});




export const user = mongoose.model("patient", dbUser);
