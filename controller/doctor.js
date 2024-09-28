import { doctor } from "../models/doctor.js";
import bcrypt from "bcrypt";
import { getAllDoctorsList, getDoctor } from "../service/doctor-service.js";
import cloudinary from "cloudinary";
import path from "path";

cloudinary.v2.config({
  cloud_name: "dhdkujtqq",
  api_key: "881717377834428",
  api_secret: "-1TebCjBkITPj9AWLEs7EwcDg_U",
});

export const addDoctor = async (req, res) => {
  try {
    const { name, email, phoneNumber, yearOfExp, specialty } =
      req.body;

    //   console.log(req.body)
      console.log({aman:req})
    const checkEmailAndPhoneNumber = await getDoctor(email, phoneNumber);
    if (!checkEmailAndPhoneNumber) {
      const result = await cloudinary.uploader.upload(req.file.path);
      let createObject = {
        name: name,
        profilePicture: result && result.secure_url ? result.secure_url : "",
        email: email,
        phoneNumber: phoneNumber,
        yearOfExp: yearOfExp,
        specialty: specialty,
      };
      await doctor.create(createObject);
      return res.status(200).json({
        status: true,
        statusCode: 200,
        message: "Doctor is Created succesfully!",
      });
    }
    return res.status(409).json({
      status: false,
      statusCode: 409,
      message: checkEmailAndPhoneNumber?.message,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const loginDoctor = async (req, res) => {
  try {
    const { email, phoneNumber } = req.body;
    const checkEmailAndPhoneNumber = await getDoctor(email, phoneNumber);
    if (!checkEmailAndPhoneNumber) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: "user not Avalaible",
      });
    }
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Login SuccessFully! ",
      data: checkEmailAndPhoneNumber.data,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    const getDrList = await getAllDoctorsList();
    if (getDrList && getDrList.length > 0) {
      return res.status(200).json({
        status: true,
        statusCode: 200,
        message: "Doctor fetch succesfully!",
        data: getDrList,
      });
    }
    return res.status(400).json({
      status: false,
      statusCode: 400,
      message: "Not Fount ",
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getAllDoctorsById = async (req, res) => {
  try {
    const { id } = req.params;
    const getDrList = await getAllDoctorsList(id);
    if (getDrList) {
      // let profilePictureLink = `${req.protocol}://${req.get('host')}/${getDrList.profilePicture}`;
      const profilePictureLink = `${req.protocol}://${req.get(
        "host"
      )}/uploads/${path.basename(getDrList.profilePicture)}`;

      console.log({ profilePictureLink });
      return res.status(200).json({
        status: true,
        statusCode: 200,
        message: "Doctor fetch succesfully!",
        data: {
          _id: getDrList._id,
          name: getDrList.name,
          email: getDrList.email,
          phoneNumber: getDrList.phoneNumber,
          specialty: getDrList.specialty,
          profilePicture: profilePictureLink,
          createdAt: getDrList.createdAt,
        },
      });
    }
    return res.status(400).json({
      status: false,
      statusCode: 400,
      message: "Not Fount ",
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};
