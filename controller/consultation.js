import bcrypt from "bcrypt";
import { culsultant } from "../models/consultation.js";
import { patient } from "../models/patient.js";
import {ObjectId} from "mongodb";

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
      data: culsultantData,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getDrConsultation = async (req, res) => {
  try {
    const { id } = req.params;
    const culsultantData = await culsultant.aggregate([
      {
        $match: {
          doctorID:new ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "patients",
          localField: "patientID",
          foreignField: "_id",
          as: "patientData",
        },
      },
      {
        $unwind: "$patientData",
      },
      //   object me convert kiya array ko
    ]);
    console.log({ culsultantData });
    if (!culsultantData) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: "culsultant not fetch sucessfully!",
      });
    }
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "culsultant fetch sucessfully!",
      data: culsultantData,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};
