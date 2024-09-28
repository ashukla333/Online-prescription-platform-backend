
import mongoose, { model } from "mongoose";

const dbUser = new mongoose.Schema({
  name: { type: String },
  profilePicture: { type: String },
  email: { type: String},
  phoneNumber: { type: Number },
  age: { type: Number },
  historyOfSurgery: { type: String },
  historyOfIllness: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});




export const patient = mongoose.model("patient", dbUser);
