import mongoose, { model, Schema } from "mongoose";

const dbUser = new mongoose.Schema({
  currentIllness: { type: String },
  recentSurgery: { type: String },
  isDiabetic: { type: Boolean },
  allergies: { type: String },
  others: { type: String },
  patientID: { type: Schema.Types.ObjectId },
  doctorID: { type: Schema.Types.ObjectId },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const culsultant = mongoose.model("culsultant", dbUser);
