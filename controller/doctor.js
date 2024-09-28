import { doctor } from "../models/doctor.js";
import bcrypt from "bcrypt";
import { getAllDoctorsList, getDoctor } from "../service/doctor-service.js";
import cloudinary from "cloudinary";
import path from "path";
import streamifier from 'streamifier';

cloudinary.v2.config({
  cloud_name: "dhdkujtqq",
  api_key: "881717377834428",
  api_secret: "-1TebCjBkITPj9AWLEs7EwcDg_U",
});

export const addDoctor = async (req, res) => {
    try {
      const { name, email, phoneNumber, yearOfExp, specialty } = req.body;
  
      const checkEmailAndPhoneNumber = await getDoctor(email, phoneNumber);
      if (checkEmailAndPhoneNumber) {
        return res.status(409).json({
          status: false,
          statusCode: 409,
          message: checkEmailAndPhoneNumber?.message,
        });
      }
  
      let profilePicture = '';
  
      // Log req.file to ensure it's being received
      console.log("Checking if file exists...");
      if (req.file) {
        console.log("File found:", req.file);
  
        try {
          const result = await cloudinary.uploader.upload(
            `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`, // Convert buffer to base64
            { resource_type: 'auto', public_id: `doctor_${name}` } // Use a unique public_id
          );
  
          // Log the result of the Cloudinary upload
          console.log("Cloudinary upload result:", result);
  
          // Assign the secure URL from Cloudinary to profilePicture
          profilePicture = result.secure_url;
          console.log('Download URL:', profilePicture);
        } catch (uploadError) {
          console.error('Upload failed:', uploadError);
          return res.status(500).json({
            status: false,
            message: 'File upload failed.',
          });
        }
      } else {
        console.log("No file uploaded.");
      }
  
      const newDoctor = {
        name,
        email,
        phoneNumber,
        yearOfExp,
        specialty,
        profilePicture, // If no picture uploaded, this will be an empty string
      };
  
      // Create the new doctor entry in the database
      await doctor.create(newDoctor);
  
      return res.status(200).json({
        status: true,
        message: "Doctor created successfully!",
        data: newDoctor,
      });
  
    } catch (error) {
      console.error('An error occurred:', error);
      return res.status(500).json({
        status: false,
        message: "Internal server error.",
      });
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
