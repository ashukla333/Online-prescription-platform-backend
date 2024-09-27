
import mongoose, { model } from "mongoose";

const dbUser = new mongoose.Schema({
    email: { type: String},
    password: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});




export const admin = mongoose.model("admin", dbUser);
