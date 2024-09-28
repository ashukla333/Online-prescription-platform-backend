import bcrypt from "bcrypt";
import { culsultant } from "../models/consultation.js";

export const addConsultation = async (req, res) => {
  try {
    const {
      doctorID,
      patientID,
      others,
      allergies,
      isDiabetic,
      recentSurgery,
      currentIllness,
    } = req.body;

    const createObject = {
      doctorID,
      patientID,
      others,
      allergies,
      isDiabetic,
      recentSurgery,
      currentIllness,
    };
    await culsultant.create(createObject);
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "culsultant submitted",
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getConsultation = async (req, res) => {
  try {
    const culsultantData = await culsultant.find({});
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "culsultant fetch sucessfully!",
      data: culsultantData
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};
